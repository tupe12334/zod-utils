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
      // Forbid `console.*` calls in library source. This package ships to
      // consumers via npm, so a stray `console.log`/`console.error` left in
      // from debugging would pollute the host application's output, leak
      // internal state and can't be silenced by the consumer. Keeping the
      // shipped code free of console I/O is part of being a well-behaved
      // dependency. The rule is not part of typescript-eslint's
      // `strictTypeChecked` preset (which eslint-config-agent extends), so it
      // must be enabled per-repo. There are no violations in `src` today, so
      // this has zero current cost and simply guards against future
      // regressions as the library grows.
      'no-console': 'error',
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
