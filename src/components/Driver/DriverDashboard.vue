<template>
  <div class="driver-dashboard">
    <nav>
      <router-link to="/Driver/TripDetails">Log New Trip</router-link>
      <router-link to="/Driver_History">View Approval History</router-link>
      <router-link to="/User_Profile">Profile</router-link>
    </nav>
    <main>
      <h1>Driver Dashboard</h1>
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
    </main>
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
.driver-dashboard {
  display: flex;
  flex-direction: row;
}

nav {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
}

nav a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  background-color: #eee;
}

main {
  flex: 1;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
