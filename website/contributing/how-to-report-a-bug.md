---
title: How to Report a Bug
---

Reporting a bug for React Native is one of the best way to start contributing to the project. We use [GitHub issues](https://github.com/react/react-native/issues) as the main channel for handling new bug reports.

Before opening a new bug, please [search if the bug already exists](https://github.com/react/react-native/issues?q=sort%3Aupdated-desc%20is%3Aissue) in our issue tracker. Most of the time, that's the fastest way to find a response as someone else already experienced the same problem.

If you can't find your bug in the issue tracker, you can open a new one. Once you create a new issue, make sure you:

- Add a description of the problem.
- Follow the instructions on the [issue template](https://github.com/react/react-native/issues/new?template=bug_report.yml).
- Add the React Native version you're using.
- Add the output of the `npx @react-native-community/cli info` command.
- Add screenshots and videos of the problem if applicable.

All the bug reports should also include a **reproducer**: the code necessary for us to understand what is going on and help us with the debugging.

:::warning

Due to high number of issues we receive, reproducers are **mandatory**. Issues without reproducer cannot be investigated and will most likely be closed.

:::

## Providing a Reproducers

The goal of a reproducer is to provide a way to _reproduce_ your bug. Without a reproducer, we won't be able to understand the bug, and we also won't be able to fix it.

The reproducer should be **minimal**: having as little dependencies as possible (ideally none other than `react-native`) as this will help us better isolate the bug.
When someone on GitHub is asking for a reproducer, they're **not** asking for all of your source code.

You need instead to create a **minimal** project that reproduces the same crash/bug/issue you're reporting.

This process is crucial, as often issues are actually solved by creating a reproducer. By creating a reproducer, it will be easier to understand if the issue is related to your specific setup or if it's actually a bug inside React Native.

Due to the amount of traffic we have on React Native, we can accept only one of those as a valid reproducer:

1. For majority of bugs: send us a Pull Request with the [RNTesterPlayground.js](https://github.com/react/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js) edited to reproduce your bug.
2. If your bug is UI related: a [Snack](https://snack.expo.dev).
3. If your bug is build/upgrade related: a project using our [Reproducer Template](https://github.com/react-native-community/reproducer-react-native/generate).

### RNTesterPlayground.js

The best way for you to provide a reproducer is to open a Pull Request against React Native that edits the [`RNTesterPlayground.js`](https://github.com/react/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js) file.

:::tip

This reproducer will run your code against `main` of `react-native` and is the **fastest** way we have to investigate and fix your bugs.

:::

The `RNTesterPlayground.js` file is located inside the RN-Tester application, our reference App. You can read more about it how it works and how to build it inside its [dedicated README file](https://github.com/react/react-native/blob/main/packages/rn-tester/README.md).

An example of such type of reproducer is here: [Reproduce modal layout issues #50704](https://github.com/react/react-native/pull/50704/).

Once you edit the `RNTesterPlayground.js`, you'll be able to see your code running inside the **Playground** Tab of RNTester:

![Step one](/docs/assets/RNTesterPlayground.png)

### Expo Snack

For most UI related bugs, you reproduce them using an [Expo Snack](https://snack.expo.dev/).

With Expo Snack, you can run React Native code in your browser, and see it rendering right away.

Once you are able to reproduce your issue in an Expo Snack, click the **Save** button to get a shareble link to attach to your issue report

### Reproducer Template

For most build-related bugs instead, you should reproduce them using the [community reproducer template](https://github.com/react-native-community/reproducer-react-native).

This template creates a small project that runs with the React Native Community CLI and that can be used to showcase build issues.

The template also comes with its own CI already set up with GitHub Actions, as this will help spotting any build issues you might be having.

To use this template:

1. Click the [Use this template](https://github.com/new?template_name=reproducer-react-native&template_owner=react-native-community) button on GitHub to create a new project starting from the template.
2. Clone your newly created repository locally.
3. Apply the modifications to reproduce your issue.
4. Attach your repository link to the new bug report you're creating.
