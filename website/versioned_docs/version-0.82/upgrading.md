---
id: upgrading
title: Upgrading to new versions
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Upgrading to new versions of React Native will give you access to more APIs, views, developer tools and other goodies. Upgrading requires a small amount of effort, but we try to make it straightforward for you.

## Expo projects

Upgrading your Expo project to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions in your `package.json` file. Expo recommends upgrading SDK versions incrementally, one at a time. Doing so will help you pinpoint breakages and issues that arise during the upgrade process. See the [Upgrading Expo SDK Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) for up-to-date information about upgrading your project.

## React Native projects

Because typical React Native projects are essentially made up of an Android project, an iOS project, and a JavaScript project, upgrading can be rather tricky. The [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) is a web tool to help you out when upgrading your apps by providing the full set of changes happening between any two versions. It also shows comments on specific files to help understanding why that change is needed.

### 1. Select the versions

You first need to select from and to which version you wish to upgrade, by default the latest major versions are selected. After selecting you can click the button "Show me how to upgrade".

💡 Major updates will show a "useful content" section on the top with links to help you out when upgrading.

### 2. Upgrade dependencies

The first file that is shown is the `package.json`, it's good to update the dependencies that are showing in there. For example, if `react-native` and `react` appears as changes then you can install it in your project by running following commands:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```

</TabItem>
<TabItem value="yarn">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

</TabItem>
</Tabs>

#### Dependency compatibility and the New Architecture

When upgrading to React Native 0.76 or newer, the New Architecture is enabled by default. A common question when upgrading dependencies is whether all third-party libraries in your project must explicitly support the New Architecture before you can upgrade.

**You do not need all your dependencies to support the New Architecture before upgrading.**

React Native includes an automatic **Interop Layer** enabled by default. The Interop Layer allows legacy Native Modules and legacy Native Components to continue functioning on the New Architecture without requiring updates from library authors or immediate changes in application code.

##### Checking library compatibility

To check if the community libraries in your project support the New Architecture:

- Search for the package on [React Native Directory](https://reactnative.directory/). Libraries compatible with the New Architecture display a **New Architecture** badge indicating support for Turbo Native Modules and Fabric.
- Check the library's repository and release notes for React Native 0.76+ compatibility or New Architecture migration guides.

##### Handling incompatible dependencies

While the Interop Layer supports the majority of legacy libraries, some edge cases (such as libraries that manipulate custom native shadow nodes directly or rely on deprecated internal APIs) might encounter issues:

- Check if an updated version of the library is available that officially supports the New Architecture.
- If the library is unmaintained, search for maintained community alternatives on [React Native Directory](https://reactnative.directory/).
- If an essential dependency cannot yet run on the New Architecture and has no replacement, you can temporarily [opt out of the New Architecture](/architecture/landing-page#should-i-use-the-new-architecture-today) for Android and iOS until the library is updated.

### 3. Upgrade your project files

The new release may contain updates to other files that are generated when you run `npx react-native init`, those files are listed after the `package.json` in the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) page. If there aren't other changes then you only need to rebuild the project to continue developing. In case there are changes you need to manually apply them into your project.

### Troubleshooting

#### I have done all the changes but my app is still using an old version

These sort of errors are usually related to caching, it's recommended to install [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) to clear all your project's cache and then you can run it again.
