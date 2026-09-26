---
id: global-console
title: console
---

:::warning
🚧 This page is work in progress, so please refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/console) for more information.
:::

The global `console` object, as defined in Web specifications.

---

## Methods

### `timeStamp()`

```tsx
console.timeStamp(
  label: string,
  start?: string | number,
  end?: string | number,
  trackName?: string,
  trackGroup?: string,
  color?: DevToolsColor
): void;
```

The `console.timeStamp` API allows you to add custom timing entries in the Performance panel timeline.

**Parameters:**

| Name       | Type               | Required | Description                                                                                                                                                                                                                                                                                                   |
| ---------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label      | `string`           | Yes      | The label for the timing entry.                                                                                                                                                                                                                                                                               |
| start      | `string \| number` | No       | <ul><li>If string, the name of a previously recorded timestamp with `console.timeStamp`.</li><li>If number, the [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp). For example, from `performance.now()`.</li><li>If undefined, the current time is used.</li></ul> |
| end        | `string \| number` | No       | <ul><li>If string, the name of a previously recorded timestamp with `console.timeStamp`.</li><li>If number, the [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp). For example, from `performance.now()`.</li><li>If undefined, the current time is used.</li></ul> |
| trackName  | `string`           | No       | The name of the custom track.                                                                                                                                                                                                                                                                                 |
| trackGroup | `string`           | No       | The name of the track group.                                                                                                                                                                                                                                                                                  |
| color      | `DevToolsColor`    | No       | The color of the entry.                                                                                                                                                                                                                                                                                       |

```tsx
type DevToolsColor =
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'warning'
  | 'error';
```
