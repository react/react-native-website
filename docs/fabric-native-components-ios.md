---
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Now it's time to write some iOS platform code to be able to render the web view. The steps you need to follow are:

- Run Codegen.
- Write the code for the `RCTWebView`
- Register the `RCTWebView` in the application

### 1. Run Codegen

You can [manually run](the-new-architecture/codegen-cli) the Codegen, however it's simpler to use the application you're going to demo the component in to do this for you.

```bash
cd ios
bundle install
bundle exec pod install
```

Importantly you will see logging output from Codegen, which we're going to use in Xcode to build our WebView native component.

:::warning
You should be careful about committing generated code to your repository. Generated code is specific to each version of React Native. Use npm [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies) to restrict compatibility with version of React Native.
:::

### 3. Write the `RCTWebView`

We need to prepare your iOS project using Xcode by completing these **5 steps**:

1. Open the CocoaPods generated Xcode Workspace:

```bash
cd ios
open Demo.xcworkspace
```

<img className="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. Right click on app and select <code>New Group</code>, call the new group `WebView`.

<img className="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. In the `WebView` group, create <code>New</code>→<code>File from Template</code>.

<img className="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/fabric-native-components/3.webp" />

4. Use the <code>Objective-C File</code> template, and name it <code>RCTWebView</code>.

<img className="half-size" alt="Create an Objective-C RCTWebView class" src="/docs/assets/fabric-native-components/4.webp" />

5. Repeat step 4 and create a header file named `RCTWebView.h`.

6. Rename <code>RCTWebView.m</code> → <code>RCTWebView.mm</code> making it an Objective-C++ file.

```text title="Demo/ios"
Podfile
...
Demo
├── AppDelegate.swift
...
// highlight-start
├── RCTWebView.h
└── RCTWebView.mm
// highlight-end
```

After creating the header file and the implementation file, you can start implementing them.

This is the code for the header file, which declares the component interface.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```objc title="Demo/RCTWebView/RCTWebView.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

</TabItem>
<TabItem value="swift">

```swift title="Demo/RCTWebView/RCTWebView.swift"
import React
import UIKit

@objc(RCTWebView)
class RCTWebView: RCTViewComponentView {
    // You would declare native methods you'd want to access from the view here
}
```

</TabItem>
</Tabs>

This class defines an `RCTWebView` which extends the `RCTViewComponentView` class. This is the base class for all the native components and it is provided by React Native.

The code for the implementation file is the following:

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```objc title="Demo/RCTWebView/RCTWebView.mm"
#import "RCTWebView.h"

#import <react/renderer/components/AppSpec/ComponentDescriptors.h>
#import <react/renderer/components/AppSpec/EventEmitters.h>
#import <react/renderer/components/AppSpec/Props.h>
#import <react/renderer/components/AppSpec/RCTComponentViewHelpers.h>
// highlight-next-line
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
}

-(instancetype)init
{
  if(self = [super init]) {
    // highlight-start
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
    // highlight-end
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);

  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL) {
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    // highlight-start
    if ([self urlIsValid:newViewProps.sourceURL]) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
    // highlight-end
  }

  [super updateProps:props oldProps:oldProps];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;

}

#pragma mark - WKNavigationDelegate

// highlight-start
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};

    self.eventEmitter.onScriptLoaded(result);
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}
// highlight-end

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

@end
```

</TabItem>
<TabItem value="swift">

```swift title="Demo/RCTWebView/RCTWebView.swift"
import React
import WebKit

@objc(RCTWebView)
class RCTWebView: RCTViewComponentView {
    private var sourceURL: URL?
    private var webView: WKWebView!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupWebView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupWebView()
    }

    private func setupWebView() {
        // highlight-start
        webView = WKWebView()
        webView.navigationDelegate = self
        addSubview(webView)
        // highlight-end
    }

    override func updateProps(_ props: Props, oldProps: Props) {
        guard let oldViewProps = _props as? CustomWebViewProps,
              let newViewProps = props as? CustomWebViewProps else {
            super.updateProps(props, oldProps: oldProps)
            return
        }

        // Handle your props here
        if oldViewProps.sourceURL != newViewProps.sourceURL {
            let urlString = String(cString: newViewProps.sourceURL)
            sourceURL = URL(string: urlString)
            // highlight-start
            if urlIsValid(newViewProps.sourceURL) {
                if let url = sourceURL {
                    webView.load(URLRequest(url: url))
                }
            }
            // highlight-end
        }

        super.updateProps(props, oldProps: oldProps)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        webView.frame = bounds
    }

    // highlight-start
    private func urlIsValid(_ propString: String) -> Bool {
        if !propString.isEmpty && sourceURL == nil {
            let result = CustomWebViewEventEmitter.OnScriptLoaded(
                result: .error
            )
            eventEmitter.onScriptLoaded(result)
            return false
        }
        return true
    }

    private var eventEmitter: CustomWebViewEventEmitter {
        return _eventEmitter as! CustomWebViewEventEmitter
    }
    // highlight-end

    @objc static func componentDescriptorProvider() -> ComponentDescriptorProvider {
        return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>()
    }
}

// MARK: - WKNavigationDelegate
extension RCTWebView: WKNavigationDelegate {
    // highlight-start
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let result = CustomWebViewEventEmitter.OnScriptLoaded(
            result: .success
        )
        eventEmitter.onScriptLoaded(result)
    }
    // highlight-end
}
```

</TabItem>
</Tabs>

This code is written in Objective-C++ and contains various details:

- the `@interface` implements two protocols:
  - `RCTCustomWebViewViewProtocol`, generated by Codegen;
  - `WKNavigationDelegate`, provided by the WebKit framework to handle the web view navigation events;
- the `init` method that instantiates the `WKWebView`, adds it to the subviews and that sets the `navigationDelegate`;
- the `updateProps` method that is called by React Native when the component's props change;
- the `layoutSubviews` method that describes how the custom view needs to be laid out;
- the `webView:didFinishNavigation:` method that lets you handle what to do when the `WKWebView` finishes loading the page;
- the `urlIsValid:(std::string)propString` method that checks whether the URL received as prop is valid;
- the `eventEmitter` method which is a utility to retrieve a strongly typed `eventEmitter` instance
- the `componentDescriptorProvider` which returns the `ComponentDescriptor` generated by Codegen;

#### Add WebKit framework

:::note
This step is only required because we are creating a Web view. Web components on iOS needs to be linked against the WebKit framework provided by Apple. If your component doesn't need to access web-specific features, you can skip this step.
:::

A web view requires access to some features that Apple provides through one of the frameworks shipped with Xcode and the devices: WebKit.
You can see it in the native code by the `#import <WebKit/WebKit.h>` line added in the `RCTWebView.mm`.

To link the WebKit framework in your app, follow these steps:

1. In Xcode, Click on your project
2. Select the app target
3. Select the General tab
4. Scroll down until you find the _"Frameworks, Libraries, and Embedded Contents"_ section, and press the `+` button

<img className="half-size" alt="Add webkit framework to your app 1" src="/docs/assets/AddWebKitFramework1.png" />

5. In the search bar, filter for WebKit
6. Select the WebKit framework
7. Click on Add.

<img className="half-size" alt="Add webkit framework to your app 2" src="/docs/assets/AddWebKitFramework2.png" />
