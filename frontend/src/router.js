// frontend/src/router.js
import { renderLoginPage } from "./pages/auth/LoginPage.js";
import { renderPengusulDashboardPage } from './pages/Pengusul/DashboardPage.js';
import { renderUserManagementPage } from './pages/Admin/UserManagementPage.js';
import { renderNotFoundPage } from "./pages/NotFoundPage.js";

const routes = {
  "/": renderLoginPage,
  "/login": renderLoginPage,
  '/dashboard': renderPengusulDashboardPage,
  '/user-management': renderUserManagementPage
};

export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFoundPage;
  render();
}
