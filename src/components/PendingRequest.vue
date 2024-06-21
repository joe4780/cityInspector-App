<template>
  <div>
    <h1>Pending Requests</h1>
    <table>
      <thead>
        <tr>
          <th>Vehicle Registration Number</th>
          <th>Destination</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in pendingRequests" :key="request.id">
          <td>{{ request.registrationNumber }}</td>
          <td>{{ request.destination }}</td>
          <td>{{ request.purpose }}</td>
          <td>{{ request.status }}</td>
          <td>
            <button @click="approveRequest(request.id)">Approve</button>
            <button @click="rejectRequest(request.id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default {
  name: 'PendingRequests',
  data() {
    return {
      pendingRequests: [],
    };
  },
  methods: {
    async fetchPendingRequests() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
        this.pendingRequests = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(request => request.status === 'pending');
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    },
    async approveRequest(id) {
      const db = getFirestore();
      try {
        const requestDoc = doc(db, "requests", id);
        await updateDoc(requestDoc, { status: 'approved' });
        this.fetchPendingRequests();
      } catch (error) {
        console.error('Error approving request:', error);
      }
    },
    async rejectRequest(id) {
      const db = getFirestore();
      try {
        const requestDoc = doc(db, "requests", id);
        await updateDoc(requestDoc, { status: 'rejected' });
        this.fetchPendingRequests();
      } catch (error) {
        console.error('Error rejecting request:', error);
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
</style>
