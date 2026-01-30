<script setup lang="ts">
const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-muted/50">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} {{ t('app.name') }}. {{ t('footer.rights') }}
        </p>
        
        <nav class="flex items-center gap-4">
          <NuxtLink 
            :to="localePath('/contact')" 
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ t('nav.contact') }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
