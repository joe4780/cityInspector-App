<template>
  <div class="officer-dashboard">
    <nav>
      <router-link to="/PendingRequest">View Pending Requests</router-link>
      <router-link to="/DriverApproval">Approve Drivers</router-link>
      <router-link to="/Driver_History">View Approval History</router-link>
      <router-link to="/User_Profile">Profile</router-link>
    </nav>
    <main>
      <h1>Officer Dashboard</h1>
      <div v-if="approvals.length">
        <h2>Pending Approvals</h2>
        <ul>
          <li v-for="approval in approvals" :key="approval.id">{{ approval.details }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'OfficerDashboard',
  data() {
    return {
      approvals: [],
    };
  },
  methods: {
    async fetchApprovals() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "pending_approvals"));
        this.approvals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching approvals:', error);
      }
    },
  },
  created() {
    this.fetchApprovals();
  },
};
</script>

<style scoped>
.officer-dashboard {
  display: flex;
  flex-direction: row;
}

nav {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
}

nav a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  background-color: #eee;
}

main {
  flex: 1;
  padding: 20px;
}

/* Add styling for the list of pending approvals here (optional) */
</style>
