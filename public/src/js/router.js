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
import { renderRevisiKakPage } from "./pages/Verifikator/RevisiKak.js";
import { renderMonitoringKegiatanPage } from "./pages/Pengusul/MonitoringKegiatan.js";
import { renderRiwayatKAKPage } from "./pages/Pengusul/RiwayatKAK.js";

function getCurrentUserRole() {
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
    "/usulan-kak/": renderUsulanKakPage,
    "/usulan-kak": renderUsulanKakPage,
    "/monitoring-usulan": renderMonitoringUsulanPage,
    "/preview-kak": renderPreviewKakPage,
    "/mengajukan-kegiatan": renderMengajukanKegiatanPage,
    "/monitoring-kegiatan": renderMonitoringKegiatanPage,
    "/pengajuan-lpj": renderPengajuanLpjPage,
    "/input-lpj": renderInputLpjPage,
    "/riwayat-kak": renderRiwayatKAKPage,
    "/pengaturan": renderNotFoundPage,
  },
  Verifikator: {
    "/dashboard": renderDashboardVerifikator,
    "/monitoring-usulan": renderDashboardVerifikator,
    "/riwayat": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
    "/revisi-kak/": renderRevisiKakPage,
  },
  Wadir: {
    "/dashboard": renderWadirDashboardPage,
    "/verifikasi-kegiatan": renderWadirDashboardPage,
    "/monitoring-kegiatan": renderNotFoundPage,
    "/pengaturan": renderNotFoundPage,
  },
  PPK: {
    "/dashboard": renderPpkDashboardPage,
    "/setujui-kegiatan": renderPpkDashboardPage,
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
  const pathSegments = path.split("/").filter((segment) => segment);

  if (pathSegments.length > 0) {
    const urlRoleSegment = pathSegments[0].toLowerCase();

    // Find the role key from the URL
    const roleFromUrl = Object.keys(roleBasedRoutes).find(
      (k) => k.toLowerCase() === urlRoleSegment
    );

    // 1. Check if the role from the URL is valid
    if (!roleFromUrl) {
      renderNotFoundPage(userRole);
      return;
    }

    // 2. Security Check
    if (userRole === "guest" || userRole !== roleFromUrl) {
      renderUnauthorizedPage();
      return;
    }

    // 3. If authorized, find the best matching page
    const pagePath = "/" + pathSegments.slice(1).join("/");
    const roleRoutes = roleBasedRoutes[userRole];

    // Check for exact match first
    if (roleRoutes[pagePath]) {
      roleRoutes[pagePath](path, userRole);
      return;
    }

    // Check for prefix match (for routes with IDs)
    const matchedKey = Object.keys(roleRoutes)
      .sort((a, b) => b.length - a.length)
      .find((key) => pagePath.startsWith(key));

    if (matchedKey) {
      const handler = roleRoutes[matchedKey];
      // Pass the full path and userRole to the page handler
      handler(path, userRole);
      return;
    }
  }

  // If no route is matched, render Not Found page
  renderNotFoundPage(userRole);
}
