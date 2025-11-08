<template>
  <div>
    <h2>Avaliar Restaurante {{ id }}</h2>

    <form @submit.prevent="sendReview">
      <div>
        <label>Nota (1-5)</label>
        <input type="number" v-model.number="nota" min="1" max="5" required />
      </div>

      <div>
        <label>Comentário</label>
        <textarea v-model="avaliacao" required></textarea>
      </div>

      <button type="submit">Enviar Avaliação</button>
    </form>

    <hr />

    <h3>Avaliações existentes</h3>
    <div v-if="loading">Carregando avaliações...</div>
    <div v-else-if="avaliacoes.length === 0">
      <p>Nenhuma avaliação ainda.</p>
    </div>
    <ul v-else>
      <li v-for="(a, idx) in avaliacoes" :key="idx" class="avaliacao-item">
        <strong>Nota:</strong> {{ a.nota }}<br />
        <em>{{ a.avaliacao }}</em>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  props: ['id'],
  data() {
    return {
      nota: 5,
      avaliacao: '',
      avaliacoes: [],
      loading: true
    }
  },
  async created() {
    await this.loadReviews();
  },
  methods: {
    async loadReviews() {
      try {
        const res = await api.getReviewsByRestaurant(this.id)
        this.avaliacoes = res.data || []
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar avaliações')
      } finally {
        this.loading = false
      }
    },
    async sendReview() {
      try {
        const payload = {
          restauranteId: this.id,
          avaliacao: this.avaliacao,
          nota: this.nota
        }
        await api.postReview(payload)
        alert('Avaliação enviada!')
        this.avaliacao = ''
        this.nota = 5
        this.loadReviews() // recarrega lista
      } catch (err) {
        console.error(err)
        alert('Erro ao enviar avaliação')
      }
    }
  }
}
</script>

<style scoped>
.avaliacao-item {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
