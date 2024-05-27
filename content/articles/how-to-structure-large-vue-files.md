---
title: "How to avoid spaghetti code in your vue files"
description: "Structuring vue files with inline composables"
pubDate: "May 14 2024"
heroImage: "/robot-spaghetti.webp"
---

I must confess that I have been guilty in the past of following some pretty abhorent techniques for code organization in my vue learning journey but composables are the way to go! Let's get into it!

#### So you want to build an app

When you first start out building larger files in vue you can quickly see that you are storing a lot of logic and everything gets quite confusing. So you decide to go with the approach of grouping everything together. Let's look at this small file and see why we can be attracted towards this.

#### A simple todo:

The goal is is to show you the less optimal (and very common) way to structure our vue code. **You do not need to read all the code**! Just glance through and ask yourself how easy you find it to understand.

```vue [file.js]{4-6,7} meta-info=val
<template>
  <h1>NEXT: {{ priority }}</h1>
  <ul>
    <li v-for="item in todos" :key="item">
      {{ item }}
      <button @click="makePriority(item)">Make Priority</button>
      <button @click="remove(item)">Remove</button>
    </li>
  </ul>
  <input v-model="newTodo" placeholder="New todo" />
  <button @click="add(newTodo)">Add</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const todos = ref(['Take out trash', 'clean room', 'write blog']);
const newTodo = ref('');
const priority = ref(todos.value[0]);

function makePriority(item: string) {
  priority.value = item;
}

function add(item: string) {
  if (item.trim()) {
    todos.value.push(item);
    item.value = ''; 
  }
}

function remove(item: string) {
  const idx = todos.value.indexOf(item);
  if (idx !== -1) {
    todos.value.splice(idx, 1); // Remove the item
  }
}
</script>
```
I have made a very simple todo app, we have the logic for adding and removing todo items from a todo list and setting a todo item to be our priority. All very straight forward things that you would of seen before. But look how we have groups everything, we have our refs together, followed by our computed and followed by our functions.

While this looks neat on page with very little logic, when it comes to the real world this won't suffice. Let's see what happens if we add in functionality to start a timer when we select an item as a priority.

#### A little bit more complex:*

Ok, we now we have thought of a cool feature for our todo app! What if we could have some kind of timer to track when we start a priority todo! What a great idea! Let's add it in!

```vue
<template>
  <h1>NEXT: {{ priority }} - TIMER: {{ timeElapsedString }}</h1>
  <ul>
    <li v-for="item in todos" :key="item">
      {{ item }}
      <button @click="makePriority(item)">Make Priority</button>
      <button @click="remove(item)">Remove</button>
    </li>
  </ul>
  <input v-model="newTodo" placeholder="New todo" />
  <button @click="add(newTodo)">Add</button>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const todos = ref(['']);
const newTodo = ref('');
const priority = ref('');
const timeElapsed = ref(0);
let timer: number | null = null;

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timeElapsed.value = 0; // Reset the timer
  timer = setInterval(() => {
    timeElapsed.value++;
  }, 1000);
}

function makePriority(item: string) {
  priority.value = item;
}

function add(item: string) {
  if (item.trim()) {
    todos.value.push(item);
    newTodo.value = ''; // Clear the input field
  }
}

function remove(item: string) {
  const idx = todos.value.indexOf(item);
  if (idx !== -1) {
    todos.value.splice(idx, 1); // Remove the item
  }
}

watch(priority, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    startTimer();
  }
});
watch(timeElapsed, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue > 30) {
    timeElapsed.value = 0;
    alert('Times up');
  }
});

// Start the timer when the component is mounted
onMounted(() => {
  todos.value = ['Walk dog', 'Write blog', 'Water plants'];
  priority.value = todos.value[0];
  startTimer();
});

// Compute the elapsed time in MM:SS format
const timeElapsedString = computed(() => {
  const minutes = Math.floor(timeElapsed.value / 60);
  const seconds = timeElapsed.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});
</script>
```

#### It begins to become silly*

Ok you have been speaking to the product team and they have requested that you add in a subtask list for your todos. So each todo will have add and remove logic for its subtasks. No problem you say! Let's get building!

```vue
<template>
  <h1>NEXT: {{ priority }} - TIMER: {{ timeElapsedString }}</h1>
  <ul>
    <li v-for="item in todos" :key="item">
      {{ item }} <button @click="makePriority(item)">Make Priority</button>
      <button @click="removeTodo(item)">Remove</button>

      <h4>Subtasks:</h4>
      <ul>
        <li v-for="(item, index) in subtasks" :key="item">
          {{ item }}
          <button @click="remove(item)">Remove</button>
        </li>
      </ul>
      <input v-model="newSubtask[index]" placeholder="New subtask" />
      <button @click="add(newTodo)">Add</button>
    </li>
  </ul>
  <input v-model="newTodo" placeholder="New todo" />
  <button @click="addTodo(newTodo)">Add</button>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

// state
const todos = ref([]);
const subtasks = ref([]);
const newTodo = ref();
const newSubtasks = ref<string[]>([]);
const priority = ref();
const timeElapsed = ref(0);
let timer: number | null = null;
const DEADLINE = 60 * 15;
// functions
function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timeElapsed.value = 0;
  timer = setInterval(() => {
    timeElapsed.value++;
  }, 1000);
}

function makePriority(item: string) {
  priority.value = item;
}

function addTodo(item: string) {
  if (item.trim()) {
    todos.value.push(item);
    newTodo.value = '';
  }
}

function removeTodo(item: string) {
  const idx = todos.value.indexOf(item);
  if (idx !== -1) {
    todos.value.splice(idx, 1);
  }
}
function addSubtask(item: string) {
  if (item.trim()) {
    subtasks.value.push(item);
    newTodo.value = '';
  }
}

function removeSubtask(item: string) {
  const idx = subtasks.value.indexOf(item);
  if (idx !== -1) {
    subtasks.value.splice(idx, 1);
  }
}

// watch
watch(priority, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    startTimer();
  }
});
watch(timeElapsed, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue > DEADLINE) {
    timeElapsed.value = 0;
    alert('Times up');
  }
});

// computed
const timeElapsedString = computed(() => {
  const minutes = Math.floor(timeElapsed.value / 60);
  const seconds = timeElapsed.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Start the timer when the component is mounted
onMounted(() => {
  todos.value = ['Walk dog', 'Write blog', 'Water plants'];
  priority.value = todos.value[0];
  startTimer();
});
</script>
```

And we can safely say we are starting to enter into code spaghetti territory. I have fallen into this trap and with new vue developers it seems to be a very common pitfall. But there is a better way!

## A better way you say?

Yes! And you probably already know the anwser. Using the power of composables. Not only can composables be used to create reuable sections of code, they can be used to logically group our own vue code into chunks. The code lives within the page and, if needed, can easily become new composable file because of the pre work we have done. But that is not the reason why to do this, we are not trying to pre optimize, but to make our logic clearer to understand. Let's have a look at the refactored page.

```vue
<template>
  <h1>NEXT: {{ priority }} - TIMER: {{ timeElapsedString }}</h1>
  <ul>
    <li v-for="item in todos" :key="item">
      {{ item }} <button @click="makePriority(item)">Make Priority</button>
      <button @click="removeTodo(item)">Remove</button>

      <h4>Subtasks:</h4>
      <ul>
        <li v-for="(item, index) in subtasks" :key="item">
          {{ item }}
          <button @click="remove(item)">Remove</button>
        </li>
      </ul>
      <input v-model="newSubtask[index]" placeholder="New subtask" />
      <button @click="add(newTodo)">Add</button>
    </li>
  </ul>
  <input v-model="newTodo" placeholder="New todo" />
  <button @click="addTodo(newTodo)">Add</button>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const useTodoState = () => {
  const todos = ref([]);
  const newTodo = ref();
  const priority = ref();

  function makePriority(item: string) {
    priority.value = item;
  }

  function addTodo(item: string) {
    if (item.trim()) {
      todos.value.push(item);
      newTodo.value = '';
    }
  }

  function removeTodo(item: string) {
    const idx = todos.value.indexOf(item);
    if (idx !== -1) {
      todos.value.splice(idx, 1);
    }
  }

  onMounted(() => {
    todos.value = ['Walk dog', 'Write blog', 'Water plants'];
    priority.value = todos.value[0];
  });

  return {
    todos,
    newTodo,
    priority,
    addTodo,
    removeTodo,
    makePriority,
  };
};

const useSubtaskState = () => {
  const subtasks = ref([]);
  const newSubtasks = ref<string[]>([]);

  function addSubtask(item: string) {
    if (item.trim()) {
      subtasks.value.push(item);
      newTodo.value = '';
    }
  }

  function removeSubtask(item: string) {
    const idx = subtasks.value.indexOf(item);
    if (idx !== -1) {
      subtasks.value.splice(idx, 1);
    }
  }

  return {
    subtasks,
    newSubtasks,
    addSubtask,
    removeSubtask,
  };
};

const usePriorityTimer = (priority: Ref<string>) => {
  const timeElapsed = ref(0);
  let timer: number | null = null;
  const DEADLINE = 60 * 15;

  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }
    timeElapsed.value = 0;
    timer = setInterval(() => {
      timeElapsed.value++;
    }, 1000);
  }

  watch(priority, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      startTimer();
    }
  });
  watch(timeElapsed, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue > DEADLINE) {
      timeElapsed.value = 0;
      alert('Times up');
    }
  });

  const timeElapsedString = computed(() => {
    const minutes = Math.floor(timeElapsed.value / 60);
    const seconds = timeElapsed.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  onMounted(() => {
    startTimer();
  });

  return {
    timeElapsedString,
  };
};

const { todos, newTodo, priority, addTodo, removeTodo, makePriority } =
  useTodoState();

const { subtasks, newSubtasks, addSubtask, removeSubtask } = useSubtaskState();
const { timeElapsedString } = usePriorityTimer(priority);
</script>
```
## Voila!

I hope you see the value in inline composables as much as I do and they make your code a lot less spaghetti!
