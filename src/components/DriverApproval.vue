<template>
  <div class="driver-approval-container">
    <h1>Driver Approval</h1>
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

export default {
  name: 'DriverApproval',
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
      const db = getFirestore();
      const driverRef = doc(db, "Drivers", driver.id);
      try {
        await updateDoc(driverRef, {
          approvalStatus: 'Approved'  // Update the approval status field name as per your Firestore structure
        });
        this.fetchDrivers();
        this.showToast('Driver approved successfully!', 'success');
        await this.logApproval(driver, 'Approved'); // Log approval action
      } catch (error) {
        console.error('Error approving driver:', error);
        this.showToast('Failed to approve driver. Please try again.', 'error');
      }
    },
    async rejectDriver(driver) {
      const db = getFirestore();
      const driverRef = doc(db, "Drivers", driver.id);
      try {
        await updateDoc(driverRef, {
          approvalStatus: 'Rejected'  // Update the approval status field name as per your Firestore structure
        });
        this.fetchDrivers();
        this.showToast('Driver rejected successfully!', 'success');
        await this.logApproval(driver, 'Rejected'); // Log rejection action
      } catch (error) {
        console.error('Error rejecting driver:', error);
        this.showToast('Failed to reject driver. Please try again.', 'error');
      }
    },
    async logApproval(driver, status) {
      const db = getFirestore();
      const historyRef = collection(db, "history");
      try {
        await addDoc(historyRef, {
          fullName: driver.fullName,
          approvalStatus: status,
          approvedBy: "CoordinatorHospital", // Example: replace with actual user or role who approved/rejected
          dateTime: serverTimestamp() // Use Firestore server timestamp
        });
      } catch (error) {
        console.error('Error logging approval:', error);
      }
    },
    showToast(message, type) {
      const toast = useToast(); // Initialize the useToast function from Vue Toastification
      toast[type](message); // Show toast based on type (success or error)
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
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}

.button-spacing {
  margin-left: 10px; /* Adjust the spacing between buttons as needed */
}

.approve-button {
  background-color: green; /* Green color for approve button */
  color: white;
}

.reject-button {
  background-color: red; /* Red color for reject button */
  color: white;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
