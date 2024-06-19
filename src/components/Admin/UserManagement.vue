<template>
  <div>
    <h1>User Management</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.email }} - {{ user.role }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="newUser.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="newUser.password" required />
      </div>
      <div>
        <label for="role">Role:</label>
        <input type="text" v-model="newUser.role" required />
      </div>
      <div>
        <label for="full_name">Full Name:</label>
        <input type="text" v-model="newUser.full_name" required />
      </div>
      <div>
        <label for="phone_number">Phone Number:</label>
        <input type="text" v-model="newUser.phone_number" required />
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc, setDoc, doc } from "firebase/firestore";

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
      newUser: {
        email: '',
        password: '',
        role: '',
        full_name: '',
        phone_number: '',
      },
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
    async addUser() {
      const auth = getAuth();
      const db = getFirestore();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.newUser.email, this.newUser.password);
        const userId = userCredential.user.uid;

        await setDoc(doc(db, "users", userId), {
          email: this.newUser.email,
          role: this.newUser.role,
          full_name: this.newUser.full_name,
          phone_number: this.newUser.phone_number,
        });

        this.newUser = {
          email: '',
          password: '',
          role: '',
          full_name: '',
          phone_number: '',
        };
        this.fetchUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async deleteUser(userId) {
      const db = getFirestore();
      try {
        await deleteDoc(doc(db, "users", userId));
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
</style>
