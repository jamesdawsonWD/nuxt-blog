<script setup lang="ts">
import type { _opacity } from "#tailwind-config/theme";
import { useResizeObserver } from "@vueuse/core";

const subtitleRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const subtitleHeight = ref(0);
const headerHeight = ref(0);
const subtitleX = ref(0);
const rollTextSpeed = 200;
useResizeObserver([subtitleRef, headerRef], (entries) => {
  const subtitle = entries[0];
  const header = entries[1];
  const { height: sHeight } = subtitle.contentRect;
  const { height: hHeight } = header.contentRect;
  subtitleHeight.value = sHeight;
  headerHeight.value = hHeight;
});
</script>
<template>
  <NuxtLayout>
    <section class="mx-auto mt-60">
      <div class="relative">
        <h5
          class="font-inter font-extralight text-foreground text-center leading-none text-xl tracking-[40px] absolute left-0 right-0"
          v-motion="{
            initial: {
              opacity: 0,
            },
            enter: {
              opacity: 1,
              transition: {
                delay: rollTextSpeed * 6,
              },
            },
          }"
        >
          James Dawson
        </h5>
        <h2
          class="text-foreground font-julius-sans text-[9vw] leading-none text-center"
          ref="subtitleRef"
        >
          <span
            v-motion="{
              initial: {
                y: 100,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
              },
            }"
            >The
          </span>
          <span
            v-motion="{
              initial: {
                y: 100,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: rollTextSpeed,
                },
              },
            }"
            >future
          </span>
          <span
            v-motion="{
              initial: {
                y: 100,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: rollTextSpeed * 2,
                },
              },
            }"
            >is
          </span>
          <span
            v-motion="{
              initial: {
                y: 100,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: rollTextSpeed * 3,
                },
              },
            }"
            >for
          </span>
        </h2>
        <div
          :style="{ top: `${Math.floor(subtitleHeight) / 1.6}px` }"
          class="absolute left-0 right-0"
          ref="headerRef"
        >
          <h1
            class="text-primary font-lalezar text-[21vw] leading-none text-center drop-shadow-header"
            v-motion="{
              initial: {
                opacity: 0,
                scale: 100,
              },
              enter: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: rollTextSpeed * 4,
                  duration: 300,
                },
              },
            }"
          >
            BUILDERS
          </h1>
        </div>
      </div>
      <div :style="{ 'margin-top': `${Math.floor(headerHeight) / 1.88}px` }">
        <p
          class="font-inter text-foreground text-center pt-20 text-2xl"
          v-motion="{
            initial: {
              opacity: 0,
              y: 40,
            },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay: rollTextSpeed * 6,
              },
            },
          }"
        >
          This blog is for the people who want to
          <span class="text-primary">>></span><b>build</b> cool shit. <br />
          We discuss code, design, prototyping, hackathons & growth.
        </p>
        <div
          v-motion="{
            initial: {
              opacity: 0,
              y: 40,
            },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay: rollTextSpeed * 7,
              },
            },
          }"
          class="flex items-center justify-center flex-col gap-8 pt-20"
        >
          <Button class="mx-auto drop-shadow-header">Join for free</Button>
          <p class="font-inter text-foreground text-2xl">
            The
            <span class="text-primary">>></span><b>build</b> newsletter drops
            every Sunday.
          </p>
        </div>
      </div>
    </section>
    <section
      class="grid grid-cols-12 max-w-7xl mx-auto gap-20 pt-40"
      v-motion="{
        initial: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
          transition: {
            delay: rollTextSpeed * 6,
          },
        },
      }"
    >
      <ContentList path="/articles" v-slot="{ list }">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          class="col-span-4 prose"
          :to="`${article._path}`"
        >
          <NuxtImg
            :width="500"
            :height="500"
            :src="`/blogs/${article.heroImage}`"
            class="rounded-xl"
          />
          <h2 class="text-foreground text-xl mt-4 font-semibold px-2">
            {{ article.title }}
          </h2>
          <p class="text-foreground px-2">{{ article.description }}</p>
          <div class="flex justify-between items-center px-2 mt-4">
            <p class="text-foreground font-extralight tracking-wide">James Dawson</p>
            <p class="text-foreground font-extralight tracking-wide">{{ article.pubDate }}</p>
          </div>
        </NuxtLink>
      </ContentList>
    </section>
  </NuxtLayout>
</template>
