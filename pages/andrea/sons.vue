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
  <NuxtLayout>
    <div class="min-h-screen min-h-dvh px-4 py-8">
      <!-- Bouton retour -->
      <NuxtLink to="/andrea" class="btn-back">
        ⬅️
      </NuxtLink>

      <!-- En-tête -->
      <div class="text-center pt-16 mb-8">
        <div class="text-5xl mb-4">
          🔊
        </div>
        <h1 class="text-3xl font-magic text-rose">
          Sons magiques
        </h1>
        <p class="text-lg text-rose-600/80 font-body mt-2">
          Touche pour écouter !
        </p>
      </div>

      <!-- Grille de sons (gros boutons) -->
      <div class="grid grid-cols-2 gap-6 max-w-md mx-auto">
        <button
          v-for="sound in sounds"
          :key="sound.id"
          class="aspect-square rounded-bubble flex flex-col items-center justify-center gap-2 shadow-lg transition-all duration-200"
          :class="[
            sound.color,
            activeSound === sound.id ? 'scale-110 shadow-magic-lg' : 'hover:scale-105 active:scale-95'
          ]"
          @click="playSound(sound)"
        >
          <span class="text-6xl" :class="{ 'animate-bounce': activeSound === sound.id }">
            {{ sound.emoji }}
          </span>
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>
