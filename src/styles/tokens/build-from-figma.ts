import * as fs from "fs";
import * as path from "path";

type Raw = any;

const SRC = path.resolve(__dirname, "./tokens.json");
const OUT_DIR = path.resolve(__dirname, "./generated");

const read = () => JSON.parse(fs.readFileSync(SRC, "utf-8")) as Raw;

const sanitizeKey = (s: string) =>
  s
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^\w\s-/]/g, "") // keep word, space, hyphen, slash, underscore
    .replace(/\s+|\/+/g, "_")  // spaces/slashes -> underscore
    .replace(/_{2,}/g, "_")
    .replace(/^_*|_*$/g, "")
    .replace(/-/g, "_")
    .replace(/[A-Z]/g, (m) => m.toLowerCase()); 

const toCamel = (s: string) =>
  sanitizeKey(s)
    .split("_")
    .filter(Boolean)
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join("");

// map font weight words to numbers
const weightMap: Record<string, string> = {
  extrabold: "800",
  bold: "700",
  semibold: "600",
  medium: "500",
  regular: "400",
  light: "300",
};

const ensureOut = () => fs.mkdirSync(OUT_DIR, { recursive: true });

/** resolve "{Foo.Bar}" style refs to final primitive "colors.xxx" path */
function buildResolvers(raw: Raw) {
  const primitivesLight = raw["Primitive/Light"] ?? {};
  const primitivesDark = raw["Primitive/Dark"] ?? {};
  // alias maps (Light/Dark)
  const aliasLight = raw["Alias Token/Light"] ?? {};
  const aliasDark = raw["Alias Token/Dark"] ?? {};

  // "Neutral1300" -> "colors.neutral1300"
  const primIndex: Record<string, string> = {};
  for (const [k] of Object.entries(primitivesLight)) {
    primIndex[k] = `colors.${toCamel(k)}`;
  }
  // white/black duplicates are fine; keep first

  // Traverse alias trees and create a map "Alias.Path" -> final primitive path
  function flatten(obj: any, prefix = "", acc: Record<string, string> = {}) {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && "value" in v) {
        const val = String(v.value ?? "");
        acc[key] = val;
      } else if (v && typeof v === "object") {
        flatten(v, key, acc);
      }
    }
    return acc;
  }

  const aliasFlatLight = flatten(aliasLight);
  const aliasFlatDark = flatten(aliasDark);

  // Resolve a "{X.Y}" reference to "colors.something" by walking:
  // 1) primitive direct
  // 2) alias light -> resolve recursively until primitive
  function stripBraces(s: string) {
    const m = s.match(/^\{([^}]+)\}$/);
    return m ? m[1] : null;
  }

  function resolveRefPath(ref: string, stack = new Set<string>()): string | null {
    // If already primitive key
    if (primIndex[ref]) return primIndex[ref];

    // If ref looks like "A.B", try alias light first
    // (we only need a "path string" to primitive; values differ by mode later)
    const val = aliasFlatLight[ref];
    if (!val) {
      // some alias refers alias like "BG.BG 3" -> if not found, sanitize?
      // try a sanitized variant:
      const sanitized = ref.replace(/\s+/g, " ");
      const val2 = aliasFlatLight[sanitized];
      if (!val2) return null;
      if (stack.has(sanitized)) return null;
      stack.add(sanitized);
      const inner = stripBraces(String(val2));
      return inner ? resolveRefPath(inner, stack) : null;
    }
    if (stack.has(ref)) return null;
    stack.add(ref);
    const inner = stripBraces(String(val));
    return inner ? resolveRefPath(inner, stack) : null;
  }

  return { primIndex, aliasFlatLight, aliasFlatDark, resolveRefPath, stripBraces };
}

function buildPrimitives(raw: Raw) {
  const primitivesLight = raw["Primitive/Light"] ?? {};
  const colors: Record<string, any> = {};
  for (const [name, obj] of Object.entries<any>(primitivesLight)) {
    const key = toCamel(name);
    if (!obj?.value) continue;
    colors[key] = { value: obj.value }; // keep string as-is
  }

  // fonts, sizes, etc
  const meta = raw[""] ?? {};
  const fonts: Record<string, any> = {};
  const fontFamilies = meta.fontFamilies ?? {};
  for (const [k, v] of Object.entries<any>(fontFamilies)) {
    const family = String(v.value ?? "");
    fonts[toCamel(k)] = { value: family.replace(/\s+/g, "") };
  }

  const fontWeightsRaw = meta.fontWeights ?? {};
  const fontWeights: Record<string, any> = {};
  for (const [k, v] of Object.entries<any>(fontWeightsRaw)) {
    const w = String(v.value ?? "").toLowerCase();
    fontWeights[toCamel(k)] = { value: weightMap[w] ?? w };
  }

  const fontSizesRaw = meta.fontSize ?? {};
  const fontSizes: Record<string, any> = {};
  for (const [k, v] of Object.entries<any>(fontSizesRaw)) {
    fontSizes[k] = { value: `${v.value}px` };
  }

  const lineHeightsRaw = meta.lineHeights ?? {};
  const lineHeights: Record<string, any> = {};
  for (const [k, v] of Object.entries<any>(lineHeightsRaw)) {
    lineHeights[k] = { value: `${v.value}px` };
  }

  const letterSpacingsRaw = meta.letterSpacing ?? {};
  const letterSpacings: Record<string, any> = {};
  for (const [k, v] of Object.entries<any>(letterSpacingsRaw)) {
    letterSpacings[k] = { value: String(v.value) };
  }

  return { colors, fonts, fontSizes, fontWeights, lineHeights, letterSpacings };
}

function buildSemantic(raw: Raw) {
  const { aliasFlatLight, aliasFlatDark, resolveRefPath, stripBraces } = buildResolvers(raw);

  // group back into nested object: "Text.Text 1" -> { text: { text1: { value: { base, _dark }}}}
  const result: Record<string, any> = {};

  function setNested(obj: any, pathStr: string, val: any) {
    const parts = pathStr.split(".").map(toCamel);
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] ??= {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = val;
  }

  const allKeys = new Set([...Object.keys(aliasFlatLight), ...Object.keys(aliasFlatDark)]);
  for (const key of allKeys) {
    const lightVal = aliasFlatLight[key];
    const darkVal = aliasFlatDark[key];

    const toTokenPath = (rawVal: string | undefined) => {
      if (!rawVal) return null;
      const inner = stripBraces(String(rawVal));
      if (!inner) return null;
      const primitivePath = resolveRefPath(inner);
      // fallback: if it’s already a primitive-like key (e.g., "Neutral1300") map directly
      return primitivePath ?? `colors.${toCamel(inner)}`;
    };

    const baseRef = toTokenPath(lightVal);
    const darkRef = toTokenPath(darkVal);

    // Only include entries that resolve to something
    if (baseRef || darkRef) {
      setNested(result, key, {
        value: {
          ...(baseRef ? { base: `{${baseRef}}` } : {}),
          ...(darkRef ? { _dark: `{${darkRef}}` } : {}),
        },
      });
    }
  }

  return result;
}

function buildTextStyles(raw: Raw, primitives: ReturnType<typeof buildPrimitives>) {
  const meta = raw[""] ?? {};
  const head = meta.Head ?? {};
  const body = meta.Body ?? {};
  const caption = meta.Caption ?? {};

  function resolveToken(str: string) {
    const m = String(str).match(/^\{([^}]+)\}$/);
    if (!m) return str;
    const parts = m[1].split(".");
    const root = parts.shift();
    if (!root) return str;
    const mapping: Record<string, string> = {
      fontFamilies: "fonts",
      fontWeights: "fontWeights",
      fontSize: "fontSizes",
      lineHeights: "lineHeights",
      letterSpacing: "letterSpacings",
      paragraphSpacing: "",
      paragraphIndent: "",
      textCase: "",
      textDecoration: "",
    };
    const mappedRoot = mapping[root] ?? root;
    const rest = parts.map(toCamel).join(".");
    return mappedRoot ? `{${mappedRoot}.${rest}}` : undefined;
  }

  function getPrimitiveFromRef(ref?: string) {
    if (!ref) return undefined;
    const m = ref.match(/^\{([^}]+)\}$/);
    if (!m) return undefined;
    const [root, key] = m[1].split(".");
    if (!root || !key) return undefined;
    const dict = (primitives as any)[root];
    return dict?.[key]?.value;
  }

  function percentToEm(input: string) {
    const n = parseFloat(input);
    if (isNaN(n)) return input;
    return `${n / 100}em`;
  }

  function pickStyle(v: any) {
    const val = v.value ?? {};
    const style: Record<string, any> = {};

    const fontFamilyRef = resolveToken(val.fontFamily);
    if (fontFamilyRef) style.fontFamily = fontFamilyRef;

    const fontWeightRef = resolveToken(val.fontWeight);
    if (fontWeightRef) style.fontWeight = fontWeightRef;

    const fontSizeRef = resolveToken(val.fontSize);
    if (fontSizeRef) style.fontSize = fontSizeRef;

    const lineHeightRef = resolveToken(val.lineHeight);
    if (lineHeightRef) style.lineHeight = lineHeightRef;

    const letterSpacingRef = resolveToken(val.letterSpacing);
    if (letterSpacingRef) {
      const lsRaw = String(getPrimitiveFromRef(letterSpacingRef) ?? "");
      if (lsRaw.endsWith("%")) {
        style.letterSpacing = percentToEm(lsRaw); 
      } else {
        style.letterSpacing = letterSpacingRef;
      }
    }

    if (val.fontStyle) style.fontStyle = String(val.fontStyle);
    if (val.fontFeatureSettings) style.fontFeatureSettings = String(val.fontFeatureSettings);

    return { value: style };
  }

  const out: Record<string, any> = {};
  const groups = { head, body, caption };
  for (const [gName, gObj] of Object.entries<any>(groups)) {
    for (const [k, v] of Object.entries<any>(gObj)) {
      out[`${toCamel(gName)}_${toCamel(k)}`] = pickStyle(v);
    }
  }
  return out;
}

function writeModule(file: string, exportName: string, obj: any) {
  const code =
    `/* Auto-generated from tokens.json */\n` +
    `export const ${exportName} = ${JSON.stringify(obj, null, 2)} as const;\n`;
  fs.writeFileSync(file, code, "utf-8");
}

function main() {
  ensureOut();
  const raw = read();

  const primitives = buildPrimitives(raw);
  const semantic = buildSemantic(raw);
  const textStyles = buildTextStyles(raw, primitives);

  writeModule(path.join(OUT_DIR, "primitives.ts"), "primitives", primitives);
  writeModule(path.join(OUT_DIR, "semantic.ts"), "semantic", { colors: semantic });
  writeModule(path.join(OUT_DIR, "textStyles.ts"), "textStyles", textStyles);

  console.log("Generated: primitives.ts, semantic.ts, textStyles.ts");
}

main();
