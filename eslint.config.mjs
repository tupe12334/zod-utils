import config from 'eslint-config-agent'

export default [
  ...config,
  {
    // Enforce `import type` for type-only imports so they are erased at build
    // time and can never pull a value/runtime dependency into emitted JS.
    rules: {
      // Forbid a variable declaration from shadowing one in an outer scope.
      // A shadowed name (a nested `value`, `index` or `result` that hides the
      // outer one) reads as if it refers to the outer binding while it does
      // not — a classic source of "I updated the wrong variable" bugs and of
      // confusing diffs during refactors. The base `no-shadow` rule is left
      // off (it false-positives on TS type/value merging and enum members);
      // the typescript-eslint version understands those cases, so it is the
      // recommended replacement. There are no violations in `src` today, so
      // the rule carries zero current cost and simply guards against the bug
      // as the library grows.
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      // Require the property style (`foo: () => void`) over the method
      // shorthand (`foo(): void`) for every method signature in interfaces
      // and object types. The two are NOT equivalent under the compiler:
      // method-shorthand signatures are exempted from `strictFunctionTypes`
      // and checked *bivariantly*, a deliberate TypeScript unsoundness that
      // lets an unsafe callback slip through type-checking, whereas the
      // property style is checked *contravariantly* (sound). For a type
      // utility library whose whole value is precise, trustworthy types,
      // forcing the sound form removes a silent hole in the public API's
      // guarantees. There are no method signatures in `src` today, so this
      // rule has zero current cost and simply keeps future declarations sound.
      '@typescript-eslint/method-signature-style': ['error', 'property'],
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
