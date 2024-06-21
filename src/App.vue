<template>
  <div id="app">
    <BaseLayout>
      <router-view></router-view>
    </BaseLayout>
  </div>
</template>

<script>
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseLayout from './components/BaseLayout.vue'; // Assuming this is the path
import router from './router'; // Ensure correct path to your router instance

// Include needed FontAwesome solid icons
library.add(fas);

// Register FontAwesomeIcon component globally
const app = createApp({
  components: {
    BaseLayout,
  },
});

app.component('font-awesome-icon', FontAwesomeIcon);

// Use router instance
app.use(router);

// Mount the app to the #app element
app.mount('#app');

export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: 'Roboto Mono', monospace; /* Use Roboto Mono or another monospace font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Remove text-align: center; for left alignment */
  /* Adjust margin-top as needed for your layout */
  color: #06498b;
}

/* Global styles for dark mode (if still needed) */
body.dark-mode {
  background-color: #000000;
  color: #fff;
}
</style>
