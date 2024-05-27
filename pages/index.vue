<template>
  <NuxtLayout>
    <section class="grid grid-cols-12 max-w-7xl mx-auto  gap-20">
      <ContentList path="/articles" v-slot="{ list }">
        <NuxtLink v-for="article in list" :key="article._path" class="col-span-4 prose" :to="`${article._path}`">
          <NuxtImg
            :width="500"
            :height="500"
            :src="`/blogs/${article.heroImage}`"
            class="rounded-xl"
          />
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </NuxtLink>
      </ContentList>
    </section>
  </NuxtLayout>
</template>
