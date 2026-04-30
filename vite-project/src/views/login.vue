<template>
  <div class="auth">
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login">Login</button>

    <p>
      No account?
      <RouterLink to="/register">Register</RouterLink>
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

function login() {
  if (!email.value || !password.value) {
    alert('Fill all fields')
    return
  }

  auth.login(email.value)

  router.push('/') // go home after login
}
</script>

<style scoped>
.auth {
  max-width: 300px;
  margin: 100px auto; /* push it down so you SEE it */
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 10px;
}

button {
  padding: 10px;
  background: #2ecc71;
  color: white;
  border: none;
}
</style>