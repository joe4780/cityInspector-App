<template>
  <div class="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Profile</h1>
    <div class="box">
      <form @submit.prevent="updateProfile">
        <div class="field mb-4">
          <label for="username" class="label">Username:</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="input"
            required
          />
        </div>
        <div class="field mb-4">
          <label for="fullName" class="label">Full Name:</label>
          <input
            type="text"
            id="fullName"
            v-model="form.fullName"
            class="input"
            required
          />
        </div>
        <div class="field mb-4">
          <label for="phoneNumber" class="label">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            v-model="form.phoneNumber"
            class="input"
            required
          />
        </div>
        <button type="submit" class="button is-primary w-full" :disabled="isLoading">
          {{ isLoading ? 'Updating...' : 'Update Profile' }}
        </button>
      </form>
      <div v-if="isSuccess" class="mt-2 has-text-success">Profile updated successfully!</div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'User_Profile',
  data() {
    return {
      form: {
        username: '',
        fullName: '',
        phoneNumber: '',
      },
      isLoading: false,
      isSuccess: false,
    };
  },
  methods: {
    async fetchProfile() {
      const db = getFirestore();
      try {
        const docRef = doc(db, 'profiles', this.$store.state.user.uid);
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
      this.isLoading = true; // Show loading indicator
      const db = getFirestore();
      try {
        const docRef = doc(db, 'profiles', this.$store.state.user.uid);
        await updateDoc(docRef, this.form);
        this.isSuccess = true; // Flag successful update
        this.isLoading = false; // Hide loading indicator
      } catch (error) {
        console.error('Error updating profile:', error);
        this.isLoading = false; // Hide loading indicator on error
      }
    },
  },
  created() {
    this.fetchProfile();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.box {
  background-color: #68aff1;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(144, 172, 204, 0.1);
}

.field {
  margin-bottom: 1rem;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.button {
  margin-top: 1rem;
}

.has-text-success {
  color: green;
}
</style>
