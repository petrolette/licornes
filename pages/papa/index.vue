<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Types d'aliens (comme l'original)
type AlienType = 'squid' | 'crab' | 'octopus'

interface Alien {
  id: number
  x: number
  y: number
  type: AlienType
  alive: boolean
}

interface Bullet {
  id: number
  x: number
  y: number
}

interface Bunker {
  id: number
  x: number
  health: number[] // 8 segments de santé
}

interface UFO {
  active: boolean
  x: number
  direction: number
}

// Configuration du jeu
const GAME_WIDTH = 448
const GAME_HEIGHT = 512
const ALIEN_COLS = 11
const ALIEN_ROWS = 5
const ALIEN_WIDTH = 24
const ALIEN_HEIGHT = 16
const ALIEN_SPACING_X = 16
const ALIEN_SPACING_Y = 16
const PLAYER_WIDTH = 26
const PLAYER_Y = GAME_HEIGHT - 40

// État du jeu
const playerX = ref(GAME_WIDTH / 2 - PLAYER_WIDTH / 2)
const aliens = ref<Alien[]>([])
const playerBullets = ref<Bullet[]>([])
const alienBullets = ref<Bullet[]>([])
const bunkers = ref<Bunker[]>([])
const ufo = ref<UFO>({ active: false, x: 0, direction: 1 })
const score = ref(0)
const highScore = ref(0)
const lives = ref(3)
const level = ref(1)
const isPlaying = ref(false)
const isGameOver = ref(false)
const animFrame = ref(0)

let gameLoop: number | null = null
let alienDirection = 1
let alienSpeed = 0.5
let lastAlienMove = 0
let lastShot = 0
let lastAlienShot = 0
let bulletId = 0
let audioCtx: AudioContext | null = null

// Points par type d'alien
const alienPoints: Record<AlienType, number> = {
  squid: 30,
  crab: 20,
  octopus: 10
}

// Initialiser les aliens
const initAliens = () => {
  const newAliens: Alien[] = []
  let id = 0
  const types: AlienType[] = ['squid', 'crab', 'crab', 'octopus', 'octopus']

  for (let row = 0; row < ALIEN_ROWS; row++) {
    for (let col = 0; col < ALIEN_COLS; col++) {
      newAliens.push({
        id: id++,
        x: col * (ALIEN_WIDTH + ALIEN_SPACING_X) + 30,
        y: row * (ALIEN_HEIGHT + ALIEN_SPACING_Y) + 60,
        type: types[row],
        alive: true
      })
    }
  }
  aliens.value = newAliens
}

// Initialiser les bunkers
const initBunkers = () => {
  bunkers.value = [
    { id: 0, x: 50, health: [3, 3, 3, 3, 3, 3, 3, 3] },
    { id: 1, x: 150, health: [3, 3, 3, 3, 3, 3, 3, 3] },
    { id: 2, x: 250, health: [3, 3, 3, 3, 3, 3, 3, 3] },
    { id: 3, x: 350, health: [3, 3, 3, 3, 3, 3, 3, 3] }
  ]
}

// Sons rétro
const playSound = (type: 'shoot' | 'explosion' | 'invaderKill' | 'ufo') => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)

  const now = audioCtx.currentTime

  if (type === 'shoot') {
    osc.type = 'square'
    osc.frequency.setValueAtTime(1500, now)
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.1)
    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
    osc.start(now)
    osc.stop(now + 0.1)
  } else if (type === 'explosion') {
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(100, now)
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3)
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
    osc.start(now)
    osc.stop(now + 0.3)
  } else if (type === 'invaderKill') {
    osc.type = 'square'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.setValueAtTime(400, now + 0.05)
    osc.frequency.setValueAtTime(200, now + 0.1)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
    osc.start(now)
    osc.stop(now + 0.15)
  } else if (type === 'ufo') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, now)
    for (let i = 0; i < 10; i++) {
      osc.frequency.setValueAtTime(400 + (i % 2) * 100, now + i * 0.05)
    }
    gain.gain.setValueAtTime(0.1, now)
    osc.start(now)
    osc.stop(now + 0.5)
  }
}

// Démarrer le jeu
const startGame = () => {
  playerX.value = GAME_WIDTH / 2 - PLAYER_WIDTH / 2
  playerBullets.value = []
  alienBullets.value = []
  score.value = 0
  lives.value = 3
  level.value = 1
  alienDirection = 1
  alienSpeed = 0.5
  isPlaying.value = true
  isGameOver.value = false
  ufo.value = { active: false, x: 0, direction: 1 }
  initAliens()
  initBunkers()
  gameLoop = requestAnimationFrame(update)
}

// Tirer
const shoot = () => {
  const now = Date.now()
  if (now - lastShot < 500 || playerBullets.value.length >= 1) return
  lastShot = now
  playSound('shoot')

  playerBullets.value.push({
    id: bulletId++,
    x: playerX.value + PLAYER_WIDTH / 2,
    y: PLAYER_Y - 5
  })
}

// Déplacer le joueur
const movePlayer = (dir: number) => {
  const newX = playerX.value + dir * 8
  if (newX >= 10 && newX <= GAME_WIDTH - PLAYER_WIDTH - 10) {
    playerX.value = newX
  }
}

// Mise à jour du jeu
const update = () => {
  if (!isPlaying.value) return
  const now = Date.now()

  // Animation des aliens (plus lent)
  const aliveCount = aliens.value.filter(a => a.alive).length
  const baseInterval = 800 // Intervalle de base plus lent
  const speedBonus = Math.max(0, (55 - aliveCount) * 5) // Accélère quand moins d'aliens
  const levelBonus = (level.value - 1) * 20

  if (now - lastAlienMove > Math.max(100, baseInterval - speedBonus - levelBonus)) {
    lastAlienMove = now
    animFrame.value = 1 - animFrame.value

    // Déplacer les aliens (mouvement plus petit)
    let shouldDescend = false
    const aliveAliens = aliens.value.filter(a => a.alive)

    aliveAliens.forEach(alien => {
      alien.x += alienDirection * (6 + Math.floor(level.value / 2))
    })

    // Vérifier les bords
    aliveAliens.forEach(alien => {
      if (alien.x <= 10 || alien.x >= GAME_WIDTH - ALIEN_WIDTH - 10) {
        shouldDescend = true
      }
    })

    if (shouldDescend) {
      alienDirection *= -1
      aliveAliens.forEach(alien => {
        alien.y += 10 // Descente plus petite
        if (alien.y >= PLAYER_Y - 50) {
          endGame()
        }
      })
    }
  }

  // UFO aléatoire
  if (!ufo.value.active && Math.random() < 0.001) {
    ufo.value = {
      active: true,
      x: Math.random() > 0.5 ? -40 : GAME_WIDTH,
      direction: Math.random() > 0.5 ? 1 : -1
    }
    playSound('ufo')
  }

  // Déplacer UFO
  if (ufo.value.active) {
    ufo.value.x += ufo.value.direction * 2
    if (ufo.value.x < -50 || ufo.value.x > GAME_WIDTH + 10) {
      ufo.value.active = false
    }
  }

  // Déplacer les balles du joueur
  playerBullets.value = playerBullets.value
    .map(b => ({ ...b, y: b.y - 10 }))
    .filter(b => b.y > 0)

  // Déplacer les balles aliens (plus lent)
  alienBullets.value = alienBullets.value
    .map(b => ({ ...b, y: b.y + 3 }))
    .filter(b => b.y < GAME_HEIGHT)

  // Tir alien (moins fréquent)
  if (now - lastAlienShot > 1500 - level.value * 30) {
    lastAlienShot = now
    const aliveAliens = aliens.value.filter(a => a.alive)
    if (aliveAliens.length > 0 && Math.random() < 0.2 + level.value * 0.03) {
      // Trouver les aliens du bas de chaque colonne
      const columns: { [col: number]: Alien } = {}
      aliveAliens.forEach(alien => {
        const col = Math.floor(alien.x / (ALIEN_WIDTH + ALIEN_SPACING_X))
        if (!columns[col] || alien.y > columns[col].y) {
          columns[col] = alien
        }
      })
      const bottomAliens = Object.values(columns)
      const shooter = bottomAliens[Math.floor(Math.random() * bottomAliens.length)]

      alienBullets.value.push({
        id: bulletId++,
        x: shooter.x + ALIEN_WIDTH / 2,
        y: shooter.y + ALIEN_HEIGHT
      })
    }
  }

  // Collision balle joueur -> alien
  playerBullets.value.forEach(bullet => {
    // UFO
    if (ufo.value.active &&
        bullet.x >= ufo.value.x && bullet.x <= ufo.value.x + 32 &&
        bullet.y <= 40) {
      ufo.value.active = false
      score.value += [50, 100, 150, 300][Math.floor(Math.random() * 4)]
      playSound('invaderKill')
      playerBullets.value = playerBullets.value.filter(b => b.id !== bullet.id)
    }

    // Aliens
    aliens.value.forEach(alien => {
      if (alien.alive &&
          bullet.x >= alien.x && bullet.x <= alien.x + ALIEN_WIDTH &&
          bullet.y >= alien.y && bullet.y <= alien.y + ALIEN_HEIGHT) {
        alien.alive = false
        score.value += alienPoints[alien.type]
        playSound('invaderKill')
        playerBullets.value = playerBullets.value.filter(b => b.id !== bullet.id)
      }
    })

    // Bunkers
    bunkers.value.forEach(bunker => {
      const segmentWidth = 6
      for (let i = 0; i < 8; i++) {
        if (bunker.health[i] > 0 &&
            bullet.x >= bunker.x + i * segmentWidth &&
            bullet.x <= bunker.x + (i + 1) * segmentWidth &&
            bullet.y >= PLAYER_Y - 70 && bullet.y <= PLAYER_Y - 50) {
          bunker.health[i]--
          playerBullets.value = playerBullets.value.filter(b => b.id !== bullet.id)
        }
      }
    })
  })

  // Collision balle alien -> joueur ou bunker
  alienBullets.value.forEach(bullet => {
    // Joueur
    if (bullet.x >= playerX.value && bullet.x <= playerX.value + PLAYER_WIDTH &&
        bullet.y >= PLAYER_Y - 10 && bullet.y <= PLAYER_Y + 10) {
      lives.value--
      playSound('explosion')
      alienBullets.value = alienBullets.value.filter(b => b.id !== bullet.id)
      if (lives.value <= 0) {
        endGame()
      }
    }

    // Bunkers
    bunkers.value.forEach(bunker => {
      const segmentWidth = 6
      for (let i = 0; i < 8; i++) {
        if (bunker.health[i] > 0 &&
            bullet.x >= bunker.x + i * segmentWidth &&
            bullet.x <= bunker.x + (i + 1) * segmentWidth &&
            bullet.y >= PLAYER_Y - 70 && bullet.y <= PLAYER_Y - 50) {
          bunker.health[i]--
          alienBullets.value = alienBullets.value.filter(b => b.id !== bullet.id)
        }
      }
    })
  })

  // Niveau suivant
  if (aliens.value.every(a => !a.alive)) {
    level.value++
    alienSpeed += 0.2
    initAliens()
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

// Sprites CSS pour aliens
const getAlienSprite = (type: AlienType, frame: number) => {
  const sprites: Record<AlienType, string[]> = {
    squid: [
      '0 4px,4px 4px,8px 4px,4px 0,4px 8px,0 12px,8px 12px,2px 16px,6px 16px',
      '0 4px,4px 4px,8px 4px,4px 0,4px 8px,2px 12px,6px 12px,0 16px,8px 16px'
    ],
    crab: [
      '2px 0,6px 0,0 4px,2px 4px,4px 4px,6px 4px,8px 4px,0 8px,2px 8px,6px 8px,8px 8px,2px 12px,6px 12px,0 16px,8px 16px',
      '2px 0,6px 0,0 4px,2px 4px,4px 4px,6px 4px,8px 4px,0 8px,2px 8px,6px 8px,8px 8px,2px 12px,6px 12px,2px 16px,6px 16px'
    ],
    octopus: [
      '4px 0,2px 4px,4px 4px,6px 4px,0 8px,2px 8px,4px 8px,6px 8px,8px 8px,0 12px,4px 12px,8px 12px,2px 16px,6px 16px',
      '4px 0,2px 4px,4px 4px,6px 4px,0 8px,2px 8px,4px 8px,6px 8px,8px 8px,2px 12px,4px 12px,6px 12px,0 16px,8px 16px'
    ]
  }
  return sprites[type][frame]
}

const getAlienColor = (type: AlienType) => {
  return { squid: '#ff0000', crab: '#00ff00', octopus: '#ffff00' }[type]
}

// Gestion clavier
const handleKeydown = (e: KeyboardEvent) => {
  if (!isPlaying.value) return
  if (e.key === 'ArrowLeft') movePlayer(-1)
  if (e.key === 'ArrowRight') movePlayer(1)
  if (e.key === ' ' || e.key === 'ArrowUp') {
    e.preventDefault()
    shoot()
  }
}

// Gestion tactile continue
let moveInterval: NodeJS.Timeout | null = null
const startMove = (dir: number) => {
  movePlayer(dir)
  if (moveInterval) clearInterval(moveInterval)
  moveInterval = setInterval(() => movePlayer(dir), 50)
}
const stopMove = () => {
  if (moveInterval) {
    clearInterval(moveInterval)
    moveInterval = null
  }
}

onMounted(() => {
  const saved = localStorage.getItem('papa_spaceinvaders_highscore')
  if (saved) highScore.value = parseInt(saved)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  if (moveInterval) clearInterval(moveInterval)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-black flex flex-col items-center">
    <!-- Header avec score -->
    <div class="w-full max-w-[448px] flex justify-between items-center px-4 py-2 text-white font-mono text-sm">
      <NuxtLink to="/" class="text-green-400 hover:text-green-300">← MENU</NuxtLink>
      <div class="flex gap-4">
        <span>SCORE: <span class="text-green-400">{{ score.toString().padStart(4, '0') }}</span></span>
        <span>HI: <span class="text-yellow-400">{{ highScore.toString().padStart(4, '0') }}</span></span>
      </div>
    </div>

    <!-- Écran de démarrage -->
    <div v-if="!isPlaying && !isGameOver" class="flex-1 flex flex-col items-center justify-center gap-6 p-4">
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-white font-mono tracking-wider">SPACE INVADERS</h1>
        <div class="flex justify-center gap-8 text-2xl my-6">
          <div class="flex flex-col items-center">
            <div class="w-6 h-4 bg-red-500 pixel-alien"></div>
            <span class="text-red-500 text-xs mt-2">= 30 PTS</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-6 h-4 bg-green-500 pixel-alien"></div>
            <span class="text-green-500 text-xs mt-2">= 20 PTS</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-6 h-4 bg-yellow-500 pixel-alien"></div>
            <span class="text-yellow-500 text-xs mt-2">= 10 PTS</span>
          </div>
        </div>
        <p class="text-gray-400 text-sm">← → MOVE &nbsp;&nbsp; SPACE FIRE</p>
      </div>
      <button
        class="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-mono text-xl tracking-wider transition-all animate-pulse"
        @click="startGame"
      >
        PLAY
      </button>
      <div class="flex gap-2 mt-4">
        <span v-for="i in 3" :key="i" class="text-green-400 text-2xl">▲</span>
      </div>
    </div>

    <!-- Zone de jeu -->
    <div v-if="isPlaying" class="flex-1 flex flex-col items-center justify-start pt-2">
      <!-- Vies et niveau -->
      <div class="w-full max-w-[448px] flex justify-between px-4 py-1 text-white font-mono text-xs">
        <div class="flex gap-1">
          <span v-for="i in lives" :key="i" class="text-green-400">▲</span>
        </div>
        <span>LEVEL {{ level }}</span>
      </div>

      <!-- Canvas du jeu -->
      <div
        class="relative bg-black border border-green-900"
        :style="{ width: GAME_WIDTH + 'px', height: GAME_HEIGHT + 'px' }"
      >
        <!-- Ligne de sol -->
        <div class="absolute bottom-8 left-0 right-0 h-px bg-green-500"></div>

        <!-- UFO -->
        <div
          v-if="ufo.active"
          class="absolute top-6 text-red-500 font-mono text-lg transition-none"
          :style="{ left: ufo.x + 'px' }"
        >
          ◄■■►
        </div>

        <!-- Aliens -->
        <div
          v-for="alien in aliens"
          :key="alien.id"
          v-show="alien.alive"
          class="absolute transition-none font-mono leading-none"
          :style="{
            left: alien.x + 'px',
            top: alien.y + 'px',
            color: getAlienColor(alien.type),
            fontSize: '20px'
          }"
        >
          <template v-if="alien.type === 'squid'">{{ animFrame === 0 ? '👾' : '👻' }}</template>
          <template v-else-if="alien.type === 'crab'">{{ animFrame === 0 ? '🦀' : '🦞' }}</template>
          <template v-else>{{ animFrame === 0 ? '🐙' : '🦑' }}</template>
        </div>

        <!-- Bunkers -->
        <div
          v-for="bunker in bunkers"
          :key="bunker.id"
          class="absolute flex"
          :style="{ left: bunker.x + 'px', top: (PLAYER_Y - 65) + 'px' }"
        >
          <div
            v-for="(health, i) in bunker.health"
            :key="i"
            class="w-[6px] h-[20px]"
            :class="{
              'bg-green-500': health === 3,
              'bg-green-600': health === 2,
              'bg-green-800': health === 1,
              'bg-transparent': health === 0
            }"
          ></div>
        </div>

        <!-- Balles joueur -->
        <div
          v-for="bullet in playerBullets"
          :key="'p' + bullet.id"
          class="absolute w-1 h-4 bg-white"
          :style="{ left: bullet.x + 'px', top: bullet.y + 'px' }"
        ></div>

        <!-- Balles aliens -->
        <div
          v-for="bullet in alienBullets"
          :key="'a' + bullet.id"
          class="absolute w-1 h-3 bg-red-500"
          :style="{ left: bullet.x + 'px', top: bullet.y + 'px' }"
        ></div>

        <!-- Joueur (canon) -->
        <div
          class="absolute text-green-400 font-mono text-2xl"
          :style="{ left: playerX + 'px', top: PLAYER_Y + 'px' }"
        >
          ▲
        </div>
      </div>

      <!-- Contrôles tactiles -->
      <div class="flex justify-center gap-6 mt-4 pb-4">
        <button
          class="w-20 h-16 bg-gray-900 rounded-lg text-3xl text-green-400 active:bg-green-900 border-2 border-green-700 select-none"
          @touchstart.prevent="startMove(-1)"
          @touchend.prevent="stopMove"
          @mousedown="startMove(-1)"
          @mouseup="stopMove"
          @mouseleave="stopMove"
        >
          ◄
        </button>
        <button
          class="w-24 h-16 bg-red-900 rounded-lg text-xl text-white active:bg-red-700 border-2 border-red-600 font-mono select-none"
          @touchstart.prevent="shoot"
          @click="shoot"
        >
          FIRE
        </button>
        <button
          class="w-20 h-16 bg-gray-900 rounded-lg text-3xl text-green-400 active:bg-green-900 border-2 border-green-700 select-none"
          @touchstart.prevent="startMove(1)"
          @touchend.prevent="stopMove"
          @mousedown="startMove(1)"
          @mouseup="stopMove"
          @mouseleave="stopMove"
        >
          ►
        </button>
      </div>
    </div>

    <!-- Game Over -->
    <div v-if="isGameOver" class="flex-1 flex flex-col items-center justify-center gap-4 p-4">
      <div class="text-center space-y-4">
        <h2 class="text-4xl font-bold text-red-500 font-mono animate-pulse">GAME OVER</h2>
        <p class="text-2xl text-white font-mono">SCORE: {{ score }}</p>
        <p class="text-lg text-gray-400 font-mono">LEVEL: {{ level }}</p>
        <p v-if="score >= highScore && score > 0" class="text-yellow-400 font-mono animate-bounce">NEW HIGH SCORE!</p>
      </div>
      <button
        class="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-mono text-xl tracking-wider transition-all mt-6"
        @click="startGame"
      >
        PLAY AGAIN
      </button>
    </div>
  </div>
</template>

<style scoped>
.pixel-alien {
  image-rendering: pixelated;
}
</style>
