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
import { renderUsulanKakPage } from "./pages/Pengusul/StepUsulanKak.js";
import { renderPreviewKakPage } from "./pages/Pengusul/PreviewKak.js";
import { renderFullUsulanKakPage } from "./pages/Pengusul/FullUsulanKak.js";

// Placeholder function to get the current user's role.
// In a real application, this would fetch the role from an API, local storage, or a global variable set by the backend.
function getCurrentUserRole() {
  // Read the role from localStorage. Return 'guest' if not found.
  return localStorage.getItem("userRole") || "guest";
}

const routes = {
  "/": renderLandingPage,
  "/login": renderLoginPage,
  "/usulan-kak": renderUsulanKakPage,
  "/verifikator/dashboard": renderDashboardVerifikator,
  "/wadir/dashboard": renderWadirDashboardPage,
  "/ppk/dashboard": renderPpkDashboardPage,
  "/bendahara/dashboard": renderBendaharaDashboardPage,
  "/form-kak": renderFullUsulanKakPage,
  "/preview-kak": renderPreviewKakPage,
};

export function router() {
  const path = window.location.pathname;
  const userRole = getCurrentUserRole(); // Get the user's role

  let renderFunction = renderNotFoundPage;

  if (path === "/dashboard") {
    switch (userRole) {
      case "Pengusul":
        renderFunction = renderPengusulDashboardPage;
        break;
      case "WD2":
        renderFunction = renderWadirDashboardPage;
        break;
      case "Verifikator":
        renderFunction = renderDashboardVerifikator;
        break;
      case "PPK":
        renderFunction = renderPpkDashboardPage;
        break;
      case "Bendahara":
        renderFunction = renderBendaharaDashboardPage;
        break;
      case "Admin": // Assuming Admin also has a dashboard, or redirects to user management
        renderFunction = renderUserManagementPage; // Or a specific admin dashboard
        break;
      default:
        renderFunction = renderLoginPage; // Redirect unauthenticated users to login
        break;
    }
  } else if (routes[path]) {
    renderFunction = routes[path];
  }

  renderFunction(userRole); // Pass the userRole to the rendering function
}
