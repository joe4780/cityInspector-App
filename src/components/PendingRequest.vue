<template>
  <div>
    <h1>Pending Requests</h1>
    <table>
      <thead>
        <tr>
          <th>Vehicle Registration Number</th>
          <th>Destination</th>
          <th>Purpose</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <td>{{ trip.vehicleRegistrationNumber }}</td>
          <td>{{ trip.destination }}</td>
          <td>{{ trip.purpose }}</td>
          <td>
            <font-awesome-icon icon="trash-alt" @click="deleteRequest(trip.id)" class="delete-icon" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import 'doc' here
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useToast } from 'vue-toastification'; // Import useToast from Vue Toastification

export default {
  name: 'PendingRequests',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      trips: [],
    };
  },
  methods: {
    async fetchPendingRequests() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "trips"));
        this.trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    },
    async deleteRequest(tripId) {
      const db = getFirestore();
      const toast = useToast(); // Initialize useToast from Vue Toastification
      try {
        await deleteDoc(doc(db, "trips", tripId));
        this.fetchPendingRequests(); // Refresh pending requests after deletion
        
        // Show success toast
        toast.success('Trip deleted successfully!');
      } catch (error) {
        console.error('Error deleting request:', error);
        // Show error toast
        toast.error('Failed to delete trip. Please try again.');
      }
    },
  },
  created() {
    this.fetchPendingRequests();
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

.delete-icon {
  color: red;
  cursor: pointer;
}

.delete-icon:hover {
  color: darkred;
}
</style>
