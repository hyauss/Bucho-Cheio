<template>
  <div class="container">
    <h2>Cadastrar Restaurante</h2>
    <form @submit.prevent="submit" class="form">
      <div class="form-group">
        <label>Nome</label>
        <input v-model="form.nome" required />
      </div>

      <div class="form-group">
        <label>Endereço</label>
        <input v-model="form.endereco" required />
      </div>

      <div class="form-group">
        <label>CNPJ</label>
        <input v-model="form.cnpj" required />
      </div>

      <div class="form-group">
        <label>Horário de Funcionamento</label>
        <input v-model="form.horarioFuncionamento" placeholder="Ex: 08:00 - 18:00" />
      </div>

      <div class="form-group">
        <label>Telefone</label>
        <input v-model="form.telefone" placeholder="(11) 99999-9999" />
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input v-model="form.senha" type="password" required />
      </div>
      
      <div class="actions">
        <button type="submit">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'CadastrarRestauranteView',
  data() {
    return {
      form: {
        nome: '',
        endereco: '',
        cnpj: '',
        horarioFuncionamento: '',
        telefone: '',
        senha: '',
        pratosVendidos: 0,
        idPratos: [] // lista vazia inicialmente
      }
    }
  },
  methods: {
    async submit() {
      try {
        await api.createRestaurant(this.form)
        alert('Restaurante cadastrado com sucesso!')
        this.$router.push({ name: 'restaurants' })
      } catch (error) {
        console.error(error)
        alert('Erro ao cadastrar restaurante!')
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
