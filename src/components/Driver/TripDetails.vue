<template>
  <div>
    <h1 class="centered-heading">Log New Trip</h1>
    <form @submit.prevent="logTrip" class="trip-form">
      <div class="form-group">
        <label for="vehicleRegistrationNumber">Vehicle Registration Number</label>
        <input type="text" id="vehicleRegistrationNumber" v-model="trip.vehicleRegistrationNumber" required />
      </div>
      <div class="form-group">
        <label for="vehicleType">Vehicle Type</label>
        <select id="vehicleType" v-model="trip.vehicleType" required>
          <option disabled value="">Select Vehicle Type</option>
          <option value="Ambulance">Ambulance</option>
          <option value="GK">GK</option>
        </select>
      </div>
      <div class="form-group">
        <label for="destination">Destination</label>
        <input type="text" id="destination" v-model="trip.destination" required />
      </div>
      <div class="form-group">
        <label for="purpose">Purpose</label>
        <input type="text" id="purpose" v-model="trip.purpose" required />
      </div>
      <button type="submit">Log Trip</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useToast } from 'vue-toastification';

export default {
  name: 'TripDetails',
  data() {
    return {
      trip: {
        vehicleRegistrationNumber: '',
        vehicleType: '',
        destination: '',
        purpose: '',
      },
    };
  },
  methods: {
    async logTrip() {
      const db = getFirestore();
      const toast = useToast(); // Initialize useToast from vue-toastification

      try {
        await addDoc(collection(db, "trips"), {
          vehicleRegistrationNumber: this.trip.vehicleRegistrationNumber,
          vehicleType: this.trip.vehicleType,
          destination: this.trip.destination,
          purpose: this.trip.purpose,
        });

        // Show success toast notification
        toast.success('Trip logged successfully!', {
          position: 'top-right',
          timeout: 3000, // Duration the toast should be displayed (in ms)
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: false,
          closeButton: 'button',
        });

        this.$router.push('/Driver/DriverDashboard');
      } catch (error) {
        console.error('Error logging trip:', error);
        toast.error('Failed to log trip. Please try again later.', {
          position: 'top-right',
          timeout: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: false,
          closeButton: 'button',
        });
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles for the component */
.centered-heading {
  text-align: center;
}

.trip-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px 24px;
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
