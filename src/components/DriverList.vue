<template>
  <div>
    <h1>Driver List</h1>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Vehicle Type</th>
          <th>Vehicle Registration Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(driver, index) in drivers" :key="index">
          <td>{{ driver.fullName }}</td>
          <td>{{ driver.phoneNumber }}</td>
          <td>{{ driver.vehicleType }}</td>
          <td>{{ driver.vehicleRegistrationNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export default {
  name: 'DriverList',
  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    async fetchDrivers() {
      const db = getFirestore();
      try {
        // Query Drivers collection
        const q = query(collection(db, "Drivers"));
        const querySnapshot = await getDocs(q);
        
        // Map retrieved documents to desired format
        this.drivers = querySnapshot.docs.map(doc => ({
          fullName: doc.data().fullName,
          phoneNumber: doc.data().phoneNumber,
          vehicleType: doc.data().vehicleType,
          vehicleRegistrationNumber: doc.data().vehicleRegistrationNumber,
        }));
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
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
</style>
