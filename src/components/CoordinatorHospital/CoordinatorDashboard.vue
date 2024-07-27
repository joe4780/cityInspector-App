<template>
<div class="coordinator-dashboard">
  <nav>
    <router-link to="/PendingRequest" class="nav-link">
      <font-awesome-icon icon="clock" /> Pending Requests
    </router-link>
    <router-link to="/DriverApproval" class="nav-link">
      <font-awesome-icon icon="user-check" /> Approve Drivers
    </router-link>
    <router-link to="/Driver_History" class="nav-link">
      <font-awesome-icon icon="history" /> Approval History
    </router-link>
    <router-link to="/ManageIncidents" class="nav-link">
      <font-awesome-icon icon="exclamation-triangle" /> Manage Incidents
    </router-link>
  </nav>

  <main>
    <h1>
      <font-awesome-icon icon="user-tie" /> Coordinator Dashboard
    </h1>
    <div class="stats-container">
      <StatisticsCard icon="clock" title="New Trips" :count="newTrips.length" />
      <template v-if="isLoading">
        <p>Loading ambulance incidents...</p>
      </template>
      <template v-else-if="ambulanceIncidents">
        <StatisticsCard icon="exclamation-triangle" title="Ambulance Incidents" :count="ambulanceIncidents" />
      </template>
    </div>
  </main>
</div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StatisticsCard from './StatisticsCard.vue';

export default {
  name: 'CoordinatorDashboard',
  components: {
    FontAwesomeIcon,
    StatisticsCard,
  },
  data() {
    return {
      newTrips: [],
      ambulanceIncidents: 0,
      isLoading: true,
    };
  },
  methods: {
    async fetchNewTrips() {
      const db = getFirestore();
      try {
        const tripsQuery = collection(db, "trips");
        const querySnapshot = await getDocs(tripsQuery);
        this.newTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch ambulance incidents count
        const ambulanceQuery = query(collection(db, "incidents"), where("Vehicle_Type", "==", "Ambulance"));
        const ambulanceSnapshot = await getDocs(ambulanceQuery);
        this.ambulanceIncidents = ambulanceSnapshot.size;
      } catch (error) {
        console.error('Error fetching new trips:', error);
      } finally {
        this.isLoading = false; // Set isLoading to false after data is fetched
      }
    },
  },
  created() {
    this.fetchNewTrips();
  },
};
</script>
<style scoped>
/* Dashboard container */
.coordinator-dashboard {
  display: flex;
  height: 100%;
}

/* Sidebar styles */
nav {
  width: 200px;
  background-color: #fff;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  margin: 1rem 0; /* Added more space between the links */
  text-decoration: none;
}

.nav-link:hover {
  color: #338ae2;
}

.nav-link .fa-icon {
  margin-right: 0.5rem; /* Space between the icon and the link text */
}

/* Main content area */
main {
  flex-grow: 1;
  padding: 2rem;
}

h1 {
  display: flex;
  align-items: center;
}

h1 .fa-icon {
  margin-right: 0.9rem; /* Space between the icon and the title */
}

.stats-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>