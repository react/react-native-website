---
title: React Native Open Source Update June 2019
authors: [cpojer]
tags: [announcement]
---

## Code & Community Health

In the past six months, a total of 2800 commits were made to React Native by more than 550 contributors. 400 contributors from the community created more than [1,150 Pull Requests](https://github.com/react/react-native/pulls?page=24&q=is%3Apr+closed%3A%3E2018-12-01&utf8=%E2%9C%93), of which [820 Pull Requests](https://github.com/react/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+closed%3A%3E2018-12-01+label%3A%22Merged%22+) were merged.

The average number of Pull Requests per day throughout the past six months has increased from three to about six, even though we split the website, CLI and many modules out of React Native via the Lean Core effort. The average amount of open pull requests is now below 25 and we usually reply with suggestions and reviews within hours or days.

### Meaningful Community Contributions

We’d like to highlight a number of recent contributions which we thought were awesome:

- **Accessibility:** React Native 0.60 will ship with many improvements to accessibility APIs both on Android and iOS. All of the new features are directly using APIs provided by the underlying platform so they’ll integrate with native assistance technologies both on Android and iOS. We’d like to thank [Marc Mulcahy](https://github.com/marcmulcahy), [Alan Kenyon](https://github.com/react/react-native/pull/24746), [Estevão Lucas](https://github.com/elucaswork), [Sam Mathias Weggersen](https://github.com/sweggersen) and [Janic Duplessis](https://twitter.com/janicduplessis) for their contributions:
  - [Additional Accessibility Roles + States](https://github.com/react/react-native/pull/24095) and a [new Accessibility States API](https://github.com/react/react-native/pull/24608). Added a number of missing accessibility roles for various components and a new API for better web support in the future.
  - [AccessibilityInfo.announceForAccessibility](https://github.com/react/react-native/pull/24746). Added support for Android, previously iOS-only.
  - [Extended Accessibility Actions Support](https://github.com/react/react-native/pull/24695). Added callbacks to deal with accessibility around user-defined actions.
  - [Support for iOS Accessibility flags](https://github.com/react/react-native/pull/23913) and [support for "reduce motion"](https://github.com/react/react-native/pull/23839).
  - [Android keyboard accessibility improvements](https://github.com/react/react-native/pull/24359). Added a `clickable` prop and an `onClick` callback for invoking actions via keyboard navigation _(note: this will soon be renamed to `focusable`)._
  - [Use CALayers to draw text](https://github.com/react/react-native/pull/24387). Fixed an issue that made scaled-up text disappear on iOS.
- **New App Screen:** The community came up with a [design for the new app screen](https://github.com/react-native-community/discussions-and-proposals/issues/122) that is implemented in 0.60. This screen is what most people see when they are first using React Native. It now links first time users to the documentation and the look fits with our upcoming website redesign 🌟. Huge thanks to [Orta](https://twitter.com/orta), [Adam Shurson](https://www.linkedin.com/in/ashurson/), [Glauber Castro](https://github.com/glauberfc), [Karan Singh](https://github.com/karanpratapsingh), [Eli Perkins](https://github.com/eliperkins), [Lucas Bento](https://x.com/bitbento) and [Eric Lewis](https://twitter.com/ericlewis) for all their work and collaboration!
  - Check out the new app screen on the “_[React Native Show](https://www.youtube.com/watch?v=ImlAqMZxveg)_“ video series.
- **TurboModule Types:** The new [TurboModules system](https://github.com/react-native-community/discussions-and-proposals/issues/40) requires [types for all native modules](https://github.com/react/react-native/issues/24875) to guarantee type safe operations in native. In just over two weeks, the community sent ~40 Pull Requests to complete this work for flow typed native modules. Aside from the people already mentioned above, we’d like to thank [Michał Chudziak](https://twitter.com/michalchudziak), [Michał Pierzchała](https://twitter.com/thymikee), [Wojtek Szafraniec](https://github.com/wojteg1337), and [Jean Regisser](https://github.com/jeanregisser) and everyone else who sent one or more Pull Requests.
- **Haste:** Since 2015 React Native used the [“haste” module system](https://github.com/reactjs/reactjs.org/commit/0629e3e2289ed54fac854472aec9a5f6c8318c98#diff-c42b758729cb89976b3a8fd51d1227fa) that allows importing modules just via a global id instead of a relative path which is convenient but not well supported by many tools. [James Ide](https://twitter.com/JI) proposed removing haste, similar to how React removed haste many years ago. He planned all the work through an [umbrella task](https://github.com/react/react-native/issues/24316) and he sent 18 Pull Requests to make it happen! Check out [his Twitter thread](https://twitter.com/JI/status/1136369775083319296) to learn more.
- **Android Fragments:** [John Shelley](https://github.com/jpshelley)‘s proposal to make React Native work via [Android Fragments](https://github.com/react/react-native/pull/12199) was merged and will be available in 0.61. [Read more about Android Fragments here](https://developer.android.com/guide/components/fragments).

### Lean Core

The primary motivation of [Lean Core](https://github.com/react-native-community/discussions-and-proposals/issues/6) has been to split modules out of React Native into separate repositories so they can receive better maintenance. In just a six months repositories like [WebView](https://github.com/react-native-community/react-native-webview), [NetInfo](https://github.com/react-native-community/react-native-netinfo), [AsyncStorage](https://github.com/react-native-community/react-native-async-storage), the [website](https://github.com/react/react-native-website) and the [CLI](https://github.com/react-native-community/cli) received more than 800 Pull Requests combined. Besides better maintenance, these projects can also be independently released more often than React Native itself.

We have also taken the opportunity to remove obsolete polyfills and legacy components from React Native itself. Polyfills were necessary in the past to support language features like [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) in older versions of JavaScriptCore (JSC). Now that React Native ships with a new version, these polyfills were removed.

This work is still in progress and many more things still need to be split out or removed both on the native and JavaScript side but there are early signs that we managed to reverse the trend of increasing the surface area and app size: When looking at the JavaScript bundle for example, about a year ago in version 0.54 the React Native JavaScript bundle size was 530kb and grew to 607kb (+77kb) by version 0.57 in just 6 months. Now we are seeing a bundle size reduction of 28kb down to 579kb on master, a delta of more than 100kb!

As we conclude the first iteration of the Lean Core effort, we will make an effort to be more intentional about new APIs added to React Native and we will continuously evaluate ways to make React Native smaller and faster, as well as finding ways to empower the community to take ownership of various components.

## User Feedback

Six months ago we asked the community “[What do you dislike about React Native?](https://github.com/react-native-community/discussions-and-proposals/issues/64)” which gave a good overview of problems people are facing. We [replied to the post a few months ago](https://github.com/react-native-community/discussions-and-proposals/issues/104) and it's time to summarize the progress that was made on top issues:

- **Upgrading:** The React Native community rallied around with multiple improvements to the upgrading experience: [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md), a better upgrading command via [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge), an upgrade helper website (coming soon). We’ll also make sure to communicate breaking changes and exciting new features by publishing blog posts for each major release. Many of these improvements will make future upgrades beyond the 0.60 release significantly easier.
- **Support / Uncertainty:** Many people were frustrated with the lack of activity on Pull Requests and general uncertainty about Facebook's investment in React Native. As we've shown above, we can confidently say that we are ready for many more Pull Requests and we are eagerly looking forward to your proposals and contributions!
- **Performance:** React Native 0.59 shipped with a new and much faster version of JavaScriptCore (JSC). Separately, we have been working on making it easier to enable [inline-requires](/docs/performance#ram-bundles-inline-requires) by default and we have more exciting updates for you in the next couple of months.
- **Documentation:** We recently started an effort to [overhaul and rewrite all of React Native's documentation](https://github.com/react/react-native-website/issues/929). If you are looking to contribute, we’d love to get your help!
- **Warnings in Xcode:** We [got rid of all the existing warnings](https://github.com/react/react-native/issues/22609) and are making an effort not to introduce new warnings.
- **Hot Reloading:** The React team is building a [new hot reloading system](https://web.archive.org/web/20230523030851/https://twitter.com/dan_abramov/status/1126948870137753605) that will soon be integrated into React Native.

Unfortunately we weren’t able to improve everything just yet:

- **Debugging:** We fixed many inconvenient bugs and issues people that we have been running into every day, but unfortunately we haven't made as much progress on this as we would like. We recognize that debugging with React Native isn't great and we'll prioritize improving this in the future.
- **Metro symlinks:** Unfortunately we haven't been able to implement a simple and straightforward solution for this yet. However, React Native users [shared various workarounds](https://github.com/react/metro/issues/1) that may work for you.

Given the large amount of changes in the past six months, we'd like to ask you the same question again. If you are using the latest version of React Native and you have things you'd like to give feedback on, please comment on our new edition of [“What do you dislike about React Native?”](https://github.com/react-native-community/discussions-and-proposals/issues/134)

## Continuous Integration

Facebook merges all Pull Requests and internal changes directly into Facebook’s repository first and then syncs all commits back to GitHub. Facebook’s infrastructure is different from common continuous integration services and not all open source tests were run inside of Facebook. This means that commits that sync out to GitHub frequently break tests in open source which take a lot of time to fix.

[Héctor Ramos](https://twitter.com/hectorramos) from the React Native team spent the past two months improving React Native's continuous integration systems both at Facebook and on GitHub. Most of the open source tests are now run before changes are committed to React Native at Facebook which will keep CI stable on GitHub when commits are being synchronized.

## Next

Make sure to check out our talks about the future of React Native! In the next couple of months, members of the React Native team at Facebook will speak at [Chain React](https://infinite.red/ChainReactConf) and at [React Native EU](https://react-native.eu/). Also, watch out for our next release, 0.60, which is right around the corner. _It's going to be exciting_ ✨
