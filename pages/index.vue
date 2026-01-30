<script setup lang="ts">
const { play } = useSounds()

const goToProfile = (profile: 'andrea' | 'suzanne') => {
  play('magic')
  navigateTo(`/${profile}`)
}
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center min-h-screen min-h-dvh px-4 py-8">
      <!-- Titre magique -->
      <div class="text-center mb-12 animate-bounce-soft">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-magic text-rainbow mb-4">
          Royaume des Licornes
        </h1>
        <p class="text-lg sm:text-xl text-violet-600 font-body">
          Bienvenue dans le monde magique !
        </p>
      </div>

      <!-- Licorne animée centrale -->
      <div class="text-8xl sm:text-9xl mb-12 animate-float select-none">
        🦄
      </div>

      <!-- Choix des profils -->
      <div class="flex flex-col sm:flex-row gap-8 w-full max-w-2xl justify-center items-center">
        <!-- Carte Andrea -->
        <button
          class="profile-card profile-card-andrea group"
          @click="goToProfile('andrea')"
        >
          <!-- Licorne rose -->
          <div class="text-7xl mb-4 group-hover:animate-wiggle">
            🦄
          </div>
          <h2 class="text-3xl font-magic text-rose mb-2">
            Andrea
          </h2>
          <p class="text-lg text-rose-600/80 font-body">
            3 ans
          </p>
          <!-- Étoiles décoratives -->
          <span class="absolute top-4 right-4 text-2xl animate-sparkle">⭐</span>
          <span class="absolute bottom-4 left-4 text-xl animate-sparkle" style="animation-delay: 0.5s">✨</span>
        </button>

        <!-- Carte Suzanne -->
        <button
          class="profile-card profile-card-suzanne group"
          @click="goToProfile('suzanne')"
        >
          <!-- Licorne violette avec ailes -->
          <div class="text-7xl mb-4 group-hover:animate-wiggle">
            🦄
          </div>
          <h2 class="text-3xl font-magic text-violet mb-2">
            Suzanne
          </h2>
          <p class="text-lg text-violet-600/80 font-body">
            6 ans
          </p>
          <!-- Étoiles décoratives -->
          <span class="absolute top-4 left-4 text-2xl animate-sparkle">⭐</span>
          <span class="absolute bottom-4 right-4 text-xl animate-sparkle" style="animation-delay: 0.5s">✨</span>
        </button>
      </div>

      <!-- Arc-en-ciel décoratif en bas -->
      <div class="fixed bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-arc-rouge via-arc-jaune via-arc-vert to-arc-violet opacity-60" />
    </div>
  </NuxtLayout>
</template>
