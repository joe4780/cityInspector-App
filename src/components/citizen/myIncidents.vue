<template>
  <div class="myIncidents">
    <h2><font-awesome-icon icon="list-ul" /> My Incidents</h2>

    <div v-if="loading" class="loading-indicator">
      Loading...
    </div>

    <div v-else-if="incidents.length === 0">
      <p>No incidents reported.</p>
    </div>

    <div v-else v-for="incident in incidents" :key="incident.id" class="incident-card">
      <p><strong>Vehicle Type:</strong> {{ incident.Vehicle_Type }}</p>
      <p><strong>Crime:</strong> {{ incident.crime }}</p>
      <p><strong>Status:</strong> {{ incident.status }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'myIncidents',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      incidents: [],
      loading: true
    };
  },
  created() {
    this.fetchIncidents();
  },
  methods: {
    async fetchIncidents() {
      try {
        const db = getFirestore();
        console.log('Fetching all incidents');

        const querySnapshot = await getDocs(collection(db, 'incidents'));

        console.log('Number of documents:', querySnapshot.size);

        if (querySnapshot.empty) {
          console.warn('No incidents found');
        }

        this.incidents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Fetched incidents:', this.incidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.myIncidents {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.incident-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.incident-card p {
  margin: 0.5rem 0;
}

.loading-indicator {
  text-align: center;
  margin-top: 1rem;
  color: #4fd80f;
}
</style>