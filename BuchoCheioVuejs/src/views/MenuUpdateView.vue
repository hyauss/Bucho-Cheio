<template>
  <div class="update-menu">
    <h2>Atualizar Cardápio - Restaurante {{ nomeRestaurante }}</h2>

    <div v-if="loading" class="loading">
      <p>Carregando cardápio...</p>
    </div>

    <div v-else class="menu-container">
      <!-- FORMULÁRIO PARA ADICIONAR NOVO PRATO -->
      <div class="new-item">
        <h3>Novo prato</h3>

        <div class="input-group">
          <label>Nome</label>
          <input v-model="newItem.nome" placeholder="Ex: Lasanha Bolonhesa" />
        </div>

        <div class="input-group">
          <label>Descrição</label>
          <textarea v-model="newItem.descricao" placeholder="Breve descrição do prato"></textarea>
        </div>

        <div class="input-group">
          <label>Preço (R$)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            v-model.number="newItem.preco"
            placeholder="0.00"
          />
        </div>

        <button @click="addItem" class="btn-add">Adicionar ao cardápio</button>
      </div>

      <hr />

      <!-- LISTA DE PRATOS EXISTENTES -->
      <div class="menu-list">
        <h3>Itens do Cardápio Atual</h3>

        <ul v-if="menu.length > 0">
          <li v-for="(item, idx) in menu" :key="idx" class="menu-item">
            <div v-if="editIndex === idx" class="edit-mode">
              <input v-model="editItem.nome" placeholder="Nome do prato" class="input-edit" />
              <textarea
                v-model="editItem.descricao"
                placeholder="Descrição"
                class="input-edit"
              ></textarea>
              <input type="number" v-model.number="editItem.preco" step="0.01" class="input-edit" />
              <button @click="saveEdit(idx)" class="btn-save-edit">Salvar</button>
              <button @click="cancelEdit" class="btn-cancel-edit">Cancelar</button>
            </div>

            <div v-else class="view-mode">
              <div>
                <strong>{{ item.nome }}</strong> - R$
                {{ item.preco.toFixed(2) }}
              </div>
              <small>{{ item.descricao }}</small>
              <div class="actions">
                <button @click="startEdit(idx)" class="btn-edit">Editar</button>
                <button @click="removeItem(idx)" class="btn-remove">Remover</button>
              </div>
            </div>
          </li>
        </ul>

        <div v-else class="empty">Nenhum prato cadastrado para este restaurante.</div>
      </div>

      <button @click="saveMenu" class="btn-save">Salvar alterações</button>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'UpdateMenuView',
  props: ['id'],

  data() {
    return {
      nomeRestaurante: '',
      menu: [],
      newItem: { nome: '', descricao: '', preco: 0 },
      loading: true,
      editIndex: null,
      editItem: null,
    }
  },

  async created() {
    try {
      // Busca o restaurante para obter o nome
      const resRestaurante = await api.getRestaurant(this.id)
      this.nomeRestaurante = resRestaurante.data.nome

      // Busca o cardápio do restaurante
      const resMenu = await api.getRestaurantMenu(this.id)
      this.menu = resMenu.data || []
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar informações do restaurante.')
    } finally {
      this.loading = false
    }
  },

  methods: {
    async addItem() {
      if (!this.newItem.nome.trim()) {
        alert('Informe o nome do prato.')
        return
      }

      try {
        const res = await api.updateDish(this.id, this.newItem)
        this.menu.push(res.data)
        this.newItem = { nome: '', descricao: '', preco: 0 }
      } catch (err) {
        console.error(err)
        alert('Erro ao adicionar prato.')
      }
    },

    async removeItem(index) {
      const prato = this.menu[index]
      if (!confirm(`Remover o prato "${prato.nome}"?`)) return

      try {
        await api.removeDish(this.id, prato.id)
        this.menu.splice(index, 1)
      } catch (err) {
        console.error(err)
        alert('Erro ao remover prato.')
      }
    },

    startEdit(index) {
      this.editIndex = index
      this.editItem = { ...this.menu[index] }
    },

    cancelEdit() {
      this.editIndex = null
      this.editItem = null
    },

    async saveEdit(index) {
      try {
        const res = await api.updateDish(this.id, this.editItem)
        this.menu[index] = res.data
        this.cancelEdit()
        alert('Prato atualizado!')
      } catch (err) {
        console.error(err)
        alert('Erro ao atualizar prato.')
      }
    },

    async saveMenu() {
      try {
        await api.updateMenu(this.id, this.menu)
        alert('Cardápio sincronizado com sucesso!')
      } catch (err) {
        console.error(err)
        alert('Erro ao sincronizar cardápio.')
      }
    },
  },
}
</script>

<style scoped>
.update-menu {
  max-width: 650px;
  margin: 0 auto;
  padding: 1.5rem;
}
.loading {
  text-align: center;
}
.new-item,
.menu-list {
  margin-bottom: 2rem;
}
.input-group {
  margin-bottom: 0.75rem;
}
.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: #fafafa;
}
.actions {
  margin-top: 0.5rem;
}
.btn-add,
.btn-save,
.btn-remove,
.btn-edit,
.btn-save-edit,
.btn-cancel-edit {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.25rem;
}
.btn-add {
  background-color: #4caf50;
  color: white;
}
.btn-save {
  background-color: #2196f3;
  color: white;
  width: 100%;
}
.btn-edit {
  background-color: #ff9800;
  color: white;
}
.btn-save-edit {
  background-color: #4caf50;
  color: white;
}
.btn-cancel-edit {
  background-color: #9e9e9e;
  color: white;
}
.btn-remove {
  background-color: #f44336;
  color: white;
}
.input-edit {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.empty {
  color: #666;
  font-style: italic;
  text-align: center;
}
</style>
