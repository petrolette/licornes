<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// Couleurs disponibles (grosses pastilles pour enfant de 3 ans)
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
let ctx: CanvasRenderingContext2D | null = null

// Dessiner le contour de la licorne (simplifié pour enfants)
const drawUnicornOutline = () => {
  if (!ctx || !canvasRef.value) return

  const w = canvasRef.value.width
  const h = canvasRef.value.height

  // Fond blanc
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = '#555555'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Position centrale ajustée
  const cx = w / 2
  const cy = h / 2 + 30

  // === TÊTE (grande ellipse) ===
  ctx.beginPath()
  ctx.ellipse(cx, cy, 90, 110, 0, 0, Math.PI * 2)
  ctx.stroke()

  // === CORNE MAGIQUE ===
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - 100)
  ctx.lineTo(cx, cy - 180)
  ctx.lineTo(cx + 20, cy - 100)
  ctx.stroke()

  // Spirales sur la corne
  ctx.lineWidth = 2
  for (let i = 0; i < 4; i++) {
    const y = cy - 115 - (i * 15)
    ctx.beginPath()
    ctx.moveTo(cx - 12 + (i * 2), y)
    ctx.lineTo(cx + 12 - (i * 2), y - 8)
    ctx.stroke()
  }
  ctx.lineWidth = 4

  // === OREILLE ===
  ctx.beginPath()
  ctx.moveTo(cx - 55, cy - 80)
  ctx.quadraticCurveTo(cx - 85, cy - 130, cx - 45, cy - 105)
  ctx.stroke()

  // === OEIL (grand et mignon) ===
  ctx.beginPath()
  ctx.ellipse(cx - 25, cy - 20, 18, 25, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Pupille
  ctx.beginPath()
  ctx.arc(cx - 25, cy - 15, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#333'
  ctx.fill()

  // Reflet dans l'oeil
  ctx.beginPath()
  ctx.arc(cx - 30, cy - 25, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#FFF'
  ctx.fill()

  // === CRINIÈRE (grandes vagues) ===
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(cx - 70, cy - 70)
  ctx.quadraticCurveTo(cx - 130, cy - 40, cx - 100, cy + 20)
  ctx.quadraticCurveTo(cx - 150, cy + 60, cx - 90, cy + 100)
  ctx.quadraticCurveTo(cx - 140, cy + 140, cx - 80, cy + 160)
  ctx.stroke()
  ctx.lineWidth = 4

  // === MUSEAU ===
  ctx.beginPath()
  ctx.ellipse(cx + 40, cy + 70, 45, 35, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Narines
  ctx.beginPath()
  ctx.ellipse(cx + 30, cy + 65, 6, 5, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.ellipse(cx + 55, cy + 65, 6, 5, 0, 0, Math.PI * 2)
  ctx.stroke()

  // === BOUCHE (sourire) ===
  ctx.beginPath()
  ctx.arc(cx + 40, cy + 80, 20, 0.2, Math.PI - 0.2)
  ctx.stroke()

  // === JOUE ROSE (cercle pointillé) ===
  ctx.setLineDash([3, 3])
  ctx.beginPath()
  ctx.ellipse(cx - 60, cy + 30, 15, 12, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])

  // === ÉTOILE décorative ===
  drawStar(cx + 80, cy - 60, 15, 5)
  drawStar(cx - 100, cy - 100, 10, 5)
}

// Dessiner une étoile
const drawStar = (x: number, y: number, radius: number, points: number) => {
  if (!ctx) return
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? radius : radius / 2
    const angle = (i * Math.PI) / points - Math.PI / 2
    const px = x + r * Math.cos(angle)
    const py = y + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.stroke()
}

// Initialiser le canvas
onMounted(async () => {
  await nextTick()

  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      drawUnicornOutline()
      isReady.value = true
    }
  }
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
  isDrawing.value = false
  if (ctx) ctx.beginPath()
}

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !ctx || !isReady.value) return

  e.preventDefault()
  const pos = getPosition(e)

  ctx.lineWidth = 30 // Gros trait pour enfant
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = selectedColor.value

  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(pos.x, pos.y)
}

// Effacer le dessin
const clearCanvas = () => {
  if (!ctx || !canvasRef.value) return
  drawUnicornOutline()
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour 3D -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-pink-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-3">
    <!-- Titre compact -->
    <div class="text-center mb-2">
      <h1 class="text-xl sm:text-2xl font-magic text-rose">
        Colorie la licorne !
      </h1>
    </div>

    <!-- Zone de dessin -->
    <div class="flex-1 flex items-center justify-center w-full min-h-0">
      <canvas
        ref="canvasRef"
        width="400"
        height="500"
        class="bg-white rounded-magic shadow-magic max-w-full max-h-full touch-none"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="startDrawing"
        @touchmove.prevent="draw"
        @touchend="stopDrawing"
      />
    </div>

    <!-- Palette de couleurs - GROS boutons -->
    <div class="w-full bg-white/95 backdrop-blur-sm p-3 mt-2 rounded-2xl shadow-xl">
      <div class="flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto">
        <!-- Couleurs -->
        <button
          v-for="color in colors"
          :key="color.name"
          class="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95 border-4 border-white"
          :class="{ 'ring-4 ring-dore scale-110': selectedColor === color.hex }"
          :style="{ backgroundColor: color.hex }"
          @click="selectedColor = color.hex"
        />

        <!-- Bouton effacer -->
        <button
          class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 shadow-xl flex items-center justify-center text-2xl sm:text-3xl transition-transform hover:scale-110 active:scale-95 border-4 border-white"
          @click="clearCanvas"
        >
          🗑️
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
