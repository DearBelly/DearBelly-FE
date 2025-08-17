import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { primitives } from "@/styles/tokens/generated/primitives";
import { semantic } from "@/styles/tokens/generated/semantic";
import { textStyles } from "@/styles/tokens/generated/textStyles";
  
const customConfig = defineConfig({
  cssVarsRoot: ":where(html, :host)",
  cssVarsPrefix: "dear-belly",
  preflight: true,
  
  theme: {
  
    tokens: {
      colors: primitives.colors,
      fonts: primitives.fonts,
      fontSizes: primitives.fontSizes,
      fontWeights: primitives.fontWeights,
      lineHeights: primitives.lineHeights,
      letterSpacings: primitives.letterSpacings,
    },

    semanticTokens: {
      colors: semantic.colors,
    },

    textStyles,

    breakpoints: {
      base: "375px",
      sm: "768px",
      md: "1024px",
      lg: "1440px",
    },
  },

  globalCss: {
    "html, body": {
      overflowY: "auto",
      bg: "bg.bg1",
      minHeight: "100dvh",
      color: "text.text1",
      fontFamily: "{fonts.nanumsquareNeo}",
    },
  },
});
  
export const system = createSystem(defaultConfig, customConfig);