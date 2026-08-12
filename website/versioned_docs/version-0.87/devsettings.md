---
id: devsettings
title: DevSettings
---

The `DevSettings` module exposes methods for customizing settings for developers in development.

---

# Reference

## Methods

### `addMenuItem()`

```tsx
static addMenuItem(title: string, handler: () => any);
```

Add a custom menu item to the Dev Menu.

**Parameters:**

| Name                                                         | Type     |
| ------------------------------------------------------------ | -------- |
| title <div className="label basic required">Required</div>   | string   |
| handler <div className="label basic required">Required</div> | function |

**Example:**

```tsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

---

### `reload()`

```tsx
static reload(reason?: string): void;
```

Reload the application. Can be invoked directly or on user interaction.

**Example:**

```tsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```
