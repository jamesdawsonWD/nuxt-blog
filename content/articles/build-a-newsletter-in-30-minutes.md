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

Amazing, now let’s make ourselves a quick landing page.

This should all do the job! We now need an endpoint to send the signup request to, along with the users actual email address.

Now we can implement Resends logic. First we need to go to Resend, create an account and get our API key. Then we just add it to our .env file.

Cool, so now we add in the code to add someone to our audience and we send them a thankyou email.

Finally all that is left to do is to hook the frontend up to this api call…

And we have a working newsletter
