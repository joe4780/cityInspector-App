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
          <td>
            <span v-if="historyItem.approvalStatus === 'Approved'">
              <font-awesome-icon icon="check" style="color: green" />
            </span>
            <span v-else-if="historyItem.approvalStatus === 'Rejected'">
              <font-awesome-icon icon="times" style="color: red" />
            </span>
            <span v-else>{{ historyItem.approvalStatus }}</span>
          </td>
          <td>{{ historyItem.approvedBy }}</td>
          <td>{{ historyItem.vehicleRegistrationNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'DriverHistory',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      history: [],
    };
  },
  methods: {
    fetchHistory() {
      const db = getFirestore();
      const historyCollection = collection(db, "history");

      onSnapshot(historyCollection, (snapshot) => {
        this.history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
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
