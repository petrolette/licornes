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
    color: 'bg-arc-jaune/30',
    to: '/suzanne/jeux/etoiles',
    available: false
  },
  {
    id: 'labyrinthe',
    emoji: '🌈',
    label: 'Labyrinthe',
    description: 'Trouve le chemin',
    color: 'bg-ciel/30',
    to: '/suzanne/jeux/labyrinthe',
    available: false
  }
]
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen min-h-dvh px-4 py-8">
      <!-- Bouton retour -->
      <NuxtLink to="/suzanne" class="btn-back">
        ⬅️
      </NuxtLink>

      <!-- En-tête -->
      <div class="text-center pt-16 mb-12">
        <div class="text-5xl mb-4">
          🎮
        </div>
        <h1 class="text-4xl font-magic text-violet mb-2">
          Jeux
        </h1>
        <p class="text-lg text-violet-600/80 font-body">
          Choisis un jeu !
        </p>
      </div>

      <!-- Liste des jeux -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <template v-for="game in games" :key="game.id">
          <NuxtLink
            v-if="game.available"
            :to="game.to"
            class="activity-card group"
            :class="game.color"
          >
            <div class="activity-icon group-hover:scale-125">
              {{ game.emoji }}
            </div>
            <div class="text-center">
              <span class="block text-xl font-magic text-violet-700">
                {{ game.label }}
              </span>
              <span class="block text-sm text-violet-500 font-body mt-1">
                {{ game.description }}
              </span>
            </div>
          </NuxtLink>

          <!-- Jeu non disponible -->
          <div
            v-else
            class="activity-card opacity-50 cursor-not-allowed"
            :class="game.color"
          >
            <div class="activity-icon">
              {{ game.emoji }}
            </div>
            <div class="text-center">
              <span class="block text-xl font-magic text-gray-500">
                {{ game.label }}
              </span>
              <span class="block text-sm text-gray-400 font-body mt-1">
                Bientôt disponible
              </span>
            </div>
            <span class="absolute top-2 right-2 text-lg">🔒</span>
          </div>
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>
