<template>
  <nav class="nav">

    <h2 class="logo">Kigali Tech Store</h2>

    <div class="links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/cart">Cart ({{ cartCount }})</RouterLink>
      <RouterLink to="/wishlist">Wishlist ❤️</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>

      <!-- AUTH PART -->
      <RouterLink v-if="!auth.user" to="/login">Login</RouterLink>

      <span v-else class="user">
        {{ auth.user.email }}
        <button @click="logout" class="logout-btn">Logout</button>
      </span>
    </div>

  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const cart = useCartStore()
const auth = useAuthStore()

const { items } = storeToRefs(cart)

const cartCount = computed(() =>
  items.value.reduce((sum, i) => sum + i.qty, 0)
)

function logout() {
  auth.logout()
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  padding: 15px;
  color: white;
}

.links a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.links a:hover {
  color: var(--secondary);
}

.logo {
  font-weight: bold;
}

.user {
  margin-left: 10px;
}

.logout-btn {
  margin-left: 10px;
  padding: 5px 8px;
  border: none;
  cursor: pointer;
  background: white;
  color: black;
  border-radius: 5px;
}
</style>