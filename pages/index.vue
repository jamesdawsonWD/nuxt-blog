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
    <section class="mx-auto mt-60">
      <div class="relative">
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
      <div :style="{ 'margin-top': `${Math.floor(headerHeight) / 1.88}px` }">
        <p
          class="font-inter text-foreground text-center pt-20 text-lg xl:text-2xl"
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
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto gap-20 pt-40 px-8 md:px-12 lg:px-40"
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
          class="w-fit mx-auto flex flex-col bg-zinc-950 p-4 rounded-xl border border-zinc-900"
          :to="`${article._path}`"
        >
          <div v-if="article.heroImage" class="w-full mb-6">
            <NuxtImg
              fit="fill"
              :width="500"
              :height="300"
              :src="`/blogs/${article.heroImage}`"
              class="rounded-xl"
            />
          </div>
          <div v-else class="bg-background rounded-xl mb-6">
            <ClientOnly>
              <div>
                <component :is="article.component" />
              </div>
            </ClientOnly>
          </div>
          <h2 class="text-foreground mt-4 font-semibold px-2 mb-4">
            {{ article.title }}
          </h2>
          <p class="text-foreground px-2 text-sm">{{ article.description }}</p>
          <div class="flex justify-between items-center px-2 mt-4">
            <p class="text-foreground font-extralight tracking-wide text-sm">
              James Dawson
            </p>
            <p class="text-foreground font-extralight tracking-wide text-sm">
              {{ article.pubDate }}
            </p>
          </div>
        </NuxtLink>
      </ContentList>
    </section>
  </NuxtLayout>
</template>
