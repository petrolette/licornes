<script setup lang="ts">
import { ref } from 'vue'

const isVideoFullscreen = ref(false)

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
    available: true
  },
  {
    id: 'etoiles',
    title: 'Le voyage aux étoiles',
    emoji: '🌟',
    description: 'Direction les étoiles !',
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
    <!-- Vidéo d'ambiance - Cliquable pour plein écran -->
    <div class="relative w-full px-4 mb-2" style="max-height: 30vh;">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full max-h-[30vh] rounded-2xl shadow-xl border-3 border-violet-200 object-contain cursor-pointer"
        @click="isVideoFullscreen = true"
      >
        <source src="/videos/Licorne_en_Forêt_Enchantée_Vidéo.mp4" type="video/mp4">
      </video>
      <div class="absolute bottom-2 right-6 bg-black/30 rounded-lg px-2 py-1 text-white text-xs pointer-events-none">
        🔍 Clic = Plein écran
      </div>
    </div>

    <!-- En-tête compact -->
    <div class="text-center mb-2">
      <h1 class="text-xl sm:text-2xl font-magic text-violet">Histoires</h1>
    </div>

    <!-- Liste des histoires - GROS boutons -->
    <div class="w-full max-w-sm space-y-3">
      <template v-for="story in stories" :key="story.id">
        <NuxtLink
          v-if="story.available"
          :to="`/suzanne/histoires/${story.id}`"
          class="block p-4 bg-white/90 rounded-[1.5rem] shadow-2xl hover:scale-102 active:scale-98 transition-all border-4 border-white/50"
        >
          <div class="flex items-center gap-3">
            <span class="text-5xl">{{ story.emoji }}</span>
            <div>
              <h3 class="text-xl font-magic text-violet-700">{{ story.title }}</h3>
              <p class="text-sm text-violet-500 font-body">{{ story.description }}</p>
            </div>
          </div>
        </NuxtLink>

        <div
          v-else
          class="p-4 bg-white/50 rounded-[1.5rem] shadow-lg opacity-60 border-4 border-gray-200"
        >
          <div class="flex items-center gap-3">
            <span class="text-5xl grayscale">{{ story.emoji }}</span>
            <div>
              <h3 class="text-xl font-magic text-gray-500">{{ story.title }}</h3>
              <p class="text-sm text-gray-400 font-body">Bientôt</p>
            </div>
            <span class="ml-auto text-2xl">🔒</span>
          </div>
        </div>
      </template>
    </div>
    </div>

    <!-- Modal Vidéo Plein écran -->
    <Teleport to="body">
      <div
        v-if="isVideoFullscreen"
        class="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        @click="isVideoFullscreen = false"
      >
        <button
          class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30 z-10"
        >
          ✕
        </button>
        <video
          autoplay
          loop
          muted
          playsinline
          class="max-w-full max-h-full object-contain"
          @click.stop
        >
          <source src="/videos/Licorne_en_Forêt_Enchantée_Vidéo.mp4" type="video/mp4">
        </video>
      </div>
    </Teleport>
  </div>
</template>
