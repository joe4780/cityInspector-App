<template>
  <BaseLayout>
    <div class="admin-dashboard">
      <nav>
        <!-- Sidebar content -->
        <div class="nav-item">
          <router-link to="/Admin/AddVehicle" class="nav-link">
            <font-awesome-icon icon="plus-circle" /> Add Vehicle
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Admin/UserManagement" class="nav-link">
            <font-awesome-icon icon="user-cog" /> User Management
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Admin/EditVehicle" class="nav-link">
            <font-awesome-icon icon="edit" /> Update Vehicle
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Admin/VehicleList" class="nav-link">
            <font-awesome-icon icon="list" /> List of Vehicles
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/Admin/AddDriver" class="nav-link">
            <font-awesome-icon icon="user-cog" /> Add driver
          </router-link>
        </div>
      </nav>

      <main>
        <h1><font-awesome-icon icon="user-shield" /> Admin Dashboard</h1>
        <div class="stats-container">
          <div class="stat-item" v-for="stat in userStats" :key="stat.type">
            <font-awesome-icon :icon="stat.icon" class="stat-icon" />
            <div class="stat-info">
              <h2>{{ stat.count }}</h2>
              <p>{{ stat.label }}</p>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { ref, onMounted } from 'vue';

export default {
  name: 'AdminDashboard',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();
    const userStats = ref([
      { type: 'Driver', label: 'Drivers', icon: 'user-tie', count: 0 },
      { type: 'CoordinatorHospital', label: 'Coordinators (Hospital)', icon: 'hospital-user', count: 0 },
      { type: 'OfficerPolicestation', label: 'Officers (Policestation)', icon: 'user-shield', count: 0 },
      { type: 'TrafficPolice', label: 'Traffic Police', icon: 'traffic-light', count: 0 }
    ]);

    const fetchUserCounts = async () => {
      const db = getFirestore();
      for (const stat of userStats.value) {
        const q = query(collection(db, "users"), where("role", "==", stat.type));
        const querySnapshot = await getDocs(q);
        stat.count = querySnapshot.size;
      }
    };

    onMounted(() => {
      fetchUserCounts();
    });

    return {
      router,
      userStats,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100%;
}

nav {
  width: 200px;
  background-color: white;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.nav-item {
  margin-bottom: 10px; /* Adjust spacing between navigation items */
}

.nav-link {
  display: block;
  color: #2c3e50;
  text-decoration: none;
  margin: 0.5rem 0;
}

.nav-link:hover {
  color: #5193d4;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1rem;
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.stat-info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.stat-info p {
  margin: 0;
  color: #666;
}
</style>
