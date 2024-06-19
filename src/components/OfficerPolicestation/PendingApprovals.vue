<template>
  <div>
    <h1>Pending Approvals</h1>
    <table>
      <thead>
        <tr>
          <th>Trip ID</th>
          <th>Vehicle ID</th>
          <th>Destination</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="approval in pendingApprovals" :key="approval.id">
          <td>{{ approval.tripId }}</td>
          <td>{{ approval.vehicleId }}</td>
          <td>{{ approval.destination }}</td>
          <td>{{ approval.purpose }}</td>
          <td>{{ approval.status }}</td>
          <td>
            <button @click="approveApproval(approval.id)">Approve</button>
            <button @click="rejectApproval(approval.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default {
  name: 'PendingApprovals',
  data() {
    return {
      pendingApprovals: [],
    };
  },
  methods: {
    async fetchPendingApprovals() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "approvals"));
        this.pendingApprovals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching pending approvals:', error);
      }
    },
    async approveApproval(id) {
      const db = getFirestore();
      try {
        const approvalRef = doc(db, "approvals", id);
        await updateDoc(approvalRef, { status: "approved" });
        this.fetchPendingApprovals();
      } catch (error) {
        console.error('Error approving approval:', error);
      }
    },
    async rejectApproval(id) {
      const db = getFirestore();
      try {
        const approvalRef = doc(db, "approvals", id);
        await updateDoc(approvalRef, { status: "rejected" });
        this.fetchPendingApprovals();
      } catch (error) {
        console.error('Error rejecting approval:', error);
      }
    },
  },
  created() {
    this.fetchPendingApprovals();
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
