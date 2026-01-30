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
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">
    <!-- Bouton retour maison - coin supérieur gauche -->
    <NuxtLink
      to="/"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-violet-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">🏠</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <!-- En-tête compact -->
    <div class="text-center mb-4">
      <div class="text-5xl mb-2">🦄</div>
      <h1 class="text-3xl font-magic text-violet">Suzanne</h1>
    </div>

    <!-- Grille d'activités - Boutons 3D -->
    <div class="grid grid-cols-2 gap-5 w-full max-w-md px-4">
      <!-- Créer - Violet -->
      <NuxtLink
        to="/suzanne/createur"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-violet-100 to-violet-200 border-4 border-b-8 border-violet-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🦄</span>
        <span class="text-lg font-magic text-violet-700">Créer</span>
      </NuxtLink>

      <!-- Jeux - Rose -->
      <NuxtLink
        to="/suzanne/jeux"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-100 to-pink-200 border-4 border-b-8 border-pink-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🎮</span>
        <span class="text-lg font-magic text-pink-700">Jeux</span>
      </NuxtLink>

      <!-- Histoires - Bleu -->
      <NuxtLink
        to="/suzanne/histoires"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-blue-200 border-4 border-b-8 border-blue-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">📖</span>
        <span class="text-lg font-magic text-blue-700">Histoires</span>
      </NuxtLink>

      <!-- Quiz - Vert -->
      <NuxtLink
        to="/suzanne/quiz"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-teal-100 to-teal-200 border-4 border-b-8 border-teal-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🧠</span>
        <span class="text-lg font-magic text-teal-700">Quiz</span>
      </NuxtLink>
    </div>
    </div>
  </div>
</template>
