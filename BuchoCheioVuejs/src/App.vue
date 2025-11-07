<template>
  <div>
    <Navbar />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default { components: { Navbar } }
</script>

<style>
body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; }
.container { padding: 20px; max-width: 1000px; margin: auto; }
</style>
