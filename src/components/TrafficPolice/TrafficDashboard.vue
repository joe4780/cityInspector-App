<template>
  <div>
    <h1>Traffic Police Dashboard</h1>
    <router-link to="/TrafficPolice/DriverVerification">Verify Driver</router-link>
    <router-link to="/User_Profile">Profile</router-link>

    <!-- Example data fetched from Firestore -->
    <div v-if="verifications.length">
      <h2>Pending Verifications</h2>
      <ul>
        <li v-for="verification in verifications" :key="verification.id">{{ verification.details }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'TrafficDashboard',
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
/* Add relevant styling here */
</style>
