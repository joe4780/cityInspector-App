<template>
  <div class="officer-dashboard">
    <nav>
      <router-link to="/OfficerPolicestation/PendingApprovals">View Pending Approvals</router-link>
      <router-link to="/DriverApproval">Approve Drivers</router-link>
      <router-link to="/Driver_History">View Approval History</router-link>
      <router-link to="/User_Profile">Profile</router-link>
    </nav>
    <main>
      <h1>Pending Approvals</h1>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="approval in pendingApprovals" :key="approval.id">
            <td>{{ approval.destination }}</td>
            <td>{{ approval.purpose }}</td>
            <td>{{ approval.status }}</td>
            <td>
              <button @click="approveApproval(approval.id)" style="background-color: green; color: white">Approve</button>
              <span style="margin-left: 10px;"></span> <button @click="rejectApproval(approval.id)" style="background-color: red; color: white">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
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
        this.fetchPendingApprovals(); // Refresh approvals after update
      } catch (error) {
        console.error('Error approving approval:', error);
      }
    },
    async rejectApproval(id) {
      const db = getFirestore();
      try {
        const approvalRef = doc(db, "approvals", id);
        await updateDoc(approvalRef, { status: "rejected" });
        this.fetchPendingApprovals(); // Refresh approvals after update
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
.officer-dashboard {
  display: flex;
  flex-direction: row;
}

nav {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
}

nav a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  background-color: #eee;
}

main {
  flex: 1;
  padding: 20px;
}

/* Add your desired styling for the table here (optional) */

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

/* Style buttons directly in the template for better maintainability */
button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
