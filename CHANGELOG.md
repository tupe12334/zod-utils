# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `zodEnumToValuesEnum`: a type-safe helper to access the values of a `ZodEnum` as an object, with documentation and usage example in the README.

### Changed

- Adopted `eslint-config-agent` as the shared linting baseline.
- Hardened the lint configuration by progressively enabling a broad set of rules, including `strict-boolean-expressions`, `explicit-function-return-type`, `explicit-module-boundary-types`, `no-non-null-assertion`, `no-unnecessary-condition`, `consistent-type-imports`, `consistent-type-exports`, `no-import-type-side-effects`, `promise-function-async`, `method-signature-style`, `switch-exhaustiveness-check`, `require-array-sort-compare`, `no-shadow`, `no-console`, `eqeqeq`, `prefer-template`, and `no-param-reassign`.
- Switched the package manager from npm to pnpm and refreshed the GitHub Actions publish workflow (Node.js 18, updated actions, OTP/auth token handling, test execution step).

### Fixed

- Enabled declaration files and source maps in the TypeScript build configuration.
- Corrected the `zodEnum.options` cast in `zodEnumToValuesEnum`.

[Unreleased]: https://github.com/tupe12334/zod-utils/compare/main...HEAD
