import config from 'eslint-config-agent'

export default [
  ...config,
  {
    // Enforce `import type` for type-only imports so they are erased at build
    // time and can never pull a value/runtime dependency into emitted JS.
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
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
      // Forbid relying on the implicit truthiness of nullable strings, numbers
      // and objects in boolean positions (`if (str)`, `a && b`, `!obj`,
      // ternaries). Implicit coercion makes an empty string, `0`, `NaN` or
      // `null` silently take the wrong branch — a whole class of bugs that
      // disappears once every condition is an explicit comparison
      // (`str.length > 0`, `x != null`). typescript-eslint deliberately leaves
      // this out of its `strictTypeChecked` preset (which eslint-config-agent
      // extends), so it must be enabled per-repo. There are no violations in
      // `src` today, so this rule has zero current cost and simply guards
      // against future regressions as the library grows.
      '@typescript-eslint/strict-boolean-expressions': 'error',
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
