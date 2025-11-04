// frontend/src/pages/admin/UserManagementPage.js

export function renderUserManagementPage() {
  const rootElement = document.getElementById("root");

  const userManagementHTML = `
    <style>
      /* --- Custom CSS for Figma Design --- */
      
      /* 1. Main Background (Sesuai permintaan Anda) */
      .layout-wrapper {
        /* AN JAY */
        background-image: url('/assets/img/backgrounds/BG.png') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      .content-wrapper {
        background: transparent !important; /* Wajib transparan */
      }
      /* Navbar, Footer, Menu tetap solid */
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
        background: #00BCD4 !important; /* Figma Active Color */
        color: #ffffff !important;
        border-radius: 8px;
        margin: 0 0.5rem;
        backdrop-filter: blur(5px);
      }
      .menu-inner .menu-item.active > .menu-link i,
      .menu-inner .menu-item.active > .menu-link div {
        color: #ffffff !important;
      }
      
      /* 3. Stat Cards (Efek Kaca/Glassmorphism) */
      .stat-card-active {
        transition: all 0.4s ease;
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%) !important;
        color: #FFFFFF !important;
        backdrop-filter: blur(10px);
        border: 2px solid transparent !important;
      }
      .stat-card-active h1, .stat-card-active h4, .stat-card-active span, .stat-card-active small {
        color: #FFFFFF !important;
      }
      
      .stat-card-active:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }
      
      .stat-card-inactive {
        transition: all 0.4s ease;
        background: rgba(255, 255, 255, 0.6) !important; /* Transparan 60% */
        backdrop-filter: blur(10px); /* Efek Kaca */
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-inactive h1, .stat-card-inactive h4, .stat-card-inactive span, .stat-card-inactive small {
        color: #00bcd4 !important;
      }

      .stat-card-inactive:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }

      /* 4. Table Styling (Card Rows + Efek Kaca) */
      .card-datatable {
        background: rgba(255, 255, 255, 0.6) !important; /* Transparan 60% */
        backdrop-filter: blur(10px); /* Efek Kaca */
        border-radius: 0.875rem !important; /* 14px */
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
      }
      .table {
        border-collapse: separate !important;
        border-spacing: 0 1rem !important; /* 16px spacing */
      }
      .table thead {
        background: transparent !important; 
      }
      .table thead th {
        color: #6B7280 !important; /* Gray text for header */
        font-weight: 500 !important;
        background: transparent !important;
        border: none !important;
        text-transform: none !important;
        font-size: 14px !important;
        padding-top: 0 !important;
        padding-bottom: 0.5rem !important;
      }
      .table tbody tr {
        background: #FFFFFF !important; /* Baris tabel tetap putih solid */
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        transition: all 0.2s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.08) !important;
      }
      .table tbody td {
        border: none !important; /* Remove all borders */
        padding: 1.25rem 1rem !important; /* 20px 16px */
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
      
      /* 5. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
      }
      .form-check-input:checked {
        background-color: #33C8DA !important;
        border-color: #33C8DA !important;
      }

      /* 6. Status Badge */
      .badge.bg-label-success {
        background: #d1f4dd !important;
        color: #0f7c3a !important;
      }
      .badge.bg-label-danger {
        background: #fecdd3 !important;
        color: #be123c !important;
      }
      
      /* 7. Aksi Buttons */
      .btn-edit-profile {
        background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%) !important; 
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-delete {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important; 
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3) !important;
      }
      
      /* 8. Search Bar */
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

      /* 9. Tombol Tambah Akun (Sesuai Figma, tanpa border ungu) */
      .btn-tambah-akun {
        background: #00BCD4 !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3) !important;
        border: none !important; /* 🔥 Hapus border */
        outline: none !important; /* 🔥 Pastikan gak muncul fokus border */
      }
      .btn-tambah-akun:hover {
        background: #00AABF !important;
        color: white !important;
      }
      .btn-tambah-akun:focus {
        box-shadow: 0 0 0 0 !important;
      }

      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 24px !important;

      .menu-icon i,
      .navbar-nav i.ti {
        font-size: 35px !important; /* default-nya biasanya 16px */
        vertical-align: middle !important;
      }

      /*  🔹 Tambah sedikit jarak biar gak nempel teks */
      .menu-link i {
        margin-right: 10px !important;
      }
      
      /* Kurangi margin kanan-kiri halaman utama */
      .container-xxl {
        max-width: 96% !important; /* sebelumnya sekitar 1320px default */
      }

      /* Supaya tombol tambah akun gak terlalu nempel ke kanan */
      .btn-tambah-akun {
        margin-right: 8px !important;
      }

      .nav-item i.ti {
        font-size: 24px !important;
      }

      .btn-save-akun-baru {
        background: #00BCD4 !important;
      }

      .btn-save-akun-baru:hover {
        background: #0097A7 !important;
      }

      .btn-primary {
        background: #00bcd4 !important;
        color: white !important;
      }

      .btn-primary:hover {
        background: #0097A7 !important;
      }
    </style>

    <div class="layout-wrapper layout-content-navbar user-management-page" style="background-image: url('/assets/img/backgrounds/BG.png'); background-size: cover; background-position: center;">
      <div class="layout-container">
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
            <a href="/dashboard" data-link class="app-brand-link">
              <span class="app-brand-logo demo">
                <img src="/assets/img/logo/logo2.svg" alt="Logo" style="width: 160px; height: 160px;">
              </span>
            </a>
            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
              <i class="ti ti-x"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1 ps ps--active-y">
            <li class="menu-item active">
              <a href="/user-management" data-link class="menu-link">
                <i class="menu-icon tf-icons ti">&#xeb4d;</i>
                <div data-i18n="User Management">User Management</div>
              </a>
            </li>
            <li class="menu-item">
              <a href="/template" data-link class="menu-link">
                <i class="menu-icon tf-icons ti">&#xeb39;</i>
                <div data-i18n="Daftar Template">Daftar Template</div>
              </a>
            </li>
            <li class="menu-item">
              <a href="/settings" data-link class="menu-link">
                <i class="menu-icon tf-icons ti">&#xeb20;</i>
                <div data-i18n="Pengaturan">Pengaturan</div>
              </a>
            </li>
          </ul>
        </aside>
        <div class="layout-page">
          <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="ti ti-menu-2 ti-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <div class="navbar-nav align-items-center">
                <div class="nav-item navbar-search-wrapper mb-0">
                  <div class="input-group input-group-merge">
                    <span class="input-group-text" id="basic-addon-search31"><i class="ti">&#xeb1c;</i></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Cari"
                      aria-label="Cari"
                      id="searchInput"
                    />
                  </div>
                </div>
              </div>
              <ul class="navbar-nav flex-row align-items-center ms-auto">
                <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                  <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                    <i class="ti">&#xea35;</i>
                    <span class="badge bg-danger rounded-pill badge-notifications">3</span>
                  </a>
                </li>
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                  <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                      <img src="https://i.pravatar.cc/150?img=12" alt class="h-auto rounded-circle" />
                    </div>
                  </a>
                </li>
                </ul>
            </div>
          </nav>
          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              
              <div class="row g-4 mb-4">
                <div class="col-sm-6 col-xl-6">
                  <div class="card stat-card-active">
                    <div class="card-body">
                      <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                          <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Akun</span>
                          <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total User Aktif</h4>
                          <div class="d-flex align-items-end mt-2">
                            <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="activeUserCount">0</h1>
                            <small style="font-size: 15px; font-weight: 500; opacity: 0.9;">Users</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xl-6">
                  <div class="card stat-card-inactive">
                    <div class="card-body">
                      <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                          <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Akun</span>
                          <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total Non-Aktif</h4>
                          <div class="d-flex align-items-end mt-2">
                            <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="inactiveUserCount">0</h1>
                            <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Users</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mb-4">
                <button class="btn btn-primary btn-tambah-akun" id="btnTambahAkun">
                  <i class="ti me-1">&#xeb4b;</i> Tambah Akun
                </button>
              </div>

              <div class="card card-datatable table-responsive p-0">
                <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
                  <thead>
                    <tr>
                      <th style="width: 50px; text-align: center;">
                        <input type="checkbox" class="form-check-input" id="selectAll">
                      </th>
                      <th style="width: 80px;">No.</th>
                      <th>Nama Pengusul</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th style="text-align: center;">Status</th>
                      <th style="text-align: center;">Aksi</th>
                    </tr>
                  </thead>
                  <tbody id="userTableBody">
                    </tbody>
                </table>
              </div>
              </div>
            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl">
              </div>
            </footer>
            <div class="content-backdrop fade"></div>
          </div>
          </div>
        </div>

      <div class="layout-overlay layout-menu-toggle"></div>

      <div class="drag-target"></div>
    </div>
    <div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">Edit Profil</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="editProfileForm">
              <input type="hidden" id="editUserId">
              
              <div class="row">
                <div class="col mb-3">
                  <label for="editNama" class="form-label">Nama</label>
                  <input type="text" id="editNama" class="form-control" placeholder="Masukkan nama" required>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="editUsername" class="form-label">Username</label>
                  <input type="text" id="editUsername" class="form-control" placeholder="Masukkan username" required>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="editEmail" class="form-label">Email</label>
                  <input type="email" id="editEmail" class="form-control" placeholder="Masukkan email" required>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="editPassword" class="form-label">Password</label>
                  <input type="password" id="editPassword" class="form-control" placeholder="Masukkan password baru (biarkan kosong jika tidak diubah)" >
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnSaveProfile">Selesai</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="tambahAkunModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitleTambah">Tambah Akun Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="tambahAkunForm">
              <div class="mb-3">
                <label for="addNama" class="form-label">Nama Pengusul</label>
                <input type="text" id="addNama" class="form-control" placeholder="Masukkan nama" required>
              </div>
              <div class="mb-3">
                <label for="addUsername" class="form-label">Username</label>
                <input type="text" id="addUsername" class="form-control" placeholder="Masukkan username" required>
              </div>
              <div class="mb-3">
                <label for="addEmail" class="form-label">Email</label>
                <input type="email" id="addEmail" class="form-control" placeholder="Masukkan email" required>
              </div>
              <div class="mb-3">
                <label for="addPassword" class="form-label">Password</label>
                <input type="password" id="addPassword" class="form-control" placeholder="Masukkan password" required>
              </div>
              <div class="mb-3">
                <label for="addStatus" class="form-label">Status</label>
                <select id="addStatus" class="form-select" required>
                  <option value="Aktif" selected>Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnSaveAkunBaru">Simpan Akun</button>
          </div>
        </div>
      </div>
    </div>
  `;

  rootElement.innerHTML = userManagementHTML;

  // Sample user data
  const users = [
    { id: 1, nama: 'Ahmad Santoso', username: 'ahmad.s', email: 'ahmad.santoso@pnj.ac.id', password: 'P@ssw0rd123', status: 'Aktif' },
    { id: 2, nama: 'Dewi Lestari', username: 'dewi.l', email: 'dewi.lestari@pnj.ac.id', password: 'Secure789!', status: 'Aktif' },
    { id: 3, nama: 'Budi Prakoso', username: 'budi.p', email: 'budi.prakoso@pnj.ac.id', password: 'BudiPro2025', status: 'Non-Aktif' },
    { id: 4, nama: 'Siti Rahayu', username: 'siti.r', email: 'siti.rahayu@pnj.ac.id', password: 'SitiRhy#456', status: 'Aktif' },
    { id: 5, nama: 'Rudi Hermawan', username: 'rudi.h', email: 'rudi.hermawan@pnj.ac.id', password: 'RH_secure2025', status: 'Aktif' },
    { id: 6, nama: 'Nina Wati', username: 'nina.w', email: 'nina.wati@pnj.ac.id', password: 'NinaW@ti789', status: 'Non-Aktif' },
    { id: 7, nama: 'Eko Prasetyo', username: 'eko.p', email: 'eko.prasetyo@pnj.ac.id', password: 'EkoPras#123', status: 'Aktif' },
    { id: 8, nama: 'Maya Indah', username: 'maya.i', email: 'maya.indah@pnj.ac.id', password: 'May@Ind4h', status: 'Non-Aktif' },
  ];

  let currentEditIndex = null;
  let editProfileModalInstance = null;
  let tambahAkunModalInstance = null; // Instance untuk modal baru

  // Render table rows
  function renderTableRows(data) {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach((user, index) => {
      const statusClass = user.status === 'Aktif' ? 'bg-label-success' : 'bg-label-danger';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${user.id}</span>
        </td>
        <td><strong>${user.nama}</strong></td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${user.status}</span>
        </td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm me-2 btn-edit-profile" 
            style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);"
            data-index="${index}" 
            data-email="${user.email}"
            data-username="${user.username}"
            data-name="${user.nama}"
          >
            <i class="ti me-1">&#xeb04;</i> Edit Profil </button>
          <button 
            class="btn btn-sm btn-danger btn-delete" 
            style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);"
            data-index="${index}"
          >
            <i class="ti">&#xeb55;</i> </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  // Attach event listeners
  function attachEventListeners() {
    // Row checkboxes
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAll);
    });

    // Edit Profile buttons
    document.querySelectorAll('.btn-edit-profile').forEach(btn => {
      btn.addEventListener('click', handleEditProfile);
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredUsers = users.filter(user => 
                user.nama.toLowerCase().includes(searchTerm) ||
                user.username.toLowerCase().includes(searchTerm) ||
                user.status.toLowerCase().includes(searchTerm)
            );
            renderTableRows(filteredUsers);
        });
    }
  }

  // Select all functionality
  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => cb.checked = this.checked);
    });
  }

  // Update select all state
  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll('.row-checkbox');
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  // --- LOGIKA MODAL EDIT PROFIL ---
  function handleEditProfile(e) {
    const btn = e.currentTarget;
    const index = parseInt(btn.getAttribute('data-index'));
    const email = btn.getAttribute('data-email');
    const username = btn.getAttribute('data-username');
    const name = btn.getAttribute('data-name');
    
    currentEditIndex = index;
    
    // Populate modal (now includes nama & username)
    const editNamaEl = document.getElementById('editNama');
    const editUsernameEl = document.getElementById('editUsername');
    const editEmailEl = document.getElementById('editEmail');
    const editPasswordEl = document.getElementById('editPassword');

    if (editNamaEl) editNamaEl.value = name || '';
    if (editUsernameEl) editUsernameEl.value = username || '';
    if (editEmailEl) editEmailEl.value = email || '';
    if (editPasswordEl) editPasswordEl.value = ''; // Kosongkan password
    
    // Show modal using Bootstrap 5
    if (!editProfileModalInstance) {
        if (typeof bootstrap !== 'undefined') {
            editProfileModalInstance = new bootstrap.Modal(document.getElementById('editProfileModal'));
        } else {
            console.error('Bootstrap 5 JS not found. Modals will not work.');
            return;
        }
    }
    editProfileModalInstance.show();
  }

  // Handle save profile
  const btnSaveProfile = document.getElementById('btnSaveProfile');
  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
      const newNama = document.getElementById('editNama').value.trim();
      const newUsername = document.getElementById('editUsername').value.trim();
      const newEmail = document.getElementById('editEmail').value.trim();
      const newPassword = document.getElementById('editPassword').value.trim();

      if (!newNama || !newUsername || !newEmail) {
        alert('Nama, username, dan email tidak boleh kosong!');
        return;
      }

      if (currentEditIndex !== null) {
        users[currentEditIndex].nama = newNama;
        users[currentEditIndex].username = newUsername;
        users[currentEditIndex].email = newEmail;
        if (newPassword) {
            users[currentEditIndex].password = newPassword;
        }
        renderTableRows(users);
        
        if (editProfileModalInstance) {
            editProfileModalInstance.hide();
        }
        
        currentEditIndex = null;
        document.getElementById('editProfileForm').reset();
        alert('Profil berhasil diupdate!');
      }
    });
  }

  // --- LOGIKA MODAL TAMBAH AKUN (BARU) ---
  const btnTambahAkun = document.getElementById('btnTambahAkun');
  if (btnTambahAkun) {
    btnTambahAkun.addEventListener('click', () => {
        document.getElementById('tambahAkunForm').reset(); // Kosongkan form
        if (!tambahAkunModalInstance) {
            if (typeof bootstrap !== 'undefined') {
                tambahAkunModalInstance = new bootstrap.Modal(document.getElementById('tambahAkunModal'));
            } else {
                console.error('Bootstrap 5 JS not found. Modals will not work.');
                return;
            }
        }
        tambahAkunModalInstance.show();
    });
  }

  // Handle save akun baru
  const btnSaveAkunBaru = document.getElementById('btnSaveAkunBaru');
  if (btnSaveAkunBaru) {
    btnSaveAkunBaru.addEventListener('click', () => {
        const nama = document.getElementById('addNama').value.trim();
        const username = document.getElementById('addUsername').value.trim();
        const email = document.getElementById('addEmail').value.trim();
        const password = document.getElementById('addPassword').value.trim();
        const status = document.getElementById('addStatus').value;

        if (!nama || !username || !email || !password) {
            alert('Semua field harus diisi!');
            return;
        }

        // Buat objek user baru
        const newUser = {
            id: users.length + 1, // ID sementara
            nama: nama,
            username: username,
            email: email,
            password: password,
            status: status
        };

        // Tambahkan ke data (di awal array agar muncul di atas)
        users.unshift(newUser); 
        
        renderTableRows(users);
        updateStats();
        
        if (tambahAkunModalInstance) {
            tambahAkunModalInstance.hide();
        }
        
        alert('Akun baru berhasil ditambahkan!');
    });
  }

  // --- LOGIKA DELETE (SAMA) ---
  function handleDelete(e) {
    const btn = e.currentTarget;
    const index = parseInt(btn.getAttribute('data-index'));
    
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      const row = btn.closest('tr');
      row.style.transition = 'all 0.3s';
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        users.splice(index, 1);
        renderTableRows(users);
        updateStats();
      }, 300);
    }
  }

  // --- LOGIKA UPDATE STATS (SAMA) ---
  function updateStats() {
    const activeCount = users.filter(u => u.status === 'Aktif').length;
    const inactiveCount = users.filter(u => u.status === 'Non-Aktif').length;
    
    const activeEl = document.getElementById('activeUserCount');
    const inactiveEl = document.getElementById('inactiveUserCount');
    
    if (activeEl) activeEl.textContent = activeCount;
    if (inactiveEl) inactiveEl.textContent = inactiveCount;
  }

  // Initial render
  renderTableRows(users);
  updateStats();

  // Initialize Vuexy menu (jika diperlukan)
  if (window.Helpers) {
    window.Helpers.init();
  }
}
