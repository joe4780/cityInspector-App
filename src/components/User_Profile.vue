<template>
  <div>
    <h1>Profile</h1>
    <form @submit.prevent="updateProfile">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="form.username" disabled>
      <label for="fullName">Full Name:</label>
      <input type="text" id="fullName" v-model="form.fullName">
      <label for="phoneNumber">Phone Number:</label>
      <input type="text" id="phoneNumber" v-model="form.phoneNumber">
      <button type="submit">Update Profile</button>
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
/* Add relevant styling here */
</style>
