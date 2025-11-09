<template>
  <div>
    <h2>Meu Restaurante</h2>

    <div v-if="loading">Carregando...</div>

    <div v-else-if="!restaurante">
      <p>Nenhum restaurante associado encontrado.</p>
    </div>

    <div v-else style="border:1px solid #ddd;padding:12px;margin:8px 0;">
      <h3>{{ restaurante.nome }}</h3>
      <p><strong>Endereço:</strong> {{ restaurante.endereco }}</p>
      <p><strong>CNPJ:</strong> {{ restaurante.cnpj }}</p>

      <button @click="goToMenu(restaurante.id)">Ver Cardápio</button>
      <button @click="goToReview(restaurante.id)">Avaliar</button>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      restaurante: null,
      loading: true
    };
  },
  async created() {
    try {
      // Recupera o restaurante logado do localStorage
      const stored = localStorage.getItem('restauranteLogado');
      if (!stored) {
        alert('Nenhum restaurante logado!');
        this.$router.push('/login');
        return;
      }

      const restauranteLogado = JSON.parse(stored);
      const cnpj = restauranteLogado.cnpj;

      // Busca todos e filtra pelo CNPJ, ou poderia usar endpoint direto
      const res = await api.getRestaurants();
      const lista = res.data || [];
      this.restaurante = lista.find(r => r.cnpj === cnpj) || null;
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar restaurante.');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goToMenu(id) {
      this.$router.push({ name: 'menu-update', params: { id } });
    },
    goToReview(id) {
      this.$router.push({ name: 'review', params: { id } });
    }
  }
};
</script>
