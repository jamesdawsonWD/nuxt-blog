<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner";
</script>

<template>
  <script>
    window.op =
      window.op ||
      function (...args) {
        (window.op.q = window.op.q || []).push(args);
      };
    window.op("init", {
      clientId: "01cfa559-0691-487c-b0e5-bc372b865a50",
      trackScreenViews: true,
      trackOutgoingLinks: true,
      trackAttributes: true,
    });
  </script>
  <script src="https://openpanel.dev/op1.js" defer async></script>
  <div>
    <NuxtPage />
  </div>
  <Toaster />
</template>
