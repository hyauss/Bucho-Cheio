import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuUpdateView from '../views/MenuUpdateView.vue'
import ReportsView from '../views/ReportsView.vue'
import RestaurantFormView from '../views/RestaurantFormView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import ReviewView from '../views/ReviewView.vue'
import RestaurantLoginView from '../views/RestaurantLoginView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/restaurants', name: 'restaurants', component: RestaurantsView },
  { path: '/restaurants/new', name: 'restaurant-new', component: RestaurantFormView },
  { path: '/restaurants/:id/menu', name: 'menu-update', component: MenuUpdateView, props: true, meta: { requiresAuth: true } },
  { path: '/restaurants/:id/review', name: 'review', component: ReviewView, props: true },
  { path: '/reports', name: 'reports', component: ReportsView },
  { path: '/login', name: 'login', component: RestaurantLoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const restaurant = JSON.parse(localStorage.getItem('restaurant') || 'null')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' })
    } else if (to.params.id && restaurant && to.params.id != restaurant.id) {
      next({ name: 'restaurants' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
