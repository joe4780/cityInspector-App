<template>
  <div class="admin-dashboard">
    <nav>
      <router-link to="/Admin/AddVehicles">Manage Vehicles</router-link>
      <router-link to="/Admin/UserManagement">User Management</router-link>
      <router-link to="/User_Profile">Profile</router-link>
      <router-link to="/Admin/VehicleList">List of Vehicles</router-link>
    </nav>

    <main>
      <h1>Admin Dashboard</h1>
      <router-view></router-view> <!-- Nested views will render here -->
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100%;
}

nav {
  width: 200px;
  background-color: white;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

nav a {
  display: block;
  color: #2c3e50;
  margin: 0.5rem 0;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
