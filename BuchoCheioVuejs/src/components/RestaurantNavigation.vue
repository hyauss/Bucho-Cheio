<template>
  <div class="min-h-screen bg-background p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header with Back Button -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl mb-2">🍽️ Meal Bridge</h1>
          <p class="text-muted-foreground">Restaurant Partner Portal</p>
        </div>
        <Button variant="outline" @click="$emit('back')" class="flex items-center gap-2">
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <!-- Restaurant Tabs -->
      <Tabs default-value="register" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="register" class="flex items-center gap-2">
            <Store class="w-4 h-4" />
            Register Restaurant
          </TabsTrigger>
          <TabsTrigger value="dashboard" class="flex items-center gap-2">
            <Settings class="w-4 h-4" />
            Manage Restaurant
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="register">
          <RestaurantRegistration />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <RestaurantDashboard />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import RestaurantRegistration from './RestaurantRegistration.vue'
import RestaurantDashboard from './RestaurantDashboard.vue'
import { Store, Settings, ArrowLeft } from 'lucide-vue-next'

defineEmits<{
  back: []
}>()
</script>