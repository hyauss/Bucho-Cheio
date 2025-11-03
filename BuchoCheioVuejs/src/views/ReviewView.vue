<template>
  <div>
    <h2>Avaliar Restaurante {{ id }}</h2>
    <div>
      <label>Nota (1-5)</label>
      <input type="number" v-model.number="rating" min="1" max="5" />
    </div>
    <div>
      <label>Comentário</label>
      <textarea v-model="comment"></textarea>
    </div>
    <button @click="sendReview">Enviar Avaliação</button>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  props: ['id'],
  data() { return { rating: 5, comment: '' } },
  methods: {
    async sendReview() {
      try {
        await api.postReview(this.id, { rating: this.rating, comment: this.comment })
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
