import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/buchoCheio'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// example interceptors (optional)
api.interceptors.response.use(
  res => res,
  err => {
    // you can centralize error handling here
    return Promise.reject(err)
  }
)

export default {
  getRestaurants() { return api.get('/restaurantes') },
  getRestaurant(id) { return api.get(`/findRestauranteById/${id}`) },
  createRestaurant(payload) { return api.post('/cadastrarRestaurante', payload) },
  updateMenu(menuPayload) { return api.put(`buchoCheio/addPrato/${id}`, menuPayload) },
  postReview(reviewPayload) { return api.post('/avaliacao', reviewPayload) },
  getReports() { return api.get('/buildRelatorio') }
}
