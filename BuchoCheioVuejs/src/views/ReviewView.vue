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
  </div>
</template>

<script>
import api from '../services/api';

export default {
  props: ['id'],
  data() {
    return {
      nota: 5,
      avaliacao: ''
    }
  },
  methods: {
    async sendReview() {
      try {
        // monta o JSON exatamente como o backend espera
        const payload = {
          restauranteId: this.id,
          avaliacao: this.avaliacao,
          nota: this.nota
        }
        await api.postReview(payload)
        alert('Avaliação enviada!')
        this.$router.push({ name: 'restaurants' })
      } catch (err) {
        console.error(err)
        alert('Erro ao enviar avaliação')
      }
    }
  }
}
</script>
