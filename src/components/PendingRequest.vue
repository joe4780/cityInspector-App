<template>
  <div>
    <h1>Trips</h1>
    <table>
      <thead>
        <tr>
          <th>Vehicle Registration Number</th>
          <th>Destination</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <td>{{ trip.vehicleRegistrationNumber }}</td>
          <td>{{ trip.destination }}</td>
          <td>{{ trip.purpose }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'NewTrips',
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
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
