<template>
  <div class="auth-container">
    <h2>Password Reset</h2>
    <form @submit.prevent="requestPasswordReset">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required>
      </div>
      <button type="submit">Request Password Reset</button>
    </form>
    <div></div>
    <router-link to="/">Remembered your password? Login</router-link>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async requestPasswordReset() {
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, this.email);
        alert('Password reset link has been sent to your email.');
      } catch (error) {
        console.error('Password reset request failed', error);
        alert('Password reset request failed. Please try again.');
      }
    },
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
  background: #fff;
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
</style>
