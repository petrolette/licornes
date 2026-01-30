<script setup lang="ts">
import { ref } from 'vue'

const isVideoFullscreen = ref(false)

interface Activity {
  id: string
  emoji: string
  secondEmoji: string
  label: string
  bgGradient: string
  btnClass: string
  to: string
}

const activities: Activity[] = [
  {
    id: 'coloriage',
    emoji: '🎨',
    secondEmoji: '🖍️',
    label: 'Colorier',
    bgGradient: 'from-rose-200 via-pink-100 to-rose-300',
    btnClass: 'btn-3d-rose',
    to: '/andrea/coloriage'
  },
  {
    id: 'sons',
    emoji: '🔊',
    secondEmoji: '🎶',
    label: 'Sons',
    bgGradient: 'from-yellow-200 via-amber-100 to-orange-200',
    btnClass: 'btn-3d-jaune',
    to: '/andrea/sons'
  },
  {
    id: 'album',
    emoji: '📸',
    secondEmoji: '🖼️',
    label: 'Album',
    bgGradient: 'from-sky-200 via-blue-100 to-cyan-200',
    btnClass: 'btn-3d-bleu',
    to: '/andrea/album'
  },
  {
    id: 'comptines',
    emoji: '🎵',
    secondEmoji: '🎤',
    label: 'Chansons',
    bgGradient: 'from-teal-200 via-emerald-100 to-green-200',
    btnClass: 'btn-3d-vert',
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
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour maison - coin supérieur gauche -->
    <NuxtLink
      to="/"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-pink-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">🏠</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <!-- Vidéo de licorne - Cliquable pour plein écran -->
    <div class="relative w-full px-4 mb-2" style="max-height: 35vh;">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full max-h-[35vh] rounded-2xl shadow-xl border-3 border-pink-200 object-contain cursor-pointer"
        @click="isVideoFullscreen = true"
      >
        <source src="/videos/Vidéo_d_une_licorne_s_envolant.mp4" type="video/mp4">
      </video>
      <div class="absolute bottom-2 right-6 bg-black/30 rounded-lg px-2 py-1 text-white text-xs pointer-events-none">
        🔍 Clic = Plein écran
      </div>
    </div>

    <!-- En-tête compact -->
    <div class="text-center mb-2">
      <h1 class="text-2xl font-magic text-rose">Andrea</h1>
    </div>

    <!-- Grille d'activités - Boutons 3D ÉNORMES -->
    <div class="grid grid-cols-2 gap-5 w-full max-w-md px-4">
      <!-- Colorier - Rose -->
      <NuxtLink
        to="/andrea/coloriage"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-100 to-pink-200 border-4 border-b-8 border-pink-400 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🎨</span>
        <span class="text-xl font-magic text-pink-700">Colorier</span>
      </NuxtLink>

      <!-- Sons - Jaune -->
      <NuxtLink
        to="/andrea/sons"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-yellow-100 to-yellow-200 border-4 border-b-8 border-yellow-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🔊</span>
        <span class="text-xl font-magic text-yellow-700">Sons</span>
      </NuxtLink>

      <!-- Album - Bleu -->
      <NuxtLink
        to="/andrea/album"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-blue-200 border-4 border-b-8 border-blue-400 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">📸</span>
        <span class="text-xl font-magic text-blue-700">Album</span>
      </NuxtLink>

      <!-- Chansons - Vert -->
      <NuxtLink
        to="/andrea/comptines"
        class="aspect-square rounded-3xl flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-100 to-green-200 border-4 border-b-8 border-green-500 shadow-xl active:border-b-4 active:translate-y-1 transition-all"
      >
        <span class="text-6xl mb-2">🎵</span>
        <span class="text-xl font-magic text-green-700">Chansons</span>
      </NuxtLink>
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
          <source src="/videos/Vidéo_d_une_licorne_s_envolant.mp4" type="video/mp4">
        </video>
      </div>
    </Teleport>
  </div>
</template>
