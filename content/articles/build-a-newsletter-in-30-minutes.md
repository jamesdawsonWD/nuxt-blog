---
title: "Create a newsletter site for free in 30 minutes"
description: "We will create a Newsletter website in Nuxt in less than 30 minutes!"
pubDate: "Jul 01 2024"
heroImage: "/resendandnuxt.png"
---

::callout{ type="info"}
Components that are used in Markdown has to be marked as `global` in your Nuxt app if you don't use the `components/content/` directory, visit [Nuxt 3 docs](https://nuxt.com/docs/guide/directory-structure/components) to learn more about it.
::

::code-group

```mdc [index.md]
The content of the card
```

```html [Card.vue]
<!-- components/content/Card.vue -->
<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
```

::
