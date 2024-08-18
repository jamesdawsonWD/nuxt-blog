<template>
  <div class="flex w-full items-center justify-center py-20">
    <div class="link-container my-20 relative">
      <div class="announcement absolute w-full h-full animate"></div>
      <div class="announcement-link-wrapper absolute top-[1px] left-[1px]">
        <a
          class="announcement-link no-underline"
          rel="external"
          href="/blog/more-ai-models"
        >
          <span class="no-underline !font-white">Pretty cool?</span>
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
  transform-style: preserve-3d;
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
  z-index: 1;
  transform-style: preserve-3d;
}

.announcement-link-wrapper {
  position: absolute;
  width: 240.2px;
  z-index: 2;
  transition: all ease 600ms;
  animation: skewAwayLayer2 7s linear 0s infinite;
}
.announcement > svg {
  width: 10px;
}
.animate {
  animation:
    moveAnimation -0.64s linear 3s infinite,
    rotateAnimation -0.64s linear 3s infinite,
    skewAway 7s linear 0s infinite;
}

@keyframes liftUp {
  0% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  10% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  15% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)
      translateX(0px) translateY(0px) translateZ(-10);
  }
  80% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)
      translateX(0px) translateY(0px) translateZ(-10);
  }
  85% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  100% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
}
@keyframes skewAway {
  0% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  10% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  15% {
    transform: perspective(700px) rotateY(20deg) rotateX(70deg) rotateZ(-25deg)
      translateX(0px) translateY(0px) translateZ(10px);
  }

  80% {
    transform: perspective(700px) rotateY(20deg) rotateX(70deg) rotateZ(-25deg)
      translateX(0px) translateY(0px) translateZ(10px);
  }
  85% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  100% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
}
@keyframes skewAwayLayer2 {
  0% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  10% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  15% {
    transform: perspective(700px) rotateY(20deg) rotateX(70deg) rotateZ(-25deg)
      translateX(0px) translateY(0px) translateZ(40px);
  }

  50% {
    transform: perspective(700px) rotateY(20deg) rotateX(70deg) rotateZ(-25deg)
      translateX(0px) translateY(0px) translateZ(49px);
  }
  80% {
    transform: perspective(700px) rotateY(20deg) rotateX(70deg) rotateZ(-25deg)
      translateX(0px) translateY(0px) translateZ(40px);
  }
  85% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
  100% {
    transform: perspective(700px) rotateY(0deg) rotateX(0deg);
  }
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
