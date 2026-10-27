---
id: native-modules-setup
title: Native Modules NPM Package Setup
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

Native modules are usually distributed as npm packages, except that on top of the usual JavaScript they will include some native code per platform. To understand more about npm packages you may find [this guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) useful.

To get set up with the basic project structure for a native module we will use the community tool called [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create). You can go ahead further and dive deep into how that library works, but for our needs we will only execute the basic script:

```shell
npx create-react-native-library@latest react-native-awesome-module
```

Where `react-native-awesome-module` is the name you would like for the new module. After doing this you will navigate into `react-native-awesome-module` folder and bootstrap the example project by running:

```shell
yarn
```

When the bootstrap is done, you will be able to start the example app by executing one of the following commands:

```shell
# Android app
yarn example android
# iOS app
yarn example ios
```

When all steps above are done, you will be able to continue with [Android Native Modules](native-modules-android) or [iOS Native Modules](native-modules-ios) guides to add in some code.
