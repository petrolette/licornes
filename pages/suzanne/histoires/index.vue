<script setup lang="ts">
interface Story {
  id: string
  title: string
  emoji: string
  description: string
  available: boolean
}

const stories: Story[] = [
  {
    id: 'chateau',
    title: 'Le château enchanté',
    emoji: '🏰',
    description: 'Une aventure au château des licornes',
    available: true
  },
  {
    id: 'foret',
    title: 'La forêt magique',
    emoji: '🌳',
    description: 'Explore la forêt avec ta licorne',
    available: false
  },
  {
    id: 'etoiles',
    title: 'Le voyage aux étoiles',
    emoji: '🌟',
    description: 'Direction les étoiles !',
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
      <div class="text-center pt-16 mb-8">
        <div class="text-5xl mb-4">
          📖
        </div>
        <h1 class="text-3xl font-magic text-violet">
          Histoires magiques
        </h1>
        <p class="text-lg text-violet-600/80 font-body mt-2">
          Choisis une aventure !
        </p>
      </div>

      <!-- Liste des histoires -->
      <div class="max-w-md mx-auto space-y-4">
        <template v-for="story in stories" :key="story.id">
          <NuxtLink
            v-if="story.available"
            :to="`/suzanne/histoires/${story.id}`"
            class="block p-6 bg-white/90 rounded-magic shadow-lg hover:scale-102 active:scale-98 transition-all"
          >
            <div class="flex items-center gap-4">
              <span class="text-5xl">{{ story.emoji }}</span>
              <div>
                <h3 class="text-xl font-magic text-violet-700">{{ story.title }}</h3>
                <p class="text-sm text-violet-500 font-body">{{ story.description }}</p>
              </div>
            </div>
          </NuxtLink>

          <!-- Histoire non disponible -->
          <div
            v-else
            class="p-6 bg-white/50 rounded-magic shadow opacity-60"
          >
            <div class="flex items-center gap-4">
              <span class="text-5xl grayscale">{{ story.emoji }}</span>
              <div>
                <h3 class="text-xl font-magic text-gray-500">{{ story.title }}</h3>
                <p class="text-sm text-gray-400 font-body">Bientôt disponible</p>
              </div>
              <span class="ml-auto text-2xl">🔒</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>
