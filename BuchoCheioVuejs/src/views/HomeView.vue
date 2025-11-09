<template>
  <div class="home">
    <h1>Bem-vindo ao Sistema de Restaurantes</h1>
    <p>
      Este sistema permite que <strong>usuários</strong> consultem, avaliem e obtenham relatórios sobre restaurantes,
      e que <strong>restaurantes</strong> cadastrem e atualizem seus cardápios.
    </p>

    <div class="actions">
      <button @click="$router.push('/restaurantesViewOnly')">Consultar Restaurantes</button>
      <button @click="$router.push('/restaurants/new')">Cadastrar Restaurante</button>
      <button @click="$router.push('/reports')">Obter Relatórios</button>
    </div>
  </div>
</template>

<script>
export default { name: 'HomeView' }
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 40px;
}
.actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}
button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
</style>
