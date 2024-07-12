import store from '@/store'; // Assuming store is the Vuex store instance

export default function authMiddleware(to, from, next) {
  const isAuthenticated = store.getters['isAuthenticated'];
  
  // Check if the user is authenticated
  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    next('/User_Login');
    return;
  }
  
  const userRole = store.getters['userRole'];

  // Define roles and their allowed routes
  const roleRoutes = {
    Admin: ['/Admin/AdminDashboard', '/Admin/AddVehicles', '/Admin/Vehicles', '/Admin/EditVehicle', '/Admin/UserManagement'],
    CoordinatorHospital: ['/CoordinatorHospital/CoordinatorDashboard', '/CoordinatorHospital/PendingRequest'],
    OfficerPolicestation: ['/OfficerPolicestation/OfficerDashboard', '/OfficerPolicestation/officerDriverApproval'],
    TrafficPolice: ['/TrafficPolice/TrafficDashboard', '/TrafficPolice/DriverVerification'],
    Driver: ['/Driver/DriverDashboard', '/Driver/TripDetails', '/Driver/DriverVerification'],
    Citizen: ['/citizen/citizenDashboard', '/citizen/myIncidents', '/citizen/reportIncident'],
  };

  // Check if the user's role is allowed to access the requested route
  const allowedRoutes = roleRoutes[userRole] || [];
  const isAllowed = allowedRoutes.some(route => to.path.startsWith(route));
  if (!isAllowed) {
    // User's role does not allow access to the requested route
    // Redirect them to the dashboard or another appropriate route
    next('/'); // Redirect to login or home page
  } else {
    // User's role allows access to the requested route
    next(); // Continue to the requested route
  }
}