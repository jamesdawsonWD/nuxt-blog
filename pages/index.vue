<script setup lang="ts">
import type { _opacity } from "#tailwind-config/theme";
import { useResizeObserver } from "@vueuse/core";
import Input from "~/components/ui/input/Input.vue";
import { toast } from "vue-sonner";

const subtitleRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const subtitleHeight = ref(0);
const headerHeight = ref(0);
const subtitleX = ref(0);
const rollTextSpeed = 200;
const email = ref<string | null>(null);
const isSignedup = ref(false);

onMounted(() => {
  isSignedup.value = !!localStorage.getItem("signedup");
});

useResizeObserver([subtitleRef, headerRef], (entries) => {
  const subtitle = entries[0];
  const header = entries[1];
  const { height: sHeight } = subtitle.contentRect;
  const { height: hHeight } = header.contentRect;
  subtitleHeight.value = sHeight;
  headerHeight.value = hHeight;
});

const handleSubmitNewsletter = async (email: string) => {
  const response = await $fetch("/api/newsletter", {
    method: "POST",
    body: { email },
  });

  if (response.statusCode === 200) {
    toast(response.body);
    localStorage.setItem("signedup", "true");
    isSignedup.value = true;
  } else {
    console.log("Error in handleSubmitNewsletter:", response.body);
    toast("Error", {
      description: response.body || "An error occurred",
    });
  }
};
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
          <div class="flex gap-4 max-w-md w-full" v-if="!isSignedup">
            <Input
              type="email"
              placeholder="Enter your email"
              class="w-full text-foreground"
              v-model="email"
            />
            <Button class="mx-auto" @click="handleSubmitNewsletter(email)"
              >Join for free</Button
            >
          </div>
          <p
            v-else
            class="font-inter text-foreground text-md xl:text-lg text-center"
          >
            You are <span class="text-primary">signed up</span>
          </p>
          <p class="font-inter text-foreground text-md xl:text-lg text-center">
            New blog posts <i>every Sunday</i>.
          </p>
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
      <ContentList path="/articles" v-slot="{ list }">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          class="prose w-fit mx-auto"
          :to="`${article._path}`"
        >
          <NuxtImg
            :width="500"
            :height="300"
            :src="`/blogs/${article.heroImage}`"
            class="rounded-xl"
          />
          <h2 class="text-foreground text-xl mt-4 font-semibold px-2">
            {{ article.title }}
          </h2>
          <p class="text-foreground px-2">{{ article.description }}</p>
          <div class="flex justify-between items-center px-2 mt-4">
            <p class="text-foreground font-extralight tracking-wide">
              James Dawson
            </p>
            <p class="text-foreground font-extralight tracking-wide">
              {{ article.pubDate }}
            </p>
          </div>
        </NuxtLink>
      </ContentList>
    </section>
  </NuxtLayout>
</template>
