<template>
  <div>
    <h2>Atualizar Cardápio - Restaurante {{ id }}</h2>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div>
        <label>Novo item (nome)</label>
        <input v-model="newItem.name" placeholder="Nome do prato" />
        <label>Preço</label>
        <input v-model.number="newItem.price" placeholder="0.00" />
        <button @click="addItem">Adicionar</button>
      </div>

      <ul>
        <li v-for="(item, idx) in menu" :key="idx">
          {{ item.name }} - R$ {{ item.price.toFixed(2) }}
          <button @click="removeItem(idx)">Remover</button>
        </li>
      </ul>

      <button @click="saveMenu">Salvar Cardápio</button>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  props: ['id'],
  data() {
    return { menu: [], newItem: { name: '', price: 0 }, loading: true }
  },
  async created() {
    try {
      const res = await api.getRestaurant(this.id)
      this.menu = res.data.menu || []
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar restaurante')
    } finally { this.loading = false }
  },
  methods: {
    addItem() {
      if (!this.newItem.name) return
      this.menu.push({ ...this.newItem })
      this.newItem = { name: '', price: 0 }
    },
    removeItem(i) { this.menu.splice(i,1) },
    async saveMenu() {
      try {
        await api.updateMenu(this.id, { menu: this.menu })
        alert('Cardápio atualizado com sucesso')
        this.$router.push({ name: 'restaurants' })
      } catch (err) {
        console.error(err)
        alert('Erro ao salvar cardápio')
      }
    }
  }
}
</script>
