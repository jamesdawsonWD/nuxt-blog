---
title: "Create a newsletter site for free in 30 minutes"
description: "We will create a Newsletter website in Nuxt in less than 30 minutes!"
pubDate: "Jul 01 2024"
heroImage: "/resendandnuxt.png"
---

Let’s not waste any time, firstly you need to select what framework you are going to use. I will be building this in Nuxt, because that is my favourite!

We need to create a new project.

::code-group

```bash [npm]
npx nuxi@latest init <project-name>
```

```bash [yarn]
yarn dlx nuxi@latest init <project-name>
```

```bash [pnpm]
pnpm dlx nuxi@latest init <project-name>
```

```bash [bun]
bunx nuxi@latest init <project-name>
```

::

We will also add typescript.

::code-group

```bash [npm]
npm install -D typescript
```

```bash [yarn]
yarn add -D typescript
```

```bash [pnpm]
pnpm add -D typescript
```

```bash [bun]
bun add -d typescript
```

::

and finally we will add tailwind.

::code-group

```bash [npm]
npx nuxi@latest module add @nuxtjs/tailwindcss
```

```bash [yarn]
yarn dlx nuxi@latest module add @nuxtjs/tailwindcss
```

```bash [pnpm]
pnpm dlx nuxi@latest module add @nuxtjs/tailwindcss
```

```bash [bun]
bunx nuxi@latest module add @nuxtjs/tailwindcss
```

::

We now want to add the shadcn nuxt module.

::code-group

```bash [npm]
npx nuxi@latest module add shadcn-nuxt
```

```bash [yarn]
yarn dlx nuxi@latest module add shadcn-nuxt
```

```bash [pnpm]
pnpm dlx nuxi@latest module add shadcn-nuxt
```

```bash [bun]
bunx nuxi@latest module add shadcn-nuxt
```

::

Then we open our `nuxt.config.ts` file. And replace it with the following.

```js
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
```

Run the setup CLI.

::code-group

```bash [npm]
npx shadcn-vue@latest init
```

```bash [yarn]
yarn dlx shadcn-vue@latest init
```

```bash [pnpm]
pnpm dlx shadcn-vue@latest init
```

```bash [bun]
bunx shadcn-vue@latest init
```

::

And finally just follow the default steps. *Make sure you select your framework as Nuxt*

```txt
Would you like to use TypeScript (recommended)?  yes
Which framework are you using? Nuxt
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

That is all the setup done! All we need to do now is add the input and button components.

::code-group

```bash [npm]
npx npx shadcn-vue@latest add button input
```

```bash [yarn]
yarn dlx npx shadcn-vue@latest add button input
```

```bash [pnpm]
pnpm dlx npx shadcn-vue@latest add button input 
```

```bash [bun]
bunx npx shadcn-vue@latest add button input
```
::

Amazing, now let’s make ourselves a quick landing page. Replace the following code in your `app.vue` file.

::code-group

```vue [app.vue]
<template>
  <div class="dark space-x-2 max-w-sm mx-auto my-auto mt-20">
    <p class="text-center">Hey 👋</p>
    <h1 class="text-7xl font-extrabold text-center mb-4">Join my newsletter</h1>
    <p class="text-center mb-8">We talk about <i>amazing things</i>, delivered to your inbox <b>every Saturday</b>.</p>
    <div class="flex gap-2 ">


    <Input type="email" placeholder="Your email" />
    <Button>Join newsletter</Button>
    </div>
 </div>
</template>

```
::



This should all do the job! We now need an endpoint to send the signup request to, along with the users actual email address.

Now we can implement Resends logic. First we need to go to Resend, create an account and get our API key. Then we just add it to our .env file.

Cool, so now we add in the code to add someone to our audience and we send them a thankyou email.

Finally all that is left to do is to hook the frontend up to this api call…

And we have a working newsletter
