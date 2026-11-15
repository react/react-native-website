---
id: navigation
title: Navigating Between Screens
---

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by what is known as a navigator.

This guide covers the various navigation components available in React Native. If you are getting started with navigation, you will probably want to use [React Navigation](navigation.md#react-navigation). React Navigation provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS.

If you're integrating React Native into an app that already manages navigation natively, or looking for an alternative to React Navigation, the following library provides native navigation on both platforms: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

The community solution to navigation is a standalone library that allows developers to set up the screens of an app with a few lines of code.

### Starter template

If you're starting a new project, you can use the React Navigation template to quickly set up a new project with [Expo](https://expo.dev/):

```shell
npx create-expo-app@latest --template react-navigation/template
```

See the project's `README.md` for more information on how to get started.

### Installation and setup

First, you need to install them in your project:

```shell
npm install @react-navigation/native @react-navigation/native-stack
```

Next, install the required peer dependencies. You need to run different commands depending on whether your project is an Expo managed project or a bare React Native project.

- If you have an Expo managed project, install the dependencies with `expo`:

  ```shell
  npx expo install react-native-screens react-native-safe-area-context
  ```

- If you have a bare React Native project, install the dependencies with `npm`:

  ```shell
  npm install react-native-screens react-native-safe-area-context
  ```

  For iOS with bare React Native project, make sure you have [CocoaPods](https://cocoapods.org/) installed. Then install the pods to complete the installation:

  ```shell
  cd ios
  pod install
  cd ..
  ```

Once you've installed and configured the dependencies, you can move on to setting up your project to use React Navigation.

When using React Navigation, you configure [navigators](https://reactnavigation.org/docs/glossary-of-terms#navigator) in your app. Navigators handle the transition between screens in your app and provide UI such as header, tab bar etc.

Now you are ready to build and run your app on the device/simulator.

### Usage

Now you can create an app with a home screen and a profile screen:

```tsx title="App.tsx"
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

In this example, `RootStack` is a navigator with 2 screens (`Home` and `Profile`), defined in the `screens` property in `createNativeStackNavigator`. Similarly, you can define as many screens as you like.

You can specify options such as the screen title for each screen in the `options` property of each screen. Each screen definition also needs a `screen` property that is a React component or another navigator.

Inside each screen component, you can use the `useNavigation` hook to get the `navigation` object, which has various methods to link to other screens. For example, you can use `navigation.navigate` to go to the `Profile` screen:

```tsx title="HomeScreen.tsx"
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}
```

```tsx title="ProfileScreen.tsx"
export default function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

This `native-stack` navigator uses the native APIs: `UINavigationController` on iOS and `Fragment` on Android so that navigation built with `createNativeStackNavigator` will behave the same and have the similar performance characteristics as apps built natively on top of those APIs.

React Navigation also has packages for different kind of navigators such as tabs and drawer. You can use them to implement various patterns in your app.

For a complete intro to React Navigation, follow the [React Navigation Getting Started Guide](https://reactnavigation.org/docs/getting-started).
