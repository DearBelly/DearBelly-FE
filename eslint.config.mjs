import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import storybookPlugin from "eslint-plugin-storybook";
import prettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  prettier,

  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    plugins: { react: reactPlugin },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/jsx-pascal-case": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  {
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
      "import/no-unresolved": "off",
      "import/no-duplicates": "error",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
  },

  {
    plugins: { storybook: storybookPlugin },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "prefer-arrow-callback": "error",
      "func-style": ["error", "expression"],
      "id-length": ["error", { min: 2 }],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
