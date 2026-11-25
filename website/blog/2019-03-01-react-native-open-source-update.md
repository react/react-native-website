---
title: React Native Open Source Update March 2019
authors: [cpojer]
tags: [announcement]
---

We announced our [React Native Open Source roadmap](/blog/2018/11/01/oss-roadmap) in Q4 2018 after deciding to invest more in the React Native open source community.

For our first milestone, we focused on identifying and improving the most visible aspects of our community. Our goals were to reduce outstanding pull requests, reduce the project's surface area, identify leading user problems, and establish guidelines for community management.

In the past two months, we made more progress than we expected. Read on for more details:

### Pull Requests

In order to build a healthy community, we must respond quickly to code contributions. In past years, we de-prioritized reviewing community contributions and accumulated 280 pull requests (December 2018). In the first milestone, we reduced the number of open pull requests to ~65. Simultaneously, the average number of pull requests opened per day increased from 3.5 to 7 which means we have handled about [600 pull requests](https://github.com/react/react-native/pulls?page=24&q=is%3Apr+closed%3A%3E2018-12-01&utf8=%E2%9C%93) in the last three months.

We merged [almost two-thirds](https://github.com/react/react-native/pulls?utf8=%E2%9C%93&q=is%3Apr+closed%3A%3E2018-12-01+label%3A%22Merged%22+) and closed one-third of the pull requests. They were closed without being merged if they are obsolete or low quality, or if they unnecessarily increase the project's surface area. Most of the merged pull requests fixed bugs, improved cross-platform parity, or introduced new features. Notable contributions include improving type safety and the ongoing work to support AndroidX.

At Facebook, we run React Native from master, so we test all changes first before they make it into a React Native Release. Out of all the merged pull requests, only six caused issues: four only affected internal development and two were caught in the release candidate state.

One of the more visible community contributions was [the updated “RedBox” screen](https://github.com/react/react-native/pull/22242). It's a good example of how the community is making the developer experience friendlier.

### Lean Core

React Native currently has a very wide surface area with many unmaintained abstractions that we do not use a lot at Facebook. We are working on reducing the surface area in order to make React Native smaller and allow the community to take better care of abstractions that are mostly unused at Facebook.

In the first milestone, [we asked the community for help on the Lean Core project](https://twitter.com/reactnative/status/1093171521114247171). The response was overwhelming and we could barely keep up with all the progress. [Check out all the work completed in less than a month](https://github.com/react/react-native/issues/23313)!

What we are most excited about is that maintainers have jumped in fixing long standing issues, adding tests, and supporting long requested features. These modules are getting more support than they ever did within React Native, showing that this is a great step for the community. Examples of such projects are [WebView](https://github.com/react-native-community/react-native-webview) that has [received many pull requests](https://twitter.com/titozzz/status/1101283928026034176) since their extraction and the CLI that is now [maintained by members of the community](https://www.callstack.com/blog/the-react-native-cli-has-a-new-home) and received much needed improvements and fixes.

### Leading User Problems

In December, we asked the community what they [disliked about React Native](https://github.com/react-native-community/discussions-and-proposals/issues/64). We aggregated the responses and [replied to each and every problem](https://github.com/react-native-community/discussions-and-proposals/issues/104). Fortunately, many of the issues that our community faces are also problems at Facebook. In our next milestone, we plan to address some of the main problems.

One of the highest voted problems was the developer experience of upgrading to newer versions of React Native. Unfortunately, this is not something that we experience ourselves because we run React Native from master. Thankfully, members from the community already stepped up to address this problem:

- [Michał Pierzchała](https://github.com/thymikee) from Callstack [improved react-native upgrade](https://github.com/react-native-community/react-native-cli/pull/176/files) by using [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) under the hood. We also updated the website to remove outdated upgrade instructions.
- [We plan on recommending CocoaPods by default for iOS projects](https://github.com/react/react-native/pull/23563) which will reduce churn in project files when upgrading React Native. This will make it easier for people to install and link third-party modules which is even more important in the context of Lean Core as we expect projects to link more modules by default.

### 0.59 Release

Without the help of the React Native community, especially [Mike Grabowski](https://github.com/grabbou) and [Lorenzo Sciandra](https://github.com/kelset), we would not be able to ship releases. We want to improve the release management process and plan to be more involved from now on:

- We will work with community members to create a blog post for each major release.
- We will show breaking changes directly in the CLI when people upgrade to new versions.
- We will reduce the time it takes to make a release. We are exploring ways to increase automated testing and also creating an improved manual test plan.

Many of these plans will be incorporated in the upcoming [React Native 0.59 release](https://github.com/react/react-native/releases/tag/v0.59.0-rc.3). 0.59 will ship with React Hooks, a new 64-bit version of JavaScriptCore for Android, and many performance and functionality improvements. It is currently published as a release candidate and is expected to be stable within the next two weeks.

### Next Steps

For the next two months, we will continue managing pull requests [to stay on track](https://k03lwm00zo.codesandbox.io/) while also starting to reduce the number of outstanding GitHub issues. We will continue reducing the surface area of React Native through the Lean Core project. We plan to address 5 of the top community problems. As we finalize the community guidelines, we will turn attention to our website and documentation.

We are very excited to host over ten contributors from our community at Facebook London in March to help drive several of these efforts. We are glad that you are using React Native and hope that you'll see and feel the improvements we are working on in 2019. We'll be back with another update in a few months and _will be merging your pull requests in the meantime!_ ⚛️✌️
