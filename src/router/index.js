// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import User_Login from '../components/Auth/User_Login.vue';
import User_Register from '../components/Auth/User_Register.vue';
import PasswordReset from '../components/Auth/PasswordReset.vue';
import BaseLayout from '../components/BaseLayout.vue';
import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import CoordinatorDashboard from '../components/CoordinatorHospital/CoordinatorDashboard.vue';
import OfficerDashboard from '../components/OfficerPolicestation/OfficerDashboard.vue';
import VehicleList from '../components/Admin/VehicleList.vue';
import AddVehicle from '../components/Admin/AddVehicle.vue';
import EditVehicle from '../components/Admin/EditVehicle.vue';
import UserManagement from '../components/Admin/UserManagement.vue';
import PendingRequest from '../components/CoordinatorHospital/PendingRequest.vue';
import PendingApprovals from '../components/OfficerPolicestation/PendingApprovals.vue';
import DriverDashboard from '../components/Driver/DriverDashboard.vue';
import TripDetails from '../components/Driver/TripDetails.vue';
import DriverVerification from '../components/TrafficPolice/DriverVerification.vue';
import TrafficDashboard from '../components/TrafficPolice/TrafficDashboard.vue';
import DriverApproval from '../components/DriverApproval.vue';
import DriverList from '../components/DriverList.vue';
import Driver_History from '../components/Driver_History.vue';
import User_Profile from '../components/User_Profile.vue';
import authMiddleware from '../router/auth.js';

const routes = [
  { path: '/', component: HomePage },
  { path: '/User_Login', component: User_Login },
  { path: '/User_Register', component: User_Register },
  { path: '/password-reset', component: PasswordReset },
  { path: '/Admin/AdminDashboard', component: AdminDashboard, beforeEnter: authMiddleware },
  { path: '/CoordinatorHospital/CoordinatorDashboard', component: CoordinatorDashboard, beforeEnter: authMiddleware },
  { path: '/OfficerPolicestation/OfficerDashboard', component: OfficerDashboard, beforeEnter: authMiddleware },
  { path: '/TrafficPolice/TrafficDashboard', component: TrafficDashboard, beforeEnter: authMiddleware },
  { path: '/Driver/DriverDashboard', component: DriverDashboard, beforeEnter: authMiddleware },
  {
    path: '/',
    component: BaseLayout,
    children: [
      { path: 'Admin/AddVehicles', component: VehicleList },
      { path: 'Admin/Vehicles', component: AddVehicle },
      { path: 'Admin/EditVehicle/:id', component: EditVehicle },
      { path: 'Admin/UserManagement', component: UserManagement },
      { path: 'CoordinatorHospital/PendingRequest', component: PendingRequest },
      { path: 'OfficerPolicestation/PendingApprovals', component: PendingApprovals },
      { path: 'Driver/TripDetails', component: TripDetails },
      { path: 'TrafficPolice/DriverVerification', component: DriverVerification },
      { path: 'DriverApproval', component: DriverApproval },
      { path: 'Driverlist', component: DriverList },
      { path: 'Driver_History', component: Driver_History },
      { path: 'User_Profile', component: User_Profile },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
