<template>
  <div :class="config.wrapper">
    <div :class="config.header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        tabindex="-1"
        :class="[selectedIndex === index ? 'bg-border' : 'bg-transparent', 'p-3 rounded-md !text-sm']"
        @click="selectedIndex = index"
      >
        <!-- <ProseCodeIcon
          :icon="config.tab.icon"
          :filename="config.tab.label"
          :class="ui.tab.icon.base"
        /> -->
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div
      v-motion="{
        initial: {
          opacity: 0,
          y: 20,
        },
        enter: {
          opacity: 1,
          y: 0,
        },
      }"
      class="[&>pre]:!my-0 [&>pre]:rounded-t-[0px]"
    >
      <component
        :is="selectedTab?.component"
        :key="selectedIndex"
        hide-header
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const config = {
  wrapper: "relative [&>div:last-child]:!my-0 [&>div:last-child]:!static my-5 ",
  header:
    "flex items-center gap-1 border border-border dark:border-border rounded-t-md overflow-hidden p-2",
  tab: {
    base: "px-2 py-1.5 focus:outline-none text-gray-700 dark:text-gray-200 text-sm rounded-md flex items-center gap-1.5",
    active: "bg-gray-100 dark:bg-gray-800",
    inactive: "hover:bg-gray-50 dark:hover:bg-gray-800/50",
    icon: {
      base: "",
    },
  },
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

const slots = useSlots();

const selectedIndex = ref(0);
defineExpose({ selectedIndex });

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

// Computed

const tabs = computed(
  () => slots.default?.()?.flatMap(transformSlot).filter(Boolean) || []
);

const selectedTab = computed(() =>
  tabs.value.find((_, index) => index === selectedIndex.value)
);
</script>
