<template>
  <div>
    <h1>Driver Verification</h1>
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Verification Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.id }}</td>
          <td>{{ driver.verificationStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'DriverVerification',
  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    async fetchDrivers() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "drivers"));
        this.drivers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    },
  },
  created() {
    this.fetchDrivers();
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
