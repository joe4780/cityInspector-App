<template>
  <div class="page-container">
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required>
        </div>
        <button type="submit">Login</button>
        <div v-if="loading" class="loading-indicator">
          <span>Loading...</span>
          <font-awesome-icon icon="spinner" spin />
        </div>
      </form>

      <div class="auth-links">
        <router-link to="/User_Register">Register</router-link>
        <div></div>
        <router-link to="/password-reset">Forgot your password? Reset it here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useToast } from "vue-toastification";
import router from '@/router';

export default {
  name: 'User_Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const loading = ref(false); // Reactive variable for loading state
    const toast = useToast();

    const login = async () => {
      const auth = getAuth();
      const db = getFirestore();
      loading.value = true; // Start loading state

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;

          // Show success toast
          toast.success("Login successful!");

          // Redirect based on role (using a function for better readability)
          handleUserRedirection(userRole);
        } else {
          console.error('No such document!');
          toast.error("Login failed. Please check your email and password.");
        }
      } catch (error) {
        console.error('Login failed', error);
        toast.error("Login failed. Please check your email and password.");
      } finally {
        // Introduce a small delay to allow the spinner to show before setting loading to false
        setTimeout(() => {
          loading.value = false; // End loading state
        }, 800); // Adjust the delay as needed
      }
    };

    const handleUserRedirection = (userRole) => {
      const dashboardRoutes = {
        Admin: '/Admin/AdminDashboard',
        CoordinatorHospital: '/CoordinatorHospital/CoordinatorDashboard',
        OfficerPolicestation: '/OfficerPolicestation/OfficerDashboard',
        Driver: '/Driver/DriverDashboard',
        TrafficPolice: '/TrafficPolice/TrafficDashboard',
      };

      const targetDashboard = dashboardRoutes[userRole];
      if (targetDashboard) {
        router.push(targetDashboard);
      } else {
        console.error('Invalid user role:', userRole);
        router.push('/'); // Redirect to default page on invalid role
      }
    };

    return {
      email,
      password,
      login,
      loading,
      toast
    };
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.auth-container {
  max-width: 400px;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.auth-links {
  margin-top: 1rem;
  text-align: center;
}

.auth-links router-link {
  margin-right: 1rem;
  color: #007bff;
  text-decoration: none;
}

.auth-links router-link:hover {
  text-decoration: underline;
}

.loading-indicator {
  text-align: center;
  margin-top: 1rem;
  color: #10e73f;
}

.fa-spinner {
  margin-left: 5px;
}
</style>
