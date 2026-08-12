---
id: troubleshooting
title: Troubleshooting
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

These are some common issues you may run into while setting up React Native. If you encounter something that is not listed here, try [searching for the issue in GitHub](https://github.com/facebook/react-native/issues/).

### Port already in use

The [Metro bundler][metro] runs on port 8081. If another process is already using that port, you can either terminate that process, or change the port that the bundler uses.

#### Terminating a process on port 8081

Run the following command to find the id for the process that is listening on port 8081:

```shell
sudo lsof -i :8081
```

Then run the following to terminate the process:

```shell
kill -9 <PID>
```

On Windows you can find the process using port 8081 using [Resource Monitor](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) and stop it using Task Manager.

#### Using a port other than 8081

You can configure the bundler to use a port other than 8081 by using the `port` parameter, from the root of your project run:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start -- --port=8088
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start --port 8088
```

</TabItem>
</Tabs>

You will also need to update your applications to load the JavaScript bundle from the new port. If running on device from Xcode, you can do this by updating occurrences of `8081` to your chosen port in the `ios/__App_Name__.xcodeproj/project.pbxproj` file.

### NPM locking error

If you encounter an error such as `npm WARN locking Error: EACCES` while using the React Native CLI, try running the following:

```shell
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Missing libraries for React

If you added React Native manually to your project, make sure you have included all the relevant dependencies that you are using, like `RCTText.xcodeproj`, `RCTImage.xcodeproj`. Next, the binaries built by these dependencies have to be linked to your app binary. Use the `Linked Frameworks and Binaries` section in the Xcode project settings. More detailed steps are here: [Linking Libraries](linking-libraries-ios.md#content).

If you are using CocoaPods, verify that you have added React along with the subspecs to the `Podfile`. For example, if you were using the `<Text />`, `<Image />` and `fetch()` APIs, you would need to add these in your `Podfile`:

```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

Next, make sure you have run `pod install` and that a `Pods/` directory has been created in your project with React installed. CocoaPods will instruct you to use the generated `.xcworkspace` file henceforth to be able to use these installed dependencies.

#### React Native does not compile when being used as a CocoaPod

There is a CocoaPods plugin called [cocoapods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native) which handles any potential post-fixing of the source code due to differences when using a dependency manager.

#### Argument list too long: recursive header expansion failed

In the project's build settings, `User Search Header Paths` and `Header Search Paths` are two configs that specify where Xcode should look for `#import` header files specified in the code. For Pods, CocoaPods uses a default array of specific folders to look in. Verify that this particular config is not overwritten, and that none of the folders configured are too large. If one of the folders is a large folder, Xcode will attempt to recursively search the entire directory and throw above error at some point.

To revert the `User Search Header Paths` and `Header Search Paths` build settings to their defaults set by CocoaPods - select the entry in the Build Settings panel, and hit delete. It will remove the custom override and return to the CocoaPod defaults.

### No transports available

React Native implements a polyfill for WebSockets. These [polyfills](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js) are initialized as part of the react-native module that you include in your application through `import React from 'react'`. If you load another module that requires WebSockets, such as [Firebase](https://github.com/facebook/react-native/issues/3645), be sure to load/require it after react-native:

```
import Firebase from 'firebase';
```

## Shell Command Unresponsive Exception

If you encounter a ShellCommandUnresponsiveException exception such as:

```
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

Restart the ADB server by running the following commands in your terminal:

```
adb kill-server
adb start-server
```

## Unable to start react-native package manager (on Linux)

### Case 1: Error "code":"ENOSPC","errno":"ENOSPC"

Issue caused by the number of directories [inotify](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers) (used by watchman on Linux) can monitor. To solve it, run this command in your terminal window

```shell
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Error: spawnSync ./gradlew EACCES

If you run into issue where executing `npm run android` or `yarn android` on macOS throws the above error, try to run `sudo chmod +x android/gradlew` command to make `gradlew` files into executable.

[metro]: https://metrobundler.dev/
