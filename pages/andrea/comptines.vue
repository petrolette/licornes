<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface Song {
  id: string
  title: string
  emoji: string
  color: string
  notes: number[] // Fréquences des notes
}

const songs: Song[] = [
  { id: 'licorne', title: 'La licorne', emoji: '🦄', color: 'bg-rose-100', notes: [262, 294, 330, 349, 392, 349, 330, 294, 262] },
  { id: 'arc-en-ciel', title: 'Arc-en-ciel', emoji: '🌈', color: 'bg-gradient-to-r from-arc-rouge via-arc-jaune to-arc-violet', notes: [392, 440, 494, 523, 494, 440, 392, 330] },
  { id: 'etoiles', title: 'Petites étoiles', emoji: '⭐', color: 'bg-arc-jaune/30', notes: [262, 262, 392, 392, 440, 440, 392, 349, 349, 330, 330, 294, 294, 262] },
  { id: 'dodo', title: 'Dodo licorne', emoji: '🌙', color: 'bg-violet-100', notes: [330, 294, 262, 294, 330, 330, 330, 294, 294, 294, 330, 392, 392] }
]

const currentSong = ref<string | null>(null)
const isPlaying = ref(false)
let audioContext: AudioContext | null = null
let currentTimeout: NodeJS.Timeout | null = null

const stopCurrentSong = () => {
  isPlaying.value = false
  currentSong.value = null
  if (currentTimeout) {
    clearTimeout(currentTimeout)
    currentTimeout = null
  }
}

const playSong = (songId: string) => {
  // Si même chanson, toggle pause
  if (currentSong.value === songId && isPlaying.value) {
    stopCurrentSong()
    return
  }

  // Arrêter la chanson en cours
  stopCurrentSong()

  // Démarrer la nouvelle chanson
  currentSong.value = songId
  isPlaying.value = true

  const song = songs.find(s => s.id === songId)
  if (!song) return

  // Créer le contexte audio si nécessaire
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  // Jouer les notes
  let noteIndex = 0
  const playNote = () => {
    if (!isPlaying.value || noteIndex >= song.notes.length) {
      if (noteIndex >= song.notes.length) {
        // Recommencer en boucle
        noteIndex = 0
        if (isPlaying.value) {
          currentTimeout = setTimeout(playNote, 200)
        }
      }
      return
    }

    const oscillator = audioContext!.createOscillator()
    const gainNode = audioContext!.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext!.destination)

    oscillator.frequency.value = song.notes[noteIndex]
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext!.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext!.currentTime + 0.3)

    oscillator.start()
    oscillator.stop(audioContext!.currentTime + 0.3)

    noteIndex++
    currentTimeout = setTimeout(playNote, 350)
  }

  playNote()
}

onUnmounted(() => {
  stopCurrentSong()
})
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
      <div class="text-3xl mb-1" :class="{ 'animate-bounce-soft': isPlaying }">🎵</div>
      <h1 class="text-2xl sm:text-3xl font-magic text-rose">Comptines</h1>
    </div>

    <!-- Liste des chansons - GROS boutons -->
    <div class="w-full max-w-sm space-y-3">
      <button
        v-for="song in songs"
        :key="song.id"
        class="w-full p-4 rounded-[1.5rem] shadow-xl flex items-center gap-3 transition-all hover:scale-102 active:scale-98 border-4 border-white/50"
        :class="[
          song.color,
          currentSong === song.id && isPlaying ? 'ring-4 ring-dore scale-102' : ''
        ]"
        @click="playSong(song.id)"
      >
        <span class="text-5xl" :class="{ 'animate-bounce-soft': currentSong === song.id && isPlaying }">
          {{ song.emoji }}
        </span>
        <span class="text-xl sm:text-2xl font-magic text-gray-700 flex-1 text-left">{{ song.title }}</span>
        <span class="text-3xl">{{ currentSong === song.id && isPlaying ? '⏸️' : '▶️' }}</span>
      </button>
    </div>
    </div>
  </div>
</template>
