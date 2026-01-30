<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  id: number
  question: string
  emoji: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "De quelle couleur est souvent la crinière d'une licorne ?",
    emoji: '🦄',
    options: ['Noire', 'Arc-en-ciel', 'Grise'],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Que mange une licorne magique ?",
    emoji: '🌈',
    options: ['Des arc-en-ciel', 'Des cailloux', 'Des nuages'],
    correctIndex: 0
  },
  {
    id: 3,
    question: "Où vit une licorne ?",
    emoji: '🏰',
    options: ['Dans la mer', 'Dans un royaume magique', 'Dans un garage'],
    correctIndex: 1
  },
  {
    id: 4,
    question: "Combien de cornes a une licorne ?",
    emoji: '✨',
    options: ['Deux', 'Trois', 'Une'],
    correctIndex: 2
  },
  {
    id: 5,
    question: "Quel est le meilleur ami de la licorne ?",
    emoji: '🦋',
    options: ['Le papillon', 'Le loup', 'Le requin'],
    correctIndex: 0
  }
]

const currentIndex = ref(0)
const score = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const isQuizComplete = ref(false)

const currentQuestion = computed(() => questions[currentIndex.value])

const selectAnswer = (index: number) => {
  if (showResult.value) return

  selectedAnswer.value = index
  showResult.value = true

  if (index === currentQuestion.value.correctIndex) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
    selectedAnswer.value = null
    showResult.value = false
  } else {
    isQuizComplete.value = true
  }
}

const restart = () => {
  currentIndex.value = 0
  score.value = 0
  selectedAnswer.value = null
  showResult.value = false
  isQuizComplete.value = false
}

// Nombre d'étoiles basé sur le score
const stars = computed(() => {
  const percentage = (score.value / questions.length) * 100
  if (percentage >= 80) return 3
  if (percentage >= 50) return 2
  return 1
})
</script>

<template>
  <div class="game-container flex flex-col">
    <!-- Bouton retour -->
    <NuxtLink to="/suzanne" class="btn-back">
      ⬅️
    </NuxtLink>

    <!-- Quiz en cours -->
    <div v-if="!isQuizComplete" class="flex-1 flex flex-col items-center justify-center px-4 py-20">
      <!-- Progression -->
      <div class="text-center mb-4">
        <p class="text-lg font-body text-violet-600">
          Question {{ currentIndex + 1 }} / {{ questions.length }}
        </p>
        <div class="flex gap-1 justify-center mt-2">
          <div
            v-for="i in questions.length"
            :key="i"
            class="w-8 h-2 rounded-full"
            :class="i <= currentIndex + 1 ? 'bg-violet' : 'bg-violet-200'"
          />
        </div>
      </div>

      <!-- Question -->
      <div class="text-6xl mb-6 animate-bounce-soft">
        {{ currentQuestion.emoji }}
      </div>

      <div class="bg-white/90 rounded-magic p-6 shadow-magic max-w-md w-full mb-6">
        <p class="text-xl font-magic text-violet-800 text-center">
          {{ currentQuestion.question }}
        </p>
      </div>

      <!-- Options -->
      <div class="flex flex-col gap-3 w-full max-w-md">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="p-4 rounded-magic text-lg font-body transition-all"
          :class="[
            showResult
              ? index === currentQuestion.correctIndex
                ? 'bg-green-400 text-white scale-105'
                : selectedAnswer === index
                  ? 'bg-red-400 text-white'
                  : 'bg-white/50 text-gray-400'
              : 'bg-white shadow-lg hover:scale-102 active:scale-98 text-violet-700'
          ]"
          :disabled="showResult"
          @click="selectAnswer(index)"
        >
          {{ option }}
          <span v-if="showResult && index === currentQuestion.correctIndex" class="ml-2">✓</span>
          <span v-if="showResult && selectedAnswer === index && index !== currentQuestion.correctIndex" class="ml-2">✗</span>
        </button>
      </div>

      <!-- Bouton suivant -->
      <button
        v-if="showResult"
        class="btn-magic btn-magic-violet mt-6"
        @click="nextQuestion"
      >
        {{ currentIndex < questions.length - 1 ? 'Question suivante ➡️' : 'Voir le résultat 🎉' }}
      </button>
    </div>

    <!-- Résultat final -->
    <div v-else class="flex-1 flex flex-col items-center justify-center px-4">
      <div class="bg-white rounded-magic p-8 shadow-magic-lg text-center max-w-sm">
        <div class="text-6xl mb-4">
          {{ score >= questions.length * 0.8 ? '🏆' : score >= questions.length * 0.5 ? '🎉' : '💪' }}
        </div>

        <h2 class="text-3xl font-magic text-violet mb-4">
          {{ score >= questions.length * 0.8 ? 'Super !' : score >= questions.length * 0.5 ? 'Bien joué !' : 'Continue !' }}
        </h2>

        <p class="text-xl font-body text-violet-600 mb-4">
          Tu as {{ score }} bonnes réponses sur {{ questions.length }}
        </p>

        <!-- Étoiles -->
        <div class="text-4xl mb-6">
          <span v-for="i in 3" :key="i">
            {{ i <= stars ? '⭐' : '☆' }}
          </span>
        </div>

        <button
          class="btn-magic"
          @click="restart"
        >
          🔄 Recommencer
        </button>
      </div>
    </div>
  </div>
</template>
