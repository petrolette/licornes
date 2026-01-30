<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const { play } = useSounds()

// Emojis pour le memory (thème licorne)
const cardEmojis = ['🦄', '⭐', '🌈', '💖', '🎀', '🌸', '✨', '🦋']

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const cards = ref<Card[]>([])
const flippedCards = ref<number[]>([])
const moves = ref(0)
const isWin = ref(false)
const isChecking = ref(false)

// Mélanger le tableau
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Initialiser le jeu
const initGame = () => {
  const emojis = [...cardEmojis, ...cardEmojis] // Doubler pour les paires
  const shuffled = shuffle(emojis)

  cards.value = shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  }))

  flippedCards.value = []
  moves.value = 0
  isWin.value = false
}

// Retourner une carte
const flipCard = (cardId: number) => {
  if (isChecking.value) return

  const card = cards.value.find(c => c.id === cardId)
  if (!card || card.isFlipped || card.isMatched) return
  if (flippedCards.value.length >= 2) return

  play('pop')
  card.isFlipped = true
  flippedCards.value.push(cardId)

  if (flippedCards.value.length === 2) {
    moves.value++
    checkMatch()
  }
}

// Vérifier si les cartes correspondent
const checkMatch = () => {
  isChecking.value = true
  const [id1, id2] = flippedCards.value
  const card1 = cards.value.find(c => c.id === id1)
  const card2 = cards.value.find(c => c.id === id2)

  if (card1 && card2 && card1.emoji === card2.emoji) {
    // Match trouvé !
    play('success')
    card1.isMatched = true
    card2.isMatched = true
    flippedCards.value = []
    isChecking.value = false

    // Vérifier la victoire
    if (cards.value.every(c => c.isMatched)) {
      play('win')
      isWin.value = true
    }
  } else {
    // Pas de match, retourner après un délai
    setTimeout(() => {
      if (card1) card1.isFlipped = false
      if (card2) card2.isFlipped = false
      flippedCards.value = []
      isChecking.value = false
    }, 1000)
  }
}

// Score en étoiles (basé sur le nombre de coups)
const stars = computed(() => {
  if (moves.value <= 10) return 3
  if (moves.value <= 16) return 2
  return 1
})

onMounted(() => {
  initGame()
})
</script>

<template>
  <div class="game-container flex flex-col">
    <!-- Bouton retour -->
    <NuxtLink to="/suzanne/jeux" class="btn-back">
      ⬅️
    </NuxtLink>

    <!-- En-tête avec score -->
    <div class="text-center pt-20 pb-4">
      <h1 class="text-3xl font-magic text-violet mb-2">
        Memory des Licornes
      </h1>
      <p class="text-lg font-body text-violet-600">
        Coups : {{ moves }}
      </p>
    </div>

    <!-- Grille de jeu -->
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="grid grid-cols-4 gap-3 max-w-md w-full">
        <button
          v-for="card in cards"
          :key="card.id"
          class="aspect-square rounded-xl text-4xl sm:text-5xl flex items-center justify-center transition-all duration-300 transform"
          :class="[
            card.isFlipped || card.isMatched
              ? 'bg-white shadow-lg scale-100'
              : 'bg-gradient-to-br from-violet to-rose shadow-magic hover:scale-105',
            card.isMatched ? 'opacity-70' : ''
          ]"
          :disabled="card.isMatched || card.isFlipped || isChecking"
          @click="flipCard(card.id)"
        >
          <span
            class="transition-all duration-300"
            :class="card.isFlipped || card.isMatched ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
          >
            {{ card.emoji }}
          </span>
          <span
            v-if="!card.isFlipped && !card.isMatched"
            class="absolute text-2xl text-white/50"
          >
            ?
          </span>
        </button>
      </div>
    </div>

    <!-- Écran de victoire -->
    <Teleport to="body">
      <div
        v-if="isWin"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="bg-white rounded-magic p-8 text-center shadow-magic-lg max-w-sm mx-4 animate-bounce-soft">
          <div class="text-6xl mb-4">
            🎉
          </div>
          <h2 class="text-3xl font-magic text-violet mb-4">
            Bravo Suzanne !
          </h2>
          <p class="text-lg font-body text-violet-600 mb-2">
            Tu as gagné en {{ moves }} coups !
          </p>
          <div class="text-4xl mb-6">
            <span v-for="i in 3" :key="i">
              {{ i <= stars ? '⭐' : '☆' }}
            </span>
          </div>
          <button
            class="btn-magic btn-magic-violet"
            @click="initGame"
          >
            Rejouer
          </button>
        </div>
      </div>
    </Teleport>

    <!-- Bouton recommencer -->
    <div class="fixed bottom-4 right-4">
      <button
        class="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform"
        @click="initGame"
      >
        🔄
      </button>
    </div>
  </div>
</template>
