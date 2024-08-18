---
title: "How to build a trailing gradient button"
description: "Step by step reverse design engineering a trailing conic gradient button"
pubDate: "Feb 13 2024"
heroImage: ""
component: "RaycastConicStart"
---

Ok, so I have been getting really inspired in my designs recently because of the [raycast landing page](https://raycast.com). The whole site is really beautiful but there is one thing that I am really into.

It took me a lot longer than I want to admit to get this to finally work and the process was super fascinating. Let's dive in!

## Conic gradients

This button has a lot of different moving parts but lets look at the most basic element. The conic gradient. What's a conic gradient?

`The conic-gradient() CSS function creates an image consisting of a gradient with color transitions rotated around a center point (rather than radiating from the center). Example conic gradients include pie charts and color wheels.`

Let's look at at basic conic gradient.

```css
background: conic-gradient(red, orange, yellow, green, blue);
```

::basic-conic-gradient
::

Pretty! Now lets get back to the raycast button. If we add the following code, we will get the conic that is being used for the trailing effect.

```css
.basic-conic {
  background: conic-gradient(
      from -80deg at 30px 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
}
```

What we have here is a conic that has been rotated `-80deg` (Which is why the gradient is pointing to the top left corner and not straight up). It is positioned at `x: 30px y:15px`, this is why it is moved in slightly from the top left corner as well. The rest of the code is implementing the actual conic gradient so it goes from `transparent` to `#eca5a7` to `transparent` again at each stop and finally `#452324`

## The animation breakdown

::raycast-conic-start
::

Ok cool, but this doesn't look anything like the button! Yes, we have a few more steps to go. I think now what we should do is try and get this gradient to move. There are too options for this, you can animate it in javascript or you can alter the properties of the conic itself. The implementation that I did uses pure css, though it is using the [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) which is a css at-rule from the [Houdini API ](https://developer.mozilla.org/en-US/docs/Web/API/Houdini_APIs) and is not available on all legacy browsers, so check it out before you add it to production.

Let us get the gradient moving back and forward first and then we can worry about the rotation. Let's look at the following example.

```html
<div class="basic-conic animate"></div>
```

```css
@property --position {
  syntax: "<length>";
  initial-value: 0;
  inherits: false;
}

.basic-conic {
  width: 243px;
  height: 33px;
  border-radius: 10000px;
  background: conic-gradient(
      from -80deg at var(--position) 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
}

.animate {
  animation: moveAnimation -0.64s linear 3s infinite;
}

@keyframes moveAnimation {
  0% {
    --position: 20px;
  }
  32.8228% {
    --position: 243px;
  }
  50% {
    --position: 243px;
  }
  82.8228% {
    --position: 20px;
  }
  100% {
    --position: 20px;
  }
}
```

::raycast-conic-moving-position
::

Are you starting to see it? Next up what we need to add is the rotation.

```html
<div class="basic-conic animate"></div>
```

```css
@property --position {
  syntax: "<length>";
  initial-value: 0;
  inherits: false;
}

.basic-conic {
  width: 320px;
  height: 80px;
  background: conic-gradient(
      from -80deg at at var(--position) 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
}

.animate {
  animation:
    moveAnimation -0.64s linear 3s infinite,
    rotateAnimation -0.64s linear 3s infinite;
}

@keyframes rotateAnimation {
  0% {
    --rotation: 0deg;
  }
  32.8228% {
    --rotation: 0deg;
  }
  50% {
    --rotation: 180deg;
  }
  82.8228% {
    --rotation: 180deg;
  }
  100% {
    --rotation: 360deg;
  }
}

@keyframes moveAnimation {
  0% {
    --position: 20px;
  }
  32.8228% {
    --position: 230px;
  }
  50% {
    --position: 230px;
  }
  82.8228% {
    --position: 20px;
  }
  100% {
    --position: 20px;
  }
}
```

::raycast-conic-moving-and-rotating
::

Now all we need to do is add the masking layer with our actual button ontop. We will also add a cool glowing effect and we should have the final component!

```html
<a
  class="announcement-link no-underline"
  rel="external"
  href="/blog/more-ai-models"
>
  <span class="no-underline !font-white">Pretty cool?</span>
  <span class="muted flex no-underline"
    >Click me and see
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      class="w-4"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
      ></path>
    </svg>
  </span>
</a>
```

```css
.announcement:hover {
  background-color: #833637;
  box-shadow: 0 0 20px 3px rgba(245, 49, 108, 0.25);
}
.announcement-link {
  display: flex;
  flex-wrap: nowrap;
  gap: 13px;
  align-items: center;
  height: 30px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
  background: #130d0e;
  border-radius: 1000px;
}
.announcement > svg {
  width: 10px;
}
```

And voila! Here we have a trailing effect made entirely with css!

::raycast-button
::
