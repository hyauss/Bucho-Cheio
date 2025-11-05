<template>
  <div class="topbar">
    <!-- Botão de Toggle da Sidebar -->
    <button @click="toggleSidebar" class="toggle-btn">☰</button>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar'); // Emite um evento para o componente pai (App.vue)
    }
  }
}
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  z-index: 1100; /* Garante que a topbar fique acima de outros elementos */
}

.toggle-btn {
  background-color: #333;
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 1101;
}

.toggle-btn:focus {
  outline: none;
}

.title {
  font-size: 24px;
  font-weight: bold;
}
</style>
