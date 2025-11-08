// frontend/src/pages/Ppk/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPpkDashboardPage(userRole) {
  const dashboardContent = `
        <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard PPK</h1>
            <p>Selamat datang di dasbor PPK!</p>
        </div>
    `;
  renderDashboardLayout(dashboardContent, userRole);
}
