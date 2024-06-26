<template>
  <div class="base-layout">
    <main class="main-content">
      <header class="app-header">
        <h1 class="app-title">
          <font-awesome-icon icon="ambulance" class="app-icon" /> 
          CityInspector
        </h1>
        <div class="header-icons">
          <router-link to="/User_Profile" class="profile-button">
            <font-awesome-icon icon="user" />
          </router-link>
          <button @click="logout" class="logout-button">
            <font-awesome-icon icon="sign-out-alt" />
          </button>
        </div>
      </header>
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; 2024 City Inspector. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'BaseLayout',
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = async () => {
      await store.dispatch('logout');
      router.push('/');
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(46, 91, 158);
  padding: 1rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.app-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}

.app-icon {
  margin-right: 0.5rem; /* Add space between the icon and the title */
}

.header-icons {
  display: flex;
  gap: 1rem;
}

.header-icons a,
.header-icons button {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.footer {
  background-color: rgb(46, 91, 158);
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
