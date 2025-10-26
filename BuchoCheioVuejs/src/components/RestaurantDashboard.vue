<template>
  <div class="mt-6 space-y-6">
    <!-- Add New Meal -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Plus class="w-5 h-5" />
          Add New Meal
        </CardTitle>
        <CardDescription>
          Add meals that are currently available for pickup.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="addMeal" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="mealName">Meal Name *</Label>
              <Input
                id="mealName"
                v-model="newMeal.name"
                placeholder="e.g., Vegetable Soup"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="category">Category</Label>
              <Select v-model="newMeal.category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soup">Soup</SelectItem>
                  <SelectItem value="sandwich">Sandwich</SelectItem>
                  <SelectItem value="salad">Salad</SelectItem>
                  <SelectItem value="main">Main Course</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="newMeal.description"
              placeholder="Brief description of the meal"
              :rows="2"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="quantity">Quantity Available *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                v-model="newMeal.quantity"
                placeholder="How many servings?"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="availableUntil">Available Until *</Label>
              <Input
                id="availableUntil"
                type="time"
                v-model="newMeal.availableUntil"
                required
              />
            </div>
          </div>

          <Button type="submit" class="w-full">
            <Plus class="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </form>
      </CardContent>
    </Card>

    <!-- Current Meals -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Utensils class="w-5 h-5" />
          Current Available Meals
        </CardTitle>
        <CardDescription>
          Manage your currently available meals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p v-if="meals.length === 0" class="text-center text-muted-foreground py-8">
          No meals available. Add some meals above.
        </p>
        <div v-else class="space-y-4">
          <div 
            v-for="meal in meals" 
            :key="meal.id"
            class="flex items-center justify-between p-4 border rounded-lg"
          >
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h4>{{ meal.name }}</h4>
                <Badge :class="getCategoryColor(meal.category)">
                  {{ meal.category }}
                </Badge>
              </div>
              <p v-if="meal.description" class="text-muted-foreground mb-2">
                {{ meal.description }}
              </p>
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{{ meal.quantity }} servings</span>
                <span>Until {{ meal.availableUntil }}</span>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              @click="removeMeal(meal.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Working Hours -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Clock class="w-5 h-5" />
          Update Working Hours
        </CardTitle>
        <CardDescription>
          Set your restaurant's operating hours for each day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div 
            v-for="[day, hours] in Object.entries(workingHours)" 
            :key="day"
            class="flex items-center gap-4"
          >
            <div class="w-24 capitalize">{{ day }}</div>
            <div class="flex items-center gap-2 flex-1">
              <Input
                type="time"
                :model-value="hours.open"
                @input="updateHours(day, 'open', ($event.target as HTMLInputElement).value)"
                :disabled="!hours.isOpen"
                class="w-32"
              />
              <span>to</span>
              <Input
                type="time"
                :model-value="hours.close"
                @input="updateHours(day, 'close', ($event.target as HTMLInputElement).value)"
                :disabled="!hours.isOpen"
                class="w-32"
              />
              <Button
                :variant="hours.isOpen ? 'destructive' : 'default'"
                size="sm"
                @click="toggleDay(day)"
              >
                {{ hours.isOpen ? "Close" : "Open" }}
              </Button>
            </div>
          </div>
        </div>
        <Separator class="my-4" />
        <Button @click="updateWorkingHours" class="w-full">
          Update Working Hours
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { toast } from 'sonner@2.0.3'
import { Plus, Clock, Utensils, Trash2 } from 'lucide-vue-next'

interface Meal {
  id: string
  name: string
  description: string
  category: string
  quantity: number
  availableUntil: string
}

interface WorkingDay {
  open: string
  close: string
  isOpen: boolean
}

const meals = ref<Meal[]>([
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
])

const newMeal = ref({
  name: "",
  description: "",
  category: "",
  quantity: "",
  availableUntil: ""
})

const workingHours = ref<Record<string, WorkingDay>>({
  monday: { open: "09:00", close: "18:00", isOpen: true },
  tuesday: { open: "09:00", close: "18:00", isOpen: true },
  wednesday: { open: "09:00", close: "18:00", isOpen: true },
  thursday: { open: "09:00", close: "18:00", isOpen: true },
  friday: { open: "09:00", close: "18:00", isOpen: true },
  saturday: { open: "10:00", close: "16:00", isOpen: true },
  sunday: { open: "10:00", close: "16:00", isOpen: false }
})

const addMeal = () => {
  if (!newMeal.value.name || !newMeal.value.quantity || !newMeal.value.availableUntil) {
    toast.error("Please fill in all required fields")
    return
  }

  const meal: Meal = {
    id: Date.now().toString(),
    name: newMeal.value.name,
    description: newMeal.value.description,
    category: newMeal.value.category || "other",
    quantity: parseInt(newMeal.value.quantity),
    availableUntil: newMeal.value.availableUntil
  }

  meals.value.push(meal)
  newMeal.value = { name: "", description: "", category: "", quantity: "", availableUntil: "" }
  toast.success("Meal added successfully!")
}

const removeMeal = (id: string) => {
  meals.value = meals.value.filter(meal => meal.id !== id)
  toast.success("Meal removed")
}

const updateHours = (day: string, field: 'open' | 'close', value: string) => {
  workingHours.value[day][field] = value
}

const toggleDay = (day: string) => {
  workingHours.value[day].isOpen = !workingHours.value[day].isOpen
}

const updateWorkingHours = () => {
  toast.success("Working hours updated successfully!")
}

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
</script>