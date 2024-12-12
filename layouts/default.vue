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
  <div class="dark bg-background w-full relative overflow-x-hidden">
    <div class="w-screen h-28 absolute -top-6 z-30 blur-xl opacity-20"></div>
    <div
      class="flex w-full px-24 py-4 items-center justify-center z-40 fixed transition"
      :class="[scrollPassed ? 'bg-background border-b border-primary/60 ' : '']"
    >
      <NuxtLink to="/">
        <SvgoBuidlLogo
          class="h-8 w-32"
          :fontControlled="false"
          :filled="true"
        />
      </NuxtLink>
    </div>
    <div class="my-40">
      <slot />
    </div>
  </div>
</template>
