<template>
  <div id="sidebar" :class="{'sidebar-hidden': !isSidebarVisible}" class="sidebar">
    <div class="sidebar-links">
      <a @click.prevent="$router.push('/')" href="#" class="sidebar-link">Home</a>
      <a @click.prevent="$router.push('/restaurants')" href="#" class="sidebar-link">Restaurantes</a>
      <a @click.prevent="$router.push('/restaurants/new')" href="#" class="sidebar-link">Cadastrar</a>
      <a @click.prevent="$router.push('/reports')" href="#" class="sidebar-link">Relatórios</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarVisible: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: top;
  top: 444;
  left: 0;
  background-color: #333;
  color: white;
  transition: transform 0.3s ease;
}

.sidebar-hidden {
  transform: translateX(-100%); /* Hidden state: slide out */
}

.sidebar-link {
  text-decoration: none;
  color: white;
  padding: 10px 0;
  display: block;
}

.sidebar-link:hover {
  background-color: #444;
  padding-left: 10px;
}
</style>
