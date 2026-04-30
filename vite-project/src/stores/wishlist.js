import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || []
  }),

  actions: {
    toggle(product) {
      const exists = this.items.find(i => i.id === product.id)

      if (exists) {
        this.items = this.items.filter(i => i.id !== product.id)
      } else {
        this.items.push(product)
      }

      this.save()
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.save()
    },

    save() {
      localStorage.setItem('wishlist', JSON.stringify(this.items))
    }
  }
})