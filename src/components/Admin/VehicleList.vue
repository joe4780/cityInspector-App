<template>
  <div>
    <h1>Vehicle List</h1>
    <router-link to="/Admin/AddVehicle">Add Vehicle</router-link>
    <ul>
      <li v-for="vehicle in vehicles" :key="vehicle.id">
        {{ vehicle.registration_number }} - {{ vehicle.vehicle_type }}
        <router-link :to="`/Admin/EditVehicles/${vehicle.id}`">Edit</router-link>
      </li>
    </ul>
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
</style>
