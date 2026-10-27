---
id: targetevent
title: TargetEvent Object Type
---

`TargetEvent` object is returned in the callback as a result of focus change, for example `onFocus` or `onBlur` in the [TextInput](textinput) component.

## Example

```
{
    target: 1127
}
```

## Keys and values

### `target`

The node id of the element receiving the TargetEvent.

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## Used by

- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
