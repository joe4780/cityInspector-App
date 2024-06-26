<template>
  <BaseLayout>
    <div class="traffic-police-dashboard">
      <!-- Sidebar navigation -->
      <nav>
        <div class="nav-item">
          <router-link to="/Driver_History" class="nav-link">
            <font-awesome-icon icon="user-shield" /> Driver status
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/DriverList" class="nav-link">
            <font-awesome-icon icon="users" /> List of Drivers
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Admin/VehicleList" class="nav-link">
            <font-awesome-icon icon="car" /> List of Vehicles
          </router-link>
        </div>
      </nav>

      <!-- Main content area -->
      <main>
        <h1>
          <font-awesome-icon icon="traffic-light" /> Traffic Police Dashboard
        </h1>

        <!-- Circular containers for vehicles and drivers -->
        <div class="stats-container">
          <!-- Vehicles Statistics -->
          <div class="circular-stats">
            <div class="circle">
              <font-awesome-icon icon="car" class="stats-icon" />
              <div class="stats-details">
                <h2>{{ vehicleCount }}</h2>
                <p>Vehicles</p>
              </div>
            </div>
          </div>

          <!-- Drivers Statistics -->
          <div class="circular-stats">
            <div class="circle">
              <font-awesome-icon icon="users" class="stats-icon" />
              <div class="stats-details">
                <h2>{{ driverCount }}</h2>
                <p>Drivers</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Display pending verifications -->
        <div v-if="verifications.length">
          <h2>Pending Verifications</h2>
          <ul>
            <li v-for="verification in verifications" :key="verification.id">{{ verification.details }}</li>
          </ul>
        </div>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, onMounted } from 'vue';

export default {
  name: 'TrafficPoliceDashboard',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const verifications = ref([]);
    const vehicleCount = ref(0);
    const driverCount = ref(0);

    const fetchVerifications = async () => {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "pending_verifications"));
        verifications.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching verifications:', error);
      }
    };

    const fetchVehicleCount = async () => {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        vehicleCount.value = querySnapshot.size;
      } catch (error) {
        console.error('Error fetching vehicle count:', error);
      }
    };

    const fetchDriverCount = async () => {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "Drivers"));
        driverCount.value = querySnapshot.size;
      } catch (error) {
        console.error('Error fetching driver count:', error);
      }
    };

    onMounted(() => {
      fetchVerifications();
      fetchVehicleCount();
      fetchDriverCount();
    });

    return {
      verifications,
      vehicleCount,
      driverCount,
    };
  },
};
</script>

<style scoped>
/* Dashboard container */
.traffic-police-dashboard {
  display: flex;
  height: 100%;
  justify-content: space-between; /* Distribute content evenly with a gap */
  gap: 1cm;
}

/* Sidebar styles */
nav {
  width: 200px;
  background-color: #fff;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.nav-item {
  margin-bottom: 15px; /* Adjust spacing between navigation items */
}

.nav-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  margin: 0.5rem 0;
  text-decoration: none;
}

.nav-link:hover {
  color: #5095db;
}

.nav-link .fa-icon {
  margin-right: 1.5rem; /* Space between the icon and the link text */
}

/* Main content area */
main {
  flex-grow: 1;
  padding: 2rem;
}

h1 {
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
}

h1 .fa-icon {
  margin-right: 0.9rem; /* Space between the icon and the title */
}

.stats-container {
  display: flex;
  flex-direction: column; /* Display circles in a column */
  align-items: left; /* Center items horizontally */
  margin-top: 2rem;
}

.circular-stats {
  margin-bottom: 1.5rem; /* Adjust space between circles */
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  font-size: 1.5rem; /* Increase icon size */
  margin-bottom: 0.5rem;
}

.stats-details {
  text-align: center;
  margin-top: 0.5rem; 
  line-height: 0.07; 
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
