module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.json'],
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: [
      '@typescript-eslint',
      'react',
      'react-hooks',
      'import',
      'storybook',
      '@next/next',
      'prettier',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:import/recommended',
      'plugin:storybook/recommended',
      'plugin:@next/next/recommended',
      'prettier',
    ],
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: ['./tsconfig.json'] },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],
      'id-length': ['error', { min: 2, exceptions: ['i', 'j', 'k'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prettier/prettier': 'warn',
    },
  };
  