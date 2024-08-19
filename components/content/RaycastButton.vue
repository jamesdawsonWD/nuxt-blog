<template>
  <div class="container my-20">
    <div class="announcement animate">
      <a
        class="announcement-link no-underline"
        rel="external"
        href="/blog/more-ai-models"
      >
        <span class="no-underline !font-white text-primary">Pretty cool?</span>
        <span class="muted flex no-underline"
          >Click me and see
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            class="w-4"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
            ></path>
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
:root {
  --r2: 0deg;
  --key-bg-end-color: #0d0d0d;
  --key-bg-start-color: #121212;
  --x: 0;
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

.container {
  display: flex;
  justify-content: center;
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
  background: conic-gradient(
      from calc(var(--rotation) - 80deg) at var(--position) 15px,
      transparent 0,
      #eca5a7 20%,
      transparent 25%
    ),
    #452324;
  border-radius: 43px;
  box-shadow: 0 0 20px 0 rgba(245, 48, 107, 0.1);
  transition: all 0.2s ease;
  transform: translateZ(0);
}

.announcement:hover {
  background-color: #833637;
  box-shadow: 0 0 20px 3px rgba(245, 49, 108, 0.25);
}
.announcement-link {
  display: flex;
  flex-wrap: nowrap;
  gap: 13px;
  align-items: center;
  height: 30px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
  background: #130d0e;
  border-radius: 1000px;
}
.announcement > svg {
  width: 10px;
}
.animate {
  animation:
    moveAnimation -0.64s linear 3s infinite,
    rotateAnimation -0.64s linear 3s infinite;
}

@keyframes rotateAnimation {
  0% {
    --rotation: 0deg;
  }
  32.8228% {
    --rotation: 0deg;
  }
  50% {
    --rotation: 180deg;
  }
  82.8228% {
    --rotation: 180deg;
  }
  100% {
    --rotation: 360deg;
  }
}

@keyframes moveAnimation {
  0% {
    --position: 20px;
  }
  32.8228% {
    --position: 206px;
  }
  50% {
    --position: 206px;
  }
  82.8228% {
    --position: 20px;
  }
  100% {
    --position: 20px;
  }
}
</style>
