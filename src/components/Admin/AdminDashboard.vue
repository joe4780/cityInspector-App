<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <nav>
        <router-link to="/Admin/AddVehicles">Manage Vehicles</router-link>
        <router-link to="/Admin/UserManagement">User Management</router-link>
        <router-link to="/User_Profile">Profile</router-link>
        <router-link to="/Admin/VehicleList">List of Vehicles</router-link>
      </nav>
      <div class="sidebar-footer">
        <router-link to="/User_Profile">Profile</router-link>
        <button @click="logout">Logout</button>
      </div>
    </aside>
    <main class="main-content">
      <h1>Admin Dashboard</h1>
      <router-view></router-view> <!-- Nested views will render here -->
    </main>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'AdminDashboard',
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
.admin-dashboard {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: white;
  padding: 1rem;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.sidebar nav {
  flex-grow: 1;
}

.sidebar nav a {
  display: block;
  color: #2c3e50;
  margin: 0.5rem 0;
  text-decoration: none;
}

.sidebar nav a:hover {
  text-decoration: underline;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-footer a,
.sidebar-footer button {
  display: block;
  margin: 0.5rem 0;
  text-decoration: none;
  color: white;
  background-color: #3498db;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-footer button {
  background-color: #ff4b5c;
}

.sidebar-footer a:hover,
.sidebar-footer button:hover {
  background-color: #2980b9;
}

.sidebar-footer button:hover {
  background-color: #ff1c3c;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
}
</style>
