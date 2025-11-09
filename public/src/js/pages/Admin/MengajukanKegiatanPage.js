// frontend/src/pages/pengusul/MengajukanKegiatanPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';
import { pengusulSidebar } from '../../layout/sidebars/pengusulSidebar.js';

export function renderMengajukanKegiatanPage(userRole) {

  const pageContent = `
    <style>
      /* --- Custom CSS for Figma Design --- */
      
      /* 1. Main Background */
      .layout-wrapper {
        background-image: url('/assets/img/backgrounds/BG.png') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      .content-wrapper {
        background: transparent !important;
      }
      .layout-navbar, .content-footer, .layout-menu {
        background: #FFFFFF !important;
      }

      /* 2. Sidebar */
      .app-brand-text {
        color: #00BCD4 !important;
        font-size: 20px !important;
        font-weight: 700 !important;
      }
      .menu-inner .menu-item.active > .menu-link {
        background: #00BCD4 !important;
        color: #ffffff !important;
        border-radius: 8px;
        margin: 0 0.5rem;
        backdrop-filter: blur(5px);
      }
      .menu-inner .menu-item.active > .menu-link i,
      .menu-inner .menu-item.active > .menu-link div {
        color: #ffffff !important;
      }

      /* 3. Table Styling */
      .card-datatable {
        background: rgba(255, 255, 255, 0.6) !important;
        backdrop-filter: blur(10px);
        border-radius: 0.875rem !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
      }
      .table {
        border-collapse: separate !important;
        border-spacing: 0 1rem !important;
      }
      .table thead {
        background: transparent !important; 
      }
      .table thead th {
        color: #6B7280 !important;
        font-weight: 500 !important;
        background: transparent !important;
        border: none !important;
        text-transform: none !important;
        font-size: 14px !important;
        padding-top: 0 !important;
        padding-bottom: 0.5rem !important;
      }
      .table tbody tr {
        background: #FFFFFF !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        transition: all 0.2s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.08) !important;
      }
      .table tbody td {
        border: none !important;
        padding: 1.25rem 1rem !important;
        vertical-align: middle;
      }
      .table tbody td:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      .table tbody td:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      
      /* 4. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
      }
      .form-check-input:checked {
        background-color: #33C8DA !important;
        border-color: #33C8DA !important;
      }

      /* 5. Status Badge */
      .badge.bg-label-success {
        background: #d1f4dd !important;
        color: #0f7c3a !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      .badge.bg-label-warning {
        background: #fef3c7 !important;
        color: #92400e !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      .badge.bg-label-danger {
        background: #fecdd3 !important;
        color: #be123c !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      
      /* 6. Buttons */
      .btn-ajukan {
        background: #1DF07B !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3) !important;
        border: none !important;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-ajukan:hover {
        background: #24B364 !important;
        color: white !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4) !important;
      }
      .btn-ajukan:disabled {
        background: #B0BEC5 !important;
        cursor: not-allowed !important;
        opacity: 0.6;
      }

      /* 7. Search Bar */
      .navbar-search-wrapper .input-group {
        background: #FFFFFF !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
      }
      .navbar-search-wrapper .input-group-text {
        background: transparent !important;
        border: none !important;
      }
      .navbar-search-wrapper .form-control {
        background: transparent !important;
        border: none !important;
      }
      .navbar-search-wrapper .form-control:focus {
        box-shadow: none !important;
      }

      /* 8. Icon Styles */
      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 24px !important;
      }

      .menu-icon i,
      .navbar-nav i.ti {
        font-size: 35px !important;
        vertical-align: middle !important;
      }

      .menu-link i {
        margin-right: 10px !important;
      }
      
      .container-xxl {
        max-width: 96% !important;
      }

      .nav-item i.ti {
        font-size: 24px !important;
      }

      /* 9. Modal Styling */
      .modal-content {
        border-radius: 12px;
        border: none;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      }
      
      .modal-header {
        border-bottom: 1px solid #e5e7eb;
        padding: 1.5rem;
      }
      
      .modal-title {
        font-weight: 600;
        color: #1f2937;
      }
      
      .modal-body {
        padding: 1.5rem;
      }
      
      .modal-footer {
        border-top: 1px solid #e5e7eb;
        padding: 1rem 1.5rem;
      }

      /* 10. Form Styling */
      .form-label {
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
      }
      
      .form-control {
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 0.625rem 0.875rem;
        transition: all 0.2s;
      }
      
      .form-control:focus {
        border-color: #00BCD4;
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
      }

      /* 11. Button Styles */
      .btn-primary {
        background: #00bcd4 !important;
        color: white !important;
        border: none;
        padding: 0.625rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
      }

      .btn-primary:hover {
        background: #0097A7 !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      .btn-primary:disabled {
        background: #B0BEC5 !important;
        cursor: not-allowed !important;
        opacity: 0.6;
      }

      .btn-label-secondary {
        background: #f3f4f6 !important;
        color: #6b7280 !important;
        border: none;
        padding: 0.625rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
      }

      .btn-label-secondary:hover {
        background: #e5e7eb !important;
        color: #374151 !important;
      }

      /* Loading spinner */
      .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 0.15em;
      }

      /* Error message styling */
      .alert {
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      /* File upload styling */
      .form-control[type="file"] {
        padding: 0.5rem 0.875rem;
      }

      .form-control[type="file"]::file-selector-button {
        background: #f3f4f6;
        border: none;
        padding: 0.375rem 0.875rem;
        border-radius: 4px;
        margin-right: 0.875rem;
        cursor: pointer;
        font-weight: 500;
        color: #374151;
      }

      .form-control[type="file"]::file-selector-button:hover {
        background: #e5e7eb;
      }

      /* Pagination styling */
      .pagination {
        gap: 0.5rem;
      }

      .page-link {
        border: none;
        border-radius: 6px;
        padding: 0.5rem 0.875rem;
        color: #6b7280;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .page-link:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .page-item.active .page-link {
        background: #00BCD4;
        color: white;
        box-shadow: 0 2px 6px rgba(0, 188, 212, 0.3);
      }
    </style>

    <div class="mengajukan-kegiatan-page">
        <div class="card card-datatable table-responsive p-0">
            <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
                <thead>
                <tr>
                    <th style="width: 50px; text-align: center;">
                    <input type="checkbox" class="form-check-input" id="selectAll">
                    </th>
                    <th style="width: 80px;">No.</th>
                    <th>Nama Usulan Kegiatan</th>
                    <th>Tanggal Diajukan</th>
                    <th>Tanggal Disetujui</th>
                    <th style="text-align: center;">Status</th>
                    <th style="text-align: center;">Aksi</th>
                </tr>
                </thead>
                <tbody id="kegiatanTableBody">
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-4">
            <div class="text-muted">
                <small>Showing <span id="showingStart">1</span> to <span id="showingEnd">10</span> of <span id="totalEntries">50</span> entries</small>
            </div>
            <nav aria-label="Page navigation">
                <ul class="pagination mb-0" id="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="First">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">‹</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item active"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                    <li class="page-item"><a class="page-link" href="#">6</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">›</span>
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Last">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- Modal Ajukan Kegiatan -->
    <div class="modal fade" id="ajukanKegiatanModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAjukanTitle">Ajukan Kegiatan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="ajukanKegiatanError" class="alert alert-danger" style="display: none;"></div>
            <form id="ajukanKegiatanForm">
              <input type="hidden" id="kegiatanId">
              
              <div class="mb-3">
                <label for="penanggungJawab" class="form-label">Penangggungjawab Kegiatan</label>
                <input type="text" id="penanggungJawab" class="form-control" placeholder="Input" required>
              </div>
              
              <div class="mb-3">
                <label for="pelaksana" class="form-label">Pelaksana Kegiatan</label>
                <input type="text" id="pelaksana" class="form-control" placeholder="Input" required>
              </div>
              
              <div class="mb-3">
                <label for="suratPengantar" class="form-label">Surat Pengantar</label>
                <input type="file" id="suratPengantar" class="form-control" accept=".pdf,.doc,.docx" required>
                <small class="text-muted">Format: PDF, DOC, DOCX (Max 5MB)</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnSelesaiAjukan">
              <span class="button-text">Selesai</span>
              <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render the main layout with the page-specific content
  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // DATA & STATE
  // ==============================================
  const kegiatan = [
    { 
      id: 1, 
      nama: 'KAK (Nama Kegiatan)', 
      pengusul: 'Pengusul',
      tanggalDiajukan: '29 September 2025', 
      tanggalDisetujui: '28 Desember 2025', 
      status: 'Diterima' 
    },
    { 
      id: 2, 
      nama: 'KAK (Nama Kegiatan)', 
      pengusul: 'Pengusul',
      tanggalDiajukan: '29 September 2025', 
      tanggalDisetujui: '28 Desember 2025', 
      status: 'Diterima' 
    },
    { 
      id: 3, 
      nama: 'KAK (Nama Kegiatan)', 
      pengusul: 'Pengusul',
      tanggalDiajukan: '29 September 2025', 
      tanggalDisetujui: '28 Desember 2025', 
      status: 'Diterima' 
    },
    { 
      id: 4, 
      nama: 'KAK (Nama Kegiatan)', 
      pengusul: 'Pengusul',
      tanggalDiajukan: '29 September 2025', 
      tanggalDisetujui: '28 Desember 2025', 
      status: 'Diterima' 
    },
  ];

  let currentKegiatanId = null;
  let ajukanModalInstance = null;

  // ==============================================
  // UI FUNCTIONS
  // ==============================================
  function showModalError(message) {
    const errorDiv = document.getElementById('ajukanKegiatanError');
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
  }

  function hideModalError() {
    const errorDiv = document.getElementById('ajukanKegiatanError');
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
  }

  function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    const textSpan = button.querySelector('.button-text');
    const spinner = button.querySelector('.spinner-border');
    
    if (isLoading) {
      button.disabled = true;
      if (spinner) spinner.classList.remove('d-none');
      if (textSpan) textSpan.style.opacity = '0';
    } else {
      button.disabled = false;
      if (spinner) spinner.classList.add('d-none');
      if (textSpan) textSpan.style.opacity = '1';
    }
  }

  function renderTableRows(data) {
    const tbody = document.getElementById('kegiatanTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach((item, index) => {
      const statusClass = item.status === 'Diterima' ? 'bg-label-success' : 
                         item.status === 'Pending' ? 'bg-label-warning' : 'bg-label-danger';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${item.id}</span>
        </td>
        <td>
          <div style="display: flex; flex-direction: column;">
            <strong>${item.nama}</strong>
            <small class="text-muted">${item.pengusul}</small>
          </div>
        </td>
        <td>${item.tanggalDiajukan}</td>
        <td>${item.tanggalDisetujui}</td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}">${item.status}</span>
        </td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm btn-ajukan" 
            data-id="${item.id}"
            data-nama="${item.nama}"
          >
            <i class="ti">&#xea5e;</i> Ajukan
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAll);
    });

    document.querySelectorAll('.btn-ajukan').forEach(btn => {
      btn.addEventListener('click', handleAjukan);
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredKegiatan = kegiatan.filter(item => 
          item.nama.toLowerCase().includes(searchTerm) ||
          item.pengusul.toLowerCase().includes(searchTerm) ||
          item.status.toLowerCase().includes(searchTerm)
        );
        renderTableRows(filteredKegiatan);
      });
    }
  }

  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => cb.checked = this.checked);
    });
  }

  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll('.row-checkbox');
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  function handleAjukan(e) {
    const btn = e.currentTarget;
    const id = btn.getAttribute('data-id');
    const nama = btn.getAttribute('data-nama');
    
    currentKegiatanId = id;
    
    // Reset form
    document.getElementById('ajukanKegiatanForm').reset();
    document.getElementById('kegiatanId').value = id;
    hideModalError();
    
    // Show modal
    if (!ajukanModalInstance) {
      if (typeof bootstrap !== 'undefined') {
        ajukanModalInstance = new bootstrap.Modal(document.getElementById('ajukanKegiatanModal'));
      } else {
        console.error('Bootstrap 5 JS not found. Modals will not work.');
        return;
      }
    }
    ajukanModalInstance.show();
  }

  // ==============================================
  // SUBMIT KEGIATAN (NO API - LOCAL ONLY)
  // ==============================================
  const btnSelesaiAjukan = document.getElementById('btnSelesaiAjukan');
  if (btnSelesaiAjukan) {
    btnSelesaiAjukan.addEventListener('click', () => {
      const kegiatanId = document.getElementById('kegiatanId').value;
      const penanggungJawab = document.getElementById('penanggungJawab').value.trim();
      const pelaksana = document.getElementById('pelaksana').value.trim();
      const suratPengantar = document.getElementById('suratPengantar').files[0];

      // Validasi form
      if (!penanggungJawab || !pelaksana || !suratPengantar) {
        showModalError('Semua field harus diisi!');
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (suratPengantar.size > 5 * 1024 * 1024) {
        showModalError('Ukuran file maksimal 5MB!');
        return;
      }

      // Validasi format file
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(suratPengantar.type)) {
        showModalError('Format file harus PDF, DOC, atau DOCX!');
        return;
      }

      // Show loading state
      setButtonLoading('btnSelesaiAjukan', true);
      hideModalError();

      // Simulate processing
      setTimeout(() => {
        // Update status in local data
        const index = kegiatan.findIndex(k => k.id == kegiatanId);
        if (index !== -1) {
          kegiatan[index].status = 'Diajukan';
        }
        
        // Update UI
        renderTableRows(kegiatan);
        
        // Close modal
        if (ajukanModalInstance) {
          ajukanModalInstance.hide();
        }
        
        // Reset form
        document.getElementById('ajukanKegiatanForm').reset();
        
        // Hide loading
        setButtonLoading('btnSelesaiAjukan', false);
        
        // Show success message
        alert('Kegiatan berhasil diajukan!');
      }, 1000);
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderTableRows(kegiatan);

  // Set active menu item
  setTimeout(() => {
    // Find and activate the "Pengajuan Kegiatan" parent menu
    const pengajuanMenu = document.querySelector('a[href="javascript:void(0);"] .menu-icon.ti-file-invoice')?.closest('.menu-item');
    if (pengajuanMenu) {
      pengajuanMenu.classList.add('open');
    }
    
    // Find and activate the "Mengajukan Kegiatan" submenu
    const mengajukanMenuItem = document.querySelector('a[href="/mengajukan-kegiatan"]')?.closest('.menu-item');
    if (mengajukanMenuItem) {
      mengajukanMenuItem.classList.add('active');
      const menuLink = mengajukanMenuItem.querySelector('.menu-link');
      if (menuLink) {
        menuLink.classList.add('active');
      }
    }
  }, 100);

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}