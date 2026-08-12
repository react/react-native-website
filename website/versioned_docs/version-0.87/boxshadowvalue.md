---
id: boxshadowvalue
title: BoxShadowValue Object Type
---

The `BoxShadowValue` object is taken by the [`boxShadow`](./view-style-props.md#boxshadow) style prop. It is comprised of 2-4 lengths, an optional color, and an optional `inset` boolean. These values collectively define the box shadow's color, position, size, and blurriness.

## Example

```js
{
  offsetX: 10,
  offsetY: -3,
  blurRadius: '15px',
  spreadDistance: '10px',
  color: 'red',
  inset: true,
}
```

## Keys and values

### `offsetX`

The offset on the x-axis. This can be positive or negative. A positive value indicates right and negative indicates left.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | No       |

### `offsetY`

The offset on the y-axis. This can be positive or negative. A positive value indicates up and negative indicates down.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | No       |

### `blurRadius`

Represents the radius used in the [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur) algorithm. The larger the value the blurrier the shadow is. Only non-negative values are valid. The default is 0.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | Yes      |

### `spreadDistance`

How much larger or smaller the shadow grows or shrinks. A positive value will grow the shadow, a negative value will shrink the shadow.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | Yes      |

### `color`

The color of the shadow. The default is `black`.

| Type                 | Optional |
| -------------------- | -------- |
| [color](./colors.md) | Yes      |

### `inset`

Whether the shadow is inset or not. Inset shadows will appear around the inside of the element's border box as opposed to the outside.

| Type    | Optional |
| ------- | -------- |
| boolean | Yes      |

## Used by

- [`boxShadow`](./view-style-props.md#boxshadow)
