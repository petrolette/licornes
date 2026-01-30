<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

// Dessins disponibles
const drawings = [
  { id: 'licorne', name: 'Licorne', emoji: '🦄' },
  { id: 'coeur', name: 'Cœur', emoji: '💖' },
  { id: 'etoile', name: 'Étoile', emoji: '⭐' },
  { id: 'fleur', name: 'Fleur', emoji: '🌸' },
  { id: 'papillon', name: 'Papillon', emoji: '🦋' }
]

const selectedDrawing = ref('licorne')

// Couleurs disponibles
const colors = [
  { name: 'rose', hex: '#FF69B4' },
  { name: 'violet', hex: '#9B59B6' },
  { name: 'bleu', hex: '#4D96FF' },
  { name: 'vert', hex: '#6BCB77' },
  { name: 'jaune', hex: '#FFD93D' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'rouge', hex: '#FF6B6B' },
  { name: 'turquoise', hex: '#40E0D0' }
]

const selectedColor = ref(colors[0].hex)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const isReady = ref(false)
const showFeedback = ref(false)
let ctx: CanvasRenderingContext2D | null = null

// Dessiner une licorne traditionnelle
const drawUnicorn = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const cx = w / 2
  const cy = h / 2

  // Corps (ellipse horizontale)
  ctx.beginPath()
  ctx.ellipse(cx, cy + 40, 80, 50, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Tête
  ctx.beginPath()
  ctx.ellipse(cx + 70, cy - 20, 35, 40, 0.3, 0, Math.PI * 2)
  ctx.stroke()

  // Corne
  ctx.beginPath()
  ctx.moveTo(cx + 85, cy - 55)
  ctx.lineTo(cx + 100, cy - 110)
  ctx.lineTo(cx + 115, cy - 55)
  ctx.closePath()
  ctx.stroke()

  // Spirale sur la corne
  ctx.lineWidth = 2
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(cx + 90 + i * 3, cy - 60 - i * 12)
    ctx.lineTo(cx + 110 - i * 3, cy - 65 - i * 12)
    ctx.stroke()
  }
  ctx.lineWidth = 3

  // Oreille
  ctx.beginPath()
  ctx.moveTo(cx + 60, cy - 50)
  ctx.quadraticCurveTo(cx + 50, cy - 80, cx + 70, cy - 60)
  ctx.stroke()

  // Oeil
  ctx.beginPath()
  ctx.ellipse(cx + 80, cy - 15, 8, 10, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx + 80, cy - 12, 4, 0, Math.PI * 2)
  ctx.fillStyle = '#333'
  ctx.fill()

  // Crinière
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(cx + 45, cy - 45)
  ctx.quadraticCurveTo(cx + 20, cy - 30, cx + 30, cy)
  ctx.quadraticCurveTo(cx + 10, cy + 20, cx + 25, cy + 40)
  ctx.stroke()
  ctx.lineWidth = 3

  // Pattes
  const legY = cy + 85
  ctx.beginPath()
  ctx.moveTo(cx - 40, cy + 70)
  ctx.lineTo(cx - 45, legY + 40)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx - 10, cy + 80)
  ctx.lineTo(cx - 10, legY + 40)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 20, cy + 80)
  ctx.lineTo(cx + 20, legY + 40)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 50, cy + 70)
  ctx.lineTo(cx + 55, legY + 40)
  ctx.stroke()

  // Queue
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(cx - 75, cy + 30)
  ctx.quadraticCurveTo(cx - 110, cy + 60, cx - 90, cy + 100)
  ctx.stroke()
}

// Dessiner un cœur
const drawHeart = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 4

  const cx = w / 2
  const cy = h / 2

  ctx.beginPath()
  ctx.moveTo(cx, cy + 80)
  ctx.bezierCurveTo(cx - 120, cy, cx - 120, cy - 80, cx, cy - 40)
  ctx.bezierCurveTo(cx + 120, cy - 80, cx + 120, cy, cx, cy + 80)
  ctx.stroke()
}

// Dessiner une étoile
const drawStar = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 4

  const cx = w / 2
  const cy = h / 2
  const outerR = 100
  const innerR = 40

  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
}

// Dessiner une fleur
const drawFlower = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 3

  const cx = w / 2
  const cy = h / 2 - 20

  // Pétales
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const px = cx + 50 * Math.cos(angle)
    const py = cy + 50 * Math.sin(angle)
    ctx.beginPath()
    ctx.ellipse(px, py, 40, 25, angle, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Centre
  ctx.beginPath()
  ctx.arc(cx, cy, 30, 0, Math.PI * 2)
  ctx.stroke()

  // Tige
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(cx, cy + 60)
  ctx.quadraticCurveTo(cx + 20, cy + 120, cx, cy + 180)
  ctx.stroke()

  // Feuilles
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(cx + 30, cy + 120, 25, 12, 0.5, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(cx - 25, cy + 150, 25, 12, -0.5, 0, Math.PI * 2)
  ctx.stroke()
}

// Dessiner un papillon
const drawButterfly = () => {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 3

  const cx = w / 2
  const cy = h / 2

  // Ailes supérieures
  ctx.beginPath()
  ctx.ellipse(cx - 60, cy - 30, 55, 45, -0.3, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(cx + 60, cy - 30, 55, 45, 0.3, 0, Math.PI * 2)
  ctx.stroke()

  // Ailes inférieures
  ctx.beginPath()
  ctx.ellipse(cx - 50, cy + 40, 40, 35, -0.5, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(cx + 50, cy + 40, 40, 35, 0.5, 0, Math.PI * 2)
  ctx.stroke()

  // Corps
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.ellipse(cx, cy, 12, 60, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Antennes
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(cx - 5, cy - 55)
  ctx.quadraticCurveTo(cx - 25, cy - 85, cx - 20, cy - 95)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 5, cy - 55)
  ctx.quadraticCurveTo(cx + 25, cy - 85, cx + 20, cy - 95)
  ctx.stroke()

  // Décorations sur les ailes
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(cx - 60, cy - 25, 15, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx + 60, cy - 25, 15, 0, Math.PI * 2)
  ctx.stroke()
}

// Sélectionner le dessin
const drawSelected = () => {
  switch (selectedDrawing.value) {
    case 'licorne': drawUnicorn(); break
    case 'coeur': drawHeart(); break
    case 'etoile': drawStar(); break
    case 'fleur': drawFlower(); break
    case 'papillon': drawButterfly(); break
  }
}

// Initialiser le canvas
onMounted(async () => {
  await nextTick()
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      drawSelected()
      isReady.value = true
    }
  }
})

// Redessiner quand on change de dessin
watch(selectedDrawing, () => {
  drawSelected()
})

// Gestion du dessin tactile
const getPosition = (e: MouseEvent | TouchEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasRef.value.width / rect.width
  const scaleY = canvasRef.value.height / rect.height

  if ('touches' in e) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    }
  }
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  }
}

const startDrawing = (e: MouseEvent | TouchEvent) => {
  if (!isReady.value) return
  isDrawing.value = true
  const pos = getPosition(e)
  if (ctx) {
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }
}

const stopDrawing = () => {
  if (isDrawing.value) {
    isDrawing.value = false
    // Feedback visuel
    showFeedback.value = true
    setTimeout(() => { showFeedback.value = false }, 300)
  }
  if (ctx) ctx.beginPath()
}

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !ctx || !isReady.value) return
  e.preventDefault()
  const pos = getPosition(e)

  ctx.lineWidth = 25
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = selectedColor.value

  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(pos.x, pos.y)
}

const clearCanvas = () => {
  drawSelected()
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-14 h-14 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-pink-500 shadow-2xl"
    >
      <span class="text-2xl">⬅️</span>
    </NuxtLink>

    <!-- Feedback visuel -->
    <div
      v-if="showFeedback"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-6xl animate-ping pointer-events-none"
    >
      ✨
    </div>

    <div class="h-full flex flex-col items-center pt-14 pb-2 px-2 gap-2">
      <!-- Sélection du dessin -->
      <div class="flex gap-1 shrink-0">
        <button
          v-for="d in drawings"
          :key="d.id"
          class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-all border-2"
          :class="selectedDrawing === d.id ? 'bg-pink-200 border-pink-500 scale-110' : 'bg-white border-gray-200'"
          @click="selectedDrawing = d.id"
        >
          {{ d.emoji }}
        </button>
      </div>

      <!-- Zone de dessin responsive -->
      <div class="flex-1 flex items-center justify-center w-full min-h-0">
        <canvas
          ref="canvasRef"
          width="350"
          height="400"
          class="bg-white rounded-2xl shadow-xl touch-none border-4 border-pink-200"
          style="max-width: 100%; max-height: 100%; width: auto; height: auto;"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          @touchstart.prevent="startDrawing"
          @touchmove.prevent="draw"
          @touchend="stopDrawing"
        />
      </div>

      <!-- Palette de couleurs -->
      <div class="w-full bg-white/95 p-2 rounded-2xl shadow-xl shrink-0">
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <button
            v-for="color in colors"
            :key="color.name"
            class="w-10 h-10 rounded-full shadow-lg transition-transform border-3 border-white"
            :class="{ 'ring-3 ring-yellow-400 scale-110': selectedColor === color.hex }"
            :style="{ backgroundColor: color.hex }"
            @click="selectedColor = color.hex"
          />
          <button
            class="w-10 h-10 rounded-full bg-gray-100 shadow-lg flex items-center justify-center text-xl border-3 border-white"
            @click="clearCanvas"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
