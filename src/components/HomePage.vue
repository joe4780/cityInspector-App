<template>
  <div class="home-page">
    <header class="header">
      <h1 class="title">City Inspector</h1>
      <p class="subtitle">Your go-to solution for city inspection</p>
      <p class="description">Join us in upholding standards and serving our communities with excellence.</p>
      <div class="btn-group">
        <router-link to="/User_Login" class="btn btn-primary">Login</router-link>
        <router-link to="/User_Register" class="btn btn-secondary">Register</router-link>
      </div>
    </header>
    <div class="background-animation"></div>
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
  font-family: 'Roboto', Arial, sans-serif;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #fff;
  text-align: center;
  padding: 1rem;
  overflow: hidden;
}

.header {
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 1s both;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: fadeInUp 1s ease-out 1.5s both;
}

.btn {
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, #1a2a6c, #cc7171, #fdbb2d);
  background-size: 600% 600%;
  animation: gradientAnimation 10s ease infinite;
  z-index: 0;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>