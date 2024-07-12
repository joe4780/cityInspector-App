<template>
  <div class="reportIncident">
    <h2>
      <font-awesome-icon icon="exclamation-circle" /> Report new Incident
    </h2>

    <form @submit.prevent="submitIncident">
      <div class="form-group">
        <label for="vehicleType">Vehicle Type</label>
        <input v-model="incident.Vehicle_Type" type="text" id="vehicleType" required>
      </div>
      <div class="form-group">
        <label for="category">Crime</label>
        <input v-model="incident.category" type="text" id="crime" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="incident.description" id="description" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Vehicle Image</label>
        <input type="file" id="image" @change="handleImageUpload">
      </div>

      <button type="submit">Submit</button>
      <div v-if="loading" class="loading-indicator">
        Loading...
      </div>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, uploadBytes } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'firebase/storage'; // Import for Storage usage

export default {
  name: 'reportIncident',
  components: {
    FontAwesomeIcon, // Register FontAwesomeIcon component (optional)
  },
  data() {
    return {
      incident: {
        Vehicle_Type: '',
        crime: '',
        description: '',
        imageUrl: '',
        status: 'Pending',
      },
      loading: false,
    };
  },
  methods: {
    async submitIncident() {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, 'incidents'), this.incident);

        if (this.incident.imageUrl) {
          console.log('Incident reported with image:', docRef.id, this.incident.imageUrl);
        } else {
          console.log('Incident reported without image:', docRef.id);
        }

        this.clearForm();
        alert('Incident reported successfully!');
      } catch (error) {
        console.error('Error reporting incident:', error);
        alert('Failed to report incident. Please try again later.');
      } finally {
        this.loading = false;
      }
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      const storage = getStorage();

      try {
        // Create a dynamic image reference for each upload
        const imageRef = storage.ref('images/' + file.name);
        const snapshot = await uploadBytes(imageRef, file);
        this.incident.imageUrl = await snapshot.ref.getDownloadURL();
        console.log('Image uploaded successfully:', this.incident.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    },
    clearForm() {
      this.incident.Vehicle_Type = '';
      this.incident.crime = '';
      this.incident.description = '';
      this.incident.imageUrl = '';
      // Reset file input (optional, depends on your UI/UX preference)
      document.getElementById('image').value = '';
    },
  },
};
</script>


<style scoped>
/* Component styles */
</style>


<style scoped>
/* Component styles */
</style>


<style scoped>
.reportIncident {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"], textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical; /* Allow vertical resizing of textarea */
}

button {
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
