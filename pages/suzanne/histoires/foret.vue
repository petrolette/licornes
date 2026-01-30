<script setup lang="ts">
import { ref, computed } from 'vue'

interface Choice {
  text: string
  nextScene: string
}

interface Scene {
  id: string
  emoji: string
  text: string
  choices?: Choice[]
  isEnd?: boolean
}

const scenes: Record<string, Scene> = {
  start: {
    id: 'start',
    emoji: '🌳',
    text: "Suzanne, tu es une licorne aventurière ! Tu entres dans une forêt magique où les arbres brillent de mille couleurs. Que veux-tu explorer ?",
    choices: [
      { text: "🍄 Le chemin des champignons", nextScene: 'mushrooms' },
      { text: "💧 La rivière scintillante", nextScene: 'river' }
    ]
  },
  mushrooms: {
    id: 'mushrooms',
    emoji: '🍄',
    text: "Tu découvres des champignons lumineux ! Un petit lutin apparaît et te dit : 'Bonjour Suzanne ! Je suis perdu, peux-tu m'aider ?'",
    choices: [
      { text: "🧝 Aider le lutin", nextScene: 'help_elf' },
      { text: "🌟 Suivre les lumières", nextScene: 'lights' }
    ]
  },
  river: {
    id: 'river',
    emoji: '💧',
    text: "La rivière est magique ! Des poissons arc-en-ciel nagent dedans. Un vieux hibou sage te regarde depuis un arbre.",
    choices: [
      { text: "🦉 Parler au hibou", nextScene: 'owl' },
      { text: "🐟 Jouer avec les poissons", nextScene: 'fish' }
    ]
  },
  help_elf: {
    id: 'help_elf',
    emoji: '🧝',
    text: "Tu aides le lutin à retrouver sa maison. En remerciement, il te donne une carte au trésor ! 'Merci Suzanne, tu es si gentille !'",
    choices: [
      { text: "🗺️ Chercher le trésor", nextScene: 'treasure' }
    ]
  },
  lights: {
    id: 'lights',
    emoji: '✨',
    text: "Les lumières te guident vers une clairière secrète ! Des fées y dansent sous la lune.",
    choices: [
      { text: "🧚 Rejoindre les fées", nextScene: 'fairies_end' }
    ]
  },
  owl: {
    id: 'owl',
    emoji: '🦉',
    text: "Le hibou te dit : 'Suzanne, tu as un cœur pur. Je vais te révéler un secret...' Il te montre un passage caché dans l'arbre !",
    choices: [
      { text: "🚪 Entrer dans le passage", nextScene: 'secret_passage' }
    ]
  },
  fish: {
    id: 'fish',
    emoji: '🐟',
    text: "Les poissons t'éclaboussent gentiment ! L'un d'eux saute et dépose une perle magique sur ta corne.",
    choices: [
      { text: "💎 Garder la perle", nextScene: 'pearl_end' }
    ]
  },
  treasure: {
    id: 'treasure',
    emoji: '💎',
    text: "Tu trouves le trésor ! C'est un coffre rempli de bonbons magiques et d'étoiles brillantes. Quelle découverte, Suzanne !",
    isEnd: true
  },
  fairies_end: {
    id: 'fairies_end',
    emoji: '🧚',
    text: "Les fées t'accueillent dans leur cercle ! Elles te nomment 'Suzanne, Protectrice de la Forêt Magique'. Tu as de nouveaux amis pour toujours !",
    isEnd: true
  },
  secret_passage: {
    id: 'secret_passage',
    emoji: '🌟',
    text: "Le passage mène à un jardin secret au cœur de l'arbre ! C'est le plus bel endroit de la forêt, et maintenant c'est ton refuge, Suzanne !",
    isEnd: true
  },
  pearl_end: {
    id: 'pearl_end',
    emoji: '💫',
    text: "La perle magique te permet de parler aux animaux ! Tu deviens l'amie de toutes les créatures de la forêt. Bravo Suzanne !",
    isEnd: true
  }
}

const currentSceneId = ref('start')
const currentScene = computed(() => scenes[currentSceneId.value])

const makeChoice = (nextScene: string) => {
  currentSceneId.value = nextScene
}

const restart = () => {
  currentSceneId.value = 'start'
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-emerald-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/suzanne/histoires"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-violet-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <!-- Émoji principal -->
      <div class="text-5xl mb-4 animate-bounce">
        {{ currentScene.emoji }}
      </div>

      <!-- Texte de l'histoire -->
      <div class="bg-white/90 rounded-2xl p-4 shadow-xl max-w-sm w-full mb-4">
        <p class="text-base font-body text-green-800 leading-relaxed text-center">
          {{ currentScene.text }}
        </p>
      </div>

      <!-- Choix -->
      <div v-if="!currentScene.isEnd" class="flex flex-col gap-3 w-full max-w-sm">
        <button
          v-for="(choice, index) in currentScene.choices"
          :key="index"
          class="w-full p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-magic text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
          @click="makeChoice(choice.nextScene)"
        >
          {{ choice.text }}
        </button>
      </div>

      <!-- Écran de fin -->
      <div v-else class="flex flex-col items-center gap-4">
        <div class="text-5xl">🎉</div>
        <button
          class="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-magic text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
          @click="restart"
        >
          🔄 Recommencer
        </button>
      </div>
    </div>
  </div>
</template>
