require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
  ],
  // extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
      },
    },
  ],
};
