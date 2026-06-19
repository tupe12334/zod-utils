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
      // Require a compare function whenever a non-string array is sorted.
      // `Array.prototype.sort` coerces elements to strings by default, so
      // `[1, 10, 2].sort()` yields `[1, 10, 2]` — the notorious lexicographic
      // sort bug. Forcing an explicit comparator (`(a, b) => a - b`) makes the
      // intended ordering unambiguous and eliminates a silent correctness bug.
      // `ignoreStringArrays` keeps the lint quiet for string arrays, where the
      // default lexicographic order is genuinely what callers want. This rule
      // is not part of typescript-eslint's `strictTypeChecked` preset (which
      // eslint-config-agent extends), so it must be enabled per-repo. There
      // are no violations in `src` today, so it carries zero current cost and
      // simply guards against the bug as the library grows.
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
      ],
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
