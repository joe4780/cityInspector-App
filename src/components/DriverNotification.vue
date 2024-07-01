<template>
  <div class="notification" @click="handleClick">
    <font-awesome-icon :icon="icon" />
    <div class="notification-content">
      <h4>{{ title }}</h4>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DriverNotification',
  props: {
    title: String,
    message: String,
    icon: {
      type: Array,
      default: () => ['fas', 'info-circle']
    }
  },
  methods: {
    handleClick() {
      // Emit an event when the notification is clicked
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
}
.notification-content {
  margin-left: 1rem;
}
.notification-content h4 {
  margin: 0;
  font-size: 1.1rem;
}
.notification-content p {
  margin: 0;
  color: #666;
}
</style>
