<script setup lang="ts">
const rollTextSpeed = 300;
</script>

<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <article
        class="prose prose-pink prose-lg mx-auto"
        v-motion="{
          initial: {
            opacity: 0,
            y: 20,
          },
          enter: {
            opacity: 1,
            y: 0,
            transition: {
              delay: rollTextSpeed * 1,
            },
          },
        }"
      >
        <div class="flex justify-between w-full">
          <p class="text-center">{{ doc.pubDate }}</p>
          <p>by James Dawson</p>
        </div>
        <NuxtImg
          v-if="doc.heroImage"
          :width="1028"
          :height="502"
          :src="`/blogs/${doc.heroImage}`"
          class="rounded-xl"
        />
        <component :is="doc.component" v-else />
        <h1 class="text-center">
          {{ doc.title }}
        </h1>
        <div>
          <ContentRenderer :value="doc" />
        </div>
        <div class="flex items-center justify-center flex-col gap-8 pt-20">
          <div class="space-y-2 mb-8">
            <h2 class="mb-0 text-center">Become a better builder</h2>
            <p>Join our newsletter for frontend tip and tricks.</p>
          </div>
          <BespokeNewsLetterSignup />
        </div>
      </article>
    </ContentDoc>
  </NuxtLayout>
</template>
