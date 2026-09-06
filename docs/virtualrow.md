---
id: virtualrow
title: VirtualRow 🧪
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

<ExperimentalAPIWarning />

`VirtualRow` is a row layout component that lazily mounts and virtualizes items.

```tsx
<ScrollView>
  <VirtualRow
    items={new VirtualArray(items)}>
    {(item, key) => <Text>{item.value}</Text>}
  </VirtualRow>
</ScrollView>
```

A `ScrollView` ancestor is required for virtualized and scrollable items. If there is no ancestor `ScrollView`, the items will always be rendered as though they are within the viewport.

<center><img src="/docs/assets/virtual_row.svg" width="500" alt="Diagram of VirtualRow." /></center>

See [`VirtualColumn`](virtualcolumn) for more details.

## Props

See [`VirtualColumn` props](virtualcolumn#props).
