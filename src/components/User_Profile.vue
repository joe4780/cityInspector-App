<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Profile</h1>
    <form @submit.prevent="updateProfile">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
        <input type="text" id="username" v-model="form.username" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name:</label>
        <input type="text" id="fullName" v-model="form.fullName" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="mb-4">
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="form.phoneNumber" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md shadow-md hover:bg-indigo-700">Update Profile</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'User_Profile',
  data() {
    return {
      form: {
        username: '', // Populate with user data
        fullName: '',
        phoneNumber: '',
      },
    };
  },
  methods: {
    async fetchProfile() {
      const db = getFirestore();
      try {
        const docRef = doc(db, 'profiles', this.$store.state.user.uid); // Assuming 'profiles' collection and user's UID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.form = docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async updateProfile() {
      const db = getFirestore();
      try {
        const docRef = doc(db, 'profiles', this.$store.state.user.uid); // Assuming 'profiles' collection and user's UID
        await updateDoc(docRef, this.form);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  },
  created() {
    this.fetchProfile();
  },
};
</script>

<style scoped>
/* Add spacing between fields */
.mb-4 {
  margin-bottom: 1rem; /* You can adjust this value as needed */
}
</style>
