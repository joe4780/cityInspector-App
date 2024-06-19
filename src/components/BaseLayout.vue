<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/admin/dashboard">Admin Dashboard</router-link>
      <router-link to="/coordinator/dashboard">Coordinator Dashboard</router-link>
      <router-link to="/officer/dashboard">Officer Dashboard</router-link>
      <router-link to="/driver/dashboard">Driver Dashboard</router-link>
      <router-link to="/traffic/dashboard">Traffic Dashboard</router-link>
      <router-link to="/profile" class="profile-button">Profile</router-link>
      <button @click="logout">Logout</button>
    </nav>

    <main>
      <slot></slot>
    </main>

    <footer class="footer">
      <p>&copy; 2024 City Inspector. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',
  methods: {
    logout() {
      // Clear user token and redirect to login
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: #2c3e50;
  margin: 0 1rem;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar button {
  background-color: #ff4b5c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navbar button:hover {
  background-color: #ff1c3c;
}

.footer {
  background-color: white;
  color: #2c3e50;
  text-align: center;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

main {
  padding: 2rem;
  min-height: calc(100vh - 100px); /* Adjust based on header and footer height */
}

/* Profile link styling */
.profile-link {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.profile-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-button:hover {
  background-color: #2980b9;
}
</style>
