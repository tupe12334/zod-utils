import config from 'eslint-config-agent'

export default [
  ...config,
  {
    rules: {
      // Require explicit return types on functions to keep the public API's
      // types stable and intentional. `allowExpressions` keeps inline
      // callbacks (e.g. in tests) unannotated to avoid noise.
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
