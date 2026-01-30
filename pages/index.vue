<script setup lang="ts">
const { play } = useSounds()

const goToProfile = (profile: 'andrea' | 'suzanne') => {
  play('magic')
  navigateTo(`/${profile}`)
}

// Éléments décoratifs flottants
const floatingElements = [
  { emoji: '⭐', top: '10%', left: '5%', delay: '0s', size: 'text-3xl' },
  { emoji: '✨', top: '15%', right: '8%', delay: '0.5s', size: 'text-2xl' },
  { emoji: '💫', top: '25%', left: '10%', delay: '1s', size: 'text-2xl' },
  { emoji: '🌟', top: '20%', right: '15%', delay: '1.5s', size: 'text-4xl' },
  { emoji: '💖', top: '60%', left: '3%', delay: '2s', size: 'text-3xl' },
  { emoji: '🦋', top: '50%', right: '5%', delay: '0.3s', size: 'text-4xl' },
  { emoji: '🌸', top: '70%', left: '8%', delay: '0.8s', size: 'text-3xl' },
  { emoji: '☁️', top: '8%', left: '20%', delay: '1.2s', size: 'text-5xl opacity-60' },
  { emoji: '☁️', top: '12%', right: '25%', delay: '0.7s', size: 'text-4xl opacity-50' },
  { emoji: '🌈', top: '5%', left: '50%', delay: '0s', size: 'text-6xl opacity-40' },
]
</script>

<template>
  <NuxtLayout>
    <div class="relative flex flex-col items-center justify-center min-h-screen min-h-dvh px-4 py-8 overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-violet-50/30">

      <!-- Éléments décoratifs flottants -->
      <div
        v-for="(el, i) in floatingElements"
        :key="i"
        class="fixed pointer-events-none animate-float select-none"
        :class="el.size"
        :style="{
          top: el.top,
          left: el.left,
          right: el.right,
          animationDelay: el.delay,
          animationDuration: `${3 + i * 0.5}s`
        }"
      >
        {{ el.emoji }}
      </div>

      <!-- Titre magique avec décoration -->
      <div class="text-center mb-8 animate-bounce-soft relative z-10">
        <div class="flex items-center justify-center gap-4 mb-2">
          <span class="text-4xl sm:text-5xl">👑</span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-magic text-transparent bg-clip-text bg-gradient-to-r from-rose via-violet to-rose">
            Royaume des Licornes
          </h1>
          <span class="text-4xl sm:text-5xl">👑</span>
        </div>
        <p class="text-lg sm:text-xl text-violet-600 font-body">
          Bienvenue dans le monde magique !
        </p>
      </div>

      <!-- Grande scène centrale avec château et licorne -->
      <div class="relative mb-8 z-10">
        <div class="text-6xl sm:text-7xl mb-2 animate-float select-none">
          🏰
        </div>
        <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl animate-bounce-soft">
          🦄
        </div>
        <!-- Petits éléments autour -->
        <span class="absolute -left-8 top-0 text-3xl animate-sparkle">✨</span>
        <span class="absolute -right-8 top-0 text-3xl animate-sparkle" style="animation-delay: 0.5s">✨</span>
      </div>

      <!-- Choix des profils - Cartes plus grandes et distinctes -->
      <div class="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full max-w-3xl justify-center items-center z-10 px-4">

        <!-- Carte Andrea - Thème rose avec bébé licorne -->
        <button
          class="profile-card profile-card-andrea group relative overflow-hidden w-full sm:w-72 h-64 sm:h-72"
          @click="goToProfile('andrea')"
        >
          <!-- Fond décoratif -->
          <div class="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 opacity-80" />

          <!-- Éléments décoratifs -->
          <span class="absolute top-3 left-3 text-2xl animate-sparkle">🌸</span>
          <span class="absolute top-3 right-3 text-2xl animate-sparkle" style="animation-delay: 0.3s">💖</span>
          <span class="absolute bottom-3 left-3 text-xl animate-sparkle" style="animation-delay: 0.6s">🎀</span>
          <span class="absolute bottom-3 right-3 text-xl animate-sparkle" style="animation-delay: 0.9s">⭐</span>

          <!-- Contenu principal -->
          <div class="relative z-10 flex flex-col items-center justify-center h-full">
            <!-- Emoji distinctif pour Andrea : bébé avec biberon + petit animal -->
            <div class="text-7xl sm:text-8xl mb-3 group-hover:scale-110 transition-transform duration-300">
              🧸
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-4xl">🎀</span>
              <h2 class="text-3xl sm:text-4xl font-magic text-rose">
                Andrea
              </h2>
              <span class="text-4xl">🎀</span>
            </div>
            <p class="text-lg text-rose-600/80 font-body flex items-center gap-2">
              <span>🌟</span> 3 ans <span>🌟</span>
            </p>
          </div>
        </button>

        <!-- Séparateur magique -->
        <div class="hidden sm:flex flex-col items-center gap-2">
          <span class="text-3xl animate-sparkle">✨</span>
          <span class="text-4xl animate-float">🌈</span>
          <span class="text-3xl animate-sparkle" style="animation-delay: 0.5s">✨</span>
        </div>

        <!-- Carte Suzanne - Thème violet avec grande licorne ailée -->
        <button
          class="profile-card profile-card-suzanne group relative overflow-hidden w-full sm:w-72 h-64 sm:h-72"
          @click="goToProfile('suzanne')"
        >
          <!-- Fond décoratif -->
          <div class="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-200 opacity-80" />

          <!-- Éléments décoratifs -->
          <span class="absolute top-3 left-3 text-2xl animate-sparkle">⭐</span>
          <span class="absolute top-3 right-3 text-2xl animate-sparkle" style="animation-delay: 0.3s">🦋</span>
          <span class="absolute bottom-3 left-3 text-xl animate-sparkle" style="animation-delay: 0.6s">💜</span>
          <span class="absolute bottom-3 right-3 text-xl animate-sparkle" style="animation-delay: 0.9s">✨</span>

          <!-- Contenu principal -->
          <div class="relative z-10 flex flex-col items-center justify-center h-full">
            <!-- Emoji distinctif pour Suzanne : licorne + magie -->
            <div class="text-7xl sm:text-8xl mb-3 group-hover:scale-110 transition-transform duration-300">
              🦄
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-4xl">👑</span>
              <h2 class="text-3xl sm:text-4xl font-magic text-violet">
                Suzanne
              </h2>
              <span class="text-4xl">👑</span>
            </div>
            <p class="text-lg text-violet-600/80 font-body flex items-center gap-2">
              <span>💫</span> 6 ans <span>💫</span>
            </p>
          </div>
        </button>
      </div>

      <!-- Arc-en-ciel décoratif amélioré -->
      <div class="fixed bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-arc-rouge via-arc-orange via-arc-jaune via-arc-vert via-arc-bleu to-arc-violet opacity-70" />

      <!-- Herbe/sol décoratif -->
      <div class="fixed bottom-6 left-0 right-0 flex justify-around text-2xl opacity-60">
        <span>🌷</span>
        <span>🌻</span>
        <span>🌸</span>
        <span>🌺</span>
        <span>🌷</span>
        <span>🌻</span>
        <span>🌸</span>
        <span>🌺</span>
      </div>
    </div>
  </NuxtLayout>
</template>
