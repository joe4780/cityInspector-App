<template>
  <div>
    <h1>Coordinator Dashboard</h1>
    <router-link to="/coordinator/pending">View Pending Requests</router-link>
    <router-link to="/driver/approval">Approve Drivers</router-link>
    <router-link to="/history">View Approval History</router-link> 
    <router-link to="/profile">Profile</router-link><!-- Add this line -->
    <!-- Add more dashboard components or statistics here -->
  </div>
</template>

<script>
export default {
  name: 'CoordinatorDashboard',
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
