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
    emoji: '🌙',
    text: "C'est la nuit, Suzanne. Tu regardes le ciel et une étoile filante passe ! Elle s'arrête devant toi et te parle : 'Viens avec moi !'",
    choices: [
      { text: "⭐ Monter sur l'étoile", nextScene: 'ride_star' },
      { text: "🤔 Lui poser des questions", nextScene: 'ask_star' }
    ]
  },
  ride_star: {
    id: 'ride_star',
    emoji: '✨',
    text: "Tu voles dans l'espace sur ton étoile ! C'est magnifique, Suzanne ! Tu vois la Lune et une planète rose au loin.",
    choices: [
      { text: "🌙 Aller sur la Lune", nextScene: 'moon' },
      { text: "💗 Explorer la planète rose", nextScene: 'pink_planet' }
    ]
  },
  ask_star: {
    id: 'ask_star',
    emoji: '💫',
    text: "L'étoile te dit : 'Je suis Stella ! Le roi des étoiles a besoin d'aide, Suzanne. Acceptes-tu de venir ?'",
    choices: [
      { text: "👑 Oui, allons-y !", nextScene: 'star_kingdom' },
      { text: "🚀 D'abord, visitons l'espace !", nextScene: 'ride_star' }
    ]
  },
  moon: {
    id: 'moon',
    emoji: '🌙',
    text: "La Lune est faite de nuages doux ! Des lapins lunaires t'accueillent : 'Bienvenue Suzanne ! Veux-tu goûter nos gâteaux de lune ?'",
    choices: [
      { text: "🍰 Goûter les gâteaux", nextScene: 'moon_cakes' },
      { text: "🐰 Jouer avec les lapins", nextScene: 'moon_rabbits_end' }
    ]
  },
  pink_planet: {
    id: 'pink_planet',
    emoji: '💗',
    text: "La planète rose est couverte de bonbons ! Une princesse des bonbons t'invite dans son palais de sucre.",
    choices: [
      { text: "🏰 Visiter le palais", nextScene: 'candy_palace_end' }
    ]
  },
  star_kingdom: {
    id: 'star_kingdom',
    emoji: '👑',
    text: "Le roi des étoiles te dit : 'Suzanne, une ombre veut éteindre les étoiles ! Seule une licorne au cœur pur peut sauver la lumière.'",
    choices: [
      { text: "💪 Je vais aider !", nextScene: 'save_stars' }
    ]
  },
  moon_cakes: {
    id: 'moon_cakes',
    emoji: '🍰',
    text: "Les gâteaux de lune sont délicieux ! Ils te donnent le pouvoir de briller dans le noir. Les lapins te font une fête !",
    isEnd: true
  },
  moon_rabbits_end: {
    id: 'moon_rabbits_end',
    emoji: '🐰',
    text: "Tu joues toute la nuit avec les lapins lunaires ! Ils te nomment 'Suzanne, Princesse de la Lune'. Quelle aventure magique !",
    isEnd: true
  },
  candy_palace_end: {
    id: 'candy_palace_end',
    emoji: '🍭',
    text: "Le palais de bonbons est merveilleux ! La princesse te donne une couronne en sucre d'orge. Tu es maintenant 'Suzanne, Duchesse des Douceurs' !",
    isEnd: true
  },
  save_stars: {
    id: 'save_stars',
    emoji: '🌟',
    text: "Tu utilises ta magie de licorne pour repousser l'ombre ! Les étoiles brillent plus fort que jamais ! Le roi te remercie : 'Suzanne, tu es une héroïne !'",
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
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
    <!-- Étoiles de fond -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 30" :key="i"
        class="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 2 + 's'
        }"
      />
    </div>

    <!-- Bouton retour -->
    <NuxtLink
      to="/suzanne/histoires"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur border-2 border-white/30 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10">
      <!-- Émoji principal -->
      <div class="text-5xl mb-4 animate-bounce">
        {{ currentScene.emoji }}
      </div>

      <!-- Texte de l'histoire -->
      <div class="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-xl max-w-sm w-full mb-4 border border-white/20">
        <p class="text-base font-body text-white leading-relaxed text-center">
          {{ currentScene.text }}
        </p>
      </div>

      <!-- Choix -->
      <div v-if="!currentScene.isEnd" class="flex flex-col gap-3 w-full max-w-sm">
        <button
          v-for="(choice, index) in currentScene.choices"
          :key="index"
          class="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-magic text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
          @click="makeChoice(choice.nextScene)"
        >
          {{ choice.text }}
        </button>
      </div>

      <!-- Écran de fin -->
      <div v-else class="flex flex-col items-center gap-4">
        <div class="text-5xl">🎉</div>
        <button
          class="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-magic text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
          @click="restart"
        >
          🔄 Recommencer
        </button>
      </div>
    </div>
  </div>
</template>
