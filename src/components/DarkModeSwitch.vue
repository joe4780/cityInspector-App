<template>
  <div class="dark-mode-switch" @click="toggleDarkMode">
    <font-awesome-icon :icon="isDarkMode ? 'fas fa-moon' : 'fas fa-sun'" />
    <span>{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
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
    this.applyTheme();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      setDarkMode(this.isDarkMode);
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
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
