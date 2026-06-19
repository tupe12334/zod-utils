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
      // Require `===`/`!==` over `==`/`!=` to avoid surprising type-coercion
      // bugs (e.g. `0 == ''`, `null == undefined`). `null` is exempt so the
      // idiomatic `x == null` null-or-undefined check stays allowed.
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
