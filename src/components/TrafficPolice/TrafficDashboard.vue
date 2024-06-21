<template>
  <div class="traffic-police-dashboard">
    <nav>
      <router-link to="/TrafficPolice/DriverVerification">Verify Driver</router-link>
      <router-link to="/User_Profile">Profile</router-link>
    </nav>

    <main>
      <h1>Traffic Police Dashboard</h1>
      <div v-if="verifications.length">
        <h2>Pending Verifications</h2>
        <ul>
          <li v-for="verification in verifications" :key="verification.id">{{ verification.details }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'TrafficPoliceDashboard',
  data() {
    return {
      verifications: [],
    };
  },
  methods: {
    async fetchVerifications() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "pending_verifications"));
        this.verifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching verifications:', error);
      }
    },
  },
  created() {
    this.fetchVerifications();
  },
};
</script>

<style scoped>
/* Dashboard container */
.traffic-police-dashboard {
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
