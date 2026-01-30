<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Star {
  id: number
  x: number
  y: number
  size: number
  emoji: string
}

const score = ref(0)
const timeLeft = ref(30)
const stars = ref<Star[]>([])
const isPlaying = ref(false)
const isGameOver = ref(false)
const highScore = ref(0)
let gameInterval: NodeJS.Timeout | null = null
let starInterval: NodeJS.Timeout | null = null

const emojis = ['⭐', '🌟', '✨', '💫']

const startGame = () => {
  score.value = 0
  timeLeft.value = 30
  stars.value = []
  isPlaying.value = true
  isGameOver.value = false

  // Timer
  gameInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame()
    }
  }, 1000)

  // Spawn stars
  starInterval = setInterval(() => {
    spawnStar()
  }, 800)

  // Spawn initial stars
  for (let i = 0; i < 3; i++) {
    spawnStar()
  }
}

const spawnStar = () => {
  if (stars.value.length >= 8) return

  const star: Star = {
    id: Date.now() + Math.random(),
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
    size: Math.random() * 20 + 30,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  }
  stars.value.push(star)

  // Remove star after delay
  setTimeout(() => {
    stars.value = stars.value.filter(s => s.id !== star.id)
  }, 2000)
}

const catchStar = (star: Star) => {
  score.value += 10
  stars.value = stars.value.filter(s => s.id !== star.id)
}

const endGame = () => {
  isPlaying.value = false
  isGameOver.value = true
  if (gameInterval) clearInterval(gameInterval)
  if (starInterval) clearInterval(starInterval)

  if (score.value > highScore.value) {
    highScore.value = score.value
    localStorage.setItem('suzanne_etoiles_highscore', String(score.value))
  }
}

onMounted(() => {
  const saved = localStorage.getItem('suzanne_etoiles_highscore')
  if (saved) highScore.value = parseInt(saved)
})

onUnmounted(() => {
  if (gameInterval) clearInterval(gameInterval)
  if (starInterval) clearInterval(starInterval)
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
    <!-- Bouton retour -->
    <NuxtLink
      to="/suzanne/jeux"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-violet-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <!-- Score et temps -->
    <div class="fixed top-3 right-3 z-50 flex gap-2">
      <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-white font-magic">
        ⭐ {{ score }}
      </div>
      <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-white font-magic" :class="{ 'text-red-400 animate-pulse': timeLeft <= 5 }">
        ⏱️ {{ timeLeft }}s
      </div>
    </div>

    <!-- Écran de démarrage -->
    <div v-if="!isPlaying && !isGameOver" class="h-full flex flex-col items-center justify-center gap-6 p-4">
      <div class="text-6xl animate-bounce">⭐</div>
      <h1 class="text-3xl font-magic text-white text-center">Attrape les étoiles !</h1>
      <p class="text-white/80 text-center">Suzanne, clique sur les étoiles le plus vite possible !</p>
      <p v-if="highScore > 0" class="text-yellow-300 font-magic">Record : {{ highScore }} pts</p>
      <button
        class="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-white font-magic text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
        @click="startGame"
      >
        🎮 Jouer !
      </button>
    </div>

    <!-- Zone de jeu -->
    <div v-if="isPlaying" class="relative w-full h-full">
      <button
        v-for="star in stars"
        :key="star.id"
        class="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 active:scale-90 cursor-pointer animate-pulse"
        :style="{
          left: star.x + '%',
          top: star.y + '%',
          fontSize: star.size + 'px'
        }"
        @click="catchStar(star)"
      >
        {{ star.emoji }}
      </button>
    </div>

    <!-- Game Over -->
    <div v-if="isGameOver" class="h-full flex flex-col items-center justify-center gap-4 p-4">
      <div class="bg-white rounded-3xl p-6 shadow-2xl text-center max-w-sm">
        <div class="text-5xl mb-3">{{ score >= 100 ? '🏆' : score >= 50 ? '🌟' : '⭐' }}</div>
        <h2 class="text-2xl font-magic text-violet mb-2">
          {{ score >= 100 ? 'Incroyable Suzanne !' : score >= 50 ? 'Super Suzanne !' : 'Bien joué Suzanne !' }}
        </h2>
        <p class="text-xl font-magic text-violet-600 mb-4">{{ score }} points</p>
        <div class="flex gap-3">
          <button
            class="flex-1 py-3 px-4 bg-gradient-to-r from-violet to-rose text-white rounded-xl font-magic hover:scale-105 transition-all"
            @click="startGame"
          >
            🔄 Rejouer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
