<template>
  <div class="w-full flex items-center justify-center my-20 py-20">
    <div class="basic-conic animate"></div>
  </div>
</template>

<style scoped>
@property --position {
  syntax: "<length>";
  initial-value: 0;
  inherits: false;
}

.basic-conic {
  width: 243px;
  height: 33px;
  border-radius: 10000px;
  background: conic-gradient(
      from -80deg at var(--position) 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
}

.animate {
  animation: moveAnimation -0.64s linear 3s infinite;
}

@keyframes moveAnimation {
  0% {
    --position: 20px;
  }
  32.8228% {
    --position: 243px;
  }
  50% {
    --position: 243px;
  }
  82.8228% {
    --position: 20px;
  }
  100% {
    --position: 20px;
  }
}
</style>
