<template>
  <div id="app">
    <DarkModeSwitch />
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
import DarkModeSwitch from './components/DarkModeSwitch.vue';
import BaseLayout from './components/BaseLayout.vue'; // Assuming this is the path
import router from './router'; // Ensure correct path to your router instance

// Include needed FontAwesome solid icons
library.add(fas);

// Register FontAwesomeIcon component globally and create the Vue app instance
const app = createApp({
  components: {
    DarkModeSwitch,
    BaseLayout,
  },
});

// Use FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router instance
app.use(router);

// Mount the app to the #app element
app.mount('#app');

export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Roboto Mono', monospace; /* Use Roboto Mono or another monospace font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #06498b;
  margin-top: 120px;
}

/* Global styles for dark mode */
body.dark-mode {
  background-color: #000000;
  color: #fff;
}
</style>
