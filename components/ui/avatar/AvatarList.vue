<script setup lang="ts">
import { onMounted, ref, defineProps, nextTick, computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    max?: number;
    avatars: {
      name: string;
      logoUrl: string;
    }[];
  }>(),
  {
    max: 5,
  }
);

const visibleAvatars = computed(() => {
  if (props.avatars.length > props.max) {
    return props.avatars.slice(0, props.max);
  }
  return props.avatars;
});

const invisibleAvatars = computed(() => {
  if (props.avatars.length > props.max) {
    return props.avatars.slice(props.max, props.avatars.length);
  }
  return [];
});
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="flex -space-x-2 overflow-hidden px-1 py-1">
      <TooltipProvider v-for="avatar of visibleAvatars" :delay-duration="100">
        <Tooltip>
          <TooltipTrigger>
            <Avatar class="ring-2 ring-secondary inline-block h-8 w-8">
              <AvatarImage :src="avatar.logoUrl" :alt="avatar.name" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar></TooltipTrigger
          >
          <TooltipContent>
            <p>{{ avatar.name }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <TooltipProvider :delay-duration="100">
      <Tooltip>
        <TooltipTrigger
          ><p v-if="invisibleAvatars.length">
            +{{ invisibleAvatars?.length }}
          </p></TooltipTrigger
        >
        <TooltipContent>
          <div class="flex flex-col gap-2">
            <AvatarWrapper v-for="avatar of invisibleAvatars">
              <Avatar class="ring-2 ring-secondary inline-block h-8 w-8">
                <AvatarImage :src="avatar.logoUrl" :alt="avatar.name" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <AvatarDetails>
                <p class="text-foreground font-semibold">{{ avatar.name }}</p>
              </AvatarDetails>
            </AvatarWrapper>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
