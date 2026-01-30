<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

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

// Charger la licorne sauvegardée au démarrage
onMounted(() => {
  const saved = localStorage.getItem('suzanne_licorne')
  if (saved) {
    try {
      const licorne = JSON.parse(saved)
      unicornName.value = licorne.name || ''
      selectedBody.value = licorne.body || bodyColors[0].value
      selectedMane.value = licorne.mane || maneColors[0].value
      selectedHorn.value = licorne.horn || hornStyles[0].value
      selectedAccessory.value = licorne.accessory || accessories[0].value
    } catch (e) {
      console.error('Erreur chargement licorne:', e)
    }
  }
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/50 to-white">
    <!-- Bouton retour 3D -->
    <NuxtLink
      to="/suzanne"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-violet-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-3 py-2">
    <!-- Titre + Nom -->
    <div class="text-center mb-1">
      <h1 class="text-xl font-magic text-violet">Crée ta licorne !</h1>
      <div v-if="unicornName" class="flex items-center justify-center gap-1 mt-1">
        <span class="text-lg font-magic text-violet-600">{{ unicornName }}</span>
        <button class="text-base" @click="showNameInput = true">✏️</button>
      </div>
      <button v-else class="text-sm text-violet-500 underline mt-1" @click="showNameInput = true">
        + Donner un nom
      </button>
    </div>

    <!-- Layout horizontal : Licorne à gauche, Options à droite -->
    <div class="flex flex-row items-start gap-4 w-full max-w-2xl flex-1 min-h-0">

      <!-- Prévisualisation de la licorne (colonne gauche) -->
      <div class="flex-shrink-0 flex items-center justify-center">
        <div class="relative w-36 h-40 flex items-center justify-center">
          <div
            class="w-28 h-32 rounded-[50%] border-3 border-gray-200 shadow-lg relative"
            :style="{ backgroundColor: selectedBody }"
          >
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-10 rounded-t-full" :style="hornStyle" />
            <div class="absolute -left-2 top-2 w-6 h-20 rounded-full" :style="maneStyle" />
            <div class="absolute top-8 left-6 w-4 h-5 bg-gray-800 rounded-full">
              <div class="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <div class="absolute top-14 left-4 w-4 h-2 bg-rose-300/50 rounded-full" />
            <div class="absolute bottom-8 left-8 w-5 h-3 border-b-2 border-gray-600 rounded-b-full" />
            <span v-if="selectedAccessory === 'crown'" class="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl">👑</span>
            <span v-if="selectedAccessory === 'flowers'" class="absolute -top-2 -left-1 text-lg">🌸</span>
            <span v-if="selectedAccessory === 'wings'" class="absolute top-4 -right-5 text-2xl">🦋</span>
            <span v-if="selectedAccessory === 'stars'" class="absolute -top-3 right-0 text-lg animate-sparkle">⭐</span>
          </div>
        </div>
      </div>

      <!-- Options de personnalisation (colonne droite) -->
      <div class="flex-1 flex flex-col gap-2 overflow-y-auto max-h-full pr-1">
        <!-- Corps -->
        <div class="bg-white/80 rounded-xl p-2">
          <h3 class="text-xs font-magic text-violet-700 mb-1">Corps</h3>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="color in bodyColors"
              :key="color.value"
              class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              :class="selectedBody === color.value ? 'border-dore scale-110 ring-2 ring-dore/50' : 'border-gray-200'"
              :style="{ backgroundColor: color.value }"
              @click="selectedBody = color.value"
            />
          </div>
        </div>

        <!-- Crinière -->
        <div class="bg-white/80 rounded-xl p-2">
          <h3 class="text-xs font-magic text-violet-700 mb-1">Crinière</h3>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="color in maneColors"
              :key="color.value"
              class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              :class="selectedMane === color.value ? 'border-dore scale-110 ring-2 ring-dore/50' : 'border-gray-200'"
              :style="color.value === 'rainbow' ? { background: rainbowGradient } : { backgroundColor: color.value }"
              @click="selectedMane = color.value"
            />
          </div>
        </div>

        <!-- Corne + Accessoires sur une ligne -->
        <div class="flex gap-2">
          <div class="flex-1 bg-white/80 rounded-xl p-2">
            <h3 class="text-xs font-magic text-violet-700 mb-1">Corne</h3>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="horn in hornStyles"
                :key="horn.value"
                class="w-9 h-9 rounded-lg border-2 flex items-center justify-center text-lg transition-transform hover:scale-110"
                :class="selectedHorn === horn.value ? 'border-dore scale-110 bg-white' : 'border-gray-200 bg-gray-50'"
                @click="selectedHorn = horn.value"
              >
                {{ horn.icon }}
              </button>
            </div>
          </div>

          <div class="flex-1 bg-white/80 rounded-xl p-2">
            <h3 class="text-xs font-magic text-violet-700 mb-1">Accessoire</h3>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="acc in accessories"
                :key="acc.value"
                class="w-9 h-9 rounded-lg border-2 flex items-center justify-center text-lg transition-transform hover:scale-110"
                :class="selectedAccessory === acc.value ? 'border-dore scale-110 bg-white' : 'border-gray-200 bg-gray-50'"
                @click="selectedAccessory = acc.value"
              >
                {{ acc.icon }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton sauvegarder -->
    <button
      class="mt-2 px-6 py-2 rounded-full font-magic text-white shadow-lg transition-all hover:scale-105 active:scale-95"
      :class="isSaved ? 'bg-green-500' : 'bg-gradient-to-r from-violet to-rose'"
      @click="saveLicorne"
    >
      {{ isSaved ? '✓ Sauvegardé !' : '💾 Sauvegarder' }}
    </button>

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
  </div>
</template>
