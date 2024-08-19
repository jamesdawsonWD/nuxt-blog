<template>
  <div class="flex w-full items-center justify-center py-20">
    <div class="link-container my-20 relative">
      <div class="announcement absolute w-full h-full"></div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --r2: 0deg;
  --key-bg-end-color: #0d0d0d;
  --key-bg-start-color: #121212;
  --x: 0;
  --lift-z-index: 1;
  --lift-scale: 1;
}

@property --rotation {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@property --position {
  syntax: "<length>";
  initial-value: 0;
  inherits: false;
}

.link-container {
  width: 243px;
  height: 33px;
}

.muted {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5px;
  color: #9c9c9d;
  white-space: nowrap;
}
.announcement {
  padding: 1px;
  max-width: 100%;
  background: conic-gradient(
      from calc(var(--rotation) - 80deg) at 50px 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
  box-shadow: 0 0 20px 0 rgba(245, 48, 107, 0.1);
  transition: all 0.2s ease;
  border-radius: 1000px;
  transform: translateZ(0);
  transform-style: preserve-3d;
}
</style>
