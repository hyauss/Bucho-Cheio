<template>
  <div>
    <h2>Restaurantes</h2>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-if="restaurants.length === 0">Nenhum restaurante encontrado.</div>
      <div v-for="r in restaurants" :key="r.id" style="border:1px solid #ddd;padding:12px;margin:8px 0;">
        <h3>{{ r.nome }}</h3>
        <p><strong>Endereço:</strong> {{ r.endereco }}</p>
        <p><strong>CNPJ:</strong> {{ r.cnpj }}</p>

        <button @click="goToMenu(r.id)">Atualizar Cardápio</button>
        <button @click="goToReview(r.id)">Avaliar</button>
        <button v-if="isOwnRestaurant(r.id)" @click="goToEdit(r.id)">Editar Informações</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  data() {
    return { restaurants: [], loading: true }
  },
  async created() {
    try {
      const res = await api.getRestaurants()
      this.restaurants = res.data
    } catch (err) {
      console.error(err)
      alert('Erro ao buscar restaurantes')
    } finally {
      this.loading = false
    }
  },
  methods: {
    goToMenu(id) { this.$router.push({ name: 'menu-update', params: { id } }) },
    goToReview(id) { this.$router.push({ name: 'review', params: { id } }) },
    goToEdit(id) { this.$router.push({ name: 'restaurant-edit', params: { id } }) },
    isOwnRestaurant(id) {
      const restaurant = JSON.parse(localStorage.getItem('restaurant'))
      return restaurant && restaurant.id === id
    }
  }
}
</script>
