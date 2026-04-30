<template>
  <div class="not-found">

    <h1>404</h1>
    <h2>Page Not Found</h2>

    <p>This page does not exist.</p>

    <RouterLink to="/">
      <button>Go Home</button>
    </RouterLink>

  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 60px;
}

button {
  padding: 10px;
  background: black;
  color: white;
  border: none;
}
</style>