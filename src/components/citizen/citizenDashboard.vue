<template>
  <div class="citizenDashboard">
    <h2 class="dashboard-header">
      <font-awesome-icon icon="user" /> Citizen's Dashboard
    </h2>

    <main class="content">
      <div class="section-left">
        <my-incidents></my-incidents>
      </div>
      <div class="section-right">
        <report-incident></report-incident>
      </div>
    </main>
  </div>
</template>

<script>
import myIncidents from '@/components/citizen/myIncidents.vue';
import reportIncident from '@/components/citizen/reportIncident.vue';

export default {
  name: 'citizenDashboard',
  components: {
    myIncidents,
    reportIncident,
  },
};
</script>

<style scoped>
/* Dashboard container */
.citizenDashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: space-between; /* Distribute sections to the ends */
  width: 100%; /* Take full width of parent container */
}

.section-left,
.section-right {
  flex-grow: 1; /* Grow to occupy available space equally */
  margin-right: 20px; /* Add some space between sections */
}

@media (max-width: 768px) {
  .content {
    flex-direction: column; /* Stack sections vertically on smaller screens */
  }

  .section-left,
  .section-right {
    margin-right: 0; /* Remove margin between sections on smaller screens */
    margin-bottom: 20px; /* Add spacing between sections vertically */
  }
}
</style>
