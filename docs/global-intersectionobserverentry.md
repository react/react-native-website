---
id: global-intersectionobserverentry
title: IntersectionObserverEntry 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

The [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) interface, as defined in Web specifications. It describes the intersection between the target element and its root container at a specific moment of transition.

Instances of `IntersectionObserverEntry` are delivered to an [`IntersectionObserver`](global-intersectionobserver) callback in its `entries` parameter.

---

# Reference

## Instance properties

### `boundingClientRect`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/boundingClientRect).

Returns the bounds rectangle of the target element as a `DOMRectReadOnly`.

### `intersectionRatio`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRatio).

Returns the ratio of the `intersectionRect` to the `boundingClientRect`.

### `intersectionRect`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect).

Returns a `DOMRectReadOnly` representing the target's visible area.

### `isIntersecting`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting).

A Boolean value which is `true` if the target element intersects with the intersection observer's root. If this is `true`, then the `IntersectionObserverEntry` describes a transition into a state of intersection; if it's `false`, then you know the transition is from intersecting to not-intersecting.

### `rnRootIntersectionRatio` ⚠️

:::warning[Non-standard]
This is a React Native specific extension.
:::

Returns the ratio of the `intersectionRect` to the `rootBounds`.

```ts
get rnRootIntersectionRatio(): number;
```

This is analogous to `intersectionRatio`, but computed relative to the root's bounding box instead of the target's bounding box. This corresponds to the `rnRootThreshold` option and allows you to determine what percentage of the root area is covered by the target element.

### `rootBounds`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds).

Returns a `DOMRectReadOnly` for the intersection observer's root.

### `target`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/target).

The `Element` whose intersection with the root changed.

### `time`

See [documentation in MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/time).

A `DOMHighResTimeStamp` indicating the time at which the intersection was recorded, relative to the `IntersectionObserver`'s time origin.
