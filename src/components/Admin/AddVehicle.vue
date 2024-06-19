<template>
  <div>
    <h1>Add Vehicle</h1>
    <form @submit.prevent="addVehicle">
      <div>
        <label for="registration_number">Registration Number:</label>
        <input type="text" v-model="vehicle.registration_number" required />
      </div>
      <div>
        <label for="vehicle_type">Vehicle Type:</label>
        <input type="text" v-model="vehicle.vehicle_type" required />
      </div>
      <div>
        <label for="current_mileage">Current Mileage:</label>
        <input type="number" v-model="vehicle.current_mileage" required />
      </div>
      <button type="submit">Add Vehicle</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: 'AddVehicle',
  data() {
    return {
      vehicle: {
        registration_number: '',
        vehicle_type: '',
        current_mileage: '',
      },
    };
  },
  methods: {
    async addVehicle() {
      const db = getFirestore();

      try {
        await addDoc(collection(db, 'vehicles'), this.vehicle);
        this.$router.push('/Admin/AddVehicles');
      } catch (error) {
        console.error('Error adding vehicle:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
