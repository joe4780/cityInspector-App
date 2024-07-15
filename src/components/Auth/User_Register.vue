<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="form.password" type="password" id="password" required>
      </div>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input v-model="form.fullName" type="text" id="fullName" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input v-model="form.phoneNumber" type="text" id="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select v-model="form.role" id="role" required>
          <option value="Driver">Driver</option>
          <option value="OfficerPolicestation">OfficerPolicestation</option>
          <option value="CoordinatorHospital">CoordinatorHospital</option>
          <option value="TrafficPolice">TrafficPolice</option>
          <option value="Admin">Admin</option>
          <option value="Citizen">Citizen</option> 
        </select>
      </div>
      <!-- Additional fields for Citizen registration -->
      <template v-if="form.role === 'Citizen'">
        <div class="form-group">
          <label for="address">Address</label>
          <input v-model="form.address" type="text" id="address" required>
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input v-model="form.age" type="number" id="age" required>
        </div>
      </template>
      
      <button type="submit">Register</button>
      <div v-if="loading" class="loading-indicator">
        Loading...
      </div>
    </form>
    <router-link to="/">Already have an account? Login</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useToast } from "vue-toastification";
import router from '@/router'; // Import router from your Vue Router instance

export default {
  name: 'User_Register',
  setup() {
    const form = ref({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      role: 'Driver',
      address: '', // New field for Citizen registration
      age: 0, // New field for Citizen registration
    });
    const loading = ref(false);
    const toast = useToast();

    const register = async () => {
      const auth = getAuth();
      const db = getFirestore();
      loading.value = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.value.email, form.value.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: form.value.email,
          fullName: form.value.fullName,
          phoneNumber: form.value.phoneNumber,
          role: form.value.role,
          address: form.value.address, // Save address for Citizen
          age: form.value.age, // Save age for Citizen
        });

        if (form.value.role === 'Admin') {
          await setDoc(doc(db, "admins", user.uid), {
            email: form.value.email,
            fullName: form.value.fullName,
          });
        }

        // Clear form fields
        form.value.email = '';
        form.value.password = '';
        form.value.fullName = '';
        form.value.phoneNumber = '';
        form.value.role = 'Driver';
        form.value.address = ''; // Clear address field
        form.value.age = 0; // Clear age field

        toast.success("Registration successful!");
        router.push('/');
      } catch (error) {
        if (error.code === 'auth/weak-password') {
          console.error('Registration failed: Weak password');
          toast.error("Please choose a stronger password.");
        } else if (error.code === 'auth/email-already-in-use') {
          console.error('Registration failed: Email already in use');
          toast.error("This email is already registered. Please use a different email address.");
        } else if (error.code === 'auth/operation-not-allowed') {
          console.error('Registration failed: Operation not allowed');
          toast.error("Registration is currently not allowed. Please try again later.");
        } else {
          console.error('Registration failed', error);
          toast.error("Registration failed. Please try again.");
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      register,
      toast,
    };
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #afe2eb;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.loading-indicator {
  text-align: center;
  margin-top: 1rem;
  color: #4fd80f;
}
</style>
