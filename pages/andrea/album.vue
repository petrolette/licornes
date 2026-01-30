<script setup lang="ts">
// Galerie de licornes (émojis pour le MVP, images à ajouter)
const images = [
  { id: 1, emoji: '🦄', label: 'Licorne rose' },
  { id: 2, emoji: '🌈', label: 'Arc-en-ciel' },
  { id: 3, emoji: '⭐', label: 'Étoile dorée' },
  { id: 4, emoji: '🏰', label: 'Château' },
  { id: 5, emoji: '🌸', label: 'Fleur' },
  { id: 6, emoji: '🦋', label: 'Papillon' },
  { id: 7, emoji: '☁️', label: 'Nuage' },
  { id: 8, emoji: '🌙', label: 'Lune' }
]

const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen min-h-dvh flex flex-col px-4 py-8">
      <!-- Bouton retour -->
      <NuxtLink to="/andrea" class="btn-back">
        ⬅️
      </NuxtLink>

      <!-- En-tête -->
      <div class="text-center pt-16 mb-8">
        <h1 class="text-3xl font-magic text-rose">
          Album photos
        </h1>
      </div>

      <!-- Visionneuse principale -->
      <div class="flex-1 flex items-center justify-center">
        <div class="relative w-full max-w-md">
          <!-- Image principale -->
          <div class="aspect-square bg-white rounded-magic shadow-magic flex items-center justify-center">
            <span class="text-[150px] select-none">
              {{ images[currentIndex].emoji }}
            </span>
          </div>

          <!-- Flèches de navigation (très grosses pour enfant) -->
          <button
            class="absolute left-2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
            @click="prevImage"
          >
            ⬅️
          </button>
          <button
            class="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
            @click="nextImage"
          >
            ➡️
          </button>
        </div>
      </div>

      <!-- Miniatures -->
      <div class="flex justify-center gap-2 mt-6 overflow-x-auto pb-4 no-scrollbar">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all"
          :class="index === currentIndex ? 'bg-rose-200 scale-110 shadow-md' : 'bg-white/80'"
          @click="currentIndex = index"
        >
          {{ image.emoji }}
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>
