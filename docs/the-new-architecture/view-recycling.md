# View Recycling

View recycling is a performance optimization technique used in mobile app development, particularly in list views or scrollable content. It involves reusing views that have gone off-screen instead of creating new ones. This reduces the overhead of view creation and destruction, leading to smoother scrolling and better memory management.

React Native pushes the technique of view recycling to the next level by applying it to every Native Component and by allowing developers to customize the recycling behavior of their components.

For user applications, view recycling is crucial because it enhances performance by minimizing the number of view objects that need to be created and garbage collected. This results in faster rendering times and a more responsive user interface, especially in applications with large lists or complex UI components.

## Implementing View Recycling in React Native's New Architecture

View Recycling is enabled by default in the New Architecture. However, when you are writing your custom Native Component, it is important that you keep the concept of view recycling in mind and you provide the proper implementation of the `prepareForRecycle` method so that React Native can properly reuse your component without the risk of showing stale data.

### Android



### iOS

On iOS, every Native Component conforms to the [`RCTComponentViewProtocol`](https://github.com/facebook/react-native/packages/react-native/React/Fabric/Mounting/RCTComponentViewProtocol.h) protocol which defines the [`prepareForRecycle` method](https://github.com/facebook/react-native/packages/react-native/React/Fabric/Mounting/RCTComponentViewProtocol.h#L112).

If your component contains a state that needs to reset, or is composed by native Apple components such as WKWebView and AVPlayer that needs some cleanup code when the view is removed from the hierarchy, the `prepareforRecycle` method is where you should write the cleanup code.

Examples of components that implements `prepareForRecycle` in React Native core are [RCTImageComponentView](https://github.com/facebook/react-native/packages/react-native/React/Fabric/Mounting/ComponentViews/Image/RCTImageComponentView.mm#L113-L118), and [RCTTextInputComponentView](https://github.com/facebook/react-native/packages/react-native/React/Fabric/Mounting/ComponentViews/ImageTextInput/RCTTextInputComponentView.mm#L338-L349)
