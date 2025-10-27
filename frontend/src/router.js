// frontend/src/router.js
import { renderLoginPage } from "./pages/auth/LoginPage.js";
import { renderPengusulDashboardPage } from './pages/Pengusul/DashboardPage.js';
import { renderUserManagementPage } from './pages/Admin/UserManagementPage.js';
import { renderNotFoundPage } from "./pages/NotFoundPage.js";

// Placeholder function to get the current user's role.
// In a real application, this would fetch the role from an API, local storage, or a global variable set by the backend.
function getCurrentUserRole() {
  // Read the role from localStorage. Return 'guest' if not found.
  return localStorage.getItem('userRole') || 'guest';
}

const routes = {
  "/": renderLoginPage,
  "/login": renderLoginPage,
  '/dashboard': renderPengusulDashboardPage,
  '/user-management': renderUserManagementPage
};

export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFoundPage;
  const userRole = getCurrentUserRole(); // Get the user's role
  render(userRole); // Pass the userRole to the rendering function
}
