<template>
  <div class="container">
    <h2>Editar Restaurante</h2>
    <form @submit.prevent="submit" class="form" v-if="isAuthenticated">
      <div class="form-group">
        <label>Nome</label>
        <input v-model="form.nome" required />
      </div>

      <div class="form-group">
        <label>Endereço</label>
        <input v-model="form.endereco" required />
      </div>

      <div class="form-group">
        <label>Horário de Funcionamento</label>
        <input v-model="form.horarioFuncionamento" placeholder="Ex: 08:00 - 18:00" />
      </div>

      <div class="form-group">
        <label>Telefone</label>
        <input v-model="form.telefone" placeholder="(11) 99999-9999" />
      </div>
      
      <div class="actions">
        <button type="submit">Atualizar</button>
      </div>
    </form>
    <div v-else>
      <p>Você precisa estar logado para editar as informações do restaurante.</p>
      <router-link to="/login">Fazer Login</router-link>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'EditRestaurantView',
  data() {
    return {
      form: {
        nome: '',
        endereco: '',
        horarioFuncionamento: '',
        telefone: ''
      },
      isAuthenticated: false
    }
  },
  async created() {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'))
    this.isAuthenticated = !!restaurant
    if (this.isAuthenticated) {
      try {
        const response = await api.getRestaurant(this.$route.params.id)
        this.form = { ...response.data }
      } catch (error) {
        console.error('Error fetching restaurant:', error)
      }
    }
  },
  methods: {
    async submit() {
      try {
        await api.updateRestaurant(this.$route.params.id, this.form)
        this.$router.push('/restaurants')
      } catch (error) {
        console.error('Error updating restaurant:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>