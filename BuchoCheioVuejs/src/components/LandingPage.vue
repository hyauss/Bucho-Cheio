<template>
  <div class="min-h-screen bg-background p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl mb-4">🍽️ Meal Bridge</h1>
        <p class="text-xl text-muted-foreground mb-2">
          Connecting restaurants with those in need
        </p>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Building stronger communities by reducing food waste and providing access to nutritious meals for everyone.
        </p>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="text-center p-6 bg-muted rounded-lg">
          <Heart class="w-8 h-8 mx-auto mb-2 text-red-500" />
          <div class="text-2xl mb-1">2,500+</div>
          <div class="text-sm text-muted-foreground">Meals Provided</div>
        </div>
        <div class="text-center p-6 bg-muted rounded-lg">
          <Store class="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div class="text-2xl mb-1">150+</div>
          <div class="text-sm text-muted-foreground">Partner Restaurants</div>
        </div>
        <div class="text-center p-6 bg-muted rounded-lg">
          <Users class="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div class="text-2xl mb-1">1,200+</div>
          <div class="text-sm text-muted-foreground">People Helped</div>
        </div>
      </div>

      <!-- User Type Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card class="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div class="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Search class="w-6 h-6 text-green-700" />
              </div>
              Looking for Meals
            </CardTitle>
            <CardDescription>
              Find available meals from restaurants in your area
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Search restaurants near you
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                View available meals and portions
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Reserve meals for pickup
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Free and accessible to all
              </li>
            </ul>
            <Button 
              @click="$emit('userTypeSelect', 'seeker')"
              class="w-full group-hover:bg-green-700 transition-colors"
            >
              Find Available Meals
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card class="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle class="flex items-center gap-3">
              <div class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Store class="w-6 h-6 text-blue-700" />
              </div>
              Restaurant Owner
            </CardTitle>
            <CardDescription>
              Share surplus meals with your community
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Register your restaurant
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                List available surplus meals
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Manage your operating hours
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Make a positive impact
              </li>
            </ul>
            <Button 
              @click="$emit('userTypeSelect', 'restaurant')"
              variant="outline" 
              class="w-full group-hover:bg-blue-50 transition-colors"
            >
              Join as Restaurant
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- How it Works -->
      <div class="text-center mb-8">
        <h2 class="text-2xl mb-6">How Meal Bridge Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
              1
            </div>
            <h3>Restaurants Share</h3>
            <p class="text-muted-foreground text-sm">
              Partner restaurants list their surplus meals and available portions
            </p>
          </div>
          <div class="space-y-3">
            <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
              2
            </div>
            <h3>People Discover</h3>
            <p class="text-muted-foreground text-sm">
              Community members search and find available meals nearby
            </p>
          </div>
          <div class="space-y-3">
            <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
              3
            </div>
            <h3>Community Connects</h3>
            <p class="text-muted-foreground text-sm">
              Meals are reserved and picked up, reducing waste and hunger
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-muted-foreground text-sm border-t pt-8">
        <p>Building stronger, more connected communities through food sharing</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Search, Store, ArrowRight, Heart, Users, Utensils } from 'lucide-vue-next'

defineEmits<{
  userTypeSelect: [type: 'seeker' | 'restaurant']
}>()
</script>