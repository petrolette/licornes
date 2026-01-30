<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((l: any) => l.code !== locale.value)
})
</script>

<template>
  <header class="border-b bg-background">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="text-xl font-bold">
        {{ t('app.name') }}
      </NuxtLink>
      
      <nav class="flex items-center gap-6">
        <NuxtLink 
          :to="localePath('/')" 
          class="text-sm hover:text-primary transition-colors"
        >
          {{ t('nav.home') }}
        </NuxtLink>
        
        <NuxtLink 
          :to="localePath('/contact')" 
          class="text-sm hover:text-primary transition-colors"
        >
          {{ t('nav.contact') }}
        </NuxtLink>
        
        <!-- Language switcher -->
        <div class="flex items-center gap-2">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="text-xs uppercase hover:text-primary transition-colors"
            @click="setLocale(loc.code)"
          >
            {{ loc.code }}
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
