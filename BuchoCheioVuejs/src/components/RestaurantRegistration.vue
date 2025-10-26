<template>
  <div class="mt-6">
    <Card class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Store class="w-5 h-5" />
          Register Your Restaurant
        </CardTitle>
        <CardDescription>
          Join our network to help provide meals to those in need in your community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="name">Restaurant Name *</Label>
              <Input
                id="name"
                v-model="formData.name"
                placeholder="Enter restaurant name"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="cuisine">Cuisine Type</Label>
              <Select v-model="formData.cuisine">
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="address" class="flex items-center gap-2">
              <MapPin class="w-4 h-4" />
              Address *
            </Label>
            <Input
              id="address"
              v-model="formData.address"
              placeholder="Full restaurant address"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="phone" class="flex items-center gap-2">
                <Phone class="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                v-model="formData.phone"
                placeholder="(555) 123-4567"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="email" class="flex items-center gap-2">
                <Mail class="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                v-model="formData.email"
                placeholder="restaurant@example.com"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Tell us about your restaurant and the types of meals you can provide..."
              :rows="3"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="openTime" class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                Opening Time
              </Label>
              <Input
                id="openTime"
                type="time"
                v-model="formData.openTime"
              />
            </div>
            
            <div class="space-y-2">
              <Label for="closeTime">Closing Time</Label>
              <Input
                id="closeTime"
                type="time"
                v-model="formData.closeTime"
              />
            </div>
          </div>

          <Button type="submit" class="w-full">
            Register Restaurant
          </Button>
        </form>
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
import { toast } from 'sonner@2.0.3'
import { MapPin, Phone, Mail, Clock, Store } from 'lucide-vue-next'

const formData = ref({
  name: "",
  address: "",
  phone: "",
  email: "",
  description: "",
  cuisine: "",
  openTime: "",
  closeTime: ""
})

const handleSubmit = () => {
  // In a real app, this would send data to backend
  console.log("Restaurant registration data:", formData.value)
  toast.success("Restaurant registered successfully! You can now manage your meals and hours in the dashboard.")
  
  // Reset form
  formData.value = {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    cuisine: "",
    openTime: "",
    closeTime: ""
  }
}
</script>