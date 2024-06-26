<!-- StatisticsCard.vue -->
<template>
  <div class="stats-card">
    <font-awesome-icon :icon="icon" class="stats-icon" />
    <div class="stats-info">
      <h3>{{ title }}</h3>
      <p>{{ count }}</p>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'StatisticsCard',
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.stats-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stats-info {
  text-align: center;
}

.stats-info h3 {
  margin: 0;
  font-size: 1rem;
}

.stats-info p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
