<template>
  <div>
    <LandingPage v-if="userType === null" @user-type-select="handleUserTypeSelect" />
    <UserNavigation v-else-if="userType === 'seeker'" @back="handleBack" />
    <RestaurantNavigation v-else-if="userType === 'restaurant'" @back="handleBack" />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import UserNavigation from './components/UserNavigation.vue'
import RestaurantNavigation from './components/RestaurantNavigation.vue'
import { Toaster } from './components/ui/sonner'

type UserType = 'seeker' | 'restaurant' | null

const userType = ref<UserType>(null)

const handleUserTypeSelect = (type: UserType) => {
  userType.value = type
}

const handleBack = () => {
  userType.value = null
}
</script>