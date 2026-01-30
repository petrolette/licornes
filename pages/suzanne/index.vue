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
    <div class="relative min-h-screen min-h-dvh px-4 py-8 overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">

      <!-- Décorations flottantes -->
      <div
        v-for="(dec, i) in decorations"
        :key="i"
        class="fixed text-3xl animate-float pointer-events-none opacity-60"
        :style="{
          top: dec.top,
          left: dec.left,
          right: dec.right,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${3 + i * 0.4}s`
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
          <span class="text-4xl animate-sparkle">✨</span>
          <div class="text-7xl animate-bounce-soft">🦄</div>
          <span class="text-4xl animate-sparkle" style="animation-delay: 0.5s">✨</span>
        </div>
        <div class="flex items-center justify-center gap-3 mb-2">
          <span class="text-3xl">👑</span>
          <h1 class="text-4xl sm:text-5xl font-magic text-violet">
            Suzanne
          </h1>
          <span class="text-3xl">👑</span>
        </div>
        <p class="text-xl text-violet-600/80 font-body flex items-center justify-center gap-2">
          <span>💜</span> Choisis une activité ! <span>💜</span>
        </p>
      </div>

      <!-- Grille d'activités - Cartes plus grandes -->
      <div class="grid grid-cols-2 gap-5 max-w-lg mx-auto relative z-10">
        <NuxtLink
          v-for="activity in activities"
          :key="activity.id"
          :to="activity.to"
          class="relative rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group p-5"
        >
          <!-- Fond gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-90"
            :class="activity.bgGradient"
          />

          <!-- Contenu -->
          <div class="relative z-10 flex flex-col items-center text-center">
            <!-- Double emoji -->
            <div class="flex items-center gap-2 mb-3">
              <span class="text-5xl group-hover:scale-110 transition-transform">
                {{ activity.emoji }}
              </span>
              <span class="text-4xl group-hover:scale-110 transition-transform">
                {{ activity.secondEmoji }}
              </span>
            </div>
            <span class="block text-xl font-magic text-violet-700 mb-1">
              {{ activity.label }}
            </span>
            <span class="block text-sm text-violet-500 font-body">
              {{ activity.description }}
            </span>
          </div>

          <!-- Étoile décorative -->
          <span class="absolute top-2 right-2 text-xl animate-sparkle">⭐</span>
        </NuxtLink>
      </div>

      <!-- Décoration bas de page -->
      <div class="fixed bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 opacity-60" />
      <div class="fixed bottom-4 left-0 right-0 flex justify-around text-xl opacity-50">
        <span>💜</span><span>⭐</span><span>🔮</span><span>✨</span><span>💜</span><span>⭐</span>
      </div>
    </div>
  </NuxtLayout>
</template>
