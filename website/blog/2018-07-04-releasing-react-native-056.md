---
title: Releasing 0.56
author: Lorenzo Sciandra
authorTitle: Core Maintainer & React Native Developer at Drivetribe
authorURL: 'https://github.com/kelset'
authorImageURL: 'https://avatars2.githubusercontent.com/u/16104054?s=460&v=4'
authorTwitter: kelset
tags: [announcement, release]
---

The long-awaited 0.56 version of React Native is now available 🎉. This blog post highlights some of the [changes](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#highlights) introduced in this new release. We also want to take the opportunity to explain what has kept us busy since March.

### The breaking changes dilemma, or, "when to release?"

The [Contributor's Guide](https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md) explains the integration process that all changes to React Native go through. The project has is composed by [many different tools](https://github.com/facebook/react-native-website/issues/370), requiring coordination and constant support to keep everything working properly. Add to this the vibrant open source community that contributes back to the project, and you will get a sense of the mind-bending scale of it all.

With React Native's impressive adoption, breaking changes must be made with great care, and the process is not as smooth as we'd like. A decision was made to skip the April and May releases to allow the core team to integrate and test a new set of breaking changes. [Dedicated community communication](https://github.com/react-native-community/react-native-releases/issues/14) channels were used along the way to ensure that the June 2018 (`0.56.0`) release is as hassle-free as possible to adopt by those who patiently waited for the stable release.

Is `0.56.0` perfect? No, as every piece of software out there: but we reached a point where the tradeoff between "waiting for more stability" versus "testing led to successful results so we can push forward" that we feel ready to release it. Moreover, we are aware [of](https://github.com/facebook/react-native/issues/19955) [a](https://github.com/facebook/react-native/issues/19827) [few](https://github.com/facebook/react-native/issues/19763) [issues](https://github.com/facebook/react-native/issues/19859) that are not solved in the final `0.56.0` release. Most developers should have no issues upgrading to `0.56.0`. For those that are blocked by the aforementioned issues, we hope to see you around in our discussions and we are looking forward to working with you on a solution to these issues.

You might consider `0.56.0` as a fundamental building block towards a more stable framework: it will take probably a week or two of widespread adoption before all the edge cases will be sanded off, but this will lead to an even better July 2018 (`0.57.0`) release.

We'd like to conclude this section by thanking [all the 67 contributors who worked on a total of 818 commits](https://github.com/facebook/react-native/compare/v0.55.4...v0.56.0-rc.4) (!) that will help make your apps even better 👏.

And now, without further ado...

## The Big Changes

### Babel 7

As you may know, the transpiler tool that allows us all to use the latest and greatest features of JavaScript, Babel, is moving to [v7 soon](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release). Since this new version brings along some important changes, we felt that now it would be a good time to upgrade, allowing [Metro](https://github.com/facebook/metro) to [leverage on its improvements](https://github.com/facebook/metro/issues/92).

If you find yourself in trouble with upgrading, please refer to the [documentation section related to it](https://new.babeljs.io/docs/en/next/v7-migration.html).

### Modernizing Android support

On Android, much of the surrounding tooling has changed. We've updated to [Gradle 3.5](https://github.com/facebook/react-native/commit/699e5eebe807d1ced660d2d2f39b5679d26925da), [Android SDK 26](https://github.com/facebook/react-native/commit/065c5b6590de18281a8c592a04240751c655c03c), [Fresco to 1.9.0, and OkHttp to 3.10.0](https://github.com/facebook/react-native/commit/6b07602915157f54c39adbf0f9746ac056ad2d13) and even the [NDK API target to API 16](https://github.com/facebook/react-native/commit/5ae97990418db613cd67b1fb9070ece976d17dc7). These changes should go without issue and result in faster builds. More importantly, it will help developers comply with the [new Play Store requirements](https://android-developers.googleblog.com/2017/12/improving-app-security-and-performance.html) coming into effect next month.

Related to this, we'd like to particularly thank [Dulmandakh](https://github.com/dulmandakh) for the many PRs submitted in order to make it possible 👏.

There are some more steps that need to be taken in this direction, and you can follow along with the future planning and discussion of updating the Android support in the [dedicated issue](https://github.com/facebook/react-native/issues/19297) (and a side one for the [JSC](https://github.com/facebook/react-native/issues/19737)).

### New Node, Xcode, React, and Flow – oh my!

Node 8 is now the standard for React Native. It was actually already being tested already, but we've put both feet forward as Node 6 entered maintenance mode. React was also updated to 16.4, which brings a ton of fixes with it.

We're dropping support for iOS 8, [making iOS 9 the oldest iOS version that can be targeted](https://github.com/facebook/react-native/commit/f50df4f5eca4b4324ff18a49dcf8be3694482b51). We do not foresee this being a problem, as any device that can run iOS 8, can be upgraded to iOS 9. This change allowed us to remove rarely-used code that implemented workarounds for older devices running iOS 8.

The continuous integration toolchain has been updated [to use Xcode 9.4](https://github.com/facebook/react-native/commit/c55bcd6ea729cdf57fc14a5478b7c2e3f6b2a94d), ensuring that all iOS tests are run on the latest developer tools provided by Apple.

We have upgraded to [Flow 0.75](https://github.com/facebook/react-native/commit/6264b6932a08e1cefd83c4536ff7839d91938730) to use the new error format [that many devs appreciate](https://web.archive.org/web/20220516045926/https://twitter.com/dan_abramov/status/998610821096857602). We've also created types for many more components. If you're not yet enforcing static typing in your project, please consider using Flow to identify problems as you code instead of at runtime.

### And a lot of other things...

For instance, YellowBox was [replaced](https://github.com/facebook/react-native/commit/d0219a0301e59e8b0ef75dbd786318d4b4619f4c) with a new implementation that makes debugging a lot better.

For the complete release notes, please reference the full [changelog here](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md). And remember to keep an eye on the [upgrading guide](/docs/upgrading) to avoid issues moving to this new version.

---

A final note: starting this week, the React Native core team will resume holding monthly meetings. We'll make sure to keep everyone up-to-date with what's covered, and ensure to keep your feedback at hand for future meetings.

Happy coding everyone!

[Lorenzo](https://twitter.com/Kelset), [Ryan](https://github.com/turnrye), and the whole [React Native core team](https://twitter.com/reactnative)

**PS:** as always, we'd like to remind everyone that React Native is still in 0.x versioning because of the many changes still undergoing - so remember when upgrading that yes, probably, something may still crash or be broken. Be helpful towards each other in the issues and when submitting PRs - and remember to follow the [CoC](https://code.fb.com/codeofconduct/) enforced: there's always a human on the other side of the screen.
