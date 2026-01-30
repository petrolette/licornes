<script setup lang="ts">
interface Activity {
  id: string
  emoji: string
  secondEmoji: string
  label: string
  bgGradient: string
  to: string
}

const activities: Activity[] = [
  {
    id: 'coloriage',
    emoji: '🎨',
    secondEmoji: '🖍️',
    label: 'Colorier',
    bgGradient: 'from-rose-200 via-pink-100 to-rose-300',
    to: '/andrea/coloriage'
  },
  {
    id: 'sons',
    emoji: '🔊',
    secondEmoji: '🎶',
    label: 'Sons',
    bgGradient: 'from-yellow-200 via-amber-100 to-orange-200',
    to: '/andrea/sons'
  },
  {
    id: 'album',
    emoji: '📸',
    secondEmoji: '🖼️',
    label: 'Album',
    bgGradient: 'from-sky-200 via-blue-100 to-cyan-200',
    to: '/andrea/album'
  },
  {
    id: 'comptines',
    emoji: '🎵',
    secondEmoji: '🎤',
    label: 'Chansons',
    bgGradient: 'from-teal-200 via-emerald-100 to-green-200',
    to: '/andrea/comptines'
  }
]

// Décorations flottantes
const decorations = [
  { emoji: '🌸', top: '15%', left: '5%' },
  { emoji: '💖', top: '25%', right: '8%' },
  { emoji: '🎀', top: '45%', left: '3%' },
  { emoji: '⭐', top: '55%', right: '5%' },
  { emoji: '🦋', top: '75%', left: '6%' },
  { emoji: '✨', top: '35%', right: '4%' },
]
</script>

<template>
  <NuxtLayout>
    <div class="relative flex flex-col items-center justify-center h-screen h-dvh px-4 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">

      <!-- Décorations discrètes -->
      <div class="fixed top-1/4 left-2 text-2xl animate-float opacity-40">🌸</div>
      <div class="fixed top-1/3 right-2 text-2xl animate-float opacity-40" style="animation-delay: 0.5s">💖</div>

      <!-- Bouton retour maison -->
      <NuxtLink to="/" class="btn-back z-20">
        🏠
      </NuxtLink>

      <!-- En-tête compact -->
      <div class="text-center mb-4 relative z-10">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-3xl">🌸</span>
          <div class="text-5xl sm:text-6xl">🧸</div>
          <span class="text-3xl">🌸</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-2xl">🎀</span>
          <h1 class="text-3xl sm:text-4xl font-magic text-rose">Andrea</h1>
          <span class="text-2xl">🎀</span>
        </div>
      </div>

      <!-- Grille d'activités - GROS boutons pour 3 ans -->
      <div class="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10">
        <NuxtLink
          v-for="activity in activities"
          :key="activity.id"
          :to="activity.to"
          class="relative aspect-square rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
        >
          <div class="absolute inset-0 bg-gradient-to-br" :class="activity.bgGradient" />

          <div class="relative z-10 h-full flex flex-col items-center justify-center p-3">
            <div class="flex items-center gap-1 mb-2">
              <span class="text-5xl group-hover:scale-110 transition-transform">{{ activity.emoji }}</span>
              <span class="text-4xl group-hover:scale-110 transition-transform">{{ activity.secondEmoji }}</span>
            </div>
            <span class="text-lg sm:text-xl font-magic text-rose-700 text-center">{{ activity.label }}</span>
          </div>

          <span class="absolute top-2 right-2 text-lg animate-sparkle">⭐</span>
        </NuxtLink>
      </div>

      <!-- Arc-en-ciel bas -->
      <div class="fixed bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-400 opacity-60" />
    </div>
  </NuxtLayout>
</template>
