// frontend/src/pages/Bendahara/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderBendaharaDashboardPage(userRole) {
  const dashboardContent = `
        <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard Bendahara</h1>
            <p>Selamat datang di dasbor Bendahara!</p>
        </div>
    `;
  renderDashboardLayout(dashboardContent, userRole);
}
