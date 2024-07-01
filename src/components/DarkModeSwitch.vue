<template>
  <div class="dark-mode-switch" @click="toggleDarkMode">
    <font-awesome-icon :icon="isDarkMode ? 'fas fa-moon' : 'fas fa-sun'" />
    <span></span>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setDarkMode, initializeDarkMode } from '../services/darkmodeService';

export default {
  name: 'DarkModeSwitch',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  mounted() {
    this.isDarkMode = initializeDarkMode();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      setDarkMode(this.isDarkMode);
    },
  },
};
</script>

<style scoped>
.dark-mode-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.dark-mode-switch span {
  font-size: 14px;
  font-weight: bold;
}
</style>
