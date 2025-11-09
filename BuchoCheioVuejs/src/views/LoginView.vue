<template>
  <div class="login-container">
    <h2>Login do Restaurante</h2>

    <form @submit.prevent="login">
      <div>
        <label>CNPJ</label>
        <input v-model="cnpj" required placeholder="Digite o CNPJ" />
      </div>

      <div>
        <label>Senha</label>
        <input type="password" v-model="senha" required placeholder="Digite a senha" />
      </div>

      <button type="submit">Entrar</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      cnpj: '',
      senha: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        // chama o endpoint GET /loginRestaurante/{cnpj}/{senha}
        const res = await api.loginRestaurante(this.cnpj.trim(), this.senha.trim());

        // verifica o retorno
        if (!res.data.success) {
          this.error = res.data.message;
          return;
        }

        // salva o restaurante logado localmente
        localStorage.setItem('restauranteLogado', JSON.stringify(res.data.restaurante));

        alert('Login realizado com sucesso!');

        // redireciona para a tela de edição do cardápio
        this.$router.push({
          name: 'menu-update', // nome da rota no router/index.js
          params: { id: res.data.restaurante.id }
        });
      } catch (err) {
        console.error(err);
        this.error = 'Erro ao realizar login';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
