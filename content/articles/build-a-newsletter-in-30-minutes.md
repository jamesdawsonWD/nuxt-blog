---
title: "Create a newsletter site for free in 30 minutes"
description: "We will create a Newsletter website in Nuxt in less than 30 minutes!"
pubDate: "Jul 01 2024"
date: "2024-07-01"
heroImage: "/resendandnuxt.png"
component: ""
---

By the end of this article you should have something that looks like this and is a fully functioning newsletter for free!

::markdown-image
![News letter example](/blogs/newsletter.png)
::

## Initial Setup

We need to create a new project.

::code-group

```bash [pnpm]
pnpm dlx nuxi@latest init <project-name>
```
```bash [npm]
npx nuxi@latest init <project-name>
```

```bash [yarn]
yarn dlx nuxi@latest init <project-name>
```


```bash [bun]
bunx nuxi@latest init <project-name>
```

::

We will also add typescript.

::code-group

```bash [pnpm]
pnpm add -D typescript
```
```bash [npm]
npm install -D typescript
```

```bash [yarn]
yarn add -D typescript
```


```bash [bun]
bun add -d typescript
```

::

and finally we will add tailwind.

::code-group

```bash [pnpm]
pnpm dlx nuxi@latest module add @nuxtjs/tailwindcss
```
```bash [npm]
npx nuxi@latest module add @nuxtjs/tailwindcss
```

```bash [yarn]
yarn dlx nuxi@latest module add @nuxtjs/tailwindcss
```


```bash [bun]
bunx nuxi@latest module add @nuxtjs/tailwindcss
```

::

We now want to add the shadcn nuxt module.

::code-group

```bash [pnpm]
pnpm dlx nuxi@latest module add shadcn-nuxt
```
```bash [npm]
npx nuxi@latest module add shadcn-nuxt
```

```bash [yarn]
yarn dlx nuxi@latest module add shadcn-nuxt
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

```bash [pnpm]
pnpm dlx shadcn-vue@latest init
```
```bash [npm]
npx shadcn-vue@latest init
```

```bash [yarn]
yarn dlx shadcn-vue@latest init
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

```bash [pnpm]
pnpm dlx npx shadcn-vue@latest add button input 
```
```bash [npm]
npx npx shadcn-vue@latest add button input
```

```bash [yarn]
yarn dlx npx shadcn-vue@latest add button input
```


```bash [bun]
bunx npx shadcn-vue@latest add button input
```
::

## Build a basic app

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

## Backend with Resend

Now we can implement Resends logic. First we need [create an account with Resend](https://resend.com/signup) and [get your API key](https://resend.com/docs/dashboard/api-keys/introduction). 

Once you have your API key. You should create a `.env` file at the root of your directory and add the API key here.

::code-group

```bash [.env]
RESEND_API_KEY=you_key_goes_here
```
::


Now we need to create an endpoint that will handle adding the email address to our resend audience and sending them a thankyou email.

Create a new file in `server/api/newsletter.post.ts` and add the following code.

```ts
import { Resend } from "resend";

export default defineEventHandler(async (event: any) => {
  const resend = new Resend(process.env.RESNED_API_KEY);
  const { email } = await readBody(event);

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: YOUR_AUDIENCE_ID,
    });

    if (error) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello",
      html: "<p>Thank you for joining my newsletter</p>",
    });

    return {
      statusCode: 200,
      body: "You have been added to the newsletter",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
});
```

Finally all that is left to do is to hook the frontend up to this api call


```ts
const handleSubmitNewsletter = async (email: string) => {
  const response = await $fetch("/api/newsletter", {
    method: "POST",
    body: { email },
  });

  if (response.statusCode === 200) {
    toast(response.body);
  } else {
    toast("Error", {
      description: response.body || "An error occurred",
    });
  }
};
```

Now just add this function to your current frontend

```vue
<script lang="ts" setup>
const email = ref<string | null>(null);
const handleSubmitNewsletter = async (email: string) => {
  const response = await $fetch("/api/newsletter", {
    method: "POST",
    body: { email },
  });

  if (response.statusCode === 200) {
    toast(response.body);
  } else {
    toast("Error", {
      description: response.body || "An error occurred",
    });
  }
};
</script>

<template>
  <div class="space-x-2 max-w-md mx-auto my-auto mt-20 border border-border px-6 py-12  rounded-lg">
    <p class="pl-2">Hey 👋</p>
    <h1 class="text-3xl font-extrabold  mb-2">Join my newsletter!</h1>
    <p class=" mb-16">We talk about <i>amazing things</i>, delivered to your inbox <b>every Saturday</b>.</p>
    <div class="flex gap-2 ">


    <Input type="email" placeholder="Your email" v-model="email"/>
    <Button @click="handleSubmitNewsletter(email)">Join newsletter</Button>
    </div>
 </div>
</template>
```

And we have a working newsletter!
