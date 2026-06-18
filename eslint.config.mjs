import config from 'eslint-config-agent'

export default [
  ...config,
  {
    // Build output and the lint config itself are not part of the TS project.
    ignores: ['dist/**', 'eslint.config.mjs'],
  },
]
