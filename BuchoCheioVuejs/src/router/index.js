import { createRouter, createWebHistory } from 'vue-router'

// Import das views
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MenuUpdateView from '../views/MenuUpdateView.vue'
import MenuView from '../views/MenuView.vue'
import ReportsView from '../views/ReportsView.vue'
import RestaurantFormView from '../views/RestaurantFormView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import RestaurantsViewOnly from '../views/RestaurantsViewOnly.vue'
import ReviewView from '../views/ReviewView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView,props: true, },

  // Tela de login (pública)
  { path: '/login', name: 'login', component: LoginView, props: true },

  {
    path: '/reports',
    name: 'reports',
    component: ReportsView,
    props: true,
  },
  {
    path: '/restaurantesViewOnly',
    name: 'restaurantesViewOnly',
    component: RestaurantsViewOnly,
    props: true,
  },

  {
    path: '/restaurants/:id/review',
    name: 'review',
    component: ReviewView,
    props: true,
  },

  { path: '/restaurants/:id/menu-view', name: 'menu-view', component: MenuView, props: true },

  // Rotas protegidas
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/restaurants/new',
    name: 'restaurant-new',
    component: RestaurantFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/restaurants/:id/menu',
    name: 'menu-update',
    component: MenuUpdateView,
    props: true,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Protege as rotas que precisam de login
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('restauranteLogado')

  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
