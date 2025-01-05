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
        <h1 class="text-center">
          {{ doc.title }}
        </h1>

        <NuxtImg
          v-if="doc.heroImage"
          :width="1028"
          :height="502"
          :src="`/blogs/${doc.heroImage}`"
          class="rounded-xl"
        />
        <div v-else class="py-20">
          <component :is="doc.component" />
        </div>
        <div class="flex justify-between items-center w-full mb-8">
          <p class="text-center m-0">{{ doc.pubDate }}</p>

          <div class="flex gap-4 items-center justify-center">
            <Avatar>
              <AvatarImage src="/blogs/james.jpg" alt="@radix-vue" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p class="m-0">James Dawson</p>
          </div>
        </div>
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
