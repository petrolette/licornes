<script setup lang="ts">
interface Activity {
  id: string
  emoji: string
  label: string
  color: string
  to: string
}

const activities: Activity[] = [
  {
    id: 'coloriage',
    emoji: '🎨',
    label: 'Colorier',
    color: 'bg-rose-100',
    to: '/andrea/coloriage'
  },
  {
    id: 'sons',
    emoji: '🔊',
    label: 'Sons',
    color: 'bg-arc-jaune/30',
    to: '/andrea/sons'
  },
  {
    id: 'album',
    emoji: '📸',
    label: 'Album',
    color: 'bg-ciel/30',
    to: '/andrea/album'
  },
  {
    id: 'comptines',
    emoji: '🎵',
    label: 'Chansons',
    color: 'bg-turquoise/30',
    to: '/andrea/comptines'
  }
]
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen min-h-dvh px-4 py-8">
      <!-- Bouton retour maison -->
      <NuxtLink to="/" class="btn-back">
        🏠
      </NuxtLink>

      <!-- En-tête -->
      <div class="text-center pt-16 mb-12">
        <div class="text-6xl mb-4 animate-bounce-soft">
          🦄
        </div>
        <h1 class="text-4xl sm:text-5xl font-magic text-rose mb-2">
          Andrea
        </h1>
        <p class="text-xl text-rose-600/80 font-body">
          Que veux-tu faire ?
        </p>
      </div>

      <!-- Grille d'activités (gros boutons pour 3 ans) -->
      <div class="grid grid-cols-2 gap-6 max-w-lg mx-auto">
        <NuxtLink
          v-for="activity in activities"
          :key="activity.id"
          :to="activity.to"
          class="activity-card group"
          :class="activity.color"
        >
          <div class="activity-icon group-hover:scale-125">
            {{ activity.emoji }}
          </div>
          <span class="text-xl font-magic text-rose-700">
            {{ activity.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
