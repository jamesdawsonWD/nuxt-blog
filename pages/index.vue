<script setup lang="ts">
import type { _opacity } from "#tailwind-config/theme";
import { useResizeObserver } from "@vueuse/core";
import Input from "~/components/ui/input/Input.vue";
const query = {
  path: "/articles",
  sort: [{ date: -1 }],
};

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
    <section class="mx-auto mt-60 w-full max-w-7xl">
      <div class="relative flex flex-col items-center">
        <h5
          class="font-inter font-extralight text-foreground text-center leading-none text-xl tracking-[10px] lg:tracking-[30px] absolute -top-10 left-0 right-0"
          v-motion="{
            initial: {
              opacity: 0,
            },
            enter: {
              opacity: 1,
              transition: {
                delay: rollTextSpeed * 7,
              },
            },
          }"
        >
          James Dawson
        </h5>
        <h2
          class="text-foreground font-julius-sans text-[5vw] leading-none text-center"
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
        <div class="left-0 m-auto" ref="headerRef">
          <h1
            class="text-primary font-lalezar text-[12vw] leading-none drop-shadow-header"
            v-motion="{
              initial: {
                opacity: 0,
              },
              enter: {
                opacity: 1,
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
      <div>
        <p
          class="font-inter text-foreground text-center text-lg xl:text-2xl"
          v-motion="{
            initial: {
              opacity: 0,
              y: 10,
            },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay: rollTextSpeed * 7,
              },
            },
          }"
        >
          This blog is for the people who want to
          <span class="text-primary">>></span><b>build</b> cool shit.
        </p>
        <div
          v-motion="{
            initial: {
              opacity: 0,
              y: 10,
            },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay: rollTextSpeed * 8,
              },
            },
          }"
          class="flex items-center justify-center flex-col gap-8 pt-20"
        >
          <BespokeNewsLetterSignup />
        </div>
      </div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-2 mx-auto gap-20 pt-40 px-8 md:px-12 lg:px-40 w-full max-w-7xl"
      v-motion="{
        initial: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
        },
      }"
    >
      <ContentList :query="query" path="/articles" v-slot="{ list }">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          class="w-full mx-auto flex flex-col bg-zinc-950 p-6 rounded-xl border border-zinc-900"
          :to="`${article._path}`"
        >
          <div
            class="w-full"
            style="
              height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <div v-if="article.heroImage" class="w-full h-full">
              <NuxtImg
                fit="fill"
                :width="500"
                :height="300"
                :src="`/blogs/${article.heroImage}`"
                class="rounded-xl w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="bg-background rounded-xl h-full w-full flex items-center justify-center"
            >
              <ClientOnly>
                <div>
                  <component :is="article.component" class="h-full w-full" />
                </div>
              </ClientOnly>
            </div>
          </div>
          <h2 class="text-foreground mt-6 font-semibold px-2 mb-1">
            {{ article.title }}
          </h2>
          <p class="text-zinc-300 px-2 text-sm">{{ article.description }}</p>
          <div
            class="flex justify-between items-center px-2 mt-6 text-zinc-400"
          >
            <p class="font-extralight tracking-wide text-sm">James Dawson</p>
            <p class="font-extralight tracking-wide text-sm">
              {{ article.pubDate }}
            </p>
          </div>
        </NuxtLink>
      </ContentList>
    </section>
  </NuxtLayout>
</template>
