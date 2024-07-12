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
import AddVehicle from '@/components/Admin/AddVehicle.vue';
import EditVehicle from '@/components/Admin/EditVehicle.vue';
import UserManagement from '@/components/Admin/UserManagement.vue';
import VehicleList from '@/components/Admin/VehicleList.vue';
import PendingRequest from '@/components/PendingRequest.vue';
import DriverApproval from '@/components/DriverApproval.vue';
import Driver_History from '@/components/Driver_History.vue';
import TripDetails from '@/components/Driver/TripDetails.vue';
import DriverVerification from '@/components/TrafficPolice/DriverVerification.vue';
import DriverList from '@/components/DriverList.vue';
import AddDriver from '@/components/Admin/AddDriver.vue';
import DriverNotification from '@/components/DriverNotification.vue';
import DarkModeSwitch from '@/components/DarkModeSwitch.vue';
import myIncidents from '@/components/citizen/myIncidents.vue';
import reportIncident from '@/components/citizen/reportIncident.vue';
import citizenDashboard from '@/components/citizen/citizenDashboard.vue';
import officerDriverApproval from '@/components/OfficerPolicestation/officerDriverApproval.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/User_Login', component: User_Login },
  { path: '/User_Register', component: User_Register },
  { path: '/officerDriverApproval', component: officerDriverApproval },
  { path: '/password-reset', component: PasswordReset },
  {
    path: '/',
    component: BaseLayout,
    beforeEnter: authMiddleware,
    children: [
      { path: 'Admin/AdminDashboard', component: AdminDashboard }, // Remove the extra slash here
      { path: 'CoordinatorHospital/CoordinatorDashboard', component: CoordinatorDashboard },
      { path: 'OfficerPolicestation/OfficerDashboard', component: OfficerDashboard },
      { path: 'Driver/DriverDashboard', component: DriverDashboard },
      { path: 'TrafficPolice/TrafficDashboard', component: TrafficDashboard },
      { path: 'citizen/citizenDashboard', component: citizenDashboard},
      { path: 'citizen/myIncidents', component: myIncidents},
      { path: 'citizen/reportIncident', component: reportIncident},
      { path: 'User_Profile', component: User_Profile },
      { path: 'Admin/AddVehicle', component: AddVehicle },
      { path: 'Admin/EditVehicle', component:EditVehicle},
      { path: 'Admin/UserManagement', component:UserManagement},
      { path: 'Admin/VehicleList', component:VehicleList},
      { path: 'PendingRequest',component:PendingRequest},
      { path: 'DriverApproval', component:DriverApproval},
      { path: 'Driver_History',component:Driver_History},
      { path: 'Driver/TripDetails',component:TripDetails},
      { path: 'TrafficPolice/DriverVerification/',component:DriverVerification},
      { path: 'DriverList', component:DriverList},
      { path: 'Admin/AddDriver', component:AddDriver},
      { path: 'DriverNotification', component:DriverNotification},
      { path: 'DarkModeSwitch', component:DarkModeSwitch},
      //{ path: 'OfficerPolicestation/officerDriverApproval', component:officerDriverApproval},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
