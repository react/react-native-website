---
title: Releasing React Native 0.59
author: Ryan Turner
authorTitle: Core Maintainer & React Native Developer
authorURL: 'https://twitter.com/turnrye'
authorImageURL: 'https://avatars0.githubusercontent.com/u/701035?s=460&v=4'
authorTwitter: turnrye
tags: [announcement, release]
---

Welcome to the 0.59 release of React Native! This is another big release with 644 commits by 88 contributors. Contributions also come in other forms, so _thank you_ for maintaining issues, fostering communities, and teaching people about React Native. This month brings a number of highly anticipated changes, and we hope you enjoy them.

## 🎣 Hooks are here

React Hooks are part of this release, which let you reuse stateful logic across components. There is a lot of buzz about hooks, but if you haven't heard, take a look at some of the wonderful resources below:

> - [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html) explains why we’re adding Hooks to React.
> - [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html) is a fast-paced overview of the built-in Hooks.
> - [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) demonstrates code reuse with custom Hooks.
> - [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) explores the new possibilities unlocked by Hooks.
> - [useHooks.com](https://usehooks.com/) showcases community-maintained Hooks recipes and demos.

Be sure to give this a try in your apps. We hope that you find the reuse as exciting as we do.

## 📱 Updated JSC means performance gains and 64-bit support on Android

React Native uses JSC ([JavaScriptCore](https://webkit.org/)) to power your application. JSC on Android was a few years old, which meant that a lot of modern JavaScript features weren't supported. Even worse, it performed poorly compared iOS's modern JSC. With this release, that all changes.

Thanks to some awesome work by [@DanielZlotin](https://github.com/danielzlotin), [@dulmandakh](https://github.com/dulmandakh), [@gengjiawen](https://github.com/gengjiawen), [@kmagiera](https://github.com/kmagiera), and [@kudo](https://github.com/kudo) JSC has caught up with the past few years. This brings with it 64-bit support, modern JavaScript support, and [big performance improvements](https://github.com/react-native-community/jsc-android-buildscripts/tree/master/measure). Kudos for also making this a maintainable process now so that we can take advantage of future WebKit improvements without so much legwork, and thank you Software Mansion and Expo for making this work possible.

## 💨 Faster app launches with inline requires

We want to help people have performant React Native apps by default and are working to bring Facebook's optimizations to the community. Applications load resources as needed rather than slowing down launch. This feature is called "inline requires", as it lets Metro identify components to be lazy loaded. Apps with a deep and varied component architecture will see the most improvement.

![source of the `metro.config.js` file in the 0.59 template, demonstrating where to enable `inlineRequires`](/blog/assets/inline-requires.png)

We need the community to let us know how it works before we turn it on by default. When you upgrade to 0.59, there will be a new `metro.config.js` file; flip the options to true and give us [your feedback](https://twitter.com/hashtag/inline-requires)! Read more about inline requires [in the performance docs](/docs/performance#inline-requires) to benchmark your app.

## 🚅 Lean core is underway

React Native is a large and complex project with a complicated repository. This makes the codebase less approachable to contributors, difficult to test, and bloated as a dev dependency. [Lean Core](https://github.com/react-native-community/discussions-and-proposals/issues/6) is our effort to address these issues by migrating code to separate libraries for better management. The past few releases have seen the first steps of this, but [let's get serious](https://www.youtube.com/watch?v=FMLKb4or8yg).

You may notice that additional components are now officially deprecated. This is great news, as there are now owners for these features actively maintaining them. Heed the warning messages and migrate to the new libraries for these features, because they will be removed in a future release. Below is a table indicating the component, its status, and where you may migrate your use to.

| Component            | Deprecated? | New home                                                                                                                                                 |
| -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AsyncStorage**     | 0.59        | [@react-native-community/react-native-async-storage](https://github.com/react-native-community/react-native-async-storage)                               |
| **ImageStore**       | 0.59        | [expo-file-system](https://github.com/expo/expo/tree/master/packages/expo-file-system) or [react-native-fs](https://github.com/itinance/react-native-fs) |
| **MaskedViewIOS**    | 0.59        | [@react-native-community/react-native-masked-view](https://github.com/react-native-community/react-native-masked-view)                                   |
| **NetInfo**          | 0.59        | [@react-native-community/react-native-netinfo](https://github.com/react-native-community/react-native-netinfo)                                           |
| **Slider**           | 0.59        | [@react-native-community/react-native-slider](https://github.com/react-native-community/react-native-slider)                                             |
| **ViewPagerAndroid** | 0.59        | [@react-native-community/react-native-viewpager](https://github.com/react-native-community/react-native-viewpager)                                       |

Over the coming months, there will be many more components following this path to a leaner core. We're looking for help with this &mdash; head over to the [lean core umbrella](https://github.com/react/react-native/issues/23313) to pitch in.

## 👩🏽‍💻 CLI improvements

React Native's command line tools are developer's entry point to the ecosystem, but they had long-standing issues and lacked official support. The CLI tools have been moved to a [new repository](https://github.com/react-native-community/react-native-cli), and a [dedicated group of maintainers](https://www.callstack.com/blog/the-react-native-cli-has-a-new-home) have already made some exciting improvements.

Logs are formatted much better now. Commands now run nearly instantly &mdash; you'll immediately notice a difference:

![0.58's CLI is slow to start](/blog/assets/0.58-cli-speed.png)![0.58's CLI is nearly instantaneous](/blog/assets/0.59-cli-speed.png)

## 🚀 Upgrading to 0.59

We heard your feedback regarding the [React Native upgrade process](https://github.com/react-native-community/discussions-and-proposals/issues/68) and we are taking steps to improve the experience in [future releases](https://github.com/react-native-community/discussions-and-proposals/issues/64#issuecomment-444775432). To upgrade to 0.59, we recommend using [`rn-diff-purge`](https://github.com/react-native-community/rn-diff-purge) to determine what has changed between your current React Native version and 0.59, then applying those changes manually. Once you've upgraded your project to 0.59, you will be able to use the newly improved `react-native upgrade` command (based on `rn-diff-purge`!) to upgrade to 0.60 and beyond as newer releases become available.

## 🔨 Breaking Changes

Android support in 0.59 has been cleaned up following Google's latest recommendations, which may result in potential breakage of existing apps. This issue might present as a runtime crash and a message, "You need to use a Theme.AppCompat theme (or descendant) with this activity". We recommend updating your project's `AndroidManifest.xml` file, making sure that the `android:theme` value is an `AppCompat` theme (such as `@style/Theme.AppCompat.Light.NoActionBar`).

The `react-native-git-upgrade` command has been removed in 0.59, in favor of the newly improved `react-native upgrade` command.

## 🤗 Thanks

Lots of new contributors helped with [enabling generation of native code from flow types](https://github.com/react/react-native/issues/22990) and [resolving Xcode warnings](https://github.com/react/react-native/issues/22609) - these are a great way to learn how React Native works and contributing to the greater good. Thank you! Look out for similar issues in the future.

While these are the highlights that we noted, there are many others to be excited about. To see all of the updates, take a look at the [changelog](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md). 0.59 is a huge release – we can't wait for you to try it out.

We have even more improvements coming throughout the rest of the year. Stay tuned!

[Ryan](https://github.com/turnrye) and the whole [React Native core team](https://twitter.com/reactnative)
