// frontend/src/pages/admin/UserManagementPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';
import { adminSidebar } from '../../layout/sidebars/adminSidebar.js';

export function renderUserManagementPage(path, userRole) {

// Ganti bagian modal di UserManagementPage.js dengan kode berikut:

const pageContent = `
    <style>
        /* ========== DESIGN SYSTEM - TYPOGRAPHY ========== */
        :root {
            --font-xs: 0.75rem;      /* 12px */
            --font-sm: 0.875rem;     /* 14px */
            --font-base: 1rem;       /* 16px */
            --font-lg: 1.125rem;     /* 18px */
            --font-xl: 1.25rem;      /* 20px */
            --font-2xl: 1.5rem;      /* 24px */
            
            --weight-normal: 400;
            --weight-medium: 500;
            --weight-semibold: 600;
            --weight-bold: 700;
            
            --primary-color: #33C8DA;
            --primary-dark: #2BA9B8;
        }

        /* ========== MODAL ANIMATIONS ========== */
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ========== MODAL BACKDROP ========== */
        .modal-backdrop.show {
            opacity: 0.6 !important;
            backdrop-filter: blur(4px);
        }

        /* ========== MODAL CONTENT ========== */
        .modal.show .modal-dialog {
            animation: modalFadeIn 0.4s ease-out;
        }

        .modal-content {
            border: none !important;
            border-radius: 1.5rem !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
        }

        /* ========== MODAL HEADER ========== */
        .modal-header-gradient {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            color: white;
            border: none;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .modal-header-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent);
            pointer-events: none;
        }

        .modal-header-gradient > div:first-child {
            flex: 1;
            text-align: left;
        }

        .modal-header-gradient .modal-title {
            font-size: var(--font-2xl);
            font-weight: var(--weight-bold);
            letter-spacing: -0.02em;
            position: relative;
            z-index: 1;
            margin-bottom: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .modal-header-gradient .modal-title i {
            font-size: var(--font-2xl);
        }

        .modal-header-gradient .modal-subtitle {
            font-size: var(--font-sm);
            font-weight: var(--weight-normal);
            opacity: 0.95;
            position: relative;
            z-index: 1;
            margin: 0;
        }

        .modal-header-gradient .btn-close {
            background: transparent;
            opacity: 1;
            position: relative;
            z-index: 1;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }

        .modal-header-gradient .btn-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        .modal-header-gradient .btn-close svg {
            width: 1.25rem;
            height: 1.25rem;
            stroke: white;
            stroke-width: 2.5;
        }

        /* ========== MODAL BODY ========== */
        .modal-body-modern {
            padding: 2rem !important;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
        }

        /* ========== GLASS INPUT STYLE ========== */
        .glass-input-wrapper {
            border-radius: 0.875rem;
            border: 2px solid rgba(209, 213, 219, 0.5);
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .glass-input-wrapper:focus-within {
            border-color: rgba(51, 200, 218, 0.7);
            background: rgba(51, 200, 218, 0.05);
            box-shadow: 0 0 0 4px rgba(51, 200, 218, 0.1);
        }

        .glass-input-wrapper input,
        .glass-input-wrapper select {
            background-color: transparent;
            width: 100%;
            padding: 0.875rem 1rem;
            border: none;
            outline: none;
            font-size: var(--font-base);
            font-weight: var(--weight-normal);
            color: #374151;
            transition: all 0.3s ease;
            line-height: 1.5;
        }

        .glass-input-wrapper input::placeholder {
            color: rgba(107, 114, 128, 0.6);
            font-size: var(--font-sm);
            font-weight: var(--weight-normal);
        }

        .glass-input-wrapper select {
            cursor: pointer;
            font-weight: var(--weight-medium);
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            padding-right: 2.5rem;
        }

        /* ========== FORM LABEL ========== */
        .form-label-modern {
            display: block;
            color: #374151;
            font-size: var(--font-sm);
            font-weight: var(--weight-semibold);
            margin-bottom: 0.5rem;
            letter-spacing: -0.01em;
            line-height: 1;
        }

        .form-label-modern .required-star {
            color: #EF4444;
            margin-left: 0.25rem;
            font-weight: var(--weight-bold);
        }

        .form-label-modern i {
            margin-right: 0.5rem;
            opacity: 0.8;
            font-size: var(--font-base);
            vertical-align: middle;
            display: inline-block;
        }

        /* ========== HELPER TEXT ========== */
        .helper-text {
            font-size: var(--font-xs);
            font-weight: var(--weight-normal);
            color: #6B7280;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.375rem;
            line-height: 1.4;
        }

        .helper-text i {
            font-size: var(--font-sm);
            opacity: 0.7;
            flex-shrink: 0;
        }

        /* ========== ERROR ALERT IN MODAL ========== */
        .modal-error-alert {
            background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
            border: 1px solid #FCA5A5;
            border-left: 4px solid #EF4444;
            color: #991B1B;
            padding: 0.875rem 1rem;
            border-radius: 0.75rem;
            margin-bottom: 1.5rem;
            display: none;
            backdrop-filter: blur(8px);
            animation: slideUp 0.3s ease-out;
            font-size: var(--font-sm);
            font-weight: var(--weight-medium);
            line-height: 1.5;
        }

        .modal-error-alert.show {
            display: flex;
            align-items: flex-start;
            gap: 0.625rem;
        }

        .modal-error-alert i {
            font-size: var(--font-lg);
            flex-shrink: 0;
            margin-top: 0.125rem;
        }

        .modal-error-alert span {
            flex: 1;
            line-height: 1.5;
        }

        /* ========== MODAL FOOTER ========== */
        .modal-footer-modern {
            padding: 1.25rem 2rem !important;
            background: rgba(248, 250, 252, 0.8);
            backdrop-filter: blur(10px);
            border: none;
            gap: 0.75rem;
        }

        /* ========== MODERN BUTTONS ========== */
        .btn-modern-cancel {
            background: rgba(107, 114, 128, 0.1);
            border: 2px solid rgba(107, 114, 128, 0.3);
            color: #4B5563;
            font-weight: var(--weight-semibold);
            font-size: var(--font-base);
            padding: 0.75rem 1.5rem;
            border-radius: 0.875rem;
            transition: all 0.3s ease;
        }

        .btn-modern-cancel:hover {
            background: rgba(107, 114, 128, 0.15);
            border-color: rgba(107, 114, 128, 0.5);
            color: #374151;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn-modern-cancel i {
            font-size: var(--font-lg);
            margin-right: 0.375rem;
        }

        .btn-modern-primary {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            border: none;
            color: white;
            font-weight: var(--weight-semibold);
            font-size: var(--font-base);
            padding: 0.75rem 1.75rem;
            border-radius: 0.875rem;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(51, 200, 218, 0.3);
        }

        .btn-modern-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .btn-modern-primary:hover::before {
            left: 100%;
        }

        .btn-modern-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(51, 200, 218, 0.4);
        }

        .btn-modern-primary:active {
            transform: translateY(0);
        }

        .btn-modern-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .btn-modern-primary i {
            font-size: var(--font-lg);
            margin-right: 0.375rem;
        }

        /* ========== SPINNER ========== */
        .spinner-border-modern {
            width: 1rem;
            height: 1rem;
            border-width: 2px;
            margin-left: 0.5rem;
        }

        /* ========== FORM ANIMATION ========== */
        .form-group-animate {
            animation: slideUp 0.4s ease-out;
            animation-fill-mode: both;
        }

        .form-group-animate:nth-child(1) { animation-delay: 0.05s; }
        .form-group-animate:nth-child(2) { animation-delay: 0.1s; }
        .form-group-animate:nth-child(3) { animation-delay: 0.15s; }
        .form-group-animate:nth-child(4) { animation-delay: 0.2s; }
        .form-group-animate:nth-child(5) { animation-delay: 0.25s; }
        .form-group-animate:nth-child(6) { animation-delay: 0.3s; }
    </style>

    <div class="user-management-page">
        <h2 class="text-4xl font-bold text-gray-800 mb-4 header-animation">Manajemen User</h2>
        <div class="row g-4 mb-4">
            <div class="col-sm-6 col-xl-6">
                <div class="card stat-card-active card-animation">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                    <div class="content-left">
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Akun</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total User Aktif</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2 counter" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="activeUserCount" data-target="0">0</h1>
                        <small style="font-size: 15px; font-weight: 500; opacity: 0.9;">Users</small>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-6">
                <div class="card stat-card-inactive card-animation">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                    <div class="content-left">
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Akun</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total Non-Aktif</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2 counter" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="inactiveUserCount" data-target="0">0</h1>
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
                <tbody id="userTableBody" class="table-animation">
                </tbody>
            </table>
        </div>
    </div>

    <!-- ========== MODAL EDIT PROFIL ========== -->
    <div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header modal-header-gradient">
            <div>
              <h5 class="modal-title">
                <i class="ti ti-user-edit"></i> Edit Profil User
              </h5>
              <p class="modal-subtitle mb-0">Perbarui informasi user yang dipilih</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body modal-body-modern">
            <div id="editProfileError" class="modal-error-alert">
              <i class="ti ti-alert-circle"></i>
              <span></span>
            </div>
            <form id="editProfileForm">
              <input type="hidden" id="editUserId">
              
              <div class="row g-4">
                <div class="col-md-6 form-group-animate">
                  <label for="editNama" class="form-label-modern">
                    <i class="ti ti-user"></i>Nama Lengkap
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="editNama" placeholder="Masukkan nama lengkap" required>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="editUsername" class="form-label-modern">
                    <i class="ti ti-at"></i>Username
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="editUsername" placeholder="Masukkan username" required>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="editEmail" class="form-label-modern">
                    <i class="ti ti-mail"></i>Email Address
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="email" id="editEmail" placeholder="contoh@email.com" required>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="editPassword" class="form-label-modern">
                    <i class="ti ti-lock"></i>Password Baru
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="password" id="editPassword" placeholder="Biarkan kosong jika tidak ingin mengubah">
                  </div>
                  <div class="helper-text">
                    <i class="ti ti-info-circle"></i>
                    <span>Kosongkan jika tidak ingin mengubah password</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">
              <i class="ti ti-x"></i> Batal
            </button>
            <button type="button" class="btn btn-modern-primary" id="btnSaveProfile">
              <i class="ti ti-device-floppy"></i>
              <span class="button-text">Simpan Perubahan</span>
              <span class="spinner-border spinner-border-modern d-none" role="status" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ========== MODAL TAMBAH AKUN ========== -->
    <div class="modal fade" id="tambahAkunModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header modal-header-gradient">
            <div>
              <h5 class="modal-title">
                <i class="ti ti-user-plus"></i> Tambah Akun Baru
              </h5>
              <p class="modal-subtitle mb-0">Buat akun user baru untuk sistem</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body modal-body-modern">
            <div id="tambahAkunError" class="modal-error-alert">
              <i class="ti ti-alert-circle"></i>
              <span></span>
            </div>
            <form id="tambahAkunForm">
              <div class="row g-4">
                <div class="col-md-6 form-group-animate">
                  <label for="addNama" class="form-label-modern">
                    <i class="ti ti-user"></i>Nama Lengkap<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addNama" placeholder="Masukkan nama lengkap" required>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="addUsername" class="form-label-modern">
                    <i class="ti ti-at"></i>Username<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addUsername" placeholder="Masukkan username" required>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="addEmail" class="form-label-modern">
                    <i class="ti ti-mail"></i>Email Address<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="email" id="addEmail" placeholder="contoh@email.com" required>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="addPassword" class="form-label-modern">
                    <i class="ti ti-lock"></i>Password<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="password" id="addPassword" placeholder="Minimal 6 karakter" required>
                  </div>
                  <div class="helper-text">
                    <i class="ti ti-info-circle"></i>
                    <span>Password harus minimal 6 karakter</span>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="addRole" class="form-label-modern">
                    <i class="ti ti-shield"></i>Role<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <select id="addRole" required>
                      <option value="">Pilih Role</option>
                      <option value="Admin">Admin</option>
                      <option value="User" selected>User</option>
                    </select>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="addStatus" class="form-label-modern">
                    <i class="ti ti-toggle-right"></i>Status<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <select id="addStatus" required>
                      <option value="Aktif" selected>Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">
              <i class="ti ti-x"></i> Batal
            </button>
            <button type="button" class="btn btn-modern-primary" id="btnSaveAkunBaru">
              <i class="ti ti-check"></i>
              <span class="button-text">Simpan Akun</span>
              <span class="spinner-border spinner-border-modern d-none" role="status" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render the main layout with the page-specific content
  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // API CONFIGURATION
  // ==============================================
  const API_CONFIG = {
    baseURL: 'http://localhost:8000/api',
    endpoints: {
      createUser: '/users'
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || 
             localStorage.getItem('token') ||
             sessionStorage.getItem('authToken') ||
             sessionStorage.getItem('token');
    }
  };

  // ==============================================
  // DATA & STATE
  // ==============================================
  const users = [
    { id: 1, nama: 'Ahmad Santoso', username: 'ahmad.s', email: 'ahmad.santoso@pnj.ac.id', password: '********', status: 'Aktif', role: 'User' },
    { id: 2, nama: 'Dewi Lestari', username: 'dewi.l', email: 'dewi.lestari@pnj.ac.id', password: '********', status: 'Aktif', role: 'User' },
    { id: 3, nama: 'Budi Prakoso', username: 'budi.p', email: 'budi.prakoso@pnj.ac.id', password: '********', status: 'Non-Aktif', role: 'User' },
    { id: 4, nama: 'Siti Rahayu', username: 'siti.r', email: 'siti.rahayu@pnj.ac.id', password: '********', status: 'Aktif', role: 'Admin' },
    { id: 5, nama: 'Rudi Hermawan', username: 'rudi.h', email: 'rudi.hermawan@pnj.ac.id', password: '********', status: 'Aktif', role: 'User' },
    { id: 6, nama: 'Nina Wati', username: 'nina.w', email: 'nina.wati@pnj.ac.id', password: '********', status: 'Non-Aktif', role: 'User' },
    { id: 7, nama: 'Eko Prasetyo', username: 'eko.p', email: 'eko.prasetyo@pnj.ac.id', password: '********', status: 'Aktif', role: 'User' },
    { id: 8, nama: 'Maya Indah', username: 'maya.i', email: 'maya.indah@pnj.ac.id', password: '********', status: 'Non-Aktif', role: 'Admin' },
  ];

  let currentEditIndex = null;
  let editProfileModalInstance = null;
  let tambahAkunModalInstance = null;

  // ==============================================
  // API HELPER FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token = API_CONFIG.getAuthToken();

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || data.error || 'Terjadi kesalahan pada server',
          data: data
        };
      }
      
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async function createUserAPI(userData) {
    return await apiRequest(API_CONFIG.endpoints.createUser, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // ==============================================
  // UI FUNCTIONS
  // ==============================================
  function showModalError(message, modalId = 'tambahAkunModal') {
    const errorDiv = document.getElementById(`${modalId === 'tambahAkunModal' ? 'tambahAkunError' : 'editProfileError'}`);
    if (errorDiv) {
      const span = errorDiv.querySelector('span');
      if (span) {
        span.textContent = message;
      }
      errorDiv.classList.add('show');
      
      setTimeout(() => {
        errorDiv.classList.remove('show');
      }, 5000);
    }
  }

  function hideModalError(modalId = 'tambahAkunModal') {
    const errorDiv = document.getElementById(`${modalId === 'tambahAkunModal' ? 'tambahAkunError' : 'editProfileError'}`);
    if (errorDiv) {
      errorDiv.classList.remove('show');
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
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach((user, index) => {
      const statusClass = user.status === 'Aktif' ? 'bg-label-success' : 'bg-label-danger';
      
      const row = document.createElement('tr');
      row.style.animationDelay = `${0.2 + index * 0.1}s`; // Staggered animation
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${user.id}</span>
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
            data-index="${index}" 
            data-email="${user.email}"
            data-username="${user.username}"
            data-name="${user.nama}"
          >
            <i class="ti me-1">&#xeb04;</i> Edit Profil
          </button>
          <button 
            class="btn btn-sm btn-danger btn-delete" 
            data-index="${index}"
          >
            <i class="ti">&#xeb55;</i>
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

    document.querySelectorAll('.btn-edit-profile').forEach(btn => {
      btn.addEventListener('click', handleEditProfile);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });

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

  function handleEditProfile(e) {
    const btn = e.currentTarget;
    const index = parseInt(btn.getAttribute('data-index'));
    const email = btn.getAttribute('data-email');
    const username = btn.getAttribute('data-username');
    const name = btn.getAttribute('data-name');
    
    currentEditIndex = index;
    
    const editNamaEl = document.getElementById('editNama');
    const editUsernameEl = document.getElementById('editUsername');
    const editEmailEl = document.getElementById('editEmail');
    const editPasswordEl = document.getElementById('editPassword');

    if (editNamaEl) editNamaEl.value = name || '';
    if (editUsernameEl) editUsernameEl.value = username || '';
    if (editEmailEl) editEmailEl.value = email || '';
    if (editPasswordEl) editPasswordEl.value = '';
    
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

  const btnSaveProfile = document.getElementById('btnSaveProfile');
  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
      const newNama = document.getElementById('editNama').value.trim();
      const newUsername = document.getElementById('editUsername').value.trim();
      const newEmail = document.getElementById('editEmail').value.trim();
      const newPassword = document.getElementById('editPassword').value.trim();

      if (!newNama || !newUsername || !newEmail) {
        showError('Nama, username, dan email tidak boleh kosong!');
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
        showSuccess("Profil berhasil diupdate!");
      }
    });
  }

  async function handleDelete(e) {
  const btn = e.currentTarget;
  const index = parseInt(btn.getAttribute("data-index"));

  const confirmed = await confirmAction(
    "Yakin ingin menghapus?",
    "Data user ini akan dihapus secara permanen."
  );

  if (confirmed) {
    const row = btn.closest("tr");
    row.style.transition = "all 0.3s";
    row.style.opacity = "0";
    row.style.transform = "translateX(-20px)";

    setTimeout(() => {
      users.splice(index, 1);
      renderTableRows(users);
      updateStats();
      showSuccess("User berhasil dihapus!");
    }, 300);
  }
}


  function updateStats() {
    const activeCount = users.filter(u => u.status === 'Aktif').length;
    const inactiveCount = users.filter(u => u.status === 'Non-Aktif').length;
    
    const activeEl = document.getElementById('activeUserCount');
    const inactiveEl = document.getElementById('inactiveUserCount');
    
    if (activeEl) {
      activeEl.setAttribute('data-target', activeCount);
    }
    if (inactiveEl) {
      inactiveEl.setAttribute('data-target', inactiveCount);
    }
  }

  // ==============================================
  // ANIMATION FUNCTIONS
  // ==============================================
  
  // Counter Animation
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    // Start after a delay to match card animation
    setTimeout(() => {
      updateCounter();
    }, 500);
  }

  // Initialize all counters
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter, index) => {
      setTimeout(() => {
        animateCounter(counter);
      }, index * 100);
    });
  }

  // ==============================================
  // TAMBAH AKUN WITH API INTEGRATION
  // ==============================================
  const btnTambahAkun = document.getElementById('btnTambahAkun');
  if (btnTambahAkun) {
    btnTambahAkun.addEventListener('click', () => {
      document.getElementById('tambahAkunForm').reset();
      hideModalError('tambahAkunModal');
      
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

  const btnSaveAkunBaru = document.getElementById('btnSaveAkunBaru');
  if (btnSaveAkunBaru) {
    btnSaveAkunBaru.addEventListener('click', async () => {
      const nama = document.getElementById('addNama').value.trim();
      const username = document.getElementById('addUsername').value.trim();
      const email = document.getElementById('addEmail').value.trim();
      const password = document.getElementById('addPassword').value.trim();
      const role = document.getElementById('addRole').value;
      const status = document.getElementById('addStatus').value;

      // Validasi form
      if (!nama || !username || !email || !password || !role) {
        showModalError('Semua field harus diisi!', 'tambahAkunModal');
        return;
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showModalError('Format email tidak valid!', 'tambahAkunModal');
        return;
      }

      // Validasi password (minimal 6 karakter)
      if (password.length < 6) {
        showModalError('Password minimal 6 karakter!', 'tambahAkunModal');
        return;
      }

      // Prepare data untuk API
      const userData = {
        username: username,
        password: password,
        nama_lengkap: nama,
        email: email,
        unit_kerja_id: 1,
        role: role
      };

      try {
        // Show loading state
        setButtonLoading('btnSaveAkunBaru', true);
        hideModalError('tambahAkunModal');

        // Call API
        const response = await createUserAPI(userData);

        console.log('User created successfully:', response);

        // Tambahkan user baru ke array lokal
        const newUser = {
          id: response.user_id || response.data?.user_id || response.id || users.length + 1,
          nama: response.nama_lengkap || userData.nama_lengkap,
          username: response.username || userData.username,
          email: response.email || userData.email,
          password: '********',
          role: role,
          status: status
        };

        users.unshift(newUser);
        
        // Update UI
        renderTableRows(users);
        updateStats();
        
        // Close modal
        if (tambahAkunModalInstance) {
          tambahAkunModalInstance.hide();
        }
        
        // Reset form
        document.getElementById('tambahAkunForm').reset();
        
        // Show success message
        showSuccess("Akun baru berhasil ditambahkan!");

      } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle different error types
        let errorMessage = 'Gagal menambahkan akun. ';
        
        if (error.status === 0) {
          errorMessage = 'Tidak dapat terhubung ke server. Pastikan backend berjalan di ' + API_CONFIG.baseURL;
        } else if (error.status === 400) {
          errorMessage += error.message || 'Data tidak valid.';
        } else if (error.status === 401) {
          errorMessage += 'Sesi Anda telah berakhir. Silakan login kembali.';
        } else if (error.status === 403) {
          errorMessage += 'Anda tidak memiliki akses untuk menambahkan user.';
        } else if (error.status === 409) {
          errorMessage += 'Username atau email sudah terdaftar.';
        } else if (error.status === 500) {
          errorMessage += 'Terjadi kesalahan pada server.';
        } else if (error.message) {
          errorMessage += error.message;
        } else {
          errorMessage += 'Silakan coba lagi.';
        }
        
        showModalError(errorMessage, 'tambahAkunModal');
        
      } finally {
        // Hide loading state
        setButtonLoading('btnSaveAkunBaru', false);
      }
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderTableRows(users);
  updateStats();

  setTimeout(() => {
    initCounters();
  }, 100);

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}