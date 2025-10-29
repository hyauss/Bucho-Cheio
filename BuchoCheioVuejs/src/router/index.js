import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuUpdateView from '../views/MenuUpdateView.vue'
import ReportsView from '../views/ReportsView.vue'
import RestaurantFormView from '../views/RestaurantFormView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import ReviewView from '../views/ReviewView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/restaurants', name: 'restaurants', component: RestaurantsView },
  { path: '/restaurants/new', name: 'restaurant-new', component: RestaurantFormView },
  { path: '/restaurants/:id/menu', name: 'menu-update', component: MenuUpdateView, props: true },
  { path: '/restaurants/:id/review', name: 'review', component: ReviewView, props: true },
  { path: '/reports', name: 'reports', component: ReportsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
