<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import router from './router'; // Adjust path to your router instance
import BaseLayout from './components/BaseLayout.vue'; // Adjust path to BaseLayout component

// Add the user-shield icon to the library
library.add(faUserShield);

// Create the Vue app instance
const app = createApp({
  components: {
    BaseLayout,
  },
});

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router instance
app.use(router);

// Mount the app to the #app element
app.mount('#app');

// Export the app instance (not necessary for single-file component setup)
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: 'Roboto Mono', monospace; /* Use Roboto Mono or another monospace font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #06498b;
}

/* Global styles for dark mode (if needed) */
body.dark-mode {
  background-color: #000000;
  color: #fff;
}
</style>
