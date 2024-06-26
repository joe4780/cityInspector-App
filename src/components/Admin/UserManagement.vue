<template>
  <div>
    <h1>User Management</h1>

    <h2>CityInspector Users</h2>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.fullName }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td @click="deleteUser(user.id)">
            <font-awesome-icon icon="trash-alt" class="delete-icon" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'UserManagement',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        this.users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(userId) {
      const db = getFirestore();
      try {
        // Delete from 'users' collection
        await deleteDoc(doc(db, "users", userId));
        
        // Delete from 'Drivers' collection
        await deleteDoc(doc(db, "Drivers", userId));
        
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.delete-icon {
  color: red;
  cursor: pointer;
}

.delete-icon:hover {
  color: darkred;
}
</style>
