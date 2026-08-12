---
id: global-__DEV__
title: ✨ __DEV__
---

You can use the `__DEV__` pseudo-global variable in the codebase to guard development-only blocks of code.

It is inlined during compilation and gets completely stripped out with the `if` blocks it guards in the minified build.
