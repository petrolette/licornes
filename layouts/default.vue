<template>
  <div class="min-h-screen min-h-dvh relative overflow-hidden">
    <!-- Nuages décoratifs -->
    <div class="cloud w-32 h-16 top-10 left-10 animate-float" />
    <div class="cloud w-24 h-12 top-20 right-20 animate-float-delay-1" />
    <div class="cloud w-40 h-20 bottom-20 left-1/4 animate-float-delay-2" />

    <!-- Étoiles -->
    <div class="sparkle top-[15%] left-[10%]" style="animation-delay: 0s" />
    <div class="sparkle top-[25%] right-[15%]" style="animation-delay: 0.5s" />
    <div class="sparkle top-[60%] left-[5%]" style="animation-delay: 1s" />
    <div class="sparkle bottom-[30%] right-[10%]" style="animation-delay: 1.5s" />
    <div class="sparkle top-[40%] left-[80%]" style="animation-delay: 2s" />

    <!-- Contenu -->
    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>
