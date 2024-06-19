<template>
  <div>
    <h1>Driver Dashboard</h1>
    <router-link to="/driver/tripDetails">Log New Trip</router-link>
    <router-link to="/history">View Approval History</router-link>
    <router-link to="/profile">Profile</router-link>
    <table>
      <thead>
        <tr>
          <th>Trip ID</th>
          <th>Vehicle ID</th>
          <th>Destination</th>
          <th>Purpose</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <td>{{ trip.id }}</td>
          <td>{{ trip.vehicleId }}</td>
          <td>{{ trip.destination }}</td>
          <td>{{ trip.purpose }}</td>
          <td>{{ trip.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'DriverDashboard',
  data() {
    return {
      trips: [],
    };
  },
  methods: {
    async fetchTrips() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "trips"));
        this.trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    },
  },
  created() {
    this.fetchTrips();
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
