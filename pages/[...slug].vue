<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <article class="prose prose-2xl mx-auto">
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
        <h1 class="text-center">{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </NuxtLayout>
</template>
