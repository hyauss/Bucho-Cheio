<template>
  <div>
    <h2>Cadastrar Restaurante</h2>
    <form @submit.prevent="submit">
      <div><label>Nome</label><input v-model="form.nome" required /></div>
      <div><label>Endereço</label><input v-model="form.endereco" required /></div>
      <div><label>CNPJ</label><input v-model="form.cnpj" required /></div>
      <div style="margin-top:10px;">
        <button type="submit">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  data() {
    return { form: { nome: '', endereco: '', cnpj: '' } }
  },
  methods: {
    async submit() {
      try {
        const res = await api.createRestaurant(this.form)
        alert('Cadastrado com sucesso!')
        this.$router.push({ name: 'restaurants' })
      } catch (err) {
        console.error(err)
        alert('Erro ao cadastrar')
      }
    }
  }
}
</script>
