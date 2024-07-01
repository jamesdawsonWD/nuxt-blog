<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const config = {
  wrapper: "grid sm:grid-cols-2 gap-4",
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
});
</script>
