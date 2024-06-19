// router/auth.js

import store from '@/store'; // Assuming store is the Vuex store instance

export default function authMiddleware(to, from, next) {
  const isAuthenticated = store.getters['user/isAuthenticated'];
  
  // Check if the user is authenticated
  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    next('/');
    return;
  }
  
  const userRole = store.getters['user/userRole'];

  // Define roles and their allowed routes
  const roleRoutes = {
    Admin: ['/Admin/AdminDashboard'],
    CoordinatorHospital : ['/CoordinatorHospital/CoordinatorDashboard', '/CoordinatorHospital/PendingRequest'],
    OfficerPolicestation: ['/OfficerPolicestation/OfficerDashboard', '/OfficerPolicestation/PendingApprovals'],
    TrafficPolice: ['/TrafficPolice/TrafficDashboard'],
    Driver: ['/Driver/DriverDashboard', '/Driver/TripDetails', '/Driver/DriverVerification'],
  };

  // Check if the user's role is allowed to access the requested route
  const allowedRoutes = roleRoutes[userRole] || [];
  if (!allowedRoutes.includes(to.path)) {
    // User's role does not allow access to the requested route
    // Redirect them to the dashboard or another appropriate route
    next('/'); // Redirect to login or home page
  } else {
    // User's role allows access to the requested route
    next(); // Continue to the requested route
  }
}
