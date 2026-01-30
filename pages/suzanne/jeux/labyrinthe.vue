<script setup lang="ts">
import { ref } from 'vue'

// Labyrinthe simple 7x7 (0 = chemin, 1 = mur)
const maze = [
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0]
]

// Aplatir le labyrinthe pour une seule boucle
const flatMaze = maze.flatMap((row, y) =>
  row.map((cell, x) => ({ x, y, isWall: cell === 1 }))
)

const playerPos = ref({ x: 0, y: 0 })
const goalPos = { x: 6, y: 6 }
const isWon = ref(false)
const moves = ref(0)

const canMove = (x: number, y: number) => {
  if (x < 0 || x >= 7 || y < 0 || y >= 7) return false
  return maze[y][x] === 0
}

const move = (dx: number, dy: number) => {
  if (isWon.value) return
  const newX = playerPos.value.x + dx
  const newY = playerPos.value.y + dy
  if (canMove(newX, newY)) {
    playerPos.value = { x: newX, y: newY }
    moves.value++
    checkWin()
  }
}

const checkWin = () => {
  if (playerPos.value.x === goalPos.x && playerPos.value.y === goalPos.y) {
    isWon.value = true
  }
}

const restart = () => {
  playerPos.value = { x: 0, y: 0 }
  isWon.value = false
  moves.value = 0
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/suzanne/jeux"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-violet-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <div class="h-full flex flex-col items-center justify-center gap-4 pt-20 pb-4 px-4">
      <!-- Titre -->
      <div class="text-center">
        <h1 class="text-xl font-magic text-violet">Labyrinthe 🌈</h1>
        <p class="text-sm text-violet-600">Aide la licorne à trouver l'arc-en-ciel !</p>
        <p class="text-xs text-gray-500 mt-1">Déplacements : {{ moves }}</p>
      </div>

      <!-- Labyrinthe -->
      <div class="bg-white rounded-2xl p-3 shadow-xl">
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="cell in flatMaze"
            :key="`${cell.x}-${cell.y}`"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-xl"
            :class="cell.isWall ? 'bg-violet-300' : 'bg-violet-50'"
          >
            <span v-if="playerPos.x === cell.x && playerPos.y === cell.y">🦄</span>
            <span v-else-if="cell.x === goalPos.x && cell.y === goalPos.y">🌈</span>
          </div>
        </div>
      </div>

      <!-- Contrôles -->
      <div class="grid grid-cols-3 gap-2 w-44">
        <div></div>
        <button
          class="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl border-2 border-violet-200 active:scale-90 active:bg-violet-100 transition-all"
          @click="move(0, -1)"
        >
          ↑
        </button>
        <div></div>
        <button
          class="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl border-2 border-violet-200 active:scale-90 active:bg-violet-100 transition-all"
          @click="move(-1, 0)"
        >
          ←
        </button>
        <button
          class="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl border-2 border-violet-200 active:scale-90 active:bg-violet-100 transition-all"
          @click="move(0, 1)"
        >
          ↓
        </button>
        <button
          class="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl border-2 border-violet-200 active:scale-90 active:bg-violet-100 transition-all"
          @click="move(1, 0)"
        >
          →
        </button>
      </div>
    </div>

    <!-- Modal victoire -->
    <Teleport to="body">
      <div
        v-if="isWon"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="bg-white rounded-3xl p-6 shadow-2xl text-center max-w-sm mx-4">
          <div class="text-5xl mb-3">🏆</div>
          <h2 class="text-2xl font-magic text-violet mb-2">Bravo Suzanne !</h2>
          <p class="text-violet-600 mb-1">Tu as trouvé l'arc-en-ciel !</p>
          <p class="text-sm text-gray-500 mb-4">En {{ moves }} déplacements</p>
          <button
            class="py-3 px-6 bg-gradient-to-r from-violet to-rose text-white rounded-xl font-magic hover:scale-105 transition-all"
            @click="restart"
          >
            🔄 Rejouer
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
