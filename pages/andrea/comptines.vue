<script setup lang="ts">
import { ref } from 'vue'

interface Song {
  id: string
  title: string
  emoji: string
  color: string
  duration: string
}

const songs: Song[] = [
  { id: 'licorne', title: 'La licorne', emoji: '🦄', color: 'bg-rose-100', duration: '1:30' },
  { id: 'arc-en-ciel', title: 'Arc-en-ciel', emoji: '🌈', color: 'bg-gradient-to-r from-arc-rouge via-arc-jaune to-arc-violet', duration: '2:00' },
  { id: 'etoiles', title: 'Petites étoiles', emoji: '⭐', color: 'bg-arc-jaune/30', duration: '1:45' },
  { id: 'dodo', title: 'Dodo licorne', emoji: '🌙', color: 'bg-violet-100', duration: '2:30' }
]

const currentSong = ref<string | null>(null)
const isPlaying = ref(false)

const playSong = (songId: string) => {
  if (currentSong.value === songId && isPlaying.value) {
    isPlaying.value = false
  } else {
    currentSong.value = songId
    isPlaying.value = true
  }
  // TODO: Implémenter la lecture audio avec Howler.js
  console.log('Playing song:', songId)
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
        <div class="text-5xl mb-4" :class="{ 'animate-bounce-soft': isPlaying }">
          🎵
        </div>
        <h1 class="text-3xl font-magic text-rose">
          Comptines
        </h1>
      </div>

      <!-- Liste des chansons -->
      <div class="max-w-md mx-auto space-y-4">
        <button
          v-for="song in songs"
          :key="song.id"
          class="w-full p-6 rounded-magic shadow-lg flex items-center gap-4 transition-all hover:scale-102 active:scale-98"
          :class="[
            song.color,
            currentSong === song.id && isPlaying ? 'ring-4 ring-dore' : ''
          ]"
          @click="playSong(song.id)"
        >
          <!-- Emoji animé -->
          <span
            class="text-5xl"
            :class="{ 'animate-bounce-soft': currentSong === song.id && isPlaying }"
          >
            {{ song.emoji }}
          </span>

          <!-- Titre -->
          <span class="text-2xl font-magic text-gray-700 flex-1 text-left">
            {{ song.title }}
          </span>

          <!-- Bouton play/pause -->
          <span class="text-3xl">
            {{ currentSong === song.id && isPlaying ? '⏸️' : '▶️' }}
          </span>
        </button>
      </div>

      <!-- Note développement -->
      <div class="text-center mt-12 p-4 bg-white/50 rounded-xl max-w-md mx-auto">
        <p class="text-sm text-gray-500 font-body">
          Les comptines seront ajoutées prochainement
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
