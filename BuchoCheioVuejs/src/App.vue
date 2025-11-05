<template>
  <div>
    <TopBar @toggle-sidebar="toggleSidebar" />
    <div id="sidebar" :class="{'sidebar-hidden': !isSidebarVisible}" class="sidebar">
      <a @click.prevent="$router.push('/')" href="#" class="sidebar-link">Home</a>
      <a @click.prevent="$router.push('/restaurants')" href="#" class="sidebar-link">Restaurantes</a>
      <a @click.prevent="$router.push('/restaurants/new')" href="#" class="sidebar-link">Cadastrar</a>
      <a @click.prevent="$router.push('/reports')" href="#" class="sidebar-link">Relatórios</a>
    </div>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
  components: { TopBar },
  data() {
    return {
      isSidebarVisible: true, // Controla a visibilidade da sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Alterna a visibilidade da sidebar
    }
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

#sidebar {
  position: fixed;
  top: 60px; /* Ajusta a sidebar para aparecer abaixo da topbar */
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #333;
  z-index: 1000;
  padding-top: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  transition: transform 0.3s ease;
}

.sidebar-hidden {
  transform: translateX(-250px); /* A sidebar se move para fora da tela */
}

.sidebar-link {
  text-decoration: none;
  color: white;
  margin-bottom: 16px;
  font-size: 18px;
  transition: background-color 0.3s;
}

.sidebar-link:hover {
  background-color: #444;
  padding-left: 10px;
}

.container {
  position: relative;
  z-index: 1;
  padding: 20px;
  max-width: 2000px;
  transition: margin-left 0.3s;
  margin-top: 40px; /* Diminui a margem superior para evitar sobreposição com a top bar */
}
</style>
