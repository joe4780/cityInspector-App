<template>
  <div>
    <h1>Officer Dashboard</h1>
    <router-link to="/Officer/pendingApprovals">View Pending Approvals</router-link>
    <router-link to="/DriverApproval">Approve Drivers</router-link>
    <router-link to="/Driver_History">View Approval History</router-link> 
    <router-link to="/User_Profile">Profile</router-link><!-- Add this line -->
    <!-- Add more dashboard components or statistics here -->
  </div>
</template>

<script>
export default {
  name: 'OfficerDashboard',
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
