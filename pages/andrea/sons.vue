<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface SoundItem {
  id: string
  emoji: string
  label: string
  color: string
  freq: number[]
  type: OscillatorType
}

const sounds: SoundItem[] = [
  { id: 'unicorn', emoji: '🦄', label: 'Licorne', color: 'bg-rose-200', freq: [400, 600, 350, 500], type: 'sawtooth' },
  { id: 'magic', emoji: '✨', label: 'Magie', color: 'bg-violet-200', freq: [800, 1200, 600], type: 'sine' },
  { id: 'star', emoji: '⭐', label: 'Étoile', color: 'bg-yellow-200', freq: [1000, 1500, 2000], type: 'sine' },
  { id: 'rainbow', emoji: '🌈', label: 'Arc-en-ciel', color: 'bg-sky-200', freq: [523, 659, 784, 1047], type: 'sine' },
  { id: 'heart', emoji: '💖', label: 'Cœur', color: 'bg-rose-300', freq: [440, 550, 660, 880], type: 'sine' },
  { id: 'butterfly', emoji: '🦋', label: 'Papillon', color: 'bg-teal-200', freq: [600, 800, 700, 900], type: 'triangle' }
]

const activeSound = ref<string | null>(null)
let audioContext: AudioContext | null = null

// Initialiser le contexte audio au premier clic
const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
}

const playSound = (item: SoundItem) => {
  initAudio()
  if (!audioContext) return

  activeSound.value = item.id

  // Jouer le son
  const now = audioContext.currentTime

  if (item.id === 'rainbow' || item.id === 'heart') {
    // Arpège pour arc-en-ciel et cœur
    item.freq.forEach((freq, i) => {
      const osc = audioContext!.createOscillator()
      const gain = audioContext!.createGain()
      osc.connect(gain)
      gain.connect(audioContext!.destination)
      osc.frequency.value = freq
      osc.type = item.type
      gain.gain.setValueAtTime(0.3, now + i * 0.12)
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25)
      osc.start(now + i * 0.12)
      osc.stop(now + i * 0.12 + 0.25)
    })
  } else if (item.id === 'unicorn') {
    // Hennissement
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(400, now)
    osc.frequency.linearRampToValueAtTime(600, now + 0.15)
    osc.frequency.linearRampToValueAtTime(350, now + 0.35)
    osc.frequency.linearRampToValueAtTime(500, now + 0.5)
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6)
    osc.start(now)
    osc.stop(now + 0.6)
  } else {
    // Sons simples
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.type = item.type
    osc.frequency.setValueAtTime(item.freq[0], now)
    if (item.freq.length > 1) {
      osc.frequency.exponentialRampToValueAtTime(item.freq[1], now + 0.1)
    }
    if (item.freq.length > 2) {
      osc.frequency.exponentialRampToValueAtTime(item.freq[2], now + 0.2)
    }
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35)
    osc.start(now)
    osc.stop(now + 0.35)
  }

  // Effet visuel
  setTimeout(() => {
    activeSound.value = null
  }, 600)
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-pink-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="h-full flex flex-col items-center justify-center gap-4 pt-16 pb-4 px-3">
      <!-- Titre -->
      <div class="text-center">
        <div class="text-4xl mb-1" :class="{ 'animate-bounce': activeSound }">🔊</div>
        <h1 class="text-xl font-magic text-rose">Sons magiques</h1>
      </div>

      <!-- Grille de sons -->
      <div class="grid grid-cols-2 gap-3 w-full max-w-xs">
        <button
          v-for="sound in sounds"
          :key="sound.id"
          class="aspect-square rounded-3xl flex flex-col items-center justify-center shadow-xl transition-all duration-150 border-4 border-white/50"
          :class="[
            sound.color,
            activeSound === sound.id ? 'scale-110 ring-4 ring-yellow-400' : 'active:scale-95'
          ]"
          @click="playSound(sound)"
        >
          <span
            class="text-5xl"
            :class="{ 'animate-bounce': activeSound === sound.id }"
          >
            {{ sound.emoji }}
          </span>
          <span class="text-sm font-magic text-gray-700 mt-1">{{ sound.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
