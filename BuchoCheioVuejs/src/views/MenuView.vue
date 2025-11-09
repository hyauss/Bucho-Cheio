<template>
  <div class="menu-view">
    <h2 v-if="restaurante">Cardápio do Restaurante {{ restaurante.nome }}</h2>

    <div v-if="loading" class="loading">
      <p>Carregando cardápio...</p>
    </div>

    <div v-else class="menu-container">
      <div class="menu-list">
        <h3>Itens do Cardápio</h3>

        <ul v-if="menu.length > 0">
          <li v-for="(item, idx) in menu" :key="idx" class="menu-item">
            <div>
              <strong>{{ item.nome }}</strong> - R$
              {{ item.preco.toFixed(2) }}
            </div>
            <small>{{ item.descricao }}</small>
          </li>
        </ul>

        <div v-else class="empty">
          Nenhum prato cadastrado para este restaurante.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'MenuView',
  props: ['id'],

  data() {
    return {
      restaurante: null,
      menu: [],
      loading: true
    }
  },

  async created() {
    try {
      // Busca os dados do restaurante (inclui nome, etc.)
      const restauranteRes = await api.getRestaurant(this.id)
      this.restaurante = restauranteRes.data

      // Busca os pratos (menu)
      const menuRes = await api.getRestaurantMenu(this.id)
      this.menu = menuRes.data || []
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar dados do restaurante.')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.menu-view {
  max-width: 650px;
  margin: 0 auto;
  padding: 1.5rem;
}

.loading {
  text-align: center;
}

.menu-list {
  margin-bottom: 2rem;
}

.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: #fafafa;
}

.menu-item strong {
  font-size: 1.1rem;
}

.menu-item small {
  display: block;
  color: #666;
  margin-top: 0.25rem;
}

.empty {
  color: #666;
  font-style: italic;
  text-align: center;
}
</style>
