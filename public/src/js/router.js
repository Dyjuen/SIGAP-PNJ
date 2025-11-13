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
import { renderMengajukanKegiatanPage } from "./pages/Pengusul/MengajukanKegiatanPage.js";
import { renderPencairanDanaPage } from "./pages/Bendahara/PencairanDanaPage.js";
import { renderMonitoringUsulanPage } from "./pages/Pengusul/MonitoringUsulan.js";
import { renderPengajuanLpjPage } from "./pages/Pengusul/PengajuanLpj.js";
import { renderInputLpjPage } from "./pages/Pengusul/InputLpj.js";
import { renderUnauthorizedPage } from "./pages/UnauthorizedPage.js";

function getCurrentUserRole() {
  // In a real app, this would be more secure, perhaps involving a token verification
  return localStorage.getItem("userRole") || "guest";
}

const publicRoutes = {
  "/": renderLandingPage,
  "/login": renderLoginPage,
};

const roleBasedRoutes = {
  guest: {
    "/": renderLandingPage,
    "/login": renderLoginPage,
  },
  Admin: {
    "/dashboard": renderUserManagementPage,
    "/user-management": renderUserManagementPage,
    "/mengajukan-kegiatan": renderMengajukanKegiatanPage,
    "/template": renderNotFoundPage,
    "/settings": renderNotFoundPage,
  },
  Pengusul: {
    "/dashboard": renderPengusulDashboardPage,
    "/usulan-kak": renderUsulanKakPage,
    "/monitoring-usulan": renderMonitoringUsulanPage,
    "/preview-kak": renderPreviewKakPage,
    "/mengajukan-kegiatan": renderMengajukanKegiatanPage,
    "/monitoring-kegiatan": renderNotFoundPage,
    "/pengajuan-lpj": renderPengajuanLpjPage,
    "/input-lpj": renderInputLpjPage,
    "/riwayat": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
  Verifikator: {
    "/dashboard": renderDashboardVerifikator,
    "/monitoring-usulan": renderNotFoundPage,
    "/riwayat": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
  WD2: {
    "/dashboard": renderWadirDashboardPage,
    "/verifikasi-kegiatan": renderNotFoundPage,
    "/monitoring-kegiatan": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
  PPK: {
    "/dashboard": renderPpkDashboardPage,
    "/setujui-kegiatan": renderNotFoundPage,
    "/monitoring-kegiatan": renderNotFoundPage,
    "/riwayat": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
  Bendahara: {
    "/dashboard": renderBendaharaDashboardPage,
    "/pencairan-dana": renderPencairanDanaPage,
    "/daftar-lpj": renderNotFoundPage,
    "/riwayat": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
};

export function router() {
  const path = window.location.pathname;
  const userRole = getCurrentUserRole();

  // Handle public routes first
  if (publicRoutes[path]) {
    publicRoutes[path]();
    return;
  }

  // Handle role-based routes
  const pathSegments = path.split("/").filter((segment) => segment); // e.g., ['pengusul', 'dashboard']
  
  if (pathSegments.length > 0) {
    const roleFromUrl = pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
    const pagePath = "/" + pathSegments.slice(1).join("/");

    // 1. Check if the role from the URL is a valid role
    if (!roleBasedRoutes[roleFromUrl]) {
      renderNotFoundPage(userRole); // If the role itself doesn't exist, it's a 404
      return;
    }

    // 2. Security Check: Does the user's role match the URL's role?
    if (userRole === "guest" || userRole !== roleFromUrl) {
      renderUnauthorizedPage(); // If role is valid but user is not authorized, it's a 403
      return;
    }

    // 3. If authorized, find the specific page
    const roleRoutes = roleBasedRoutes[userRole];
    if (roleRoutes && roleRoutes[pagePath]) {
      roleRoutes[pagePath](userRole);
      return;
    }
  }

  // If no route is matched after all checks, render the Not Found page
  renderNotFoundPage(userRole);
}
