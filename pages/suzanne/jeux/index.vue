<script setup lang="ts">
interface Game {
  id: string
  emoji: string
  label: string
  description: string
  color: string
  to: string
  available: boolean
}

const games: Game[] = [
  {
    id: 'memory',
    emoji: '🃏',
    label: 'Memory',
    description: 'Trouve les paires',
    color: 'bg-rose-100',
    to: '/suzanne/jeux/memory',
    available: true
  },
  {
    id: 'etoiles',
    emoji: '⭐',
    label: 'Attrape les étoiles',
    description: 'Clique sur les étoiles',
    color: 'bg-yellow-100',
    to: '/suzanne/jeux/etoiles',
    available: true
  },
  {
    id: 'labyrinthe',
    emoji: '🌈',
    label: 'Labyrinthe',
    description: 'Trouve le chemin',
    color: 'bg-sky-100',
    to: '/suzanne/jeux/labyrinthe',
    available: true
  }
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">
    <!-- Bouton retour 3D -->
    <NuxtLink
      to="/suzanne"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-violet-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <!-- En-tête compact -->
    <div class="text-center mb-3">
      <div class="text-3xl mb-1">🎮</div>
      <h1 class="text-2xl sm:text-3xl font-magic text-violet">Jeux</h1>
    </div>

    <!-- Liste des jeux - GROS boutons -->
    <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
      <template v-for="game in games" :key="game.id">
        <NuxtLink
          v-if="game.available"
          :to="game.to"
          class="relative aspect-square rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-3 transition-all hover:scale-105 active:scale-95 border-4 border-white/50"
          :class="game.color"
        >
          <span class="text-5xl sm:text-6xl mb-2">{{ game.emoji }}</span>
          <span class="text-lg sm:text-xl font-magic text-violet-700 text-center">{{ game.label }}</span>
        </NuxtLink>

        <div
          v-else
          class="relative aspect-square rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-3 opacity-50 border-4 border-gray-200"
          :class="game.color"
        >
          <span class="text-5xl sm:text-6xl mb-2">{{ game.emoji }}</span>
          <span class="text-lg font-magic text-gray-500 text-center">{{ game.label }}</span>
          <span class="absolute top-2 right-2 text-xl">🔒</span>
        </div>
      </template>
    </div>
    </div>
  </div>
</template>
