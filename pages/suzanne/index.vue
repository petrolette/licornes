<script setup lang="ts">
interface Activity {
  id: string
  emoji: string
  label: string
  description: string
  color: string
  to: string
}

const activities: Activity[] = [
  {
    id: 'createur',
    emoji: '✨',
    label: 'Créer ma licorne',
    description: 'Personnalise ta licorne',
    color: 'bg-violet-100',
    to: '/suzanne/createur'
  },
  {
    id: 'jeux',
    emoji: '🎮',
    label: 'Jeux',
    description: 'Memory, étoiles...',
    color: 'bg-rose-100',
    to: '/suzanne/jeux'
  },
  {
    id: 'histoires',
    emoji: '📖',
    label: 'Histoires',
    description: 'Aventures magiques',
    color: 'bg-ciel/30',
    to: '/suzanne/histoires'
  },
  {
    id: 'quiz',
    emoji: '🧠',
    label: 'Quiz',
    description: 'Teste tes connaissances',
    color: 'bg-turquoise/30',
    to: '/suzanne/quiz'
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
        <h1 class="text-4xl sm:text-5xl font-magic text-violet mb-2">
          Suzanne
        </h1>
        <p class="text-xl text-violet-600/80 font-body">
          Choisis une activité !
        </p>
      </div>

      <!-- Grille d'activités -->
      <div class="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
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
          <div class="text-center">
            <span class="block text-xl font-magic text-violet-700">
              {{ activity.label }}
            </span>
            <span class="block text-sm text-violet-500 font-body mt-1">
              {{ activity.description }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
