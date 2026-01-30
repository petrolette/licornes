<script setup lang="ts">
import { ref } from 'vue'

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
    emoji: '🦄',
    text: "Tu es une belle licorne qui se promène dans la prairie. Au loin, tu vois un magnifique château arc-en-ciel. Que veux-tu faire ?",
    choices: [
      { text: "🏰 Aller au château", nextScene: 'castle' },
      { text: "🌸 Explorer les fleurs", nextScene: 'flowers' }
    ]
  },
  castle: {
    id: 'castle',
    emoji: '🏰',
    text: "Tu arrives devant le château. La porte est grande ouverte et tu entends de la musique. Une gentille princesse te salue !",
    choices: [
      { text: "👋 Dire bonjour", nextScene: 'princess' },
      { text: "🎵 Suivre la musique", nextScene: 'music' }
    ]
  },
  flowers: {
    id: 'flowers',
    emoji: '🌸',
    text: "Tu découvres un champ de fleurs magiques ! Chaque fleur brille d'une couleur différente. Un papillon se pose sur ta corne.",
    choices: [
      { text: "🦋 Jouer avec le papillon", nextScene: 'butterfly' },
      { text: "🏰 Aller au château", nextScene: 'castle' }
    ]
  },
  princess: {
    id: 'princess',
    emoji: '👸',
    text: "La princesse est ravie de te rencontrer ! Elle te dit : 'Je cherche une licorne courageuse pour m'aider à retrouver mon étoile magique.'",
    choices: [
      { text: "⭐ Aider la princesse", nextScene: 'quest' },
      { text: "🎵 Écouter la musique d'abord", nextScene: 'music' }
    ]
  },
  music: {
    id: 'music',
    emoji: '🎵',
    text: "Tu suis la musique et tu arrives dans une grande salle de bal ! Des fées dansent partout et te invitent à danser avec elles.",
    choices: [
      { text: "💃 Danser avec les fées", nextScene: 'dance' },
      { text: "👸 Chercher la princesse", nextScene: 'princess' }
    ]
  },
  butterfly: {
    id: 'butterfly',
    emoji: '🦋',
    text: "Le papillon devient ton ami ! Il te guide vers un arc-en-ciel secret qui mène directement au château.",
    choices: [
      { text: "🌈 Suivre l'arc-en-ciel", nextScene: 'rainbow_end' }
    ]
  },
  quest: {
    id: 'quest',
    emoji: '⭐',
    text: "Tu aides la princesse à chercher son étoile. Tu la trouves cachée dans le jardin ! La princesse te remercie et te donne une couronne magique.",
    choices: [
      { text: "👑 Mettre la couronne", nextScene: 'crown_end' }
    ]
  },
  dance: {
    id: 'dance',
    emoji: '💃',
    text: "Tu danses avec les fées toute la nuit ! C'est tellement amusant. À la fin, elles te donnent des ailes magiques.",
    choices: [
      { text: "🦋 Essayer les ailes", nextScene: 'wings_end' }
    ]
  },
  rainbow_end: {
    id: 'rainbow_end',
    emoji: '🌈',
    text: "Tu glisses sur l'arc-en-ciel et arrives dans un monde merveilleux ! Tu es maintenant la gardienne de l'arc-en-ciel. Félicitations !",
    isEnd: true
  },
  crown_end: {
    id: 'crown_end',
    emoji: '👑',
    text: "Avec ta nouvelle couronne, tu deviens la meilleure amie de la princesse ! Vous vivez des aventures magiques ensemble. Félicitations !",
    isEnd: true
  },
  wings_end: {
    id: 'wings_end',
    emoji: '✨',
    text: "Avec tes nouvelles ailes, tu peux voler ! Tu explores tout le royaume des licornes depuis le ciel. Quelle aventure ! Félicitations !",
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
  <div class="game-container flex flex-col">
    <!-- Bouton retour -->
    <NuxtLink to="/suzanne/histoires" class="btn-back">
      ⬅️
    </NuxtLink>

    <div class="flex-1 flex flex-col items-center justify-center px-4 py-20">
      <!-- Émoji principal -->
      <div class="text-8xl mb-8 animate-bounce-soft">
        {{ currentScene.emoji }}
      </div>

      <!-- Texte de l'histoire -->
      <div class="bg-white/90 rounded-magic p-6 shadow-magic max-w-md w-full mb-8">
        <p class="text-lg font-body text-violet-800 leading-relaxed text-center">
          {{ currentScene.text }}
        </p>
      </div>

      <!-- Choix -->
      <div v-if="!currentScene.isEnd" class="flex flex-col gap-4 w-full max-w-md">
        <button
          v-for="(choice, index) in currentScene.choices"
          :key="index"
          class="btn-magic btn-magic-violet text-lg"
          @click="makeChoice(choice.nextScene)"
        >
          {{ choice.text }}
        </button>
      </div>

      <!-- Écran de fin -->
      <div v-else class="flex flex-col items-center gap-4">
        <div class="text-6xl animate-sparkle">
          🎉
        </div>
        <button
          class="btn-magic"
          @click="restart"
        >
          🔄 Recommencer l'aventure
        </button>
      </div>
    </div>
  </div>
</template>
