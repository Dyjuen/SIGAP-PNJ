// frontend/src/pages/Wadir/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderWadirDashboardPage(userRole) {
  const dashboardContent = `
        <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard Wadir</h1>
            <p>Selamat datang di dasbor Wadir!</p>
        </div>
    `;
  renderDashboardLayout(dashboardContent, userRole);
}