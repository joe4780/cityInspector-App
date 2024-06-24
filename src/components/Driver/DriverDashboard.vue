<template>
  <BaseLayout>
    <div class="driver-dashboard">
      <nav>
        <router-link to="/Driver/TripDetails" class="nav-link">
          <font-awesome-icon icon="plus-circle" /> New Trip
        </router-link>
        <router-link to="/Driver_History" class="nav-link">
          <font-awesome-icon icon="history" /> Approval History
        </router-link>
      </nav>
      <main>
        <h1>Driver Dashboard</h1>
        <h2>Trips</h2>
        <table v-if="trips.length > 0">
          <thead>
            <tr>
              <th>Vehicle Registration Number</th>
              <th>Vehicle Type</th>
              <th>Destination</th>
              <th>Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips" :key="trip.id">
              <td>{{ trip.vehicleRegistrationNumber }}</td>
              <td>{{ trip.vehicleType }}</td>
              <td>{{ trip.destination }}</td>
              <td>{{ trip.purpose }}</td>
              <td>{{ trip.status }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No trips found.</p>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { getAuth } from "firebase/auth"; // Assuming you are using Firebase Authentication

export default {
  components: {
    FontAwesomeIcon,
  },
  name: 'DriverDashboard',
  data() {
    return {
      trips: [],
    };
  },
  methods: {
    async fetchTrips() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error('No user is currently logged in');
        return;
      }

      try {
        const q = query(collection(db, "trips"), where("driverId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const trips = await Promise.all(querySnapshot.docs.map(async (tripDoc) => {
          const tripData = tripDoc.data();
          const vehicleDoc = await getDoc(doc(db, "vehicles", tripData.vehicleId));
          const vehicleData = vehicleDoc.exists() ? vehicleDoc.data() : {};

          console.log("Trip data:", tripData); // Added console log
          console.log("Vehicle data:", vehicleData); // Added console log

          return {
            id: tripDoc.id,
            ...tripData,
            vehicleRegistrationNumber: vehicleData.registrationNumber || 'N/A',
            vehicleType: vehicleData.vehicleType || 'N/A',
          };
        }));

        this.trips = trips;
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
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
