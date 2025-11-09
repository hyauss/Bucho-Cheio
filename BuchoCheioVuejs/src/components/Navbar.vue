<template>
  <nav style="background:#333;color:#fff;padding:12px;display:flex;align-items:center;gap:12px;">
    <a @click.prevent="$router.push('/')" href="#" style="color:#fff;">Home</a>
    <a @click.prevent="$router.push('/restaurantesViewOnly')" href="#" style="color:#fff;">Restaurantes</a>
    <a @click.prevent="$router.push('/restaurants/new')" href="#" style="color:#fff;">Cadastrar</a>
    <a @click.prevent="$router.push('/reports')" href="#" style="color:#fff;">Relatórios</a>
    <a @click.prevent="$router.push('/restaurants')" href="#" style="color:#fff;">Meus Restaurantes</a>

    <!-- Espaço flexível -->
    <div style="flex-grow:1"></div>

    <!-- Nome do restaurante logado -->
    <div v-if="restauranteNome" style="margin-right:16px;">
      Olá, <strong>{{ restauranteNome }}</strong>!
    </div>

    <!-- Botão de logout -->
    <a v-if="restauranteNome" @click.prevent="logout" href="#" style="color:#ff6666;">Sair</a>
  </nav>
</template>

<script>
import { eventBus } from '../services/eventBus';

export default {
  data() {
    return {
      restauranteNome: null,
      eventBus // 🔥 adiciona aqui para o watcher funcionar
    };
  },
  mounted() {
    this.atualizarRestaurante();
  },
  watch: {
    'eventBus.usuarioLogado'() {
      this.atualizarRestaurante();
    }
  },
  methods: {
    atualizarRestaurante() {
      const restauranteStr = localStorage.getItem('restauranteLogado');
      if (restauranteStr) {
        try {
          const restaurante = JSON.parse(restauranteStr);
          this.restauranteNome = restaurante?.nome || null;
        } catch (err) {
          console.error('Erro ao ler restaurante do localStorage', err);
          this.restauranteNome = null;
        }
      } else {
        this.restauranteNome = null;
      }
    },
    logout() {
      localStorage.removeItem('restauranteLogado');
      this.restauranteNome = null;
      eventBus.usuarioLogado = false;
      this.$nextTick(() => {
        alert('Você saiu da conta.');
        this.$router.push('/login');
      });
    }
  }
};
</script>


