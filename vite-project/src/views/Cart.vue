<template>
  <div class="cart">

    <h1>Your Cart</h1>

    <div v-if="items.length === 0">
      <p>Your cart is empty 🛒</p>
      <RouterLink to="/products">Go Shopping</RouterLink>
    </div>

    <div v-else>

      <div v-for="item in items" :key="item.id" class="item">
        <img :src="item.image" class="img" />

        <div class="info">
          <h3>{{ item.title }}</h3>
          <p>${{ item.price }}</p>

          <div class="qty">
            <button @click="decrease(item)">-</button>
            <span>{{ item.qty }}</span>
            <button @click="increase(item)">+</button>
          </div>

          <button @click="remove(item.id)" class="remove">
            Remove
          </button>
        </div>
      </div>

      <hr />

      <h2>Total: ${{ total.toFixed(2) }}</h2>

      <!-- 🔥 THIS IS THE IMPORTANT PART -->
      <RouterLink to="/checkout">
        <button class="checkout-btn">
          Proceed to Checkout 💳
        </button>
      </RouterLink>

    </div>

  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { items, total } = storeToRefs(cart)

function remove(id) {
  cart.remove(id)
}

function increase(item) {
  item.qty++
  cart.save()
}

function decrease(item) {
  if (item.qty > 1) {
    item.qty--
    cart.save()
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
}

.item {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.qty button {
  padding: 5px;
}

.remove {
  background: red;
  color: white;
  border: none;
  padding: 5px;
}

.checkout-btn {
  margin-top: 20px;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  cursor: pointer;
}
</style>