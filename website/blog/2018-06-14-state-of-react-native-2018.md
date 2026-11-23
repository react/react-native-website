---
title: State of React Native 2018
author: Sophie Alpert
authorTitle: Engineering Manager on React at Facebook
authorURL: 'https://github.com/sophiebits'
authorImageURL: 'https://avatars2.githubusercontent.com/u/6820?s=460&v=4'
authorTwitter: sophiebits
tags: [engineering]
---

It's been a while since we last published a status update about React Native.

At Facebook, we're using React Native more than ever and for many important projects. One of our most popular products is Marketplace, one of the top-level tabs in our app which is used by 800 million people each month. Since its creation in 2015, all of Marketplace has been built with React Native, including over a hundred full-screen views throughout different parts of the app.

We're also using React Native for many new parts of the app. If you watched the F8 keynote last month, you'll recognize Blood Donations, Crisis Response, Privacy Shortcuts, and Wellness Checks – all recent features built with React Native. And projects outside the main Facebook app are using React Native too. The new Oculus Go VR headset includes [a companion mobile app](https://www.oculus.com/app/) that is fully built with React Native, not to mention React VR powering many experiences in the headset itself.

Naturally, we also use many other technologies to build our apps. [Litho](https://fblitho.com/) and [ComponentKit](https://componentkit.org/) are two libraries we use extensively in our apps; both provide a React-like component API for building native screens. It's never been a goal for React Native to replace all other technologies – we are focused on making React Native itself better, but we love seeing other teams borrow ideas from React Native, like bringing [instant reload](https://web.archive.org/web/20221221164348/https://instagram-engineering.com/instant-feedback-in-ios-engineering-workflows-c3f6508c76c8) to non-JavaScript code too.

## Architecture

When we started the React Native project in 2013, we designed it to have a single “bridge” between JavaScript and native that is asynchronous, serializable, and batched. Just as React DOM turns React state updates into imperative, mutative calls to DOM APIs like `document.createElement(attrs)` and `.appendChild()`, React Native was designed to return a single JSON message that lists mutations to perform, like `[["createView", attrs], ["manageChildren", ...]]`. We designed the entire system to never rely on getting a synchronous response back and to ensure everything in that list could be fully serialized to JSON and back. We did this for the flexibility it gave us: on top of this architecture, we were able to build tools like [Chrome debugging](/docs/debugging#chrome-developer-tools), which runs all the JavaScript code asynchronously over a WebSocket connection.

Over the last 5 years, we found that these initial principles have made building some features harder. An asynchronous bridge means you can't integrate JavaScript logic directly with many native APIs expecting synchronous answers. A batched bridge that queues native calls means it's harder to have React Native apps call into functions that are implemented natively. And a serializable bridge means unnecessary copying instead of directly sharing memory between the two worlds. For apps that are entirely built in React Native, these restrictions are usually bearable. But for apps with complex integration between React Native and existing app code, they are frustrating.

**We're working on a large-scale rearchitecture of React Native to make the framework more flexible and integrate better with native infrastructure in hybrid JavaScript/native apps.** With this project, we'll apply what we've learned over the last 5 years and incrementally bring our architecture to a more modern one. We're rewriting many of React Native's internals, but most of the changes are under the hood: existing React Native apps will continue to work with few or no changes.

To make React Native more lightweight and fit better into existing native apps, this rearchitecture has three major internal changes. First, we are changing the threading model. Instead of each UI update needing to perform work on three different threads, it will be possible to call synchronously into JavaScript on any thread for high-priority updates while still keeping low-priority work off the main thread to maintain responsiveness. Second, we are incorporating [async rendering](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) capabilities into React Native to allow multiple rendering priorities and to simplify asynchronous data handling. Finally, we are simplifying our bridge to make it faster and more lightweight; direct calls between native and JavaScript are more efficient and will make it easier to build debugging tools like cross-language stack traces.

Once these changes are completed, closer integrations will be possible. Today, it's not possible to incorporate native navigation and gesture handling or native components like UICollectionView and RecyclerView without complex hacks. After our changes to the threading model, building features like this will be straightforward.

We'll release more details about this work later this year as it approaches completion.

## Community

Alongside the community inside Facebook, we're happy to have a thriving population of React Native users and collaborators outside Facebook. We'd like to support the React Native community more, both by serving React Native users better and by making the project easier to contribute to.

Just as our architecture changes will help React Native interoperate more cleanly with other native infrastructure, React Native should be slimmer on the JavaScript side to fit better with the JavaScript ecosystem, which includes making the VM and bundler swappable. We know the pace of breaking changes can be hard to keep up with, so we'd like to find ways to have fewer major releases. Finally, we know that some teams are looking for more thorough documentation in topics like startup optimization, where our expertise hasn't yet been written down. Expect to see some of these changes over the coming year.

If you're using React Native, you're part of our community; keep letting us know how we can make React Native better for you.

React Native is just one tool in a mobile developer's toolbox, but it's one that we strongly believe in – and we're making it better every day, with over 2500 commits in the last year from 500+ contributors.
