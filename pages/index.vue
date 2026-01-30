<script setup lang="ts">
import { ref } from 'vue'

const { play } = useSounds()
const isVideoFullscreen = ref(false)

const goToProfile = (profile: 'andrea' | 'suzanne' | 'papa') => {
  play('magic')
  navigateTo(`/${profile}`)
}

const openVideoFullscreen = () => {
  isVideoFullscreen.value = true
}

const closeVideoFullscreen = () => {
  isVideoFullscreen.value = false
}
</script>

<template>
  <div class="fixed inset-0 flex flex-col items-center py-3 px-3 overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-violet-50/30">

    <!-- Titre -->
    <div class="text-center shrink-0">
      <h1 class="text-lg sm:text-xl font-magic text-transparent bg-clip-text bg-gradient-to-r from-rose via-violet to-rose">
        👑 Royaume des Licornes 👑
      </h1>
    </div>

    <!-- Vidéo centrale - Cliquable pour plein écran -->
    <div class="relative w-full flex items-center justify-center my-2" style="max-height: 50vh;">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full max-h-[50vh] rounded-2xl shadow-2xl border-3 border-white/50 object-contain cursor-pointer"
        @click="openVideoFullscreen"
      >
        <source src="/videos/Vidéo_d_une_licorne_et_Andrea.mp4" type="video/mp4">
      </video>
      <!-- Indicateur de plein écran -->
      <div class="absolute bottom-2 right-2 bg-black/30 rounded-lg px-2 py-1 text-white text-xs pointer-events-none">
        🔍 Clic = Plein écran
      </div>
    </div>

    <!-- Boutons profils 3D -->
    <div class="flex flex-row gap-3 w-full justify-center items-center shrink-0 pb-2">

      <!-- Bouton Andrea - Rose 3D -->
      <button
        class="flex-1 max-w-[140px] rounded-2xl flex flex-col items-center justify-center py-3 px-2 bg-gradient-to-b from-pink-100 to-pink-200 border-4 border-b-8 border-pink-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
        @click="goToProfile('andrea')"
      >
        <span class="text-4xl">🧸</span>
        <span class="text-lg font-magic text-pink-700">Andrea</span>
        <span class="text-xs text-pink-600">3 ans</span>
      </button>

      <!-- Séparateur -->
      <span class="text-2xl animate-float">🌈</span>

      <!-- Bouton Suzanne - Violet 3D -->
      <button
        class="flex-1 max-w-[140px] rounded-2xl flex flex-col items-center justify-center py-3 px-2 bg-gradient-to-b from-violet-100 to-violet-200 border-4 border-b-8 border-violet-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
        @click="goToProfile('suzanne')"
      >
        <span class="text-4xl">🦄</span>
        <span class="text-lg font-magic text-violet-700">Suzanne</span>
        <span class="text-xs text-violet-600">6 ans</span>
      </button>
    </div>

    <!-- Bouton Papa - Discret en bas -->
    <button
      class="absolute bottom-3 right-3 flex flex-col items-center justify-center bg-gray-800 border-2 border-gray-600 shadow-lg rounded-xl px-3 py-2 active:scale-95 transition-all opacity-70 hover:opacity-100"
      @click="goToProfile('papa')"
    >
      <span class="text-xl">👾</span>
      <span class="text-[10px] text-gray-400">Pour papa</span>
    </button>

    <!-- Modal Vidéo Plein écran -->
    <Teleport to="body">
      <div
        v-if="isVideoFullscreen"
        class="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        @click="closeVideoFullscreen"
      >
        <button
          class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30 z-10"
          @click="closeVideoFullscreen"
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
          <source src="/videos/Vidéo_d_une_licorne_et_Andrea.mp4" type="video/mp4">
        </video>
      </div>
    </Teleport>
  </div>
</template>
