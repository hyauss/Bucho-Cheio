<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login do Restaurante</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="cnpj">CNPJ:</label>
          <input 
            type="text" 
            id="cnpj" 
            v-model="cnpj" 
            required
            placeholder="Digite o CNPJ"
          >
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            v-model="senha" 
            required
            placeholder="Digite a senha"
          >
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export default {
  name: 'RestaurantLoginView',
  setup() {
    const router = useRouter()
    const cnpj = ref('')
    const senha = ref('')
    const error = ref('')
    const isLoading = ref(false)

    const handleLogin = async () => {
      try {
        isLoading.value = true
        error.value = ''
        const response = await api.loginRestaurante(cnpj.value, senha.value)
        
        if (response.data.success) {
          localStorage.setItem('restaurant', JSON.stringify(response.data.restaurante))
          localStorage.setItem('isLoggedIn', 'true')
          router.push(`/restaurants/${response.data.restaurante.id}/menu`)
        } else {
          error.value = response.data.message
        }
      } catch (err) {
        error.value = 'Erro ao fazer login. Tente novamente.'
        console.error('Login error:', err)
      } finally {
        isLoading.value = false
      }
    }

    return {
      cnpj,
      senha,
      error,
      isLoading,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff0000;
  margin-top: 1rem;
  text-align: center;
}
</style>