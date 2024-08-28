<template>
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
  <p v-else class="font-inter text-foreground text-md xl:text-lg text-center">
    You are <span class="text-primary">signed up</span>
  </p>
  <p class="font-inter text-foreground text-sm text-center">
    New blog posts <i>every Sunday</i>.
  </p>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const email = ref<string | null>(null);
const isSignedup = ref(false);

onMounted(() => {
  isSignedup.value = !!localStorage.getItem("signedup");
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
