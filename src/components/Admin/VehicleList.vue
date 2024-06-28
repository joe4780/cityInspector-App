<template>
  <div>
    <h1>Vehicles List</h1>
    <table>
      <thead>
        <tr>
          <th>Registration Number</th>
          <th>Vehicle Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>{{ vehicle.vehicleRegistrationNumber }}</td>
          <td>{{ vehicle.vehicleType }}</td>
          <td>
            <button @click="removeVehicle(vehicle.id)">
              <font-awesome-icon icon="trash-alt" /> Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt);

export default {
  name: 'VehicleList',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      vehicles: [],
    };
  },
  created() {
    this.fetchVehicles();
  },
  methods: {
    async fetchVehicles() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "Vehicles"));
        this.vehicles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    },
    async removeVehicle(vehicleId) {
      const db = getFirestore();
      try {
        await deleteDoc(doc(db, "Vehicles", vehicleId));
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
        console.log('Vehicle removed successfully');
      } catch (error) {
        console.error('Error removing vehicle:', error);
      }
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: red;
}

button:hover {
  color: darkred;
}
</style>
