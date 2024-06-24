<template>
  <div>
    <h1>Vehicles List</h1>
    <table>
      <thead>
        <tr>
          <th>Registration Number</th>
          <th>Vehicle Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>{{ vehicle.registration_number }}</td>
          <td>{{ vehicle.vehicle_type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'VehicleList',
  data() {
    return {
      vehicles: [],
    };
  },
  created() {
    this.fetchVehicles();
  },
  methods: {
    async fetchVehicles() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        this.vehicles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
