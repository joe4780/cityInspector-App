<template>
  <div>
    <h1>Driver Approval</h1>
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Approval Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.id }}</td>
          <td>{{ driver.approvalStatus }}</td>
          <td>
            <button @click="approveDriver(driver.id)">Approve</button>
            <button @click="rejectDriver(driver.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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
        const querySnapshot = await getDocs(collection(db, "drivers"));
        this.drivers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    },
    async approveDriver(id) {
      const db = getFirestore();
      const driverRef = doc(db, "drivers", id);
      try {
        await updateDoc(driverRef, {
          approvalStatus: 'Approved'  // Adjust the field name as per your Firestore structure
        });
        this.fetchDrivers();
      } catch (error) {
        console.error('Error approving driver:', error);
      }
    },
    async rejectDriver(id) {
      const db = getFirestore();
      const driverRef = doc(db, "drivers", id);
      try {
        await updateDoc(driverRef, {
          approvalStatus: 'Rejected'  // Adjust the field name as per your Firestore structure
        });
        this.fetchDrivers();
      } catch (error) {
        console.error('Error rejecting driver:', error);
      }
    },
  },
  created() {
    this.fetchDrivers();
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
