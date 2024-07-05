<template>
  <div class="driver-approval-container">
    <h1><font-awesome-icon icon="user-check" /> Driver Approval</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Vehicle Type</th>
            <th>Vehicle Registration Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in drivers" :key="driver.id">
            <td>{{ driver.fullName }}</td>
            <td>{{ driver.vehicleType }}</td>
            <td>{{ driver.vehicleRegistrationNumber }}</td>
            <td class="action-buttons">
              <button @click="approveDriver(driver)" class="approve-button">Approve</button>
              <span class="button-spacing"></span>
              <button @click="rejectDriver(driver)" class="reject-button">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "vue-toastification";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'officerDriverApproval',
  FontAwesomeIcon,

  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    async fetchDrivers() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "Drivers"));
        this.drivers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    },
    async approveDriver(driver) {
      await this.updateApprovalStatus(driver, 'Approved');
    },
    async rejectDriver(driver) {
      await this.updateApprovalStatus(driver, 'Rejected');
    },
    async updateApprovalStatus(driver, status) {
      const db = getFirestore();
      const driverRef = doc(db, "Drivers", driver.id);
      try {
        await updateDoc(driverRef, {
          approvalStatus: status
        });
        this.fetchDrivers();
        this.showToast(`Driver ${status.toLowerCase()} successfully!`, 'success');
        await this.logApproval(driver, status); // Log approval/rejection action
      } catch (error) {
        console.error(`Error ${status.toLowerCase()}ing driver:`, error);
        this.showToast(`Failed to ${status.toLowerCase()} driver. Please try again.`, 'error');
      }
    },
    async logApproval(driver, status) {
      const db = getFirestore();
      const historyRef = collection(db, "history");
      try {
        await addDoc(historyRef, {
          fullName: driver.fullName,
          approvalStatus: status,
          approvedBy: 'Officer policestation', 
          vehicleType: driver.vehicleType,
          vehicleRegistrationNumber: driver.vehicleRegistrationNumber,
          dateTime: serverTimestamp()
        });
      } catch (error) {
        console.error('Error logging approval:', error);
      }
    },
    showToast(message, type) {
      const toast = useToast();
      toast[type](message);
    },
  },
  created() {
    this.fetchDrivers();
  },
};
</script>

<style scoped>
.driver-approval-container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.table-container {
  margin-top: 1rem;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(216, 201, 219, 0.075);
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}

.button-spacing {
  margin-left: 10px;
}

.approve-button {
  background-color: green;
  color: white;
}

.reject-button {
  background-color: red;
  color: white;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
h1 {
  align-items: center;
  
}
</style>
