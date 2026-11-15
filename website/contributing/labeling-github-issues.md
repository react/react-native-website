---
title: Labeling GitHub Issues
---

Most of [our labels](https://github.com/react/react-native/issues/labels) have a prefix that provides a hint of their purpose.

You'll notice right away there's two label prefixes that dominate the list, [API:](https://github.com/react/react-native/labels?utf8=%E2%9C%93&q=API%3A), and [Component:](https://github.com/react/react-native/labels?utf8=%E2%9C%93&q=Component%3A).

These generally denote issues and pull requests related to an API or Component in the core React Native library. It helps us understand, at a glance, which components are in dire need of documentation or support.

These labels are added automatically by one of our [bots](/contributing/bots-reference), but feel free to adjust them if the bot mis-attributes an issue.

- The `p:` class of labels denote a company with whom with maintain some sort of [relationship](https://github.com/react/react-native/blob/main/ECOSYSTEM.md). These include Microsoft and Expo, for example. These are also added automatically by our tooling, based on the issue author.
- The `DX:` class of labels denote areas that deal with the developer experience. Use these for issues that negatively impact people who use React Native.
- The `Tool:` class of labels denote tooling. CocoaPods, Buck...
- The `Resolution:` labels help us communicate the status of an issue. Does it need more information? What needs to be done before it can move forward?
- The `Type:` labels are added by a bot, based on the changelog field in a pull request. They may also refer to types of issues that are not bug reports.
- The `Platform:` labels help us identify which development platform or target OS is affected by the issue.

When unsure of the meaning of a particular label, go to https://github.com/react/react-native/labels and look at the description field. We'll do our best to properly document these.

### Label Actions

Applying one of the following labels may result in a bot interaction. The goal of these is to ease aid in issue triage by providing a canned response when deemed necessary.

- Labels that instruct the bot to leave a comment with next steps:
  - `Needs: Issue Template`
  - `Needs: Environment Info`
  - `Needs: Verify on Latest Version`
  - `Needs: Repro`

- Labels that instruct the bot to close the issue after leaving an explanatory comment:
  - `Resolution: For Stack Overflow`
  - `Type: Question`
  - `Type: Docs`

- Labels that flat out close an issue with no comment:
  - `Type: Invalid`
