---
id: global-performance
title: performance 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

The global [`performance`](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance) object, as defined in Web specifications.

---

# Reference

## Instance properties

### `eventCounts`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/eventCounts).

### `memory`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory).

### `rnStartupTiming` ⚠️

:::warning[Non-standard]
This is a React Native specific extension.
:::

Provides information about the startup time of the application.

```ts
get rnStartupTiming(): ReactNativeStartupTiming;
```

The `ReactNativeStartupTiming` interface provides the following fields:

| Name                                     | Type           | Description                                               |
| ---------------------------------------- | -------------- | --------------------------------------------------------- |
| `startTime`                              | number \| void | When the React Native runtime initialization was started. |
| `executeJavaScriptBundleEntryPointStart` | number \| void | When the execution of the application bundle was started. |
| `endTime`                                | number \| void | When the React Native runtime was fully initialized.      |

### `timeOrigin`

:::warning[Partial support]
Provides the number of milliseconds from the UNIX epoch until system boot, instead of the number of milliseconds from the UNIX epoch until app startup.
:::

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin).

## Instance methods

### `clearMarks()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks).

### `clearMeasures()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures).

### `getEntries()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries).

### `getEntriesByName()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName).

### `getEntriesByType()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType).

### `mark()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark).

### `measure()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure).

### `now()`

:::warning[Partial support]
Provides the number of milliseconds from system boot, instead of the number of milliseconds from app startup.
:::

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).
