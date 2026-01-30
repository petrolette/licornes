<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Question {
  id: number
  question: string
  emoji: string
  options: string[]
  correctIndex: number
}

// Banque de questions élargie
const allQuestions: Question[] = [
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
  },
  {
    id: 6,
    question: "Suzanne, quelle couleur préfèrent les licornes ?",
    emoji: '💜',
    options: ['Le gris', 'Le rose et le violet', 'Le marron'],
    correctIndex: 1
  },
  {
    id: 7,
    question: "Que laisse une licorne derrière elle quand elle galope ?",
    emoji: '✨',
    options: ['De la poussière', 'Des paillettes magiques', 'Rien'],
    correctIndex: 1
  },
  {
    id: 8,
    question: "Suzanne, où dort une licorne ?",
    emoji: '🌙',
    options: ['Sur un nuage', 'Dans l\'eau', 'Dans un lit de fleurs'],
    correctIndex: 0
  },
  {
    id: 9,
    question: "Quel pouvoir a la corne de la licorne ?",
    emoji: '⭐',
    options: ['Elle est lourde', 'Elle est magique', 'Elle est froide'],
    correctIndex: 1
  },
  {
    id: 10,
    question: "Avec qui la licorne aime jouer ?",
    emoji: '🧚',
    options: ['Les dragons méchants', 'Les fées et les princesses', 'Les robots'],
    correctIndex: 1
  },
  {
    id: 11,
    question: "Que boit une licorne ?",
    emoji: '💧',
    options: ['De l\'eau de source magique', 'Du café', 'De la soupe'],
    correctIndex: 0
  },
  {
    id: 12,
    question: "Suzanne, quelle est la saison préférée des licornes ?",
    emoji: '🌸',
    options: ['L\'hiver glacé', 'Le printemps fleuri', 'L\'automne pluvieux'],
    correctIndex: 1
  },
  {
    id: 13,
    question: "Comment s'appelle le pays des licornes ?",
    emoji: '🗺️',
    options: ['Licornia', 'Paris', 'La lune'],
    correctIndex: 0
  },
  {
    id: 14,
    question: "Quelle fleur aime la licorne ?",
    emoji: '🌷',
    options: ['Les orties', 'Les roses magiques', 'Les cactus'],
    correctIndex: 1
  },
  {
    id: 15,
    question: "Suzanne, que fait une licorne quand elle est heureuse ?",
    emoji: '🎉',
    options: ['Elle pleure', 'Elle fait des étincelles', 'Elle dort'],
    correctIndex: 1
  }
]

// Mélanger et sélectionner 5 questions aléatoires
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const questions = ref<Question[]>([])

const initQuiz = () => {
  questions.value = shuffleArray(allQuestions).slice(0, 5)
  currentIndex.value = 0
  score.value = 0
  selectedAnswer.value = null
  showResult.value = false
  isQuizComplete.value = false
}

const currentIndex = ref(0)
const score = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const isQuizComplete = ref(false)

const currentQuestion = computed(() => questions.value[currentIndex.value])

const selectAnswer = (index: number) => {
  if (showResult.value) return

  selectedAnswer.value = index
  showResult.value = true

  if (index === currentQuestion.value.correctIndex) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    selectedAnswer.value = null
    showResult.value = false
  } else {
    isQuizComplete.value = true
  }
}

const restart = () => {
  initQuiz()
}

// Nombre d'étoiles basé sur le score
const stars = computed(() => {
  const percentage = (score.value / questions.value.length) * 100
  if (percentage >= 80) return 3
  if (percentage >= 50) return 2
  return 1
})

onMounted(() => {
  initQuiz()
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/suzanne"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-violet-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <!-- Quiz en cours -->
      <template v-if="!isQuizComplete && questions.length > 0">
        <!-- Progression -->
        <div class="text-center mb-3">
          <p class="text-sm font-body text-violet-600">
            Question {{ currentIndex + 1 }} / {{ questions.length }}
          </p>
          <div class="flex gap-1 justify-center mt-1">
            <div
              v-for="i in questions.length"
              :key="i"
              class="w-6 h-2 rounded-full"
              :class="i <= currentIndex + 1 ? 'bg-violet' : 'bg-violet-200'"
            />
          </div>
        </div>

        <!-- Question -->
        <div class="text-5xl mb-3 animate-bounce">
          {{ currentQuestion.emoji }}
        </div>

        <div class="bg-white/90 rounded-2xl p-4 shadow-xl max-w-sm w-full mb-4">
          <p class="text-lg font-magic text-violet-800 text-center">
            {{ currentQuestion.question }}
          </p>
        </div>

        <!-- Options -->
        <div class="flex flex-col gap-3 w-full max-w-sm">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="p-4 rounded-2xl text-lg font-body transition-all shadow-lg"
            :class="[
              showResult
                ? index === currentQuestion.correctIndex
                  ? 'bg-green-400 text-white scale-105'
                  : selectedAnswer === index
                    ? 'bg-red-400 text-white'
                    : 'bg-white/50 text-gray-400'
                : 'bg-white hover:scale-105 active:scale-95 text-violet-700'
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
          class="mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet to-rose text-white font-magic text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
          @click="nextQuestion"
        >
          {{ currentIndex < questions.length - 1 ? 'Suivante ➡️' : 'Résultat 🎉' }}
        </button>
      </template>

      <!-- Résultat final -->
      <div v-if="isQuizComplete" class="bg-white rounded-3xl p-6 shadow-2xl text-center max-w-sm">
        <div class="text-5xl mb-3">
          {{ score >= questions.length * 0.8 ? '🏆' : score >= questions.length * 0.5 ? '🎉' : '💪' }}
        </div>

        <h2 class="text-2xl font-magic text-violet mb-2">
          {{ score >= questions.length * 0.8 ? 'Bravo Suzanne !' : score >= questions.length * 0.5 ? 'Bien joué Suzanne !' : 'Continue Suzanne !' }}
        </h2>

        <p class="text-lg font-body text-violet-600 mb-3">
          Tu as {{ score }} bonnes réponses sur {{ questions.length }}
        </p>

        <!-- Étoiles -->
        <div class="text-3xl mb-4">
          <span v-for="i in 3" :key="i">
            {{ i <= stars ? '⭐' : '☆' }}
          </span>
        </div>

        <button
          class="px-6 py-3 bg-gradient-to-r from-violet to-rose text-white rounded-xl font-magic text-lg hover:scale-105 transition-all"
          @click="restart"
        >
          🔄 Nouveau quiz
        </button>
      </div>
    </div>
  </div>
</template>
