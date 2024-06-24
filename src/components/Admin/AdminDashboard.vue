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
      </nav>

      <main>
        <h1><font-awesome-icon icon="user-shield" /> Admin Dashboard</h1>
        <router-view></router-view>
      </main>
    </div>
  </BaseLayout>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

export default {
  name: 'AdminDashboard',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();

    return {
      router,
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
}

.nav-link:hover {
  text-decoration: underline;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
