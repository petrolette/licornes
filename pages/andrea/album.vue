<script setup lang="ts">
import { ref, computed } from 'vue'

const currentIndex = ref(0)
const isFullscreen = ref(false)

const images = ['/images/licorne1.jpg', '/images/licorne2.jpg', '/images/licorne3.jpg']

const currentSrc = computed(() => images[currentIndex.value])

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const openFullscreen = () => {
  isFullscreen.value = true
}

const closeFullscreen = () => {
  isFullscreen.value = false
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-pink-500 shadow-2xl"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Layout centré -->
    <div class="h-full flex flex-col items-center justify-center gap-3 pt-16 pb-4 px-1">

      <!-- Titre -->
      <h1 class="text-lg font-magic text-rose shrink-0">Album photos</h1>

      <!-- Zone image avec navigation horizontale - Maximisée -->
      <div class="flex flex-row items-center justify-center gap-1 w-full">
        <!-- Flèche gauche -->
        <button
          class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xl border-2 border-rose-300 hover:bg-rose-50 active:scale-95 transition-all shrink-0"
          @click="prevImage"
        >
          ←
        </button>

        <!-- Image principale - Maximisée + Plein écran au clic -->
        <img
          :key="currentIndex"
          :src="currentSrc"
          alt="Licorne"
          class="w-[75vw] h-[75vw] max-h-[55vh] rounded-2xl shadow-xl object-cover cursor-pointer"
          @click="openFullscreen"
        >

        <!-- Flèche droite -->
        <button
          class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xl border-2 border-rose-300 hover:bg-rose-50 active:scale-95 transition-all shrink-0"
          @click="nextImage"
        >
          →
        </button>
      </div>

      <!-- Miniatures -->
      <div class="flex flex-row gap-2 shrink-0">
        <button
          v-for="(img, index) in images"
          :key="index"
          class="w-14 h-14 rounded-xl overflow-hidden shadow-lg transition-all"
          :class="currentIndex === index ? 'ring-3 ring-yellow-400 scale-105' : 'opacity-60 hover:opacity-80'"
          @click="currentIndex = index"
        >
          <img :src="img" :alt="`Photo ${index + 1}`" class="w-full h-full object-cover">
        </button>
      </div>
    </div>

    <!-- Modal Plein écran -->
    <Teleport to="body">
      <div
        v-if="isFullscreen"
        class="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        @click="closeFullscreen"
      >
        <!-- Bouton fermer -->
        <button
          class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30"
          @click="closeFullscreen"
        >
          ✕
        </button>

        <!-- Navigation -->
        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30"
          @click.stop="prevImage"
        >
          ←
        </button>

        <!-- Image plein écran -->
        <img
          :src="currentSrc"
          alt="Licorne"
          class="max-w-full max-h-full object-contain"
          @click.stop
        >

        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30"
          @click.stop="nextImage"
        >
          →
        </button>

        <!-- Indicateur -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span
            v-for="(_, index) in images"
            :key="index"
            class="w-3 h-3 rounded-full"
            :class="currentIndex === index ? 'bg-white' : 'bg-white/40'"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
