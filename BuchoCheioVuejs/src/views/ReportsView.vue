<template>
  <div>
    <h2>Relatórios</h2>
    <div v-if="loading">Carregando relatórios...</div>
    <div v-else>
      <pre>{{ reports }}</pre>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  data() { return { reports: null, loading: true } },
  async created() {
    try {
      const res = await api.getReports()
      this.reports = res.data
    } catch (err) {
      console.error(err)
      alert('Erro ao obter relatórios')
    } finally { this.loading = false }
  }
}
</script>
