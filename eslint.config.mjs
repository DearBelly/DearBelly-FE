import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import storybook from "eslint-plugin-storybook";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["node_modules", ".next", "dist", "coverage"] },

  js.configs.recommended,
  prettier,

  ...tseslint.config({
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      storybook,
    },
    settings: {
      react: { version: "detect" },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: { project: ["./tsconfig.json"] },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/jsx-pascal-case": "error",

      ...reactHooks.configs.recommended.rules,

      ...importPlugin.configs.recommended.rules,
      "import/no-unresolved": "off",
      "import/no-duplicates": "error",

      "prefer-arrow-callback": "error",
      "func-style": ["error", "expression"],
      "id-length": ["error", { min: 2 }],
      "no-var": "error",
      "prefer-const": "error",
    },
  }),
];
