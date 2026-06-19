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
      // Require `switch` statements over a union/enum type to handle every
      // member (or carry an explicit `default`). For a Zod utility library
      // that maps over enum/union values, this turns "forgot a case" into a
      // lint error and forces existing switches to be revisited whenever a
      // new enum member is added. `requireDefaultForNonUnion` also flags
      // non-union switches that silently lack a `default` branch.
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { requireDefaultForNonUnion: true },
      ],
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
