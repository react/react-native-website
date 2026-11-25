---
title: Introducing new iOS WebViews
author: Ramanpreet Nara
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/rsnara'
tags: [engineering]
---

For a long time now, Apple has discouraged using UIWebViews in favor of WKWebView. In iOS 12, which will be released in the upcoming months, [UIWebViews will be formally deprecated](https://developer.apple.com/videos/play/wwdc2018/234/?time=104). React Native's iOS WebView implementation relies heavily on the UIWebView class. Therefore, in light of these developments, we've built a new native iOS backend to the WebView React Native component that uses WKWebView.

The tail end of these changes were landed in [this commit](https://github.com/react/react-native/commit/33b353c97c31190439a22febbd3d2a9ead49d3c9), and will become available in the 0.57 release.

To opt into this new implementation, please use the [`useWebKit`](https://reactnative.dev/docs/0.63/webview#usewebkit) prop:

```js
<WebView
  useWebKit={true}
  source={{url: 'https://www.google.com'}}
/>
```

## Improvements

`UIWebView` had no legitimate way to facilitate communication between the JavaScript running in the WebView, and React Native. When messages were sent from the WebView, we relied on a hack to deliver them to React Native. Succinctly, we encoded the message data into a url with a special scheme, and navigated the WebView to it. On the native side, we intercepted and cancelled this navigation, parsed the data from the url, and finally called into React Native. This implementation was error prone and insecure. I'm glad to announce that we've leveraged `WKWebView` features to completely replace it.

Other benefits of WKWebView over UIWebView include faster JavaScript execution, and a multi-process architecture. Please see this [2014 WWDC](https://developer.apple.com/videos/play/wwdc2014/206) for more details.

## Caveats

If your components use the following props, then you may experience problems when switching to WKWebView. For the time being, we suggest that you avoid using these props:

**Inconsistent behavior:**

`automaticallyAdjustContentInsets` and `contentInsets` ([commit](https://github.com/react/react-native/commit/bacfd9297657569006bab2b1f024ad1f289b1b27))

When you add contentInsets to a `WKWebView`, it doesn't change the `WKWebView`'s viewport. The viewport remains the same size as the frame. With `UIWebView`, the viewport size actually changes (gets smaller, if the content insets are positive).

`backgroundColor` ([commit](https://github.com/react/react-native/commit/215fa14efc2a817c7e038075163491c8d21526fd))

With the new iOS implementation of WebView, there's a chance that your background color will flicker into view if you use this property. Furthermore, `WKWebView` renders transparent backgrounds differently from `UIWebview`. Please look at the commit description for more details.

**Not supported:**

`scalesPageToFit` ([commit](https://github.com/react/react-native/commit/b18fddadfeae5512690a0a059a4fa80c864f43a3))

WKWebView didn't support the scalesPageToFit prop, so we couldn't implement this on the WebView React Native component.
