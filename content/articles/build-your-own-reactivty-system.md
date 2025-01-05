---
title: "Build your own reactivity system"
description: "A beginners guide to understanding reactivity in JavaScript"
pubDate: "Jan 04 2025"
date: "2025-01-04"
heroImage: "/reactivity-system.webp"
component: ""
---

> TLDR: You can explore the complete project on [StackBlitz](https://stackblitz.com/edit/reactivity-system-james-dawson?file=src%2Fref.ts,src%2Fmain.ts,src%2Fstyle.css&terminal=dev).

Modern-day programming is all about speed. You install a framework, a UI library, let AI generate your code and have something that is pretty impressive off the bat. These tools are incredible, but many experienced developers worry that newer programmers might stop questioning how all this abstraction works under the hood.. I would argue with AI, there has never been a better time to get a deeper and more specific knowledge on how the frameworks and plugins that we use everyday are built and understood. You have in your pocket a reasonably competent colleague who has moderately deep domain knowledge in many popular niches.

So let's put it to use! Today we are going to look at the different reactivity systems for frontend frameworks. Their strengths and trade offs, which frameworks have chose which and what is really happening under all this abstraction.

::hello
::
## What is a reactivity system?

Reactivity is a common programming paradigm for mutating or "reacting" to changes between two pieces of separate data. A reactive system automatically updates dependent values when data changes, like how a spreadsheet formula adjusts when you modify a cell.

| A            | B   | C   |
| ------------ | --- | --- |
| 1            |     |     |
| 2            |     |     |
| =SUM(A1, A2) |     |     |

This simple formula will create an output like the one below.

| A   | B   | C   |
| --- | --- | --- |
| 1   |     |     |
| 2   |     |     |
| 3   |     |     |

In a spreadsheet a basic SUM formula is considered to be reactive. Since if we mutate A2, which is one of the formula's dependencies, the program will update A3 automatically.

| A   | B   | C   |
| --- | --- | --- |
| 1   |     |     |
| 4   |     |     |
| 5   |     |     |

This is the nuts and bolts of a reactive system. Now how can we represent the same thing in JavaScript?

## A basic reactivity system

Let's try and create and simple reactivity system that will emulate the spreadsheet above. We will be using only typescript for this project. As always you can see the complete project[here](https://stackblitz.com/edit/reactivity-system-james-dawson?file=src%2Fref.ts,src%2Fmain.ts,src%2Fstyle.css&terminal=dev).

#### The reactive property

We will create a basic typescript composable called `ref.ts`. This will be the building block for our reactive system, there are three pieces of functionality that we need.

- `get` the current value of the `ref`
- `subscribe` to the `ref` and execute some code when the `ref`'s active value is updated
- `set` a new value of the `ref`, execute any `subscribers` who are listening for changes

```ts
type Subscriber<T> = (newValue: T) => void;

export function ref(value: string | number) {
  if (value === undefined || value === null) {
    throw new Error('Error: Ref must be defined');
  }

  let activeValue = value;
  const subscribers: Subscriber<typeof value>[] = [];

  // Get the active value
  function get() {
    return activeValue;
  }

  // Sets a new value and calls each subscribe that has been appeneded
  function set(newValue: typeof value) {
    if (activeValue !== newValue) {
      activeValue = newValue;
      subscribers.forEach((subscriber) => subscriber(activeValue));
    }
  }

  // subscribes to this reactive property, when set is called all subscribers will execute as well!
  function subscribe(subscriber: Subscriber<typeof value>) {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  return { get, set, subscribe };
}
```

Above we have the final output, I always think it is good to have a quick scan over the whole code and then break everything down individually.

#### get()

This function is very simple and just returns the current active value

#### subscribe()

The `subscribe` function takes a callback function as its parameter and push this function to the subscribers array, that is it! The code will now execute when to the active value is updated. We also have some unsubscribe logic baked into the subscribe function.

```js
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
```

You would be able to unsubscribe from a `ref` like this.

```ts
const unsubscribe = subscribe((newValue) => { console.log('New Value:', newValue); }); 

// This will unsubscribe from listening to updates
unsubscribe();
```

#### set()

Where all the magic happens! When we set a new value, we update the `activeValue` and loop through all the functions that are stored in the subscribers array and execute each one.

That is pretty much all that is going on!

## Let's see it in action

In the stackblitz I made a basic app for you to play around and see how the reactivity works. Let's break it down.

```ts

const app = document.querySelector<HTMLDivElement>('#app')!;

// create basic elements
const firstElement = document.createElement('div');
const secondElement = document.createElement('div');
const inputElement = document.createElement('input');

inputElement.type = 'text';
inputElement.placeholder = 'Update title...';

// append to DOM
app.appendChild(firstElement);
app.appendChild(secondElement);
app.appendChild(inputElement);
```

We are grabbing out `app` element and appending a two divs and a single input to the DOM.

```ts
// Create reactive property
const title = ref('Subscribe to the blog');

firstElement.innerHTML = `First element: ${title.get()}`;
secondElement.innerHTML = `Second Element ${title.get()}`;

// Create two subscribers to the reactive value
title.subscribe((newTitle) => {
  firstElement.innerHTML = `First element: ${newTitle}`;
});

title.subscribe((newTitle) => {
  secondElement.innerHTML = `Second element: ${newTitle}`;
});
```

We then create a reactive string variable using our `ref` composable. Then we set the `innerHTML` to the first and second div to use the `ref`'s `get()` function. Afterwards, we subscribe to the reactive `title` and on a change we update the firstElement's `innerHTML` to the new value and we do the same for the second element.

 Finally we have add an event listener to the input to set the new value for the `title` when the input is updated.
 
 ```ts
 inputElement.addEventListener('input', (event) => {
  let value = (event.target as HTMLInputElement).value;
  value = value === '' ? 'Subscribe the the blog' : value;
  title.set(value);
});
```

## Conclusion

By building this simple reactive system, you've taken a first step into understanding how popular frameworks handle data binding under the hood. Different frameworks optimize this concept in unique ways, handling edge cases like batching updates and performance optimization. We'll dive into those advanced patterns next week, so stay tuned!