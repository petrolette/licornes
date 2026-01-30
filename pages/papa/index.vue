<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Invader {
  id: number
  x: number
  y: number
  alive: boolean
}

interface Bullet {
  id: number
  x: number
  y: number
}

interface EnemyBullet {
  id: number
  x: number
  y: number
}

const gameWidth = 360
const gameHeight = 500
const playerWidth = 40
const playerHeight = 20

const playerX = ref(gameWidth / 2 - playerWidth / 2)
const bullets = ref<Bullet[]>([])
const enemyBullets = ref<EnemyBullet[]>([])
const invaders = ref<Invader[]>([])
const score = ref(0)
const lives = ref(3)
const isPlaying = ref(false)
const isGameOver = ref(false)
const highScore = ref(0)
const level = ref(1)

let gameLoop: number | null = null
let invaderDirection = 1
let invaderSpeed = 1
let bulletId = 0
let lastShot = 0

const initInvaders = () => {
  const newInvaders: Invader[] = []
  let id = 0
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      newInvaders.push({
        id: id++,
        x: col * 40 + 20,
        y: row * 35 + 40,
        alive: true
      })
    }
  }
  invaders.value = newInvaders
}

const startGame = () => {
  playerX.value = gameWidth / 2 - playerWidth / 2
  bullets.value = []
  enemyBullets.value = []
  score.value = 0
  lives.value = 3
  level.value = 1
  invaderDirection = 1
  invaderSpeed = 1
  isPlaying.value = true
  isGameOver.value = false
  initInvaders()
  gameLoop = requestAnimationFrame(update)
}

const shoot = () => {
  const now = Date.now()
  if (now - lastShot < 300) return
  lastShot = now

  bullets.value.push({
    id: bulletId++,
    x: playerX.value + playerWidth / 2 - 2,
    y: gameHeight - 50
  })
}

const movePlayer = (direction: number) => {
  const newX = playerX.value + direction * 15
  if (newX >= 0 && newX <= gameWidth - playerWidth) {
    playerX.value = newX
  }
}

const update = () => {
  if (!isPlaying.value) return

  // Move bullets
  bullets.value = bullets.value
    .map(b => ({ ...b, y: b.y - 8 }))
    .filter(b => b.y > 0)

  // Move enemy bullets
  enemyBullets.value = enemyBullets.value
    .map(b => ({ ...b, y: b.y + 5 }))
    .filter(b => b.y < gameHeight)

  // Check player hit by enemy bullet
  enemyBullets.value.forEach(bullet => {
    if (
      bullet.x >= playerX.value &&
      bullet.x <= playerX.value + playerWidth &&
      bullet.y >= gameHeight - 40 &&
      bullet.y <= gameHeight - 20
    ) {
      lives.value--
      enemyBullets.value = enemyBullets.value.filter(b => b.id !== bullet.id)
      if (lives.value <= 0) {
        endGame()
      }
    }
  })

  // Move invaders
  let shouldDescend = false
  invaders.value.forEach(inv => {
    if (inv.alive) {
      inv.x += invaderDirection * invaderSpeed
      if (inv.x <= 10 || inv.x >= gameWidth - 30) {
        shouldDescend = true
      }
    }
  })

  if (shouldDescend) {
    invaderDirection *= -1
    invaders.value.forEach(inv => {
      if (inv.alive) {
        inv.y += 15
        if (inv.y > gameHeight - 80) {
          endGame()
        }
      }
    })
  }

  // Enemy shooting
  if (Math.random() < 0.02) {
    const aliveInvaders = invaders.value.filter(i => i.alive)
    if (aliveInvaders.length > 0) {
      const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)]
      enemyBullets.value.push({
        id: bulletId++,
        x: shooter.x + 10,
        y: shooter.y + 20
      })
    }
  }

  // Check bullet collisions
  bullets.value.forEach(bullet => {
    invaders.value.forEach(inv => {
      if (
        inv.alive &&
        bullet.x >= inv.x &&
        bullet.x <= inv.x + 25 &&
        bullet.y >= inv.y &&
        bullet.y <= inv.y + 20
      ) {
        inv.alive = false
        score.value += 10
        bullets.value = bullets.value.filter(b => b.id !== bullet.id)
      }
    })
  })

  // Check if all invaders dead
  if (invaders.value.every(i => !i.alive)) {
    level.value++
    invaderSpeed += 0.5
    initInvaders()
  }

  gameLoop = requestAnimationFrame(update)
}

const endGame = () => {
  isPlaying.value = false
  isGameOver.value = true
  if (gameLoop) cancelAnimationFrame(gameLoop)

  if (score.value > highScore.value) {
    highScore.value = score.value
    localStorage.setItem('papa_spaceinvaders_highscore', String(score.value))
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isPlaying.value) return
  if (e.key === 'ArrowLeft') movePlayer(-1)
  if (e.key === 'ArrowRight') movePlayer(1)
  if (e.key === ' ' || e.key === 'ArrowUp') {
    e.preventDefault()
    shoot()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('papa_spaceinvaders_highscore')
  if (saved) highScore.value = parseInt(saved)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-black">
    <!-- Bouton retour -->
    <NuxtLink
      to="/"
      class="fixed top-3 left-3 z-[100] w-14 h-14 flex items-center justify-center rounded-xl bg-gray-800 border-2 border-gray-600 shadow-xl"
    >
      <span class="text-2xl">⬅️</span>
    </NuxtLink>

    <!-- Score et vies -->
    <div class="fixed top-3 right-3 z-50 flex gap-3 text-white font-mono">
      <div class="bg-gray-800 rounded-lg px-3 py-1">
        Score: {{ score }}
      </div>
      <div class="bg-gray-800 rounded-lg px-3 py-1">
        ❤️ {{ lives }}
      </div>
      <div class="bg-gray-800 rounded-lg px-3 py-1">
        Lvl {{ level }}
      </div>
    </div>

    <!-- Écran de démarrage -->
    <div v-if="!isPlaying && !isGameOver" class="h-full flex flex-col items-center justify-center gap-6 p-4">
      <div class="text-6xl">👾</div>
      <h1 class="text-4xl font-bold text-green-400 font-mono">SPACE INVADERS</h1>
      <p class="text-gray-400 text-center">Utilise ← → pour bouger<br>ESPACE ou ↑ pour tirer</p>
      <p v-if="highScore > 0" class="text-yellow-400 font-mono">Record : {{ highScore }} pts</p>
      <button
        class="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold text-xl transition-all"
        @click="startGame"
      >
        🎮 JOUER
      </button>
    </div>

    <!-- Zone de jeu -->
    <div v-if="isPlaying" class="h-full flex items-center justify-center pt-16">
      <div
        class="relative bg-gray-900 border-2 border-green-500 rounded-lg overflow-hidden"
        :style="{ width: gameWidth + 'px', height: gameHeight + 'px' }"
      >
        <!-- Invaders -->
        <div
          v-for="inv in invaders"
          :key="inv.id"
          v-show="inv.alive"
          class="absolute text-2xl transition-all duration-75"
          :style="{ left: inv.x + 'px', top: inv.y + 'px' }"
        >
          👾
        </div>

        <!-- Bullets -->
        <div
          v-for="bullet in bullets"
          :key="'b' + bullet.id"
          class="absolute w-1 h-3 bg-green-400 rounded"
          :style="{ left: bullet.x + 'px', top: bullet.y + 'px' }"
        />

        <!-- Enemy Bullets -->
        <div
          v-for="bullet in enemyBullets"
          :key="'e' + bullet.id"
          class="absolute w-1 h-3 bg-red-500 rounded"
          :style="{ left: bullet.x + 'px', top: bullet.y + 'px' }"
        />

        <!-- Player -->
        <div
          class="absolute bottom-5 text-3xl transition-all duration-75"
          :style="{ left: playerX + 'px' }"
        >
          🚀
        </div>
      </div>
    </div>

    <!-- Contrôles tactiles -->
    <div v-if="isPlaying" class="fixed bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
      <button
        class="w-16 h-16 bg-gray-800 rounded-xl text-3xl text-white active:bg-gray-700 border-2 border-gray-600"
        @touchstart.prevent="movePlayer(-1)"
        @click="movePlayer(-1)"
      >
        ←
      </button>
      <button
        class="w-20 h-16 bg-red-600 rounded-xl text-2xl text-white active:bg-red-500 border-2 border-red-400"
        @touchstart.prevent="shoot"
        @click="shoot"
      >
        🔥
      </button>
      <button
        class="w-16 h-16 bg-gray-800 rounded-xl text-3xl text-white active:bg-gray-700 border-2 border-gray-600"
        @touchstart.prevent="movePlayer(1)"
        @click="movePlayer(1)"
      >
        →
      </button>
    </div>

    <!-- Game Over -->
    <div v-if="isGameOver" class="h-full flex flex-col items-center justify-center gap-4 p-4">
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-red-500 text-center">
        <div class="text-5xl mb-4">💥</div>
        <h2 class="text-3xl font-bold text-red-500 font-mono mb-2">GAME OVER</h2>
        <p class="text-2xl text-white font-mono mb-2">Score: {{ score }}</p>
        <p class="text-lg text-gray-400 font-mono mb-4">Niveau atteint: {{ level }}</p>
        <button
          class="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold text-lg transition-all"
          @click="startGame"
        >
          🔄 REJOUER
        </button>
      </div>
    </div>
  </div>
</template>
