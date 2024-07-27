<template>
  <div class="manage-incidents">
    <h2>Manage Incidents</h2>
    <div class="card-container">
      <div class="incident-card" v-for="incident in incidents" :key="incident.id">
        <div class="incident-description">{{ incident.description }}</div>
        <select v-model="incident.status" @change="updateStatus(incident)">
          <option value="under review">Under Review</option>
          <option value="reviewed">Reviewed</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default {
  name: 'ManageIncidents',
  data() {
    return {
      incidents: []
    };
  },
  methods: {
    async fetchIncidents() {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "incidents"));
        this.incidents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    },
    async updateStatus(incident) {
      const db = getFirestore();
      try {
        await updateDoc(doc(db, "incidents", incident.id), {
          status: incident.status
        });
        console.log('Incident status updated successfully');
      } catch (error) {
        console.error('Error updating incident status:', error);
      }
    }
  },
  created() {
    this.fetchIncidents();
  }
};
</script>

<style>
.manage-incidents {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.incident-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(33.333% - 20px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.incident-description {
  margin-bottom: 8px;
  font-size: 16px;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}
</style>
