---
id: global-PerformanceObserver
title: PerformanceObserver
---

The global [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) class, as defined in Web specifications.

## Example

```ts
const observer = new PerformanceObserver(
  (list, observer, options) => {
    for (const entry of list.getEntries()) {
      console.log(
        'Received entry with type',
        entry.entryType,
        'and name',
        entry.name,
        'that started at',
        entry.startTime,
        'and took',
        entry.duration,
        'ms',
      );
    }
  },
);

observer.observe({entryTypes: ['mark', 'measure']});
```

---

# Reference

## Constructor

### `PerformanceObserver()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver).

## Static properties

### `supportedEntryTypes`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/supportedEntryTypes).

Returns `['mark', 'measure', 'event', 'longtask']`.

## Instance methods

### `observe()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observe).

### `disconnect()`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/disconnect).
