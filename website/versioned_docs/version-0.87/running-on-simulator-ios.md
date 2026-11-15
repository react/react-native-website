---
id: running-on-simulator-ios
title: Running On Simulator
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Starting the simulator

Once you have your React Native project initialized, you can run the following command inside the newly created project directory.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

If everything is set up correctly, you should see your new app running in the iOS Simulator shortly.

## Specifying a device

You can specify the device the simulator should run with the `--simulator` flag, followed by the device name as a string. The default is `"iPhone 14"`. If you wish to run your app on an iPhone SE (3rd generation), run the following command:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone SE (3rd generation)"
```

</TabItem>
</Tabs>

The device names correspond to the list of devices available in Xcode. You can check your available devices by running `xcrun simctl list devices` from the console.

### Specifying a version of device

If you have multiple iOS versions installed, you also need to specify its appropriate version. E.g. To run your app on an iPhone 14 Pro (16.0) run the following command:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

</TabItem>
</Tabs>

## Specifying an UDID

You can specify the device UDID returned from `xcrun simctl list devices` command. E.g. To run your app with UDID `AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA` run the following command:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
</Tabs>
