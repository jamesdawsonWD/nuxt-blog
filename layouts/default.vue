<script setup lang="ts">

const useCheckScrolledPassedPoint = (scrollAmount: number) => {
  const hasPassed = ref(false);

  const checkScroll = () => {
    hasPassed.value = window.scrollY > scrollAmount;
  };

  onMounted(() => {
    window.addEventListener("scroll", checkScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", checkScroll);
  });

  return {
    hasPassed,
  };
};

const { hasPassed: scrollPassed } = useCheckScrolledPassedPoint(100);
</script>
<template>
  <div class="w-full relative overflow-x-hidden">
    <div
      class="dark:bg-gradient-to-r from-primary to-[#0070F3] w-screen h-40 absolute -top-6 z-30 blur-xl opacity-20"
    ></div>
    <div
      class="flex w-full px-24 py-4 items-center justify-between z-40 fixed transition"
      :class="[scrollPassed ? 'bg-background border-b border-primary/60 ' : '']"
    >
      <NuxtLink to="/">
        James Dawson
      </NuxtLink>

      <div class="flex gap-4 items-center">
        <!-- <ToggleGroup type="single">
          <ToggleGroupItem value="a" @click="darkmode = !darkmode">
            <MoonIcon v-if="!darkmode" class="w-8 h-8 fill-foreground" />
            <SunIcon v-else class="w-8 h-8 fill-foreground" />
          </ToggleGroupItem>
        </ToggleGroup> -->
      </div>
    </div>
    <div class="my-40 ">
      <slot />
    </div>
  </div>
</template>
