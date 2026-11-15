---
id: getting-started-without-a-framework
title: Get Started Without a Framework
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import PlatformSupport from '@site/src/theme/PlatformSupport';

import RemoveGlobalCLI from './\_remove-global-cli.md';

<PlatformSupport platforms={['android', 'ios', 'macOS', 'tv', 'watchOS', 'web', 'windows', 'visionOS']} />

If you have constraints that are not served well by a [Framework](/architecture/glossary#react-native-framework), or you prefer to write your own Framework, you can create a React Native app without using a Framework.

To do so, you'll first need to [set up your environment](set-up-your-environment). Once you're set up, continue with the steps below to create an application and start developing.

### Step 1: Creating a new application

<RemoveGlobalCLI />

You can use [React Native Community CLI](https://github.com/react-native-community/cli) to generate a new project. Let's create a new React Native project called "AwesomeProject":

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

This is not necessary if you are integrating React Native into an existing application, or if you've installed [Expo](https://docs.expo.dev/bare/installing-expo-modules/) in your project, or if you're adding Android support to an existing React Native project (see [Integration with Existing Apps](integration-with-existing-apps.md)). You can also use a third-party CLI to set up your React Native app, such as [Ignite CLI](https://github.com/infinitered/ignite).

:::info

If you are having trouble with iOS, try to reinstall the dependencies by running:

1. `cd ios` to navigate to the `ios` folder.
2. `bundle install` to install [Bundler](https://bundler.io/)
3. `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

:::

#### [Optional] Using a specific version or template

If you want to start a new project with a specific React Native version, you can use the `--version` argument:

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

You can also start a project with a custom React Native template with the `--template` argument, read more [here](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template).

### Step 2: Start Metro

[**Metro**](https://metrobundler.dev/) is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

:::note
If you're familiar with web development, Metro is similar to bundlers such as Vite and webpack, but is designed end-to-end for React Native. For instance, Metro uses [Babel](https://babel.dev/) to transform syntax such as JSX into executable JavaScript.
:::

### Step 3: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

If everything is set up correctly, you should see your new app running in your Android emulator shortly.

This is one way to run your app - you can also run it directly from within Android Studio.

:::tip
If you can't get this to work, see the [Troubleshooting](troubleshooting.md) page.
:::

### Step 4: Modifying your app

Now that you have successfully run the app, let's modify it.

- Open `App.tsx` in your text editor of choice and edit some lines.
- Press the <kbd>R</kbd> key twice or select `Reload` from the Dev Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd>) to see your changes!

### That's it!

Congratulations! You've successfully run and modified your first barebone React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](integration-with-existing-apps.md).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).
