<script setup lang="ts">
import { ref } from 'vue'

const { play } = useSounds()

interface SoundItem {
  id: string
  emoji: string
  label: string
  color: string
  sound: string
}

const sounds: SoundItem[] = [
  { id: 'unicorn', emoji: '🦄', label: 'Licorne', color: 'bg-rose-200', sound: 'unicorn' },
  { id: 'magic', emoji: '✨', label: 'Magie', color: 'bg-violet-200', sound: 'magic' },
  { id: 'star', emoji: '⭐', label: 'Étoile', color: 'bg-arc-jaune/50', sound: 'star' },
  { id: 'rainbow', emoji: '🌈', label: 'Arc-en-ciel', color: 'bg-ciel', sound: 'rainbow' },
  { id: 'heart', emoji: '💖', label: 'Cœur', color: 'bg-rose-300', sound: 'success' },
  { id: 'butterfly', emoji: '🦋', label: 'Papillon', color: 'bg-turquoise/50', sound: 'sparkle' }
]

const activeSound = ref<string | null>(null)

const playSound = (item: SoundItem) => {
  activeSound.value = item.id
  play(item.sound)

  // Effet visuel
  setTimeout(() => {
    activeSound.value = null
  }, 500)
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour 3D -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-pink-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <!-- En-tête compact -->
    <div class="text-center mb-3">
      <div class="text-3xl mb-1">🔊</div>
      <h1 class="text-2xl sm:text-3xl font-magic text-rose">Sons magiques</h1>
    </div>

    <!-- Grille de sons (ÉNORMES boutons) -->
    <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
      <button
        v-for="sound in sounds"
        :key="sound.id"
        class="aspect-square rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-200 border-4 border-white/50"
        :class="[
          sound.color,
          activeSound === sound.id ? 'scale-105 shadow-2xl ring-4 ring-dore' : 'hover:scale-105 active:scale-95'
        ]"
        @click="playSound(sound)"
      >
        <span class="text-6xl sm:text-7xl" :class="{ 'animate-bounce': activeSound === sound.id }">
          {{ sound.emoji }}
        </span>
      </button>
    </div>
    </div>
  </div>
</template>
