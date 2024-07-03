<template>
  <div class="markdown-img">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots();

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === "symbol") {
    return slot.children?.map(transformSlot);
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  };
}

const items = computed(
  () => slots.default?.(transformSlot).filter(Boolean) || []
);
</script>

<style>
.markdown-img p{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}
</style>
