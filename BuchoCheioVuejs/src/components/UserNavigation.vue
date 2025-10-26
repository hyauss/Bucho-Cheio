<template>
  <div class="min-h-screen bg-background p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header with Back Button -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl mb-2">🍽️ Meal Bridge</h1>
          <p class="text-muted-foreground">Find available meals in your area</p>
        </div>
        <Button variant="outline" @click="$emit('back')" class="flex items-center gap-2">
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <!-- Meal Finder -->
      <MealFinder />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from './ui/button'
import MealFinder from './MealFinder.vue'
import { ArrowLeft } from 'lucide-vue-next'

defineEmits<{
  back: []
}>()
</script>