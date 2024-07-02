<template>
    <div id="app">
      <DarkModeSwitch />
      <!-- Rest of your app components -->
    </div>
  </template>
  
  <script>
  import DarkModeSwitch from './components/DarkModeSwitch.vue';
  
  export default {
    name: 'App',
    components: {
      DarkModeSwitch,
    },
  };
  </script>
  