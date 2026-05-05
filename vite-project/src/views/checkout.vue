<template>
  <div class="checkout">

    <h1>Checkout</h1>

    <!-- CUSTOMER INFO -->
    <div class="form">
      <input v-model="name" placeholder="Full Name" />
      <input v-model="address" placeholder="Address" />
    </div>

    <!-- ORDER SUMMARY -->
    <div class="summary">
      <div v-for="item in items" :key="item.id" class="item">
        <span>{{ item.title }}</span>
        <span>{{ item.qty }} x ${{ item.price }}</span>
      </div>

      <h3>Total: ${{ total.toFixed(2) }}</h3>
    </div>

    <!-- STRIPE CARD -->
    <div id="card-element" class="card-box"></div>

    <!-- ERROR MESSAGE -->
    <div v-if="stripeError" class="error-message">
      ⚠️ {{ stripeError }}
    </div>

    <!-- PAY BUTTON -->
    <button @click="pay" :disabled="!isStripeReady" class="btn">
      {{ isStripeReady ? '🟢 Pay Now' : '⏳ Loading Stripe...' }}
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

const name = ref('')
const address = ref('')
const isStripeReady = ref(false)
const stripeError = ref('')

const cartStore = useCartStore()
const { items, total } = storeToRefs(cartStore)

const router = useRouter()

let stripe = null
let cardElement = null

// INIT STRIPE
onMounted(async () => {
  try {
    stripe = await loadStripe('pk_test_51TRRbY45pI4aCRB84ot3KhpeiWdJ4yfygtiFqtBoNyLsftYJWa2FwEKzf3FvUuuOPuHq2czghrLPyUashIBmbMrx00qAGIfPJB')

    if (!stripe) {
      stripeError.value = 'Failed to load Stripe. Please refresh the page.'
      return
    }

    const elements = stripe.elements()
    cardElement = elements.create('card')

    cardElement.mount('#card-element')
    isStripeReady.value = true
    console.log('✅ Stripe loaded successfully')
  } catch (error) {
    stripeError.value = 'Error loading Stripe: ' + error.message
    console.error('❌ Stripe error:', error)
  }
})

// PAY FUNCTION
async function pay() {
  console.log("PAY BUTTON CLICKED")

  if (!name.value || !address.value) {
    alert('Please fill all fields')
    return
  }

  if (!isStripeReady.value) {
    alert('Stripe is still loading. Please wait...')
    return
  }

  try {
    // 1. CREATE PAYMENT INTENT (backend)
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
    const res = await fetch(`${serverUrl}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total.value
      })
    })

    const data = await res.json()

    if (!data.clientSecret) {
      alert('Payment failed: no client secret')
      return
    }

    // 2. CONFIRM PAYMENT
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement
      }
    })

    if (result.error) {
      alert(result.error.message)
      return
    }

    // 3. SUCCESS
    if (result.paymentIntent.status === 'succeeded') {

      alert('Payment successful 🎉')

      localStorage.setItem('lastOrder', JSON.stringify({
        items: items.value,
        total: total.value,
        customer: {
          name: name.value,
          address: address.value
        }
      }))

      cartStore.items = []
      cartStore.save?.()

      router.push('/success')
    }

  } catch (err) {
    console.log(err)
    alert('Payment error occurred')
  }
}
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
}

.summary {
  margin-bottom: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-box {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.btn {
  background: #d62828;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
}

.btn:hover:not(:disabled) {
  background: #fcbf49;
  color: black;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  background: #ffe0e0;
  border: 1px solid #d62828;
  color: #d62828;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-weight: bold;
}
</style>