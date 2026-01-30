<script setup lang="ts">
import { ref, computed } from 'vue'

// Options de personnalisation
const bodyColors = [
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Rose', value: '#FFB6C1' },
  { name: 'Lavande', value: '#E6E6FA' },
  { name: 'Bleu ciel', value: '#B0E2FF' },
  { name: 'Pêche', value: '#FFDAB9' },
  { name: 'Menthe', value: '#98FB98' }
]

const maneColors = [
  { name: 'Arc-en-ciel', value: 'rainbow' },
  { name: 'Rose', value: '#FF69B4' },
  { name: 'Violet', value: '#9B59B6' },
  { name: 'Bleu', value: '#4D96FF' },
  { name: 'Doré', value: '#FFD700' },
  { name: 'Turquoise', value: '#40E0D0' }
]

const hornStyles = [
  { name: 'Doré', value: '#FFD700', icon: '✨' },
  { name: 'Argenté', value: '#C0C0C0', icon: '⚪' },
  { name: 'Rose', value: '#FF69B4', icon: '💖' },
  { name: 'Arc-en-ciel', value: 'rainbow', icon: '🌈' }
]

const accessories = [
  { name: 'Aucun', value: 'none', icon: '➖' },
  { name: 'Couronne', value: 'crown', icon: '👑' },
  { name: 'Fleurs', value: 'flowers', icon: '🌸' },
  { name: 'Ailes', value: 'wings', icon: '🦋' },
  { name: 'Étoiles', value: 'stars', icon: '⭐' }
]

const unicornNames = [
  'Étoile', 'Paillette', 'Arc-en-ciel', 'Magie', 'Princesse',
  'Lumière', 'Céleste', 'Aurore', 'Diamant', 'Flocon'
]

// État de la licorne
const selectedBody = ref(bodyColors[0].value)
const selectedMane = ref(maneColors[0].value)
const selectedHorn = ref(hornStyles[0].value)
const selectedAccessory = ref(accessories[0].value)
const unicornName = ref('')
const showNameInput = ref(false)
const isSaved = ref(false)

// Gradient pour arc-en-ciel
const rainbowGradient = 'linear-gradient(90deg, #FF6B6B, #FFA500, #FFD93D, #6BCB77, #4D96FF, #9B59B6)'

// Style de la crinière
const maneStyle = computed(() => {
  if (selectedMane.value === 'rainbow') {
    return { background: rainbowGradient }
  }
  return { backgroundColor: selectedMane.value }
})

// Style de la corne
const hornStyle = computed(() => {
  if (selectedHorn.value === 'rainbow') {
    return { background: rainbowGradient }
  }
  return { backgroundColor: selectedHorn.value }
})

// Générer un nom aléatoire
const generateName = () => {
  const randomName = unicornNames[Math.floor(Math.random() * unicornNames.length)]
  unicornName.value = randomName
}

// Sauvegarder la licorne
const saveLicorne = () => {
  if (!unicornName.value) {
    showNameInput.value = true
    return
  }

  // Sauvegarder dans localStorage
  const licorne = {
    name: unicornName.value,
    body: selectedBody.value,
    mane: selectedMane.value,
    horn: selectedHorn.value,
    accessory: selectedAccessory.value,
    createdAt: new Date().toISOString()
  }

  localStorage.setItem('suzanne_licorne', JSON.stringify(licorne))
  isSaved.value = true

  setTimeout(() => {
    isSaved.value = false
  }, 3000)
}
</script>

<template>
  <div class="game-container overflow-y-auto">
    <!-- Bouton retour -->
    <NuxtLink to="/suzanne" class="btn-back">
      ⬅️
    </NuxtLink>

    <div class="min-h-screen pt-20 pb-8 px-4">
      <!-- Titre -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-magic text-violet">
          Crée ta licorne !
        </h1>
      </div>

      <!-- Prévisualisation de la licorne -->
      <div class="flex justify-center mb-8">
        <div class="relative w-64 h-64 flex items-center justify-center">
          <!-- Corps de la licorne (cercle simple) -->
          <div
            class="w-40 h-48 rounded-[50%] border-4 border-gray-200 shadow-lg relative"
            :style="{ backgroundColor: selectedBody }"
          >
            <!-- Corne -->
            <div
              class="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-16 rounded-t-full"
              :style="hornStyle"
            />

            <!-- Crinière -->
            <div
              class="absolute -left-4 top-4 w-10 h-32 rounded-full"
              :style="maneStyle"
            />

            <!-- Oeil -->
            <div class="absolute top-12 left-10 w-6 h-8 bg-gray-800 rounded-full">
              <div class="absolute top-1 left-1 w-2 h-2 bg-white rounded-full" />
            </div>

            <!-- Joue -->
            <div class="absolute top-20 left-6 w-6 h-4 bg-rose-300/50 rounded-full" />

            <!-- Bouche souriante -->
            <div class="absolute bottom-12 left-12 w-8 h-4 border-b-4 border-gray-600 rounded-b-full" />

            <!-- Accessoire -->
            <span
              v-if="selectedAccessory === 'crown'"
              class="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl"
            >
              👑
            </span>
            <span
              v-if="selectedAccessory === 'flowers'"
              class="absolute -top-4 -left-2 text-2xl"
            >
              🌸
            </span>
            <span
              v-if="selectedAccessory === 'wings'"
              class="absolute top-8 -right-8 text-4xl"
            >
              🦋
            </span>
            <span
              v-if="selectedAccessory === 'stars'"
              class="absolute -top-6 right-0 text-2xl animate-sparkle"
            >
              ⭐
            </span>
          </div>
        </div>
      </div>

      <!-- Nom de la licorne -->
      <div class="text-center mb-6">
        <div v-if="unicornName" class="flex items-center justify-center gap-2">
          <span class="text-2xl font-magic text-violet">{{ unicornName }}</span>
          <button class="text-lg" @click="showNameInput = true">✏️</button>
        </div>
        <button
          v-else
          class="btn-magic btn-magic-turquoise text-lg px-6 py-3"
          @click="showNameInput = true"
        >
          Donner un nom
        </button>
      </div>

      <!-- Options de personnalisation -->
      <div class="max-w-md mx-auto space-y-6">
        <!-- Couleur du corps -->
        <div>
          <h3 class="text-lg font-magic text-violet-700 mb-3">Couleur du corps</h3>
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="color in bodyColors"
              :key="color.value"
              class="w-12 h-12 rounded-full border-4 transition-transform hover:scale-110"
              :class="selectedBody === color.value ? 'border-dore scale-110' : 'border-gray-200'"
              :style="{ backgroundColor: color.value }"
              @click="selectedBody = color.value"
            />
          </div>
        </div>

        <!-- Couleur de la crinière -->
        <div>
          <h3 class="text-lg font-magic text-violet-700 mb-3">Couleur de la crinière</h3>
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="color in maneColors"
              :key="color.value"
              class="w-12 h-12 rounded-full border-4 transition-transform hover:scale-110"
              :class="selectedMane === color.value ? 'border-dore scale-110' : 'border-gray-200'"
              :style="color.value === 'rainbow' ? { background: rainbowGradient } : { backgroundColor: color.value }"
              @click="selectedMane = color.value"
            />
          </div>
        </div>

        <!-- Style de la corne -->
        <div>
          <h3 class="text-lg font-magic text-violet-700 mb-3">Corne magique</h3>
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="horn in hornStyles"
              :key="horn.value"
              class="w-14 h-14 rounded-xl border-4 flex items-center justify-center text-2xl transition-transform hover:scale-110"
              :class="selectedHorn === horn.value ? 'border-dore scale-110 bg-white' : 'border-gray-200 bg-gray-50'"
              @click="selectedHorn = horn.value"
            >
              {{ horn.icon }}
            </button>
          </div>
        </div>

        <!-- Accessoires -->
        <div>
          <h3 class="text-lg font-magic text-violet-700 mb-3">Accessoire</h3>
          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="acc in accessories"
              :key="acc.value"
              class="w-14 h-14 rounded-xl border-4 flex items-center justify-center text-2xl transition-transform hover:scale-110"
              :class="selectedAccessory === acc.value ? 'border-dore scale-110 bg-white' : 'border-gray-200 bg-gray-50'"
              @click="selectedAccessory = acc.value"
            >
              {{ acc.icon }}
            </button>
          </div>
        </div>
      </div>

      <!-- Bouton sauvegarder -->
      <div class="text-center mt-8">
        <button
          class="btn-magic"
          :class="isSaved ? 'bg-green-500' : ''"
          @click="saveLicorne"
        >
          {{ isSaved ? '✓ Sauvegardé !' : '💾 Sauvegarder' }}
        </button>
      </div>
    </div>

    <!-- Modal nom -->
    <Teleport to="body">
      <div
        v-if="showNameInput"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showNameInput = false"
      >
        <div class="bg-white rounded-magic p-6 shadow-magic-lg max-w-sm mx-4 w-full">
          <h3 class="text-2xl font-magic text-violet text-center mb-4">
            Comment s'appelle ta licorne ?
          </h3>
          <input
            v-model="unicornName"
            type="text"
            placeholder="Entre un nom..."
            class="w-full p-4 text-xl text-center border-2 border-violet-200 rounded-xl focus:border-violet focus:outline-none"
            maxlength="20"
          >
          <div class="flex gap-3 mt-4">
            <button
              class="flex-1 py-3 px-4 bg-gray-100 rounded-xl font-body text-gray-600 hover:bg-gray-200"
              @click="generateName"
            >
              🎲 Aléatoire
            </button>
            <button
              class="flex-1 py-3 px-4 bg-violet text-white rounded-xl font-magic hover:bg-violet-dark"
              @click="showNameInput = false"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
