<template>
  <div>
    <h1>Driver List</h1>
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Vehicle Type</th> <!-- New column for vehicle type -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.id }}</td>
          <td>{{ driver.username }}</td>
          <td>{{ driver.fullName }}</td>
          <td>{{ driver.phoneNumber }}</td>
          <td>{{ driver.vehicleType }}</td> <!-- Display vehicle type -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
