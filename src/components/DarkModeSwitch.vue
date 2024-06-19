<template>
  <div class="dark-mode-switch">
    <label class="switch">
      <input type="checkbox" v-model="isDarkMode">
      <span class="slider"></span>
    </label>
    <span>Dark Mode</span>
  </div>
</template>

<script>
export default {
  name: 'DarkModeSwitch',
  data() {
    return {
      isDarkMode: false,
    };
  },
  watch: {
    isDarkMode(newValue) {
      this.setTheme(newValue);
    },
  },
  mounted() {
    // Check if user has already set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      this.setTheme(this.isDarkMode);
    }
  },
  methods: {
    setTheme(isDarkMode) {
      document.body.classList.toggle('dark-mode', isDarkMode);
      // Save user preference to localStorage
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    },
  },
};
</script>

<style scoped>
.dark-mode-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

span {
  font-size: 14px;
  font-weight: bold;
}
</style>
