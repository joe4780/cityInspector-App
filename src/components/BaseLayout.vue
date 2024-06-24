<template>
  <div class="base-layout">
    <aside class="sidebar">
      <nav class="sidebar-nav">
        </nav>
      <div class="sidebar-footer">
        <router-link to="/User_Profile" class="profile-button">Profile</router-link>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </aside>

    <main class="main-content">
      <header class="app-header"> <h1 class="app-title">CityInspector</h1> </header>
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; 2024 City Inspector. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'BaseLayout',
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = async () => {
      await store.dispatch('logout');
      router.push('/');
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
/* Base styles for the layout */
.base-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: white;
  padding: 1rem;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
}

.sidebar-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Add spacing between buttons */
  margin-top: auto; /* Pushes the footer to the bottom */
}

.sidebar-footer a,
.sidebar-footer button {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer; /* Add cursor for buttons */
}

.sidebar-footer .profile-button {
  background-color: #3498db;
}

.sidebar-footer .profile-button:hover {
  background-color: #2980b9;
}

.sidebar-footer .logout-button {
  background-color: #ff4b5c;
  border: none;
}

.sidebar-footer .logout-button:hover {
  background-color: #ff1c3c;
}

.main-content {
  margin-left: 200px; /* Same as sidebar width */
  padding: 2rem;
  flex-grow: 1;
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
</style>
