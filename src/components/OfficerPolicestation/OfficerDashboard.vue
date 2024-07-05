<template>
  <BaseLayout>
    <div class="officer-dashboard">
      <!-- Sidebar navigation -->
      <nav>
        <div class="nav-item">
          <router-link to="/PendingRequest" class="nav-link">
            <font-awesome-icon icon="clock" />New Requests
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/officerDriverApproval" class="nav-link">
            <font-awesome-icon icon="user-check" />Approve Driver
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Driver_History" class="nav-link">
            <font-awesome-icon icon="history" />Approval History
          </router-link>
        </div>
      </nav>

      <!-- Main content area -->
      <main>
        <h1>
          <font-awesome-icon icon="user-shield" /> Officer Dashboard
        </h1>

        <!-- Rounded container for trips count -->
        <div class="stats-container">
          <div class="statistics-card">
            <font-awesome-icon icon="car" class="statistics-icon" />
            <div class="statistics-info">
              <h3>New Trips</h3>
              <p>{{ tripsCount }}</p>
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
import { ref, onMounted } from 'vue';

export default {
  name: 'OfficerDashboard',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const tripsCount = ref(0); // Initialize trips count

    const fetchTripsCount = async () => {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "trips"));
        tripsCount.value = querySnapshot.size; // Set the number of trips
      } catch (error) {
        console.error('Error fetching trips count:', error);
      }
    };

    onMounted(() => {
      fetchTripsCount();
    });

    return {
      tripsCount,
    };
  },
};
</script>

<style scoped>
.officer-dashboard {
  display: flex;
  height: 100%;
}

nav {
  width: 200px;
  background-color: #fff;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.nav-item {
  margin-bottom: 10px; /* Adjust spacing between navigation items */
}

.nav-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  margin: 1rem 0; /* Added more space between the links */
  text-decoration: none;
}

.nav-link:hover {
  color: #79bbcf;
}

.nav-link .fa-icon {
  margin-right: 0.6rem; /* Space between the icon and the link text */
}

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
  justify-content: left; /* Center align the stats container */
  margin-top: 2rem;
}

.statistics-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #0b447e;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.statistics-icon {
  font-size: 2rem;
  margin-right: 0.5rem; /* Space between the icon and the text */
}

.statistics-info {
  text-align: center;
}

.statistics-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.statistics-info p {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
