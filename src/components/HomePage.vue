<template>
  <div class="home-page">
    <header class="header">
      <h1>City Inspector</h1>
      <p>Your go-to solution for city inspection</p>
      <p>Join us in upholding standards and serving our communities with excellence.</p>
      <div class="btn-group">
        <router-link to="/User_Login" class="btn">Login</router-link>
        <router-link to="/User_Register" class="btn">Register</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, rgb(3, 1, 10), rgb(22, 22, 22));
  color: #fff;
  text-align: center;
  padding: 1rem;
}

.header {
  margin-top: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  background-color: #3498db;
  color: #fff;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
