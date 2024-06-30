<script setup lang="ts">
const rollTextSpeed = 300;
</script>

<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <article
        class="prose prose-neutral prose-2xl mx-auto !text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground "
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
          :width="1028"
          :height="502"
          :src="`/blogs/${doc.heroImage}`"
          class="rounded-xl"
        />
        <h1 class="text-center">
          {{ doc.title }}
        </h1>
        <div>
          <ContentRenderer :value="doc" />
        </div>
      </article>
    </ContentDoc>
  </NuxtLayout>
</template>
