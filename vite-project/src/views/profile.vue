<template>
  <div class="profile">

    <h1>My Profile</h1>

    <h2>👤 User Info</h2>
    <p>Name: Demo User</p>

    <h2>🧾 Last Order</h2>

    <div v-if="order">
      <p>Total: ${{ order.total }}</p>

      <div v-for="item in order.items" :key="item.id">
        {{ item.title }} - {{ item.qty }} x ${{ item.price }}
      </div>
    </div>

    <div v-else>
      <p>No orders yet.</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const order = ref(JSON.parse(localStorage.getItem('lastOrder')))
</script>

<style scoped>
.profile {
  padding: 20px;
}
</style>