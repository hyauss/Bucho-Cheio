<template>
  <nav style="background:#333;color:#fff;padding:12px;">
    <div class="nav-links">
      <a @click.prevent="$router.push('/')" href="#" style="color:#fff;margin-right:12px;">Home</a>
      <a @click.prevent="$router.push('/restaurants')" href="#" style="color:#fff;margin-right:12px;">Restaurantes</a>
      <a @click.prevent="$router.push('/restaurants/new')" href="#" style="color:#fff;margin-right:12px;">Cadastrar</a>
      <a @click.prevent="$router.push('/reports')" href="#" style="color:#fff;margin-right:12px;">Relatórios</a>
    </div>
    <div class="auth-links">
      <template v-if="isLoggedIn">
        <span style="margin-right:12px;">{{ restaurantName }}</span>
        <a @click.prevent="handleLogout" href="#" style="color:#fff;">Sair</a>
      </template>
      <template v-else>
        <a @click.prevent="$router.push('/login')" href="#" style="color:#fff;">Login Restaurante</a>
      </template>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(false)
    const restaurantName = ref('')

    const checkLoginStatus = () => {
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
      const restaurant = JSON.parse(localStorage.getItem('restaurant') || 'null')
      restaurantName.value = restaurant ? restaurant.nome : ''
    }

    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('restaurant')
      checkLoginStatus()
      router.push('/')
    }

    onMounted(() => {
      checkLoginStatus()
      window.addEventListener('storage', checkLoginStatus)
    })

    return {
      isLoggedIn,
      restaurantName,
      handleLogout
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
}

.auth-links {
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.8;
}
</style>