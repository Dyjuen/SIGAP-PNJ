// frontend/src/pages/Pengusul/DashboardPage.js
import { renderDashboardLayout } from '../../layout/AppLayout.js';

export function renderPengusulDashboardPage(userRole) {
    const dashboardContent = `
        <div class="p-8">
            <h1 class="text-2xl font-bold">Dashboard Pengusul</h1>
            <p>Welcome to the Pengusul dashboard!</p>
            <a href="/login" data-link>Go to Login</a>
        </div>
    `;
    renderDashboardLayout(dashboardContent, userRole);
}