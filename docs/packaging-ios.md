# Packaging React Native Modules as `.framework` for iOS

React Native isn't limited to building standalone applications. Many developers aim to create reusable modules or components that can be incorporated into existing or new native iOS projects. A practical way to distribute and embed these modules is by packaging them as `.framework` files. This guide will walk you through packaging your React Native module as a `.framework` for iOS.

## Why Package React Native?

When incorporating React Native modules into a native app, it's frequently necessary to bring in JavaScript-specific tooling, such as `yarn`, `metro-bundler`, `jest`, and other related tools. However, this can create challenges, as it might raise the entry barrier for native development teams. Furthermore, it's not uncommon for React Native teams to operate independently from native teams. In situations like these, dividing development across separate repositories can be beneficial. This is where packaging becomes invaluable.

## Key Concepts

1. **.framework**: This is a directory structure in iOS and macOS development that packages a shared library along with necessary resources, such as headers, images, and localized strings. Essentially, it bundles related dynamic shared libraries and their associated resources into a single package.

2. **Integrating with Existing Apps**: Packaging React Native Modules as a `.framework` file is often done to integrate with existing apps. Familiarize yourself with the [official guide on these integrations](https://reactnative.dev/docs/integration-with-existing-apps?language=objc).

3. **Native Modules**: To allow native iOS to access React Native functionality, we use Native Modules. If you're unfamiliar with native modules, follow [this guide](https://reactnative.dev/docs/native-modules-ios).

4. **Linking Dependencies**: It's crucial to link all dependencies of the React Native module accurately. This ensures that when the module is activated from a native app, it operates with all the required code and resources.

## Prerequisites

1. Follow the [standard native environment setup](https://reactnative.dev/docs/environment-setup?guide=native).

## Creating a 2048 High Scores Package

In this guide, you'll craft a High Scores screen, similar to the one made in the [guide to integrate with native apps](https://reactnative.dev/docs/integration-with-existing-apps?language=objc). You'll package it as a standalone `.xcframework` file. Afterward, you can use it directly in a native app like any native library, eliminating the need for installing any JavaScript dependencies.

### Starting a New React Native App

Begin by generating a fresh React Native project:

```bash
npx react-native init HighScores2048
```

Remove the auto-generated `App.tsx` and craft a new `HighScores.tsx` that holds our screen's implementation:

```jsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  scores: {
    name: string;
    value: number;
  }[];
};

const RNHighScores = ({scores}: Props) => {
  const contents = scores.map(score => (
    <Text key={score.name}>
      {score.name}:{score.value}
      {'\n'}
    </Text>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.highScoresTitle}>2048 High Scores!</Text>
      <Text style={styles.scores}>{contents}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default RNHighScores;
```

Adjust the export in the `index.js` file using the `AppRegistry`. This serves as our React component tree's entry point. You can register several components with `AppRegistry` and link them to the native UI tree via `RCTRootView`.

```js
import {AppRegistry} from 'react-native';
import HighScores from './HighScores';

AppRegistry.registerComponent('HighScores', () => HighScores);
```

Finally, modify the code in `AppDelegate.mm` so it references the correct component. Also, feed mocked data to the view for development testing.

```objc
... (no changes here)
```

Run the app to verify its functionality. At this stage, you should see the described screen.

![Screenshot](/docs/assets/PackagingPlaygroundApp.png)

### Setting Up a New Package Target

Now, create a separate Xcode target to build our `.xcframework` package. Open the `ios/HighScores2048.workspace` file. In Xcode, navigate to the targets section and select **Add new target (+)**.

![Screenshot](/docs/assets/PackagingAddNewTarget.png)

From the options, pick `Framework` and name it **HighScore2048Module**. Ensure the **Embed in Application** option remains off.

![Screenshot](/docs/assets/PackagingCreateNewTarget.png)

If done correctly, you'll see a `HighScore2048Module` folder on the left sidebar and a new yellow suitcase icon in the targets section.

![Screenshot](/docs/assets/PackagingCreatedNewTarget.png)

Add a new target to our `Podfile` within the `HighScores2048` target and inherit the configuration:

```rb
target 'HighScores2048' do
  config = use_native_modules!

  ...
  target 'HighScores2048Module' do
    inherit! :complete
  end
  ...
```

Run `pod install` to ensure everything functions correctly.

> NOTE: If you see a warning regarding the new target in the console after adding it, you can organize the `HighScores2048Module` target outside of `HighScores2048` and incorporate the same Pods the main target uses.

Lastly, copy the `Build Phase` responsible for building the JavaScript code and assets to the new target. Navigate to `HighScores2048` target's build phases, copy the `Build React Native code and images` contents. Switch to the `HighScores2048Module` target, add a new `Run Script` phase, and paste the bash script.

![Screenshot](/docs/assets/PackagingBuildPhase.png)

### Exposing a Native View

This section will detail creating a public native interface from our library. We'll start by constructing new header (`HighScoresRootView.h`) and implementation (`HighScoresRootView.m`) files within the `HighScores2048Module` directory.

![Screenshot](/docs/assets/PackagingNativeFiles.png)

The header file will extend a regular `UIView` and define a constructor to receive initial properties for the React View.

```objc
#import <UIKit/UIKit.h>

@interface HighScoresRootView : UIView

- (id)initWithFrame:(CGRect)frame initialProperties:(NSDictionary*)initialProperties;

@end
```

In the implementation file, we'll establish the constructor, craft the UIView, and embed our React View as a subview.

```objc
#import <Foundation/Foundation.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

#import "HighScoresRootView.h"

@interface HighScoresRootView()

@property (strong, nonatomic) RCTRootView *reactView;

@end

@implementation HighScoresRootView

- (id)initWithFrame:(CGRect)frame initialProperties:(NSDictionary*)initialProperties
{
  self = [super initWithFrame:frame];
  if (self) {
    _reactView = [[RCTRootView alloc] initWithBundleURL: self.jsCodeLocation
                                      moduleName: @"HighScores"
                                      initialProperties: initialProperties
                                      launchOptions: nil];
    _reactView.frame = self.bounds;
    [self addSubview:_reactView];
  }
  
  return self;
}

- (NSURL *)jsCodeLocation {
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  #else
    return [[NSBundle bundleForClass:[self class]] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
}

@end
```

> NOTE: We follow this pattern because we cannot import React headers into the header file, which will be publicly exposed later on.

Now, navigate to `Build phases > Headers`, add our recently created header, and move it to the `Public` section.

![Screenshot](/docs/assets/PackagingExposeHeader.png)

Wrap up by exposing the public header inside the umbrella header. Open `HighScores2048Module.h` and insert the following:

```objc
#import <HighScores2048Module/HighScoresRootView.h>
```

### Building the Framework

Everything's in place! Let's construct the framework. In Xcode's top section, select the appropriate target and destination, then hit the `Start` button.

![Screenshot](/docs/assets/PackagingRun.png)

> NOTE: This process will produce a binary compatible with either the Simulator or a real device. If you wish to craft a library supporting both, refer to Apple's guide on creating an [XCFramework bundle](https://developer.apple.com/documentation/xcode/creating-a-multi-platform-binary-framework-bundle).

Now, in the Products section, you'll find a `.framework` file. You can integrate this into an existing native application using your preferred method (manually, Cocoapods, Swift Package Manager, etc.).

![Screenshot](/docs/assets/PackagingProduct.png)

### Communication Between the JS Layer and the Native App

The communication between the JS layer and native apps is managed similarly to standard React Native apps. Simply use [native modules](https://reactnative.dev/docs/native-modules-ios) or modify the `appProperties` field on the root view.

