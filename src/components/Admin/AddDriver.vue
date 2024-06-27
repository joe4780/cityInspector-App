<template>
  <div class="add-driver-container">
    <h1>Add Driver</h1>
    <form @submit.prevent="addDriver">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" v-model="fullName" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="vehicleType">Vehicle Type:</label>
        <input type="text" id="vehicleType" v-model="vehicleType" required>
      </div>
      <div class="form-group">
        <label for="vehicleRegistrationNumber">Vehicle Registration Number:</label>
        <input type="text" id="vehicleRegistrationNumber" v-model="vehicleRegistrationNumber" required>
      </div>
      <button type="submit">Add Driver</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default {
  name: 'DriverAdd',
  setup() {
    const fullName = ref('');
    const phoneNumber = ref('');
    const vehicleType = ref('');
    const vehicleRegistrationNumber = ref('');
    const toast = useToast();
    
    const addDriver = async () => {
      const db = getFirestore();
      
      try {
        const docRef = await addDoc(collection(db, 'Drivers'), {
          fullName: fullName.value,
          phoneNumber: phoneNumber.value,
          vehicleType: vehicleType.value,
          vehicleRegistrationNumber: vehicleRegistrationNumber.value,
          role: 'Driver' // Assuming 'role' is a default field for a driver
        });

        // Show success toast
        toast.success('Driver added successfully!');
        
        // Clear form fields after successful addition
        fullName.value = '';
        phoneNumber.value = '';
        vehicleType.value = '';
        vehicleRegistrationNumber.value = '';
        
        // Log the added document ID for verification
        console.log('Added document ID:', docRef.id);

      } catch (error) {
        console.error('Error adding driver:', error);
        // Show error toast
        toast.error('Failed to add driver. Please try again.');
      }
    };

    return {
      fullName,
      phoneNumber,
      vehicleType,
      vehicleRegistrationNumber,
      addDriver,
    };
  }
};
</script>

<style scoped>
.add-driver-container {
  max-width: 400px;
  margin: auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
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
</style>
