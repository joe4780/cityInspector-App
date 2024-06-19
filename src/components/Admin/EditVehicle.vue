<template>
  <div>
    <h1>Edit Vehicle</h1>
    <form @submit.prevent="updateVehicle">
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
      <button type="submit">Update Vehicle</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'EditVehicle',
  data() {
    return {
      vehicle: {
        registration_number: '',
        vehicle_type: '',
        current_mileage: '',
      },
    };
  },
  created() {
    this.fetchVehicle();
  },
  methods: {
    async fetchVehicle() {
      const db = getFirestore();
      const vehicleId = this.$route.params.id;

      try {
        const docRef = doc(db, 'vehicles', vehicleId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          this.vehicle = docSnap.data();
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    },
    async updateVehicle() {
      const db = getFirestore();
      const vehicleId = this.$route.params.id;

      try {
        const docRef = doc(db, 'vehicles', vehicleId);
        await updateDoc(docRef, this.vehicle);
        this.$router.push('/admin/vehicles');
      } catch (error) {
        console.error('Error updating vehicle:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
