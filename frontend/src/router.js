// frontend/src/router.js
import { renderLoginPage } from "./pages/auth/LoginPage.js";
import { renderLandingPage } from "./pages/LandingPage/LandingPage.js";
import { renderPengusulDashboardPage } from "./pages/Pengusul/DashboardPage.js";
import { renderUserManagementPage } from "./pages/Admin/UserManagementPage.js";
import { renderDashboardVerifikator } from "./pages/Verifikator/Dashboard.js";
import { renderWadirDashboardPage } from "./pages/Wadir/Dashboard.js";
import { renderPpkDashboardPage } from "./pages/Ppk/Dashboard.js";
import { renderBendaharaDashboardPage } from "./pages/Bendahara/Dashboard.js";
import { renderNotFoundPage } from "./pages/NotFoundPage.js";
import { renderUsulanKakPage } from "./pages/Pengusul/UsulanKak.js";

// Placeholder function to get the current user's role.
// In a real application, this would fetch the role from an API, local storage, or a global variable set by the backend.
function getCurrentUserRole() {
  // Read the role from localStorage. Return 'guest' if not found.
  return localStorage.getItem("userRole") || "guest";
}

const routes = {
  "/": renderLandingPage,
  "/login": renderLoginPage,
  "/dashboard": renderPengusulDashboardPage,
  "/usulan-kak": renderUsulanKakPage,
  "/verifikator/dashboard": renderDashboardVerifikator,
  "/wadir/dashboard": renderWadirDashboardPage,
  "/ppk/dashboard": renderPpkDashboardPage,
  "/bendahara/dashboard": renderBendaharaDashboardPage,
  "/user-management": renderUserManagementPage,
};

export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFoundPage;
  const userRole = getCurrentUserRole(); // Get the user's role
  render(userRole); // Pass the userRole to the rendering function
}
