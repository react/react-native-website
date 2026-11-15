---
id: easing
title: Easing
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The `Easing` module implements common easing functions. This module is used by [`Animated.timing()`](animated.md#timing) to convey physically believable motion in animations.

You can find a visualization of some common easing functions at https://easings.net/

### Predefined animations

The `Easing` module provides several predefined animations through the following methods:

- [`back`](easing.md#back) provides a basic animation where the object goes slightly back before moving forward
- [`bounce`](easing.md#bounce) provides a bouncing animation
- [`ease`](easing.md#ease) provides a basic inertial animation
- [`elastic`](easing.md#elastic) provides a basic spring interaction

### Standard functions

Three standard easing functions are provided:

- [`linear`](easing.md#linear)
- [`quad`](easing.md#quad)
- [`cubic`](easing.md#cubic)

The [`poly`](easing.md#poly) function can be used to implement quartic, quintic, and other higher power functions.

### Additional functions

Additional mathematical functions are provided by the following methods:

- [`bezier`](easing.md#bezier) provides a cubic bezier curve
- [`circle`](easing.md#circle) provides a circular function
- [`sin`](easing.md#sin) provides a sinusoidal function
- [`exp`](easing.md#exp) provides an exponential function

The following helpers are used to modify other easing functions.

- [`in`](easing.md#in) runs an easing function forwards
- [`inOut`](easing.md#inout) makes any easing function symmetrical
- [`out`](easing.md#out) runs an easing function backwards

## Example

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Easing%20Demo&ext=js
import {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Easing%20Demo&ext=tsx
import {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type EasingFunction,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Reference

## Methods

### `step0()`

```tsx
static step0(n: number);
```

A stepping function, returns 1 for any positive value of `n`.

---

### `step1()`

```tsx
static step1(n: number);
```

A stepping function, returns 1 if `n` is greater than or equal to 1.

---

### `linear()`

```tsx
static linear(t: number);
```

A linear function, `f(t) = t`. Position correlates to elapsed time one to one.

https://cubic-bezier.com/#0,0,1,1

---

### `ease()`

```tsx
static ease(t: number);
```

A basic inertial interaction, similar to an object slowly accelerating to speed.

https://cubic-bezier.com/#.42,0,1,1

---

### `quad()`

```tsx
static quad(t: number);
```

A quadratic function, `f(t) = t * t`. Position equals the square of elapsed time.

https://easings.net/#easeInQuad

---

### `cubic()`

```tsx
static cubic(t: number);
```

A cubic function, `f(t) = t * t * t`. Position equals the cube of elapsed time.

https://easings.net/#easeInCubic

---

### `poly()`

```tsx
static poly(n: number);
```

A power function. Position is equal to the Nth power of elapsed time.

n = 4: https://easings.net/#easeInQuart n = 5: https://easings.net/#easeInQuint

---

### `sin()`

```tsx
static sin(t: number);
```

A sinusoidal function.

https://easings.net/#easeInSine

---

### `circle()`

```tsx
static circle(t: number);
```

A circular function.

https://easings.net/#easeInCirc

---

### `exp()`

```tsx
static exp(t: number);
```

An exponential function.

https://easings.net/#easeInExpo

---

### `elastic()`

```tsx
static elastic(bounciness: number);
```

A basic elastic interaction, similar to a spring oscillating back and forth.

Default bounciness is 1, which overshoots a little bit once. 0 bounciness doesn't overshoot at all, and bounciness of N > 1 will overshoot about N times.

https://easings.net/#easeInElastic

---

### `back()`

```tsx
static back(s)
```

Use with `Animated.parallel()` to create a basic effect where the object animates back slightly as the animation starts.

---

### `bounce()`

```tsx
static bounce(t: number);
```

Provides a basic bouncing effect.

https://easings.net/#easeInBounce

---

### `bezier()`

```tsx
static bezier(x1: number, y1: number, x2: number, y2: number);
```

Provides a cubic bezier curve, equivalent to CSS Transitions' `transition-timing-function`.

A useful tool to visualize cubic bezier curves can be found at https://cubic-bezier.com/

---

### `in()`

```tsx
static in(easing: number);
```

Runs an easing function forwards.

---

### `out()`

```tsx
static out(easing: number);
```

Runs an easing function backwards.

---

### `inOut()`

```tsx
static inOut(easing: number);
```

Makes any easing function symmetrical. The easing function will run forwards for half of the duration, then backwards for the rest of the duration.
