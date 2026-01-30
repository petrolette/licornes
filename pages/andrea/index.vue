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
    <div class="relative min-h-screen min-h-dvh px-4 py-8 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">

      <!-- Décorations flottantes -->
      <div
        v-for="(dec, i) in decorations"
        :key="i"
        class="fixed text-3xl animate-float pointer-events-none opacity-60"
        :style="{
          top: dec.top,
          left: dec.left,
          right: dec.right,
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${3 + i * 0.3}s`
        }"
      >
        {{ dec.emoji }}
      </div>

      <!-- Bouton retour maison -->
      <NuxtLink to="/" class="btn-back z-20">
        🏠
      </NuxtLink>

      <!-- En-tête enrichi -->
      <div class="text-center pt-16 mb-8 relative z-10">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="text-4xl animate-sparkle">🌸</span>
          <div class="text-7xl animate-bounce-soft">🧸</div>
          <span class="text-4xl animate-sparkle" style="animation-delay: 0.5s">🌸</span>
        </div>
        <div class="flex items-center justify-center gap-3 mb-2">
          <span class="text-3xl">🎀</span>
          <h1 class="text-4xl sm:text-5xl font-magic text-rose">
            Andrea
          </h1>
          <span class="text-3xl">🎀</span>
        </div>
        <p class="text-xl text-rose-600/80 font-body flex items-center justify-center gap-2">
          <span>💖</span> Que veux-tu faire ? <span>💖</span>
        </p>
      </div>

      <!-- Grille d'activités - GROS boutons pour 3 ans -->
      <div class="grid grid-cols-2 gap-5 max-w-md mx-auto relative z-10">
        <NuxtLink
          v-for="activity in activities"
          :key="activity.id"
          :to="activity.to"
          class="relative aspect-square rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
        >
          <!-- Fond gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-90"
            :class="activity.bgGradient"
          />

          <!-- Contenu -->
          <div class="relative z-10 h-full flex flex-col items-center justify-center p-4">
            <!-- Double emoji pour plus de fun -->
            <div class="flex items-center gap-1 mb-3">
              <span class="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">
                {{ activity.emoji }}
              </span>
              <span class="text-4xl sm:text-5xl group-hover:scale-110 transition-transform" style="animation-delay: 0.1s">
                {{ activity.secondEmoji }}
              </span>
            </div>
            <span class="text-xl sm:text-2xl font-magic text-rose-700 text-center">
              {{ activity.label }}
            </span>
          </div>

          <!-- Étoile décorative -->
          <span class="absolute top-2 right-2 text-xl animate-sparkle">⭐</span>
        </NuxtLink>
      </div>

      <!-- Décoration bas de page -->
      <div class="fixed bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-400 opacity-60" />
      <div class="fixed bottom-4 left-0 right-0 flex justify-around text-xl opacity-50">
        <span>🌷</span><span>🌸</span><span>💐</span><span>🌺</span><span>🌷</span><span>🌸</span>
      </div>
    </div>
  </NuxtLayout>
</template>
