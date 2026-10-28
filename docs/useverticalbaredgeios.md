---
id: useverticalbaredgeios
title: useVerticalBarEdgeIOS
---

```tsx
import {useVerticalBarEdgeIOS} from 'react-native';
```

The `useVerticalBarEdgeIOS` React hook returns the edge where iOS places the vertical bar that holds the status bar beside your content, such as the side rail on iPhone Duo, and updates when it changes, for example when the device rotates or unfolds. Use it to keep custom headers and controls clear of the vertical bar.

### Return values

- `'leading'`: The vertical bar is on the leading edge.
- `'trailing'`: The vertical bar is on the trailing edge.
- `null`: The system places no vertical bar, such as on other devices, in orientations that keep the status bar at the top, before iOS 27.1, or on other platforms.

To read the edge once without subscribing, use [`StatusBar.getVerticalBarEdgeIOS()`](statusbar#getverticalbaredgeios).

---

## Example

```tsx
import {Text, View, useVerticalBarEdgeIOS} from 'react-native';

const App = () => {
  const verticalBarEdge = useVerticalBarEdgeIOS();
  return (
    <View>
      <Text>Vertical bar edge: {verticalBarEdge ?? 'none'}</Text>
    </View>
  );
};

export default App;
```
