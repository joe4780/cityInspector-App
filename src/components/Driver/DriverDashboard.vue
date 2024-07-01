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
        
        <!-- Notification list area -->
        <div class="notification-list">
          <!-- Display notifications -->
          <div class="notification" v-for="(notification, index) in notifications" :key="index" @click="openNotification(notification)">
            <font-awesome-icon :icon="notification.icon" />
            <div class="notification-content">
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
            </div>
          </div>
        </div>

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

    <!-- Notification Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ currentNotification.title }}</h2>
        <p>{{ currentNotification.message }}</p>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
  name: 'DriverDashboard',
  data() {
    return {
      trips: [],
      notifications: [],
      showModal: false,
      currentNotification: {
        title: '',
        message: ''
      }
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
    initializeMessaging() {
      const messaging = getMessaging();
      
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.addNotification(payload.notification.title, payload.notification.body);
      });
    },
    addNotification(title, message) {
      console.log('Adding notification:', title, message);
      this.notifications.push({
        title: title,
        message: message,
        icon: ['fas', 'info-circle'] 
      });
    },
    openNotification(notification) {
      this.currentNotification = notification;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  created() {
    this.fetchTrips();
    this.initializeMessaging();
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
  margin-right: 0.5rem;
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

.notification-list {
  margin-bottom: 1rem;
}

.stats-container {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 2rem; 
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
  text-align: center; 
  padding: 1rem; 
}

.stats-details {
  margin-left: 0.5rem;
}

.stats-number {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.5rem; 
}

.stats-details h2 {
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
}

/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 20px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
