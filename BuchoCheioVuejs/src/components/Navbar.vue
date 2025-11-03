<template>
  <nav style="background:#333;color:#fff;padding:12px;">
    <a @click.prevent="$router.push('/')" href="#" style="color:#fff;margin-right:12px;">Home</a>
    <a @click.prevent="$router.push('/restaurants')" href="#" style="color:#fff;margin-right:12px;">Restaurantes</a>
    <a @click.prevent="$router.push('/restaurants/new')" href="#" style="color:#fff;margin-right:12px;">Cadastrar</a>
    <a @click.prevent="$router.push('/reports')" href="#" style="color:#fff;margin-right:12px;">Relatórios</a>
  </nav>
</template>

<script>
export default {}
</script>
