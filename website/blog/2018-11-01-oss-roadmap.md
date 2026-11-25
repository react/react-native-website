---
title: Open Source Roadmap
author: Héctor Ramos
authorTitle: Engineer at Facebook
authorURL: 'https://hectorramos.com/about'
authorImageURL: 'https://s.gravatar.com/avatar/f2223874e66e884c99087e452501f2da?s=128'
authorTwitter: hectorramos
tags: [announcement]
---

![](/blog/assets/oss-roadmap-hero.jpg)

This year, the React Native team has focused on a large scale [re-architecture of React Native](https://github.com/react-native-community/discussions-and-proposals/issues/4). As Sophie mentioned in her [State of React Native post,](/blog/2018/06/14/state-of-react-native-2018) we've sketched out a plan to better support the thriving population of React Native users and collaborators outside of Facebook. It's now time to share more details about what we've been working on. Before I do so, I'd like to lay out our long-term vision for React Native in open source.

Our vision for React Native is...

- **A healthy GitHub repository.** Issues and pull requests get handled within a reasonable period of time.
  - Increased test coverage.
  - Commits that sync out from the Facebook code repository should not break open source tests.
  - A higher scale of meaningful community contributions.
- **Stable APIs,** making it easier to interface with open source dependencies.
  - Facebook uses the same public API as open source
  - React Native releases that follow semantic versioning.
- **A vibrant eco-system.** High quality ViewManagers, native modules, and multiple platform support maintained by the community.
- **Excellent documentation.** Focus on helping users create high quality experiences, and up-to-date API reference docs.

We have identified the following focus areas to help us achieve this vision.

## ✂️ Lean Core

Our goal is to [reduce the surface area of React Native](https://github.com/react-native-community/discussions-and-proposals/issues/6) by removing non-core and unused components. We'll transfer non-core components to the community to allow it to move faster. The reduced surface area will make it easier to manage contributions to React Native.

[`WebView`](https://github.com/react-native-community/discussions-and-proposals/blob/master/proposals/0001-webview.md) is an example of a component that we transferred to the community. We are working on a workflow that will allow internal teams to continue using these components after we remove them from the repository. We have identified [dozens more components](https://github.com/react-native-community/discussions-and-proposals/issues/6) that we'll give ownership of to the community.

## 🎁 Open Sourcing Internals and 🛠Updated Tooling

The React Native development experience for product teams at Facebook can be quite different from open source. Tools that may be popular in the open source community are not used at Facebook. There may be an internal tool that achieves the same purpose. In some cases, Facebook teams have become used to tools that do not exist outside of Facebook. These disparities can pose challenges when we open source our upcoming architecture work.

We'll work on releasing some of these internal tools. We'll also improve support for tools popular with the open source community. Here's a non-exhaustive list of projects we'll tackle:

- Open source JSI and enable the community to bring their own JavaScript VMs, replacing the existing JavaScriptCore from RN's initial release. We'll be covering what JSI is in a future post, in the meantime you can learn more about JSI from [Parashuram's talk at React Conf](https://www.youtube.com/watch?v=UcqRXTriUVI).
- Support 64-bit libraries on Android.
- Enable debugging under the new architecture.
- Improve support for CocoaPods, Gradle, Maven, and new Xcode build system.

## ✅ Testing Infrastructure

When Facebook engineers publish code, it's considered safe to land if it passes all tests. These tests identify whether a change might break one of our own React Native surfaces. Yet, there are differences in how Facebook uses React Native. This has allowed us to unknowingly break React Native in open source.

We'll shore up our internal tests to ensure they run in an environment that is as close as possible to open source. This will help prevent code that breaks these tests from making it to open source. We will also work on infrastructure to enable better testing of the core repo on GitHub, enabling future pull requests to easily include tests.

Combined with the reduced surface area, this will allow contributors to merge pull requests quicker, with confidence.

## 📜 Public API

Facebook will consume React Native via the public API, the same way open source does, to reduce unintentional breaking changes. We have started converting internal call sites to address this. Our goal is to converge on a stable, public API, leading to the adoption of semantic versioning in version 1.0.

## 📣 Communication

React Native is one of the [top open source projects on GitHub](https://octoverse.github.com/#top-and-trending-projects) by contributor count. That makes us really happy, and we'd like to keep it going. We'll continue working on initiatives that lead to involved contributors, such as increased transparency and open discussion. The documentation is one of the first things someone new to React Native will encounter, yet it has not been a priority. We'd like to fix that, starting with bringing back auto-generated API reference docs, creating additional content focused on creating [quality user experiences](/docs/improvingux), and improving our [release notes](https://github.com/react-native-community/react-native-releases/issues/47).

## Timeline

We're planning to land these projects throughout the next year or so. Some of these efforts are already ongoing, such as [JSI which has already landed in open source](https://github.com/react/react-native/compare/e337bcafb0b017311c37f2dbc24e5a757af0a205...8427f64e06456f171f9df0316c6ca40613de7a20). Others will take a bit longer to complete, such as reducing the surface area. We'll do our best to keep the community up to date with our progress. Please join us in the [Discussions and Proposals](https://github.com/react-native-community/discussions-and-proposals) repository, an initiative from the React Native community that has led to the creation of several of the initiatives discussed in this roadmap.
