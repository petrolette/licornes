<script setup lang="ts">
const { play } = useSounds()

const goToProfile = (profile: 'andrea' | 'suzanne') => {
  play('magic')
  navigateTo(`/${profile}`)
}
</script>

<template>
  <NuxtLayout>
    <div class="relative flex flex-col items-center justify-center h-screen h-dvh px-4 overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-violet-50/30">

      <!-- Décorations fixes discrètes -->
      <div class="fixed top-4 left-4 text-2xl animate-sparkle opacity-50">⭐</div>
      <div class="fixed top-4 right-4 text-2xl animate-sparkle opacity-50" style="animation-delay: 0.5s">✨</div>
      <div class="fixed top-1/4 left-2 text-3xl animate-float opacity-40">🦋</div>
      <div class="fixed top-1/3 right-2 text-3xl animate-float opacity-40" style="animation-delay: 1s">🌸</div>

      <!-- Titre compact -->
      <div class="text-center mb-4 relative z-10">
        <div class="flex items-center justify-center gap-2 sm:gap-3">
          <span class="text-3xl sm:text-4xl">👑</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-magic text-transparent bg-clip-text bg-gradient-to-r from-rose via-violet to-rose">
            Royaume des Licornes
          </h1>
          <span class="text-3xl sm:text-4xl">👑</span>
        </div>
        <p class="text-base sm:text-lg text-violet-600 font-body mt-1">
          Bienvenue dans le monde magique !
        </p>
      </div>

      <!-- Scène centrale compacte -->
      <div class="relative mb-4 z-10">
        <div class="text-5xl sm:text-6xl animate-float select-none">🏰</div>
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl">🦄</div>
      </div>

      <!-- Cartes profils - côte à côte, compactes -->
      <div class="flex flex-row gap-4 sm:gap-8 w-full max-w-2xl justify-center items-center z-10 px-2">

        <!-- Carte Andrea -->
        <button
          class="profile-card group relative overflow-hidden flex-1 max-w-[280px] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          @click="goToProfile('andrea')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300" />

          <div class="relative z-10 flex flex-col items-center py-6 px-4">
            <div class="text-6xl sm:text-7xl mb-2 group-hover:scale-110 transition-transform">🧸</div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎀</span>
              <h2 class="text-2xl sm:text-3xl font-magic text-rose">Andrea</h2>
              <span class="text-2xl">🎀</span>
            </div>
            <p class="text-base text-rose-600/80 font-body mt-1">3 ans</p>
          </div>

          <span class="absolute top-2 right-2 text-xl animate-sparkle">💖</span>
          <span class="absolute bottom-2 left-2 text-lg animate-sparkle" style="animation-delay: 0.5s">🌸</span>
        </button>

        <!-- Séparateur -->
        <div class="flex flex-col items-center">
          <span class="text-3xl sm:text-4xl animate-float">🌈</span>
        </div>

        <!-- Carte Suzanne -->
        <button
          class="profile-card group relative overflow-hidden flex-1 max-w-[280px] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          @click="goToProfile('suzanne')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-violet-200 via-purple-100 to-indigo-300" />

          <div class="relative z-10 flex flex-col items-center py-6 px-4">
            <div class="text-6xl sm:text-7xl mb-2 group-hover:scale-110 transition-transform">🦄</div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">👑</span>
              <h2 class="text-2xl sm:text-3xl font-magic text-violet">Suzanne</h2>
              <span class="text-2xl">👑</span>
            </div>
            <p class="text-base text-violet-600/80 font-body mt-1">6 ans</p>
          </div>

          <span class="absolute top-2 right-2 text-xl animate-sparkle">⭐</span>
          <span class="absolute bottom-2 left-2 text-lg animate-sparkle" style="animation-delay: 0.5s">🦋</span>
        </button>
      </div>

      <!-- Arc-en-ciel bas -->
      <div class="fixed bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-arc-rouge via-arc-orange via-arc-jaune via-arc-vert via-arc-bleu to-arc-violet opacity-70" />
    </div>
  </NuxtLayout>
</template>
