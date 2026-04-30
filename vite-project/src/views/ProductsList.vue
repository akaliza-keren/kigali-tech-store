<template>
  <div class="container">

    <h1>Products</h1>

    <div class="grid">

      <div v-for="product in products" :key="product.id" class="card">

        <!-- ❤️ Wishlist -->
        <button class="wish" @click="toggleWish(product)">
          ❤️
        </button>

        <!-- 🖼 IMAGE (FORCED SAFE RENDER) -->
        <img
          v-if="product.image"
          :src="product.image"
          alt="product image"
          class="img"
        />

        <!-- fallback ONLY if image missing -->
        <div v-else class="no-img">
          No Image
        </div>

        <!-- TITLE -->
        <h3 class="title">
          {{ product.title }}
        </h3>

        <!-- PRICE -->
        <p class="price">
          ${{ product.price }}
        </p>

        <!-- CART -->
        <button class="btn" @click="addToCart(product)">
          🛒 Add to Cart
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const { products } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})

function addToCart(product) {
  cartStore.add(product)
}

function toggleWish(product) {
  wishlistStore.toggle(product)
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  position: relative;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.wish {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
}

.img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  display: block;
  margin-bottom: 10px;
}

.no-img {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  color: #666;
}

.title {
  font-size: 16px;
  text-align: center;
}

.price {
  font-weight: bold;
  color: var(--primary);
  margin: 5px 0;
}

.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
}

.btn:hover {
  background: var(--secondary);
  color: black;
}
</style>