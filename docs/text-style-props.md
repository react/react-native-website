---
id: text-style-props
title: Text Style Props
---

### Props

* [`textShadowOffset`](text-style-props.md#textshadowoffset)
* [`color`](text-style-props.md#color)
* [`fontSize`](text-style-props.md#fontsize)
* [`fontStyle`](text-style-props.md#fontstyle)
* [`fontWeight`](text-style-props.md#fontweight)
* [`lineHeight`](text-style-props.md#lineheight)
* [`textAlign`](text-style-props.md#textalign)
* [`textDecorationLine`](text-style-props.md#textdecorationline)
* [`textShadowColor`](text-style-props.md#textshadowcolor)
* [`fontFamily`](text-style-props.md#fontfamily)
* [`textShadowRadius`](text-style-props.md#textshadowradius)
* [`includeFontPadding`](text-style-props.md#includefontpadding)
* [`textAlignVertical`](text-style-props.md#textalignvertical)
* [`fontVariant`](text-style-props.md#fontvariant)
* [`letterSpacing`](text-style-props.md#letterspacing)
* [`textDecorationColor`](text-style-props.md#textdecorationcolor)
* [`textDecorationStyle`](text-style-props.md#textdecorationstyle)
* [`writingDirection`](text-style-props.md#writingdirection)

---

# Reference

## Props

### `textShadowOffset`

| Type                                   | Required |
| -------------------------------------- | -------- |
| object: {width: number,height: number} | No       |

---

### `color`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `fontSize`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `fontStyle`

| Type                     | Required |
| ------------------------ | -------- |
| enum('normal', 'italic') | No       |

---

### `fontWeight`

Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| Type                                                                                  | Required |
| ------------------------------------------------------------------------------------- | -------- |
| enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900') | No       |

---

### `lineHeight`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

> **_Note:_** Unlike [`<Text>`](text.md), `TextInput` treats `left` and `right` as physical values that do not flip in RTL mode. On `<Text>`, `textAlign: 'left'` behaves as logical `start` (aligns right in RTL), but on `TextInput` it always aligns left. For direction-aware alignment on `TextInput`, use `I18nManager.isRTL ? 'right' : 'left'`. See [#45255](https://github.com/facebook/react-native/issues/45255) for background.

| Type                                               | Required |
| -------------------------------------------------- | -------- |
| enum('auto', 'left', 'right', 'center', 'justify') | No       |

---

### `textDecorationLine`

| Type                                                                | Required |
| ------------------------------------------------------------------- | -------- |
| enum('none', 'underline', 'line-through', 'underline line-through') | No       |

---

### `textShadowColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `fontFamily`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textShadowRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `includeFontPadding`

Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `textAlignVertical`

| Type                                    | Required | Platform |
| --------------------------------------- | -------- | -------- |
| enum('auto', 'top', 'bottom', 'center') | No       | Android  |

---

### `fontVariant`

| Type                                                                                             | Required | Platform |
| ------------------------------------------------------------------------------------------------ | -------- | -------- |
| array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') | No       | iOS      |

---

### `letterSpacing`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `textDecorationColor`

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `textDecorationStyle`

| Type                                        | Required | Platform |
| ------------------------------------------- | -------- | -------- |
| enum('solid', 'double', 'dotted', 'dashed') | No       | iOS      |

---

### `writingDirection`

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('auto', 'ltr', 'rtl') | No       | iOS      |
