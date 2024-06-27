<template>
  <div class="approval-history-container">
    <h1>Approval History</h1>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Approval Status</th>
          <th>Approved By</th>
          <th>Vehicle Registration Number</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="historyItem in history" :key="historyItem.id">
          <td>{{ historyItem.fullName }}</td>
          <td>{{ historyItem.approvalStatus }}</td>
          <td>{{ historyItem.approvedBy }}</td>
          <td>{{ historyItem.vehicleRegistrationNumber }}</td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'Driver_History',
  data() {
    return {
      history: [],
    };
  },
  methods: {
    async fetchHistory() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "history"));
        this.history = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching approval history:', error);
      }
    },
  },
  created() {
    this.fetchHistory();
  },
};
</script>

<style scoped>
.approval-history-container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
</style>
