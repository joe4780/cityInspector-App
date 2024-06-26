<template>
  <BaseLayout>
    <div class="driver-dashboard">
      <!-- Sidebar with links -->
      <nav>
        <router-link to="/Driver/TripDetails" class="nav-link">
          <font-awesome-icon icon="plus-circle" /> New Trip
        </router-link>
        <router-link to="/PendingRequest" class="nav-link">
          <font-awesome-icon icon="clock" /> My trips
        </router-link>
        <router-link to="/Driver_History" class="nav-link">
          <font-awesome-icon icon="history" /> Approval History
        </router-link>
      </nav>

      <!-- Main content area -->
      <main>
        <h1>
          <font-awesome-icon icon="user" /> Driver Dashboard
        </h1>
        
        <!-- Display trip stats -->
        <div class="stats-container">
          <div class="stats-card">
            <font-awesome-icon icon="car" title="My Trips" size="2x" />
            <div class="stats-details">
              <h2>My Trips</h2>
              <span class="stats-number">{{ trips.length }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

      try {
        const querySnapshot = await getDocs(collection(db, "trips"));

        const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
  height: 100%;
}

nav {
  width: 200px;
  background-color: rgb(240, 243, 248);
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  margin: 1rem 0;
  text-decoration: none;
}

.nav-link:hover {
  color: #3498db;
}

.nav-link .fa-icon {
  margin-right: 1.5rem;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

h1 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h1 .fa-icon {
  margin-right: 1.5rem;
}

.stats-container {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 2rem; /* Adjust this value to set the spacing below the title */
}

.stats-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center the content */
  padding: 1rem; /* Add padding if needed */
}

.stats-details {
  margin-left: 0.5rem;
}

.stats-number {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.5rem; /* Adjust the spacing between the icon and the number */
}

.stats-details h2 {
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
}
</style>
