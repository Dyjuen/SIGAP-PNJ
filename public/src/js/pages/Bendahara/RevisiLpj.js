// frontend/src/pages/Bendahara/RevisiLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

// Placeholder for the new page's logic
export function renderRevisiLpjPage(path, userRole) {
  const isBendahara = userRole.toLowerCase() === "bendahara";
  const isPengusul = userRole.toLowerCase() === "pengusul";

  // For Bendahara, inputs are for commenting. For Pengusul, they view comments and edit realization.
  const inputAttr = isPengusul ? "" : "readonly disabled";
  const inputStyle = isPengusul
    ? ""
    : "border-color: #F3F4F6 !important; background: #F3F4F6 !important; cursor: default;";

  const pageContent = `
    <style>
      /* Using styles from RevisiKak.js for comments */
      .comment-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; background: #E0F7FA; color: #00BCD4; border: 2px solid #B2EBF2; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; z-index: 10; }
      .comment-icon:hover { background: #00BCD4; color: white; transform: translateY(-50%) scale(1.1); }
      .comment-icon.has-comment { background: #FEE2E2; color: #EF4444; border-color: #FCA5A5; animation: pulse-comment 2s infinite; }
      @keyframes pulse-comment { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } }
      .input-with-comment { position: relative; }
      .input-with-comment input, .input-with-comment textarea { padding-right: 52px !important; }
      .action-buttons { background: white; border-radius: 16px; padding: 2rem; margin-top: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; justify-content: space-between; align-items: center; border-top: 4px solid #EF4444; }
      .btn-primary-action { padding: 1rem 2.5rem; border-radius: 12px; font-weight: 600; font-size: 1rem; transition: all 0.3s ease; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
      .btn-revise { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; }
      .btn-revise:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4); }
      .btn-back { padding: 1rem 2rem; border-radius: 12px; background: #F3F4F6; color: #6B7280; font-weight: 600; border: 2px solid #E5E7EB; cursor: pointer; transition: all 0.3s ease; }
      .btn-back:hover { background: #E5E7EB; color: #374151; }
    </style>
    <div class="revisi-lpj-page">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-2">Revisi Laporan Pertanggungjawaban (LPJ)</h2>
        <p class="text-gray-500 mb-8" id="namaKegiatanHeader">Memuat nama kegiatan...</p>

        <div id="lpjItemsContainer">
            <div class="text-center p-8">Loading...</div>
        </div>
      </div>
      
       <!-- Action Buttons (Fixed at bottom) -->
      <div class="action-buttons">
        ${
          isBendahara
            ? `
          <button class="btn-back">
            <i class="ti ti-arrow-left"></i> Kembali
          </button>
          <div class="flex gap-4">
            <button class="btn-primary-action btn-revise" id="submitRevisiButton">
              <i class="ti ti-send"></i>
              Kirim Revisi
            </button>
          </div>
        `
            : isPengusul
            ? `
          <button class="btn-back">
            <i class="ti ti-arrow-left"></i> Kembali
          </button>
          <div class="flex gap-4">
            <button class="btn-primary-action btn-primary" id="resubmitLpjButton">
              <i class="ti ti-send"></i>
              Submit Ulang LPJ
            </button>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);
  // We will initialize the logic for this page in the next steps
  initializeRevisiLpjPage(path, userRole);
}

function initializeRevisiLpjPage(path, userRole) {
  // Placeholder for the logic
  console.log(
    "Revisi LPJ Page Initialized for role:",
    userRole,
    "and path:",
    path
  );
}
