<template>
  <div class="myIncidents">
    <h2><font-awesome-icon icon="list-ul" /> My Incidents</h2>

    <div v-if="loading" class="loading-indicator">
      Loading...
    </div>

    <div v-if="incidents.length === 0 && !loading">
      <p>No incidents reported.</p>
    </div>

    <div v-for="incident in incidents" :key="incident.id" class="incident-card">
      <h3>{{ incident.title }}</h3>
      <p><strong>Category:</strong> {{ incident.category }}</p>
      <p><strong>Description:</strong> {{ incident.description }}</p>
      <p><strong>Status:</strong> {{ incident.status }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
// Remove the 'ref' import since it's not used
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'myIncidents',
  FontAwesomeIcon,
  data() {
    return {
      incidents: [],
      loading: false
    };
  },
  async created() {
    this.loading = true;
    await this.fetchIncidents();
    this.loading = false;
  },
  methods: {
    async fetchIncidents() {
      try {
        const db = getFirestore();
        const user = 'currentUserId'; // Replace with actual user ID or use Firebase Auth to get current user
        const q = query(collection(db, 'incidents'), where('userId', '==', user));
        const querySnapshot = await getDocs(q);
        
        this.incidents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          description: doc.data().description,
          status: doc.data().status
        }));
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    }
  }
};
</script>

<style scoped>
.myIncidents {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.incident-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.loading-indicator {
  text-align: center;
  margin-top: 1rem;
  color: #4fd80f;
}
</style>
