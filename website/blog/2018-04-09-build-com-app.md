---
title: Built with React Native - The Build.com app
author: Garrett McCullough
authorTitle: Senior Mobile Engineer
authorURL: 'https://twitter.com/gwmccull'
authorImageURL: 'https://github.com/gwmccull.png'
authorTwitter: gwmccull
tags: [showcase]
---

[Build.com](https://www.build.com/), headquartered in Chico, California, is one of the largest online retailers for home improvement items. The team has had a strong web-centric business for 18 years and began thinking about a mobile App in 2015. Building unique Android and iOS apps wasn’t practical due to our small team and limited native experience. Instead, we decided to take a risk on the very new React Native framework. Our initial commit was on August 12, 2015 using React Native v0.8.0! We were live in both App Stores on October 15, 2016. Over the last two years, we’ve continued to upgrade and expand the app. We are currently on React Native version 0.53.0.

You can check out the app at [https://www.build.com/app](https://www.build.com/app).

<p align="center">
  <img src="/blog/assets/build-com-blog-image.jpg" />
</p>

## Features

Our app is full featured and includes everything that you’d expect from an e-commerce app: product listings, search and sorting, the ability to configure complex products, favorites, etc. We accept standard credit card payment methods as well as PayPal, and Apple Pay for our iOS users.

A few standout features you might not expect include:

1. 3D models available for around 40 products with 90 finishes
2. Augmented Reality (AR) to allow the user to see how lights and faucets will look in their home at 98% size accuracy. The Build.com React Native App is featured in the Apple App Store for AR Shopping! AR is now available for Android and iOS!
3. Collaborative project management features that allow people to put together shopping lists for the different phases of their project and collaborate around selection

We’re working on many new and exciting features that will continue to improve our app experience including the next phase of Immersive Shopping with AR.

## Our Development Workflow

Build.com allows each dev to choose the tools that best suit them.

- IDEs include Atom, IntelliJ, VS Code, Sublime, Eclipse, etc.
- For Unit testing, developers are responsible for creating Jest unit tests for any new components and we’re working to increase the coverage of older parts of the app using `jest-coverage-ratchet`.
- We use Jenkins to build out our beta and release candidates. This process works well for us but still requires significant work to create the release notes and other artifacts.
- Integration Testing include a shared pool of testers that work across desktop, mobile and web. Our automation engineer is building out our suite of automated integration tests using Java and Appium.
- Other parts of the workflow include a detailed eslint configuration, custom rules that enforce properties needed for testing, and pre-push hooks that block offending changes.

## Libraries Used in the App

The Build.com app relies on a number of common open source libraries including: Redux, Moment, Numeral, Enzyme and a bunch of React Native bridge modules. We also use a number of forked open source libraries; forked either because they were abandoned or because we needed custom features. A quick count shows around 115 JavaScript and native dependencies. We would like to explore tools that remove unused libraries.

We're in the process of adding static typing via TypeScript and looking into optional chaining. These features could help us with solving a couple classes of bugs that we still see:

- Data that is the wrong type
- Data that is undefined because an object didn’t contain what we expected

## Open Source Contributions

Since we rely so heavily on open source, our team is committed to contributing back to the community. Build.com allows the team to open source libraries that we've built and encourages us contribute back to the libraries that we use.

We’ve released and maintained a number of React Native libraries:

- `react-native-polyfill`
- `react-native-simple-store`
- `react-native-contact-picker`

We have also contributed to a long list of libraries including: React and React Native, `react-native-schemes-manager`, `react-native-swipeable`, `react-native-gallery`, `react-native-view-transformer`, `react-native-navigation`.

## Our Journey

We’ve seen a lot of growth in React Native and the ecosystem in the past couple years. Early on, it seemed that every version of React Native would fix some bugs but introduce several more. For example, Remote JS Debugging was broken on Android for several months. Thankfully, things became much more stable in 2017.

### Navigation Libraries

One of our big recurring challenges has been with navigation libraries. For a long time, we were using Expo’s ex-nav library. It worked well for us but it was eventually deprecated. However, we were in heavy feature development at the time so taking time to change out a navigation library wasn’t feasible. That meant we had to fork the library and patch it to support React 16 and the iPhone X. Eventually, we were able to migrate to [`react-native-navigation`](https://github.com/wix/react-native-navigation) and hopefully that will see continued support.

### Bridge Modules

Another big challenge has been with bridge modules. When we first started, a lot of critical bridges were missing. One of my teammates wrote `react-native-contact-picker` because we needed access to the Android contact picker in our app. We’ve also seen a lot of bridges that were broken by changes within React Native. For example, there was a breaking change within React Native v40 and when we upgraded our app, I had to submit PRs to fix 3 or 4 libraries that had not yet been updated.

## Looking Forward

As React Native continues to grow, our wishlist to our community include:

- Stabilize and improve the navigation libraries
- Maintain support for libraries in the React Native ecosystem
- Improve the experience for adding native libraries and bridge modules to a project

Companies and individuals in the React Native community have been great about volunteering their time and effort to improve the tools that we all use. If you haven’t gotten involved in open source, I hope you’ll take a look at improving the code or documentation for some of the libraries that you use. There are a lot of articles to help you get started and it may be a lot easier than you think!
