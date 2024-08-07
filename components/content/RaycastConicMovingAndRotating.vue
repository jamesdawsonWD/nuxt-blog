<template>
    <div class="w-full flex items-center justify-center my-20">
        <div class="basic-conic animate"></div>
    </div>
</template>

<style scoped>

@property --position {
  syntax: '<length>'; 
  initial-value: 0;
  inherits: false;
}

@property --rotation {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}


.basic-conic {
    width: 320px;
    height: 80px;
    background: conic-gradient(from calc(var(--rotation) - 80deg) at var(--position) 15px, transparent 0, #eca5a7 20%, transparent 25%), #452324;
}

.animate {
    animation:  moveAnimation -.64s linear 3s infinite, rotateAnimation -.64s linear 3s infinite;
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
        --position: 300px;
    }
    50% {
        --position: 300px;
    }
    82.8228% {
        --position: 20px;
    }
    100% {
        --position: 20px;
    }
}

</style>