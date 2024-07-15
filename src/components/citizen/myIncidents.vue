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
      <p><strong>Vehicle Type:</strong> {{ incident.Vehicle_Type }}</p>
      <p><strong>Crime:</strong> {{ incident.crime }}</p>
      <p><strong>Status:</strong> {{ incident.status }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'myIncidents',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      incidents: [],
      loading: false
    };
  },
  async created() {
    this.loading = true;
    try {
      await this.fetchIncidents();
    } catch (error) {
      console.error('Error during fetchIncidents:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async fetchIncidents() {
      try {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error('No user is currently authenticated.');
          return;
        }

        const userId = user.uid;
        const q = query(collection(db, 'incidents'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.warn('No incidents found for user:', userId);
        }

        this.incidents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          Vehicle_Type: doc.data().Vehicle_Type,
          crime: doc.data().crime,
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
