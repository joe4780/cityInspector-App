<template>
  <div>
    <h1>Driver Verification</h1>
    <table>
      <thead>
        <tr>
          <th>Driver Name</th>
          <th>Vehicle Registration Number</th>
          <th>Verification Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.name }}</td>
          <td>{{ driver.vehicleRegistrationNumber }}</td>
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
/* Add your desired styling for the table here (optional) */

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
