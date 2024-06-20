import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import User_Login from '../components/Auth/User_Login.vue';
import User_Register from '../components/Auth/User_Register.vue';
import PasswordReset from '../components/Auth/PasswordReset.vue';
import BaseLayout from '../components/BaseLayout.vue';
import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import CoordinatorDashboard from '../components/CoordinatorHospital/CoordinatorDashboard.vue';
import OfficerDashboard from '../components/OfficerPolicestation/OfficerDashboard.vue';
import DriverDashboard from '../components/Driver/DriverDashboard.vue';
import TrafficDashboard from '../components/TrafficPolice/TrafficDashboard.vue';
import User_Profile from '../components/User_Profile.vue';
import authMiddleware from '../router/auth.js';

const routes = [
  { path: '/', component: HomePage },
  { path: '/User_Login', component: User_Login },
  { path: '/User_Register', component: User_Register },
  { path: '/password-reset', component: PasswordReset },
  {
    path: '/',
    component: BaseLayout,
    beforeEnter: authMiddleware,
    children: [
      { path: 'Admin/AdminDashboard', component: AdminDashboard },
      { path: 'CoordinatorHospital/CoordinatorDashboard', component: CoordinatorDashboard },
      { path: 'OfficerPolicestation/OfficerDashboard', component: OfficerDashboard },
      { path: 'Driver/DriverDashboard', component: DriverDashboard },
      { path: 'TrafficPolice/TrafficDashboard', component: TrafficDashboard },
      { path: 'User_Profile', component: User_Profile },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
