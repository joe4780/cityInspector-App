<template>
  <div>
    <div class="container">
      <h1 class="title">Add Vehicle</h1>
      <div class="box">
        <form @submit.prevent="addVehicle">
          <div class="field">
            <label for="registration_number" class="label">Registration Number:</label>
            <input
              type="text"
              id="registration_number"
              v-model="vehicle.registration_number"
              class="input"
              required
            />
          </div>
          <div class="field">
            <label for="vehicle_type" class="label">Vehicle Type:</label>
            <input
              type="text"
              id="vehicle_type"
              v-model="vehicle.vehicle_type"
              class="input"
              required
            />
          </div>
          <div class="field">
            <label for="current_mileage" class="label">Current Mileage:</label>
            <input
              type="number"
              id="current_mileage"
              v-model="vehicle.current_mileage"
              class="input"
              required
            />
          </div>
          <button type="submit" class="button is-primary" :disabled="isLoading">
            {{ isLoading ? 'Adding...' : 'Add Vehicle' }}
          </button>
        </form>
        <div v-if="isSuccess" class="mt-2 has-text-success">Vehicle added successfully!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: 'AddVehicle',
  data() {
    return {
      vehicle: {
        registration_number: '',
        vehicle_type: '',
        current_mileage: '',
      },
      isLoading: false,
      isSuccess: false,
    };
  },
  methods: {
    async addVehicle() {
      this.isLoading = true; // Show loading indicator
      const db = getFirestore();

      try {
        await addDoc(collection(db, 'vehicles'), this.vehicle);
        this.isSuccess = true; // Flag successful addition
        
        // Reset the vehicle object to clear the form fields
        this.vehicle = {
          registration_number: '',
          vehicle_type: '',
          current_mileage: '',
        };

      } catch (error) {
        console.error('Error adding vehicle:', error);
      } finally {
        this.isLoading = false; // Hide loading indicator after success/error
      }
    },
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

.button {
  margin-top: 1rem;
}

.has-text-success {
  color: green;
}
</style>
