<template>
  <div class="auth">
    <h2>Register</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="register">Register</button>

    <p>
      Already have an account?
      <RouterLink to="/login">Login</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const auth = useAuthStore()
const router = useRouter()

function register() {
  if (!email.value || !password.value) {
    alert('Fill all fields')
    return
  }

  auth.login(email.value) // fake register = login
  router.push('/')
}
</script>

<style scoped>
.auth {
  max-width: 300px;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>