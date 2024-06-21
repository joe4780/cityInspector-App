<template>
  <div class="coordinator-dashboard">
    <!-- Sidebar with links -->
    <nav>
      <router-link to="/PendingRequest">View Pending Requests</router-link>
      <router-link to="/DriverApproval">Approve Drivers</router-link>
      <router-link to="/Driver_History">View Approval History</router-link>
      <router-link to="/User_Profile">Profile</router-link>
    </nav>

    <!-- Main content area -->
    <main>
      <h1>Coordinator Dashboard</h1>
      <div v-if="requests.length">
        <h2>Pending Requests</h2>
        <ul>
          <li v-for="request in requests" :key="request.id">{{ request.details }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'CoordinatorDashboard',
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    async fetchRequests() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "pending_requests"));
        this.requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    },
  },
  created() {
    this.fetchRequests();
  },
};
</script>

<style scoped>
/* Dashboard container */
.coordinator-dashboard {
  display: flex;
  height: 100%;
}

/* Sidebar styles */
nav {
  width: 200px;
  background-color: #fff;
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

/* Main content area */
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
