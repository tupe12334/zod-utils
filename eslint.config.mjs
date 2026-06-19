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
      // Enforce that re-exported types use a type-only export
      // (`export type { T }`). For a published type-utility library this keeps
      // type names out of the emitted runtime graph: a plain `export { T }` of a
      // type-only symbol can pull a module into the JS bundle (or trip
      // `isolatedModules` / bundlers) when it should erase at compile time.
      // Pairs with `consistent-type-imports` for symmetric, intentional type
      // boundaries. typescript-eslint leaves this off its presets, so it must be
      // enabled per-repo. There are no violations in `src` today, so the rule
      // has zero current cost and guards future exports.
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
