import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {

  const products = ref([])

  async function fetchProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products')

      if (!res.ok) {
        console.log('Server error:', res.status)

        // 🔥 retry instead of dying
        setTimeout(fetchProducts, 1000)
        return
      }

      const data = await res.json()

      console.log('PRODUCTS LOADED:', data)

      products.value = data

    } catch (err) {
      console.log('FETCH ERROR:', err)

      // 🔥 retry on network failure too
      setTimeout(fetchProducts, 1000)
    }
  }

  return {
    products,
    fetchProducts
  }
})