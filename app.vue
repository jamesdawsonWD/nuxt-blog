<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner";
import { Analytics } from "@vercel/analytics/nuxt";
</script>

<template>
  <Analytics />
  <div>
    <NuxtPage />
  </div>
  <Toaster />
</template>
