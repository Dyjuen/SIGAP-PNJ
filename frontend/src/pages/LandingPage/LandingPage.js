// LandingPage.js

import { createFooter } from "./Footer.js";
import { createNavbar } from "./Navbar.js";

export function renderLandingPage(userRole) {
  const mainContent = `
    <div class="min-h-screen bg-gray-100">
      ${createNavbar()}

      <!-- Hero section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
              Membantu digitalisasi proses administrasi kegiatan kampus secara cepat, transparan, dan efisien
            </h1>
            <p class="text-lg text-gray-600 mb-8">
              Platform yang mempermudah pengusulan dan pelaporan kegiatan di lingkungan Politeknik Negeri Jakarta
            </p>
            <a href="#" class="bg-[#00A9B8] text-white px-8 py-3 rounded-lg hover:bg-[#008999] transition-colors">
              Mulai Sekarang
            </a>
          </div>
        </div>
      </section>

      <!-- Features section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="font-bold text-xl mb-4">Pengajuan KAK</h3>
              <p class="text-gray-600">Ajukan Kerangka Acuan Kerja dengan mudah dan terstruktur</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="font-bold text-xl mb-4">Pelaporan LPJ</h3>
              <p class="text-gray-600">Buat dan kelola Laporan Pertanggungjawaban secara digital</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="font-bold text-xl mb-4">Tracking Status</h3>
              <p class="text-gray-600">Pantau status pengajuan dan pelaporan secara real-time</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer dari Footer.js akan ditambahkan di sini -->
    <div id="footer" class=""></div>
  `;

  // Kosongkan dan tambahkan konten utama ke elemen root
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = mainContent;
  } else {
    console.error("Root element #root not found.");
  }

  // Import dan jalankan createFooter dari Footer.js
  createFooter();

  // Toggle mobile menu logic
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}
