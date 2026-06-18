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
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
