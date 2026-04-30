<template>
  <div class="container" v-if="product">
    <div class="layout">
      <img :src="product.image" class="img" />

      <div class="info">
        <h2>{{ product.title }}</h2>
        <p class="price">${{ product.price }}</p>
        <p>{{ product.description }}</p>

        <button class="btn" @click="addToCart(product)">
          🛒 Add to Cart
        </button>

        <button class="wish" @click="toggleWish(product)">
          ❤️ Wishlist
        </button>
      </div>
    </div>
  </div>

  <p v-else>Loading...</p>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const product = ref(null)

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

onMounted(async () => {
  const res = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
  product.value = res.data
})

function addToCart(p) {
  cartStore.add(p)
}

function toggleWish(p) {
  wishlistStore.toggle(p)
}
</script>

<style scoped>
.container { padding: 20px; }
.layout { display: flex; gap: 30px; }
.img { width: 250px; height: 250px; object-fit: contain; }
.price { font-weight: bold; color: #2ecc71; }
.btn, .wish {
  margin-top: 10px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn { background: #2ecc71; color: white; }
.wish { background: #eee; }
</style>