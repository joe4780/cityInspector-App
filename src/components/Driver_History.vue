<template>
  <div>
    <h1>Approval History</h1>
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Approval Status</th>
          <th>Approved By</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="historyItem in history" :key="historyItem.id">
          <td>{{ historyItem.driverId }}</td>
          <td>{{ historyItem.approvalStatus }}</td>
          <td>{{ historyItem.approvedBy }}</td>
          <td>{{ formatDateString(historyItem.date) }}</td>
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
        const querySnapshot = await getDocs(collection(db, "approval_history"));
        this.history = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching approval history:', error);
      }
    },
    formatDateString(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  created() {
    this.fetchHistory();
  },
};
</script>

<style scoped>
/* Add relevant styling here */
</style>
