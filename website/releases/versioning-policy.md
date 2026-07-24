---
title: Versioning Policy
---

This page describes our versioning policy for `react-native` and the packages under the `@react-native` scope.

The `stable` channel follows the 0.x.y release policy described below, and every version is tested thoroughly — both manually and automatically — so quality doesn't regress. We also publish a `nightly` channel to encourage early feedback on experimental features.

## Stable Release Versions

React Native releases stable versions at a regular cadence.

We follow the 0.x.y versioning schema:

- Breaking changes will be shipped in a new minor version, i.e. we increment the x number (e.g.: 0.78.0 to 0.79.0).
- New features and APIs will also be shipped in a new minor version, i.e. we increment the x number (e.g.: 0.78.0 to 0.79.0).
- Critical bug fixes will be shipped in a new patch version, i.e. we increment the y number (e.g.: 0.78.1 to 0.78.2).

Stable releases are shipped regularly, with the latest tagged as `latest` on NPM.

A series of releases under the same minor number is called a **minor series** (e.g. 0.76.x is the minor series for 0.76.0, 0.76.1, 0.76.2, etc.).

You can read more about our **commitment to stability** on the [Releases Overview](/releases/overview#commitment-to-stability).

### Breaking changes

Breaking changes are inconvenient for everyone, and we’re trying to minimize them to the bare minimum. All the breaking changes we ship in each stable release will be highlighted in:

- The _Breaking_ and the _Removed_ section of [the React Native Changelog](https://github.com/react/react-native/blob/main/CHANGELOG.md)
- Each release blogpost in the _Breaking Changes_ section

For each breaking change we’re committed to explaining the reasoning behind it, provide a replacement API if possible, and minimize the impact on final users.

### What is a breaking change?

We consider a breaking change for React Native:

- An incompatible API change (i.e. an API that is changed or removed so that your code won’t compile/run anymore due to that change). Examples:
  - Changes of any JS/Java/Kotlin/Obj-c/C++ APIs that would require your code to be changed in order to compile.
  - Changes inside `@react-native/codegen` that are not backward compatible.
- A significant behavior/runtime change. Example:
  - The layout logic of a prop is changed drastically.
- A significant change in the development experience. Example:
  - A debugging feature is entirely removed.
- A major bump of any of our transitive dependencies. Examples:
  - Bumping React from 18.x to 19.x
  - Bumping the Target SDK on Android from 34 to 35).
- A reduction of any of our supported platform versions. Examples:
  - Bumping min SDK on Android from 21 to 23
  - Bumping the min iOS version to 15.1.

We don’t consider those changes to be breaking:

- Modifying APIs starting with `unstable_` prefix: These APIs expose experimental features, and we are not confident on their final shape. By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner.
- Changes to private or internal APIs: These APIs are often prefixed with either `internal_` , `private_` or living inside a `internal/` or `private/` folder/package. While some of those APIs might have public visibility due to tooling constraints, we don’t consider them part of our public API, so we’ll be changing them without previous notice.
  - Similarly, If you access internal property names like `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` or `__reactInternalInstance$uk43rzhitjg`, there are no guarantees. You are on your own.
  - Classes annotated with `@FrameworkAPI` are also considered internal
- Changes to tooling/development APIs: Some public APIs of React Native are reserved for integration with frameworks and other tools. For example, some of the Metro APIs or React Native DevTools APIs are supposed to be used only by other frameworks or tools. Changes to those APIs are discussed directly with the affected tools and are not considered breaking changes (we won’t be communicating them broadly in the release blogposts).
- Development warnings: Since warnings don’t affect runtime behavior, we may add new warnings or modify existing warnings in between any versions.

If we expect a change to cause broad problems in the community, we will still do our best to provide a gradual migration path for the ecosystem.

### Deprecation Cycles

As we keep on developing and evolving React Native, we write new APIs and sometimes we need to deprecate existing ones. Those APIs will go through a deprecation cycle.

Once an API is deprecated, it will remain available **also** for the **following** stable releases.

For example: if an API is deprecated in React Native 0.76.x, it will still be available in 0.77.x and won’t be removed sooner than React Native 0.78.x.

Sometimes we decide to keep a deprecated API for a longer time, if we feel that the ecosystem needs more time to migrate away from it. For those APIs we generally provide warnings to help users migrate away from them.
