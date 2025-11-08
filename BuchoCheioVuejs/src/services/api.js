import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/buchoCheio'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// example interceptors (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // you can centralize error handling here
    return Promise.reject(err)
  },
)

export default {
  loginRestaurante(cnpj, senha) {
    return api.get(`/loginRestaurante/${cnpj}/${senha}`)
  },
  getRestaurants() {
    return api.get('/restaurantes')
  },
  getRestaurant(id) {
    return api.get(`/findRestauranteById/${id}`)
  },
  createRestaurant(payload) {
    return api.post('/cadastrarRestaurante', payload)
  },
  getRestaurantMenu(id) {
    return api.get(`/restaurante/${id}/pratos`)
  },
  updateMenu(id, menuPayload) {
    return api.post(`/restaurante/${id}/pratos`, menuPayload)
  },
  postReview(reviewPayload) {
    return api.post('/avaliacao', reviewPayload)
  },
  getReports() {
    return api.get('/buildRelatorio')
  },
  updateDish(idRestaurante, prato) {
  return api.post(`/addPrato/${idRestaurante}`, prato);
},

removeDish(idRestaurante, idPrato) {
  return api.delete(`/removePrato/${idRestaurante}/${idPrato}`);
},

postReview(payload) {
  return api.post('/avaliacoes', payload)
},

getReviewsByRestaurant(id) {
  return api.get(`/avaliacao/restaurante/${id}`)
}

}
