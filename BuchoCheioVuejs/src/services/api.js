import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

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
  getRestaurants() { return api.get('/restaurants') },
  getRestaurant(id) { return api.get(`/restaurants/${id}`) },
  createRestaurant(payload) { return api.post('/restaurants', payload) },
  updateMenu(id, menuPayload) { return api.put(`/restaurants/${id}/menu`, menuPayload) },
  postReview(id, reviewPayload) { return api.post(`/restaurants/${id}/reviews`, reviewPayload) },
  getReports() { return api.get('/reports') }
}
