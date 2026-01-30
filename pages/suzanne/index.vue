<script setup lang="ts">
interface Activity {
  id: string
  emoji: string
  secondEmoji: string
  label: string
  description: string
  bgGradient: string
  to: string
}

const activities: Activity[] = [
  {
    id: 'createur',
    emoji: '🦄',
    secondEmoji: '✨',
    label: 'Créer ma licorne',
    description: 'Personnalise ta licorne',
    bgGradient: 'from-violet-200 via-purple-100 to-fuchsia-200',
    to: '/suzanne/createur'
  },
  {
    id: 'jeux',
    emoji: '🎮',
    secondEmoji: '🎯',
    label: 'Jeux',
    description: 'Memory, puzzles...',
    bgGradient: 'from-rose-200 via-pink-100 to-red-200',
    to: '/suzanne/jeux'
  },
  {
    id: 'histoires',
    emoji: '📖',
    secondEmoji: '🏰',
    label: 'Histoires',
    description: 'Aventures magiques',
    bgGradient: 'from-sky-200 via-blue-100 to-indigo-200',
    to: '/suzanne/histoires'
  },
  {
    id: 'quiz',
    emoji: '🧠',
    secondEmoji: '❓',
    label: 'Quiz',
    description: 'Teste tes connaissances',
    bgGradient: 'from-teal-200 via-cyan-100 to-emerald-200',
    to: '/suzanne/quiz'
  }
]

// Décorations flottantes
const decorations = [
  { emoji: '⭐', top: '12%', left: '5%' },
  { emoji: '🦋', top: '22%', right: '6%' },
  { emoji: '💜', top: '40%', left: '4%' },
  { emoji: '✨', top: '50%', right: '5%' },
  { emoji: '🌟', top: '65%', left: '6%' },
  { emoji: '💫', top: '30%', right: '4%' },
  { emoji: '🔮', top: '75%', right: '7%' },
]
</script>

<template>
  <NuxtLayout>
    <div class="relative flex flex-col items-center justify-center h-screen h-dvh px-4 overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">

      <!-- Décorations discrètes -->
      <div class="fixed top-1/4 left-2 text-2xl animate-float opacity-40">⭐</div>
      <div class="fixed top-1/3 right-2 text-2xl animate-float opacity-40" style="animation-delay: 0.5s">🦋</div>

      <!-- Bouton retour maison -->
      <NuxtLink to="/" class="btn-back z-20">
        🏠
      </NuxtLink>

      <!-- En-tête compact -->
      <div class="text-center mb-4 relative z-10">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-3xl">✨</span>
          <div class="text-5xl sm:text-6xl">🦄</div>
          <span class="text-3xl">✨</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-2xl">👑</span>
          <h1 class="text-3xl sm:text-4xl font-magic text-violet">Suzanne</h1>
          <span class="text-2xl">👑</span>
        </div>
      </div>

      <!-- Grille d'activités -->
      <div class="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
        <NuxtLink
          v-for="activity in activities"
          :key="activity.id"
          :to="activity.to"
          class="relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group p-4"
        >
          <div class="absolute inset-0 bg-gradient-to-br" :class="activity.bgGradient" />

          <div class="relative z-10 flex flex-col items-center text-center">
            <div class="flex items-center gap-1 mb-2">
              <span class="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">{{ activity.emoji }}</span>
              <span class="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{{ activity.secondEmoji }}</span>
            </div>
            <span class="block text-lg sm:text-xl font-magic text-violet-700">{{ activity.label }}</span>
            <span class="block text-xs sm:text-sm text-violet-500 font-body">{{ activity.description }}</span>
          </div>

          <span class="absolute top-2 right-2 text-lg animate-sparkle">⭐</span>
        </NuxtLink>
      </div>

      <!-- Arc-en-ciel bas -->
      <div class="fixed bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 opacity-60" />
    </div>
  </NuxtLayout>
</template>
