---
id: colors
title: Color Reference
---

Components in React Native are [styled using JavaScript](style). Color properties usually match how [CSS works on the web](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). General guides on the color usage on each platform could be found below:

- [Android](https://material.io/design/color/color-usage.html)
- [iOS](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)

## Color APIs

React Native has several color APIs designed to allow you to take full advantage of your platform's design and user preferences.

- [PlatformColor](platformcolor) lets you reference the platform's color system.
- [DynamicColorIOS](dynamiccolorios) is iOS specific and allows you to specify which colors should be used in light or Dark Mode.

## Color representations

### Red Green Blue (RGB)

React Native supports `rgb()` and `rgba()` in both hexadecimal and functional notation:

- `'#f0f'` (#rgb)
- `'#ff00ff'` (#rrggbb)
- `'#f0ff'` (#rgba)
- `'#ff00ff00'` (#rrggbbaa)
- `'rgb(255, 0, 255)'`
- `'rgb(255 0 255)'`
- `'rgba(255, 0, 255, 1.0)'`
- `'rgba(255 0 255 / 1.0)'`

### Hue Saturation Lightness (HSL)

React Native supports `hsl()` and `hsla()` in functional notation:

- `'hsl(360, 100%, 100%)'`
- `'hsl(360 100% 100%)'`
- `'hsla(360, 100%, 100%, 1.0)'`
- `'hsla(360 100% 100% / 1.0)'`

### Hue Whiteness Blackness (HWB)

React Native supports `hwb()` in functional notation:

- `'hwb(0, 0%, 100%)'`
- `'hwb(360, 100%, 100%)'`
- `'hwb(0 0% 0%)'`
- `'hwb(70 50% 0%)'`

### Color ints

React Native also supports colors as an `int` values (in RGB color mode):

- `0xff00ff00` (0xrrggbbaa)

:::caution
This might appear similar to the Android [Color](https://developer.android.com/reference/android/graphics/Color) ints representation but on Android values are stored in SRGB color mode (0xaarrggbb).
:::

### Named colors

In React Native you can also use color name strings as values.

:::info
React Native only supports lowercase color names. Uppercase color names are not supported.
:::

#### `transparent`

This is a shortcut for `rgba(0,0,0,0)`, same as in [CSS3](https://www.w3.org/TR/css-color-3/#transparent).

#### Color keywords

Named colors implementation follows the [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color):

- <ins style={{background: '#f0f8ff'}} className="color-box" /> aliceblue (<code>#f0f8ff</code>)
- <ins style={{background: '#faebd7'}} className="color-box" /> antiquewhite (<code>#faebd7</code>)
- <ins style={{background: '#00ffff'}} className="color-box" /> aqua (<code>#00ffff</code>)
- <ins style={{background: '#7fffd4'}} className="color-box" /> aquamarine (<code>#7fffd4</code>)
- <ins style={{background: '#f0ffff'}} className="color-box" /> azure (<code>#f0ffff</code>)
- <ins style={{background: '#f5f5dc'}} className="color-box" /> beige (<code>#f5f5dc</code>)
- <ins style={{background: '#ffe4c4'}} className="color-box" /> bisque (<code>#ffe4c4</code>)
- <ins style={{background: '#000000'}} className="color-box" /> black (<code>#000000</code>)
- <ins style={{background: '#ffebcd'}} className="color-box" /> blanchedalmond (<code>#ffebcd</code>)
- <ins style={{background: '#0000ff'}} className="color-box" /> blue (<code>#0000ff</code>)
- <ins style={{background: '#8a2be2'}} className="color-box" /> blueviolet (<code>#8a2be2</code>)
- <ins style={{background: '#a52a2a'}} className="color-box" /> brown (<code>#a52a2a</code>)
- <ins style={{background: '#deb887'}} className="color-box" /> burlywood (<code>#deb887</code>)
- <ins style={{background: '#5f9ea0'}} className="color-box" /> cadetblue (<code>#5f9ea0</code>)
- <ins style={{background: '#7fff00'}} className="color-box" /> chartreuse (<code>#7fff00</code>)
- <ins style={{background: '#d2691e'}} className="color-box" /> chocolate (<code>#d2691e</code>)
- <ins style={{background: '#ff7f50'}} className="color-box" /> coral (<code>#ff7f50</code>)
- <ins style={{background: '#6495ed'}} className="color-box" /> cornflowerblue (<code>#6495ed</code>)
- <ins style={{background: '#fff8dc'}} className="color-box" /> cornsilk (<code>#fff8dc</code>)
- <ins style={{background: '#dc143c'}} className="color-box" /> crimson (<code>#dc143c</code>)
- <ins style={{background: '#00ffff'}} className="color-box" /> cyan (<code>#00ffff</code>)
- <ins style={{background: '#00008b'}} className="color-box" /> darkblue (<code>#00008b</code>)
- <ins style={{background: '#008b8b'}} className="color-box" /> darkcyan (<code>#008b8b</code>)
- <ins style={{background: '#b8860b'}} className="color-box" /> darkgoldenrod (<code>#b8860b</code>)
- <ins style={{background: '#a9a9a9'}} className="color-box" /> darkgray (<code>#a9a9a9</code>)
- <ins style={{background: '#006400'}} className="color-box" /> darkgreen (<code>#006400</code>)
- <ins style={{background: '#a9a9a9'}} className="color-box" /> darkgrey (<code>#a9a9a9</code>)
- <ins style={{background: '#bdb76b'}} className="color-box" /> darkkhaki (<code>#bdb76b</code>)
- <ins style={{background: '#8b008b'}} className="color-box" /> darkmagenta (<code>#8b008b</code>)
- <ins style={{background: '#556b2f'}} className="color-box" /> darkolivegreen (<code>#556b2f</code>)
- <ins style={{background: '#ff8c00'}} className="color-box" /> darkorange (<code>#ff8c00</code>)
- <ins style={{background: '#9932cc'}} className="color-box" /> darkorchid (<code>#9932cc</code>)
- <ins style={{background: '#8b0000'}} className="color-box" /> darkred (<code>#8b0000</code>)
- <ins style={{background: '#e9967a'}} className="color-box" /> darksalmon (<code>#e9967a</code>)
- <ins style={{background: '#8fbc8f'}} className="color-box" /> darkseagreen (<code>#8fbc8f</code>)
- <ins style={{background: '#483d8b'}} className="color-box" /> darkslateblue (<code>#483d8b</code>)
- <ins style={{background: '#2f4f4f'}} className="color-box" /> darkslategrey (<code>#2f4f4f</code>)
- <ins style={{background: '#00ced1'}} className="color-box" /> darkturquoise (<code>#00ced1</code>)
- <ins style={{background: '#9400d3'}} className="color-box" /> darkviolet (<code>#9400d3</code>)
- <ins style={{background: '#ff1493'}} className="color-box" /> deeppink (<code>#ff1493</code>)
- <ins style={{background: '#00bfff'}} className="color-box" /> deepskyblue (<code>#00bfff</code>)
- <ins style={{background: '#696969'}} className="color-box" /> dimgray (<code>#696969</code>)
- <ins style={{background: '#696969'}} className="color-box" /> dimgrey (<code>#696969</code>)
- <ins style={{background: '#1e90ff'}} className="color-box" /> dodgerblue (<code>#1e90ff</code>)
- <ins style={{background: '#b22222'}} className="color-box" /> firebrick (<code>#b22222</code>)
- <ins style={{background: '#fffaf0'}} className="color-box" /> floralwhite (<code>#fffaf0</code>)
- <ins style={{background: '#228b22'}} className="color-box" /> forestgreen (<code>#228b22</code>)
- <ins style={{background: '#ff00ff'}} className="color-box" /> fuchsia (<code>#ff00ff</code>)
- <ins style={{background: '#dcdcdc'}} className="color-box" /> gainsboro (<code>#dcdcdc</code>)
- <ins style={{background: '#f8f8ff'}} className="color-box" /> ghostwhite (<code>#f8f8ff</code>)
- <ins style={{background: '#ffd700'}} className="color-box" /> gold (<code>#ffd700</code>)
- <ins style={{background: '#daa520'}} className="color-box" /> goldenrod (<code>#daa520</code>)
- <ins style={{background: '#808080'}} className="color-box" /> gray (<code>#808080</code>)
- <ins style={{background: '#008000'}} className="color-box" /> green (<code>#008000</code>)
- <ins style={{background: '#adff2f'}} className="color-box" /> greenyellow (<code>#adff2f</code>)
- <ins style={{background: '#808080'}} className="color-box" /> grey (<code>#808080</code>)
- <ins style={{background: '#f0fff0'}} className="color-box" /> honeydew (<code>#f0fff0</code>)
- <ins style={{background: '#ff69b4'}} className="color-box" /> hotpink (<code>#ff69b4</code>)
- <ins style={{background: '#cd5c5c'}} className="color-box" /> indianred (<code>#cd5c5c</code>)
- <ins style={{background: '#4b0082'}} className="color-box" /> indigo (<code>#4b0082</code>)
- <ins style={{background: '#fffff0'}} className="color-box" /> ivory (<code>#fffff0</code>)
- <ins style={{background: '#f0e68c'}} className="color-box" /> khaki (<code>#f0e68c</code>)
- <ins style={{background: '#e6e6fa'}} className="color-box" /> lavender (<code>#e6e6fa</code>)
- <ins style={{background: '#fff0f5'}} className="color-box" /> lavenderblush (<code>#fff0f5</code>)
- <ins style={{background: '#7cfc00'}} className="color-box" /> lawngreen (<code>#7cfc00</code>)
- <ins style={{background: '#fffacd'}} className="color-box" /> lemonchiffon (<code>#fffacd</code>)
- <ins style={{background: '#add8e6'}} className="color-box" /> lightblue (<code>#add8e6</code>)
- <ins style={{background: '#f08080'}} className="color-box" /> lightcoral (<code>#f08080</code>)
- <ins style={{background: '#e0ffff'}} className="color-box" /> lightcyan (<code>#e0ffff</code>)
- <ins style={{background: '#fafad2'}} className="color-box" /> lightgoldenrodyellow (<code>#fafad2</code>)
- <ins style={{background: '#d3d3d3'}} className="color-box" /> lightgray (<code>#d3d3d3</code>)
- <ins style={{background: '#90ee90'}} className="color-box" /> lightgreen (<code>#90ee90</code>)
- <ins style={{background: '#d3d3d3'}} className="color-box" /> lightgrey (<code>#d3d3d3</code>)
- <ins style={{background: '#ffb6c1'}} className="color-box" /> lightpink (<code>#ffb6c1</code>)
- <ins style={{background: '#ffa07a'}} className="color-box" /> lightsalmon (<code>#ffa07a</code>)
- <ins style={{background: '#20b2aa'}} className="color-box" /> lightseagreen (<code>#20b2aa</code>)
- <ins style={{background: '#87cefa'}} className="color-box" /> lightskyblue (<code>#87cefa</code>)
- <ins style={{background: '#778899'}} className="color-box" /> lightslategrey (<code>#778899</code>)
- <ins style={{background: '#b0c4de'}} className="color-box" /> lightsteelblue (<code>#b0c4de</code>)
- <ins style={{background: '#ffffe0'}} className="color-box" /> lightyellow (<code>#ffffe0</code>)
- <ins style={{background: '#00ff00'}} className="color-box" /> lime (<code>#00ff00</code>)
- <ins style={{background: '#32cd32'}} className="color-box" /> limegreen (<code>#32cd32</code>)
- <ins style={{background: '#faf0e6'}} className="color-box" /> linen (<code>#faf0e6</code>)
- <ins style={{background: '#ff00ff'}} className="color-box" /> magenta (<code>#ff00ff</code>)
- <ins style={{background: '#800000'}} className="color-box" /> maroon (<code>#800000</code>)
- <ins style={{background: '#66cdaa'}} className="color-box" /> mediumaquamarine (<code>#66cdaa</code>)
- <ins style={{background: '#0000cd'}} className="color-box" /> mediumblue (<code>#0000cd</code>)
- <ins style={{background: '#ba55d3'}} className="color-box" /> mediumorchid (<code>#ba55d3</code>)
- <ins style={{background: '#9370db'}} className="color-box" /> mediumpurple (<code>#9370db</code>)
- <ins style={{background: '#3cb371'}} className="color-box" /> mediumseagreen (<code>#3cb371</code>)
- <ins style={{background: '#7b68ee'}} className="color-box" /> mediumslateblue (<code>#7b68ee</code>)
- <ins style={{background: '#00fa9a'}} className="color-box" /> mediumspringgreen (<code>#00fa9a</code>)
- <ins style={{background: '#48d1cc'}} className="color-box" /> mediumturquoise (<code>#48d1cc</code>)
- <ins style={{background: '#c71585'}} className="color-box" /> mediumvioletred (<code>#c71585</code>)
- <ins style={{background: '#191970'}} className="color-box" /> midnightblue (<code>#191970</code>)
- <ins style={{background: '#f5fffa'}} className="color-box" /> mintcream (<code>#f5fffa</code>)
- <ins style={{background: '#ffe4e1'}} className="color-box" /> mistyrose (<code>#ffe4e1</code>)
- <ins style={{background: '#ffe4b5'}} className="color-box" /> moccasin (<code>#ffe4b5</code>)
- <ins style={{background: '#ffdead'}} className="color-box" /> navajowhite (<code>#ffdead</code>)
- <ins style={{background: '#000080'}} className="color-box" /> navy (<code>#000080</code>)
- <ins style={{background: '#fdf5e6'}} className="color-box" /> oldlace (<code>#fdf5e6</code>)
- <ins style={{background: '#808000'}} className="color-box" /> olive (<code>#808000</code>)
- <ins style={{background: '#6b8e23'}} className="color-box" /> olivedrab (<code>#6b8e23</code>)
- <ins style={{background: '#ffa500'}} className="color-box" /> orange (<code>#ffa500</code>)
- <ins style={{background: '#ff4500'}} className="color-box" /> orangered (<code>#ff4500</code>)
- <ins style={{background: '#da70d6'}} className="color-box" /> orchid (<code>#da70d6</code>)
- <ins style={{background: '#eee8aa'}} className="color-box" /> palegoldenrod (<code>#eee8aa</code>)
- <ins style={{background: '#98fb98'}} className="color-box" /> palegreen (<code>#98fb98</code>)
- <ins style={{background: '#afeeee'}} className="color-box" /> paleturquoise (<code>#afeeee</code>)
- <ins style={{background: '#db7093'}} className="color-box" /> palevioletred (<code>#db7093</code>)
- <ins style={{background: '#ffefd5'}} className="color-box" /> papayawhip (<code>#ffefd5</code>)
- <ins style={{background: '#ffdab9'}} className="color-box" /> peachpuff (<code>#ffdab9</code>)
- <ins style={{background: '#cd853f'}} className="color-box" /> peru (<code>#cd853f</code>)
- <ins style={{background: '#ffc0cb'}} className="color-box" /> pink (<code>#ffc0cb</code>)
- <ins style={{background: '#dda0dd'}} className="color-box" /> plum (<code>#dda0dd</code>)
- <ins style={{background: '#b0e0e6'}} className="color-box" /> powderblue (<code>#b0e0e6</code>)
- <ins style={{background: '#800080'}} className="color-box" /> purple (<code>#800080</code>)
- <ins style={{background: '#663399'}} className="color-box" /> rebeccapurple (<code>#663399</code>)
- <ins style={{background: '#ff0000'}} className="color-box" /> red (<code>#ff0000</code>)
- <ins style={{background: '#bc8f8f'}} className="color-box" /> rosybrown (<code>#bc8f8f</code>)
- <ins style={{background: '#4169e1'}} className="color-box" /> royalblue (<code>#4169e1</code>)
- <ins style={{background: '#8b4513'}} className="color-box" /> saddlebrown (<code>#8b4513</code>)
- <ins style={{background: '#fa8072'}} className="color-box" /> salmon (<code>#fa8072</code>)
- <ins style={{background: '#f4a460'}} className="color-box" /> sandybrown (<code>#f4a460</code>)
- <ins style={{background: '#2e8b57'}} className="color-box" /> seagreen (<code>#2e8b57</code>)
- <ins style={{background: '#fff5ee'}} className="color-box" /> seashell (<code>#fff5ee</code>)
- <ins style={{background: '#a0522d'}} className="color-box" /> sienna (<code>#a0522d</code>)
- <ins style={{background: '#c0c0c0'}} className="color-box" /> silver (<code>#c0c0c0</code>)
- <ins style={{background: '#87ceeb'}} className="color-box" /> skyblue (<code>#87ceeb</code>)
- <ins style={{background: '#6a5acd'}} className="color-box" /> slateblue (<code>#6a5acd</code>)
- <ins style={{background: '#708090'}} className="color-box" /> slategray (<code>#708090</code>)
- <ins style={{background: '#fffafa'}} className="color-box" /> snow (<code>#fffafa</code>)
- <ins style={{background: '#00ff7f'}} className="color-box" /> springgreen (<code>#00ff7f</code>)
- <ins style={{background: '#4682b4'}} className="color-box" /> steelblue (<code>#4682b4</code>)
- <ins style={{background: '#d2b48c'}} className="color-box" /> tan (<code>#d2b48c</code>)
- <ins style={{background: '#008080'}} className="color-box" /> teal (<code>#008080</code>)
- <ins style={{background: '#d8bfd8'}} className="color-box" /> thistle (<code>#d8bfd8</code>)
- <ins style={{background: '#ff6347'}} className="color-box" /> tomato (<code>#ff6347</code>)
- <ins style={{background: '#40e0d0'}} className="color-box" /> turquoise (<code>#40e0d0</code>)
- <ins style={{background: '#ee82ee'}} className="color-box" /> violet (<code>#ee82ee</code>)
- <ins style={{background: '#f5deb3'}} className="color-box" /> wheat (<code>#f5deb3</code>)
- <ins style={{background: '#ffffff'}} className="color-box" /> white (<code>#ffffff</code>)
- <ins style={{background: '#f5f5f5'}} className="color-box" /> whitesmoke (<code>#f5f5f5</code>)
- <ins style={{background: '#ffff00'}} className="color-box" /> yellow (<code>#ffff00</code>)
- <ins style={{background: '#9acd32'}} className="color-box" /> yellowgreen (<code>#9acd32</code>)
