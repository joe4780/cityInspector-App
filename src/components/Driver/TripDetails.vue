<template>
  <div>
    <h1>Log New Trip</h1>
    <form @submit.prevent="logTrip">
      <div>
        <label for="vehicleId">Vehicle ID</label>
        <input type="text" id="vehicleId" v-model="trip.vehicleId" required />
      </div>
      <div>
        <label for="destination">Destination</label>
        <input type="text" id="destination" v-model="trip.destination" required />
      </div>
      <div>
        <label for="purpose">Purpose</label>
        <input type="text" id="purpose" v-model="trip.purpose" required />
      </div>
      <button type="submit">Log Trip</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: 'TripDetails',
  data() {
    return {
      trip: {
        vehicleId: '',
        destination: '',
        purpose: '',
      },
    };
  },
  methods: {
    async logTrip() {
      const db = getFirestore();
      try {
        await addDoc(collection(db, "trips"), this.trip);
        this.$router.push('/driver/dashboard');
      } catch (error) {
        console.error('Error logging trip:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
