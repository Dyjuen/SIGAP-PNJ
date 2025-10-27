// frontend/src/pages/Verifikator/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderVerifikatorDashboardPage(userRole) {
  const dashboardContent = `
        <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard Verifikator</h1>
            <p>Selamat datang di dasbor Verifikator!</p>
        </div>
    `;
  renderDashboardLayout(dashboardContent, userRole);
}