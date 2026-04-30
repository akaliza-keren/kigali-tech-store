<template>
  <div>

    <!-- HERO SECTION -->
    <section class="hero">
      <h1>Kigali Tech Store</h1>
      <p>Your one-stop shop for affordable gadgets in Kigali</p>
      <RouterLink to="/products" class="shop-btn">
        Shop Now
      </RouterLink>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="featured">
      <h2>Featured Products</h2>

      <div class="grid">
        <div v-for="product in products.slice(0, 4)" :key="product.id" class="card">

          <img :src="product.image" class="img" />

          <h3>{{ product.title }}</h3>

          <p class="price">${{ product.price }}</p>

          <button class="btn" @click="addToCart(product)">
            🛒 Add to Cart
          </button>

        </div>
      </div>

    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const cartStore = useCartStore()

const { products } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})

function addToCart(product) {
  cartStore.add(product)
}
</script>

<style scoped>

/* HERO */
.hero {
  background: linear-gradient(135deg, #5b0c6d, purple);
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 80px 20px;
}

.hero h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 20px;
}

.shop-btn {
  background: white;
  color: #2ecc71;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

/* FEATURED */
.featured {
  padding: 40px 20px;
}

.featured h2 {
  margin-bottom: 20px;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

/* CARD */
.card {
  background: white;
  padding: 15px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.price {
  font-weight: bold;
  color: #2ecc71;
  margin: 10px 0;
}

.btn {
  margin-top: auto;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #2ecc71;
  color: white;
  cursor: pointer;
}

</style>