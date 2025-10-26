<template>
  <div class="mt-6 space-y-6">
    <!-- Search and Filters -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Search class="w-5 h-5" />
          Find Available Meals
        </CardTitle>
        <CardDescription>
          Search for restaurants and available meals in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="search">Search</Label>
            <Input
              id="search"
              v-model="searchQuery"
              placeholder="Search restaurants, meals, or locations..."
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="cuisine">Cuisine Type</Label>
              <Select v-model="selectedCuisine">
                <SelectTrigger>
                  <SelectValue placeholder="All cuisines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cuisines</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Mexican">Mexican</SelectItem>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="Indian">Indian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div class="space-y-2">
              <Label for="category">Meal Category</Label>
              <Select v-model="selectedCategory">
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="soup">Soup</SelectItem>
                  <SelectItem value="sandwich">Sandwich</SelectItem>
                  <SelectItem value="salad">Salad</SelectItem>
                  <SelectItem value="main">Main Course</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-muted rounded-lg p-4">
            <div class="flex items-center justify-between">
              <span>{{ filteredRestaurants.length }} restaurants found</span>
              <span>{{ totalMealsAvailable }} meals available</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Results -->
    <div class="space-y-4">
      <Card v-if="filteredRestaurants.length === 0">
        <CardContent class="text-center py-8">
          <p class="text-muted-foreground">
            No restaurants or meals found matching your search criteria.
          </p>
        </CardContent>
      </Card>

      <Card 
        v-for="restaurant in filteredRestaurants" 
        :key="restaurant.id"
        :class="{ 'opacity-60': !restaurant.isOpen }"
      >
        <CardHeader>
          <div class="flex items-start justify-between">
            <div>
              <CardTitle class="flex items-center gap-2">
                {{ restaurant.name }}
                <Badge v-if="!restaurant.isOpen" variant="destructive">Closed</Badge>
              </CardTitle>
              <CardDescription class="flex items-center gap-4 mt-2">
                <span class="flex items-center gap-1">
                  <MapPin class="w-4 h-4" />
                  {{ restaurant.address }} • {{ restaurant.distance }}
                </span>
                <span class="flex items-center gap-1">
                  <Phone class="w-4 h-4" />
                  {{ restaurant.phone }}
                </span>
              </CardDescription>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-1 mb-1">
                <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{{ restaurant.rating }}</span>
              </div>
              <Badge variant="secondary">{{ restaurant.cuisine }}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p v-if="restaurant.meals.length === 0" class="text-muted-foreground">
            No meals currently available
          </p>
          <template v-else>
            <div class="flex items-center gap-2 mb-4">
              <Utensils class="w-4 h-4" />
              <span>{{ restaurant.meals.length }} meal types • {{ getTotalServings(restaurant.meals) }} servings available</span>
            </div>
            <div class="space-y-3">
              <div 
                v-for="meal in restaurant.meals" 
                :key="meal.id"
                class="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h4>{{ meal.name }}</h4>
                    <Badge :class="getCategoryColor(meal.category)">
                      {{ meal.category }}
                    </Badge>
                  </div>
                  <p v-if="meal.description" class="text-muted-foreground text-sm mb-2">
                    {{ meal.description }}
                  </p>
                  <div class="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{{ meal.quantity }} servings</span>
                    <span class="flex items-center gap-1">
                      <Clock class="w-3 h-3" />
                      Until {{ meal.availableUntil }}
                    </span>
                  </div>
                </div>
                <Button 
                  :disabled="!restaurant.isOpen"
                  class="ml-4"
                >
                  Reserve
                </Button>
              </div>
            </div>
          </template>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Search, MapPin, Clock, Phone, Utensils, Star } from 'lucide-vue-next'

interface Meal {
  id: string
  name: string
  description: string
  category: string
  quantity: number
  availableUntil: string
}

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  cuisine: string
  distance: string
  rating: number
  isOpen: boolean
  meals: Meal[]
}

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Sunny Cafe",
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    cuisine: "American",
    distance: "0.5 mi",
    rating: 4.5,
    isOpen: true,
    meals: [
      {
        id: "1",
        name: "Vegetable Soup",
        description: "Fresh vegetable soup with bread",
        category: "soup",
        quantity: 20,
        availableUntil: "18:00"
      },
      {
        id: "2",
        name: "Chicken Sandwich",
        description: "Grilled chicken sandwich with salad",
        category: "sandwich",
        quantity: 15,
        availableUntil: "16:00"
      }
    ]
  },
  {
    id: "2",
    name: "Mario's Kitchen",
    address: "456 Oak Ave, Little Italy",
    phone: "(555) 234-5678",
    cuisine: "Italian",
    distance: "1.2 mi",
    rating: 4.8,
    isOpen: true,
    meals: [
      {
        id: "3",
        name: "Pasta Marinara",
        description: "Classic pasta with marinara sauce",
        category: "main",
        quantity: 12,
        availableUntil: "19:00"
      },
      {
        id: "4",
        name: "Caesar Salad",
        description: "Fresh romaine with parmesan and croutons",
        category: "salad",
        quantity: 8,
        availableUntil: "17:30"
      }
    ]
  },
  {
    id: "3",
    name: "Taco Express",
    address: "789 Pine St, Mexican Quarter",
    phone: "(555) 345-6789",
    cuisine: "Mexican",
    distance: "2.1 mi",
    rating: 4.3,
    isOpen: false,
    meals: []
  }
]

const searchQuery = ref("")
const selectedCuisine = ref("all")
const selectedCategory = ref("all")
const restaurants = ref<Restaurant[]>(mockRestaurants)

const filteredRestaurants = computed(() => {
  return restaurants.value.filter((restaurant) => {
    const matchesSearch = searchQuery.value === "" || 
      restaurant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      restaurant.meals.some(meal => 
        meal.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    
    const matchesCuisine = selectedCuisine.value === "all" || restaurant.cuisine === selectedCuisine.value
    
    const matchesCategory = selectedCategory.value === "all" || 
      restaurant.meals.some(meal => meal.category === selectedCategory.value)

    return matchesSearch && matchesCuisine && matchesCategory
  })
})

const totalMealsAvailable = computed(() => {
  return filteredRestaurants.value.reduce(
    (total, restaurant) => total + restaurant.meals.reduce((sum, meal) => sum + meal.quantity, 0),
    0
  )
})

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    soup: "bg-blue-100 text-blue-800",
    sandwich: "bg-green-100 text-green-800",
    salad: "bg-yellow-100 text-yellow-800",
    main: "bg-red-100 text-red-800",
    dessert: "bg-purple-100 text-purple-800",
    other: "bg-gray-100 text-gray-800"
  }
  return colors[category] || colors.other
}

const getTotalServings = (meals: Meal[]) => {
  return meals.reduce((sum, meal) => sum + meal.quantity, 0)
}
</script>