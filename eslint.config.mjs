import config from 'eslint-config-agent'

export default [
  ...config,
  {
    rules: {
      // Require explicit return and argument types on exported (module-boundary)
      // functions. As a published library, the inferred types of our public API
      // are part of our contract; making them explicit keeps that contract
      // stable and intentional instead of silently drifting with implementation
      // changes.
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
