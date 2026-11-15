---
id: getting-started
title: Introduction
description: This helpful guide lays out the prerequisites for learning React Native, using these docs, and setting up your environment.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  Welcome to the very start of your React Native journey! If you're looking for getting started instructions, they've moved to <a href="environment-setup">their own section</a>. Continue reading for an introduction to the documentation, Native Components, React, and more!
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

Many different kinds of people use React Native: from advanced iOS developers to React beginners, to people getting started programming for the first time in their career. These docs were written for all learners, no matter their experience level or background.

## How to use these docs

You can start here and read through these docs linearly like a book; or you can read the specific sections you need. Already familiar with React? You can skip [that section](intro-react)—or read it for a light refresher.

## Prerequisites

To work with React Native, you will need to have an understanding of JavaScript fundamentals. If you’re new to JavaScript or need a refresher, you can [dive in](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [brush up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) at Mozilla Developer Network.

> While we do our best to assume no prior knowledge of React, Android, or iOS development, these are valuable topics of study for the aspiring React Native developer. Where sensible, we have linked to resources and articles that go more in depth.

## Interactive examples

This introduction lets you get started immediately in your browser with interactive examples like this one:

```SnackPlayer name=Hello%20World
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```

The above is a Snack Player. It’s a handy tool created by Expo to embed and run React Native projects and share how they render in platforms like Android and iOS. The code is live and editable, so you can play directly with it in your browser. Go ahead and try changing the "Try editing me!" text above to "Hello, world!"

> Optionally, if you want to set up a local development environment, [you can follow our guide to setting up your environment on your local machine](set-up-your-environment) and paste the code examples into your project. (If you are a web developer, you may already have a local environment set up for mobile browser testing!)

## Developer Notes

People from many different development backgrounds are learning React Native. You may have experience with a range of technologies, from web to Android to iOS and more. We try to write for developers from all backgrounds. Sometimes we provide explanations specific to one platform or another like so:

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android","ios","web"])}>

<TabItem value="android">

> Android developers may be familiar with this concept.

</TabItem>
<TabItem value="ios">

> iOS developers may be familiar with this concept.

</TabItem>
<TabItem value="web">

> Web developers may be familiar with this concept.

</TabItem>
</Tabs>

## Formatting

Menu paths are written in bold and use carets to navigate submenus. Example: **Android Studio > Preferences**

---

Now that you know how this guide works, it's time to get to know the foundation of React Native: [Native Components](intro-react-native-components.md).
