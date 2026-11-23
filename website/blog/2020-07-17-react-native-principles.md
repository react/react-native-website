---
title: React Native Team Principles
authors: [Eli White]
tags: [announcement]
---

The React Native team at Facebook is guided by principles that help determine how we prioritize our work on React Native. These principles represent our team specifically and do not necessarily represent every stakeholder in the React Native community. We are sharing these principles here to be more transparent about what drives us, how we make decisions, and how we focus our efforts.

## **Native Experience**

Our top priority for React Native is to **match the expectations people have for each platform**. This is why React Native renders to platform primitives. We value native look-and-feel over cross-platform consistency.

For example, the TextInput in React Native renders to a UITextField on iOS. This ensures that integration with password managers and keyboard controls work out of the box. By using platform primitives, React Native apps are also able to stay up-to-date with design and behavior changes from new releases of Android and iOS.

In order to match the look-and-feel of native apps, we must also match their performance. This is where we focus our most ambitious efforts. For example, Facebook created Hermes, [a new JavaScript Engine built from scratch for React Native on Android](/blog/2019/07/17/hermes). Hermes significantly improves the start time of React Native apps. We are also working on major architectural changes that optimize the threading model and make React Native easier to interoperate with native code.

## Massive Scale

Hundreds of screens in the Facebook app are implemented with React Native. The Facebook app is used by billions of people on a huge range of devices. **This is why** **we invest in the most challenging problems at scale.**

Deploying React Native in our apps lets us identify problems that we wouldn’t see at a smaller scale. For example, Facebook focuses on improving performance across a broad spectrum of devices from the newest iPhone to many older generations of Android devices. This focus informs our architecture projects such as Hermes, Fabric, and TurboModules.

We have proven that React Native can scale to massive organizations too. When hundreds of developers are working on the same app, gradual adoption is a must. This is why we made sure that React Native can be adopted one screen at a time. Soon, we will be taking this one step further and enable migrating individual native views of an existing native screen to React Native.

A focus on massive scale means there are many things our team isn’t currently working on. For example, our team doesn’t drive the adoption of React Native in the industry. We also do not actively build solutions for problems that we don’t see at scale. We are proud that we have [many partners and core contributors](https://github.com/facebook/react-native/blob/master/ECOSYSTEM.md) that are able to focus on those important areas for the community.

## Developer Velocity

Great user experiences are created iteratively. **It should only take a few seconds to seeing the result of code changes** in a running app. React Native's architecture enables it to provide near-instant feedback during development.

We often hear from teams that adopting React Native significantly improved their development velocity. These teams find that the instant feedback during development makes it much easier to try different ideas and add extra polish when they don’t have to interrupt their coding session for every little change. When we make changes to React Native, we make sure to preserve this quality of the developer experience.

Instant feedback is not the only way that React Native improves developer velocity. Teams can leverage the fast-growing ecosystem of high quality open source packages. Teams can also share business logic between Android, iOS, and the web. This helps them ship updates faster and reduce organizational silos between platform teams.

## Every Platform

When we introduced React Native in 2014, we presented it with our motto “Learn once, write anywhere” — and we mean _anywhere_. **Developers should be able to reach as many people as possible without being limited by device model or operating system.**

React Native targets very different platforms including mobile, desktop, web, TV, VR, game consoles, and more. We want to enable rich experiences on each platform instead of requiring developers to build for the lowest common denominator. To accomplish this, we focus on supporting the unique features of each platform. This ranges from varying input mechanisms (e.g. touch, pen, mouse) to fundamentally different consumption experiences like 3D environments in VR.

This principle informed our decision to implement React Native’s new core architecture in cross-platform C++ to promote parity across platforms. We are also refining the public interface targeted at other platform maintainers like Microsoft with Windows and macOS. We strive to enable any platforms to support React Native.

## Declarative UI

We don’t believe in deploying the exact same user interface on every platform, we believe in **exposing each platform’s unique capabilities with the same declarative programming model**. Our declarative programming model is React.

In our experience, the unidirectional data flow popularized by React makes applications easier to understand. We prefer to express a screen as a composition of declarative components rather than imperatively managed views. React’s success on the web and the direction of the new native Android and iOS frameworks show that the industry has also embraced declarative UI.

React popularized declarative user interfaces. However, there remain many unsolved problems that React is uniquely positioned to solve. React Native will continue to build on top of the innovations of React and remain at the forefront of the declarative user interface movement.
