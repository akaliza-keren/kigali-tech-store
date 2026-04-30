import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  actions: {
    login(email) {
      this.user = { email }
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})