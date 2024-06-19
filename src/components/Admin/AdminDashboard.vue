<template>
  <div>
    <h1>Admin Dashboard</h1>
    <nav>
      <router-link to="/Admin/AddVehicles">Manage Vehicles</router-link>
      <router-link to="/Admin/UserManagement">User Management</router-link>
      <router-link to="/UserProfile">Profile</router-link>
      <router-link to="/Admin/VehicleList">List of vehicles</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
};
</script>

<style scoped>
/* Add your styles here */
</style>
