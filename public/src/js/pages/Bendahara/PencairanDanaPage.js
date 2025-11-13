// frontend/src/pages/bendahara/PencairanDanaPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';

export function renderPencairanDanaPage(userRole) {

  const pageContent = `
    <style>
      /* --- Custom CSS for Pencairan Dana Page --- */
      
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

      /* 2. Sidebar - Make sure active menu item is highlighted */
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
      
      /* 3. Stat Cards - Cyan/Turquoise Theme */
      .stat-card {
        transition: all 0.4s ease;
        border-radius: 1rem !important;
        border: none !important;
        overflow: hidden;
        height: 100%;
      }
      
      .stat-card-primary {
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%) !important;
        color: #FFFFFF !important;
        backdrop-filter: blur(10px);
      }
      .stat-card-primary h1, .stat-card-primary h4, .stat-card-primary span, .stat-card-primary small {
        color: #FFFFFF !important;
      }
      
      .stat-card-secondary {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-secondary h1, .stat-card-secondary h4, .stat-card-secondary span, .stat-card-secondary small {
        color: #00bcd4 !important;
      }
      
      .stat-card-tertiary {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-tertiary h1, .stat-card-tertiary h4, .stat-card-tertiary span, .stat-card-tertiary small {
        color: #00bcd4 !important;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 188, 212, 0.15) !important;
      }

      /* 4. Table Card with Glassmorphism */
      .card-datatable {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(15px);
        border-radius: 1rem !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
        border: none !important;
      }
      
      /* 5. Table Styling */
      .table {
        border-collapse: separate !important;
        border-spacing: 0 0.75rem !important;
      }
      .table thead {
        background: transparent !important;
      }
      .table thead th {
        color: #6B7280 !important;
        font-weight: 600 !important;
        background: transparent !important;
        border: none !important;
        text-transform: uppercase !important;
        font-size: 11px !important;
        letter-spacing: 0.5px !important;
        padding-top: 0 !important;
        padding-bottom: 1rem !important;
      }
      
      /* Table Row Cards */
      .table tbody tr {
        background: #FFFFFF !important;
        border-radius: 12px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        transition: all 0.3s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 16px rgba(0, 188, 212, 0.12) !important;
      }
      .table tbody tr.row-active {
        background: linear-gradient(135deg, rgba(77, 208, 225, 0.15) 0%, rgba(0, 188, 212, 0.1) 100%) !important;
        border-left: 4px solid #00BCD4 !important;
      }
      
      .table tbody td {
        border: none !important;
        padding: 1.25rem 1rem !important;
        vertical-align: middle;
      }
      .table tbody td:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        padding-left: 1.5rem !important;
      }
      .table tbody td:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        padding-right: 1.5rem !important;
      }
      
      /* 6. Number Badge */
      .number-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 10px;
        font-weight: 700;
        font-size: 15px;
        color: #374151;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      /* 7. Activity Title Styling */
      .activity-title {
        font-weight: 700;
        font-size: 15px;
        color: #111827;
        margin-bottom: 4px;
      }
      .activity-subtitle {
        font-size: 13px;
        color: #6B7280;
        font-weight: 500;
      }
      
      /* 8. Status Badges */
      .badge {
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.3px;
        display: inline-block;
        min-width: 90px;
        text-align: center;
      }
      .badge-menunggu {
        background: #FEF3C7 !important;
        color: #92400E !important;
      }
      .badge-disetujui {
        background: #D1FAE5 !important;
        color: #065F46 !important;
      }
      .badge-ditolak {
        background: #FEE2E2 !important;
        color: #991B1B !important;
      }
      
      /* 9. Action Buttons */
      .btn-action {
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 13px;
        border: none;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      
      .btn-cairkan {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-cairkan:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4) !important;
      }
      
      .btn-selesai {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%) !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3) !important;
      }
      .btn-selesai:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 188, 212, 0.4) !important;
      }
      
      /* 10. Pagination */
      .pagination {
        margin-top: 1.5rem;
        gap: 0.5rem;
      }
      .page-link {
        border: none;
        background: rgba(255, 255, 255, 0.8);
        color: #6B7280;
        font-weight: 600;
        border-radius: 8px;
        padding: 10px 16px;
        min-width: 40px;
        text-align: center;
        transition: all 0.3s ease;
      }
      .page-link:hover {
        background: rgba(0, 188, 212, 0.1);
        color: #00BCD4;
      }
      .page-item.active .page-link {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      /* 11. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .form-check-input:checked {
        background-color: #00BCD4 !important;
        border-color: #00BCD4 !important;
      }
      
      /* 12. Showing entries text */
      .entries-info {
        color: #6B7280;
        font-size: 14px;
        font-weight: 500;
      }
      
      /* 13. Icons */
      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 18px !important;
      }
      
      /* 14. Container adjustments */
      .container-xxl {
        max-width: 96% !important;
      }

      /* 15. Menu icons consistency */
      .menu-icon i.ti {
        font-size: 24px !important;
      }
    </style>

    <div class="pencairan-dana-page">
      <!-- Statistics Cards -->
      <div class="row g-4 mb-4">
        <div class="col-sm-12 col-xl-4">
          <div class="card stat-card stat-card-primary">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Kegiatan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 18px; font-weight: 600;">Total Dana Keluar</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 32px; font-weight: 700; letter-spacing: -1px;">Rp. <span id="totalDanaKeluar">80.000.000</span></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6 col-xl-4">
          <div class="card stat-card stat-card-secondary">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Kegiatan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 18px; font-weight: 600;">Menunggu</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="totalMenunggu">10</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6 col-xl-4">
          <div class="card stat-card stat-card-tertiary">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 18px; font-weight: 600;">Telat</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="totalTelat">10</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 0.75rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pengusul</th>
              <th>Tanggal Diajukan</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="kegiatanTableBody">
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div class="entries-info">
            Showing <span id="showingStart">1</span> to <span id="showingEnd">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination mb-0" id="paginationContainer">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="First">
                  <i class="ti">&#xea64;</i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <i class="ti">&#xea65;</i>
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
                  <i class="ti">&#xea5e;</i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Last">
                  <i class="ti">&#xea5d;</i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  ;spacing: -1px;" id="totalMenunggu">10</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-sm-6 col-xl-4">
          <div class="card stat-card stat-card-tertiary">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 18px; font-weight: 600;">Telat</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="totalTelat">10</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 0.75rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pengusul</th>
              <th>Tanggal Diajukan</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="kegiatanTableBody">
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div class="entries-info">
            Showing <span id="showingStart">1</span> to <span id="showingEnd">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination mb-0" id="paginationContainer">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="First">
                  <i class="ti">&#xea64;</i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <i class="ti">&#xea65;</i>
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
                  <i class="ti">&#xea5e;</i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Last">
                  <i class="ti">&#xea5d;</i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `;

  // Render the main layout with the page-specific content
  renderDashboardLayout(pageContent, userRole);

  // Set active menu item for Pencairan Dana
  setTimeout(() => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      const link = item.querySelector('a[href="/bendahara/pencairan-dana"]');
      if (link) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, 100);

  // ==============================================
  // SAMPLE DATA
  // ==============================================
  
  const kegiatanData = [
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
    { 
      id: 1, 
      namaKegiatan: 'KAK (Nama Kegiatan)', 
      subKegiatan: 'Pengusul',
      pengusul: 'Nama Pengusul',
      subPengusul: 'himpunan /lain',
      tanggal: '28 Desember 2025', 
      status: 'Menunggu' 
    },
  ];

  /**
   * Render table rows
   */
  function renderTableRows(data) {
    const tbody = document.getElementById('kegiatanTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach((item, index) => {
      const statusClass = item.status === 'Menunggu' ? 'badge-menunggu' : 
                         item.status === 'Disetujui' ? 'badge-disetujui' : 
                         'badge-ditolak';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <div class="number-badge">${item.id}</div>
        </td>
        <td>
          <div class="activity-title">${item.namaKegiatan}</div>
          <div class="activity-subtitle">${item.subKegiatan}</div>
        </td>
        <td>
          <div class="activity-title">${item.pengusul}</div>
          <div class="activity-subtitle">${item.subPengusul}</div>
        </td>
        <td>
          <span style="font-weight: 600; color: #374151;">${item.tanggal}</span>
        </td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}">${item.status}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-action btn-cairkan me-2" data-id="${item.id}">
            <i class="ti">&#xf4a5;</i> Cairkan
          </button>
          <button class="btn btn-sm btn-action btn-selesai" data-id="${item.id}">
            <i class="ti">&#xec63;</i> UM Selesai
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Row checkboxes
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAll);
    });

    // Cairkan buttons
    document.querySelectorAll('.btn-cairkan').forEach(btn => {
      btn.addEventListener('click', handleCairkan);
    });

    // UM Selesai buttons
    document.querySelectorAll('.btn-selesai').forEach(btn => {
      btn.addEventListener('click', handleSelesai);
    });
  }

  /**
   * Select all functionality
   */
  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => cb.checked = this.checked);
    });
  }

  /**
   * Update select all state
   */
  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll('.row-checkbox');
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  /**
   * Update statistics
   */
  function updateStats() {
    const totalMenunggu = kegiatanData.filter(k => k.status === 'Menunggu').length;
    
    const totalMenungguEl = document.getElementById('totalMenunggu');
    
    if (totalMenungguEl) totalMenungguEl.textContent = totalMenunggu;
  }

  /**
   * Handle Cairkan button click
   */
  function handleCairkan(e) {
    const btn = e.currentTarget;
    const id = btn.getAttribute('data-id');
    
    alert(`Cairkan dana untuk kegiatan ID: ${id}\n\nFitur ini akan terintegrasi dengan API nanti.`);
  }


  function handleSelesai(e) {
    const btn = e.currentTarget;
    const id = btn.getAttribute('data-id');
    
    alert(`Tandai UM Selesai untuk kegiatan ID: ${id}\n\nFitur ini akan terintegrasi dengan API nanti.`);
  }

  renderTableRows(kegiatanData);
  updateStats();

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}