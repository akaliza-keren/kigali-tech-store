<template>
  <div class="container">

    <h1>Wishlist ❤️</h1>

    <p v-if="items.length === 0">
      Your wishlist is empty 😐
    </p>

    <div class="grid">

      <div v-for="item in items" :key="item.id" class="card">

        <img :src="item.image" class="img" />

        <h3>{{ item.title }}</h3>

        <p class="price">${{ item.price }}</p>

        <button class="btn" @click="remove(item.id)">
          Remove
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useWishlistStore } from '../stores/wishlist'
import { storeToRefs } from 'pinia'

const wishlistStore = useWishlistStore()
const { items } = storeToRefs(wishlistStore)

function remove(id) {
  wishlistStore.remove(id)
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
  background: white;
  padding: 16px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.img {
  width: 100%;
  height: 160px;
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
  background: red;
  color: white;
  cursor: pointer;
}
</style>