// frontend/src/pages/admin/UserManagementPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';
import { adminSidebar } from '../../layout/sidebars/adminSidebar.js';

export function renderUserManagementPage(path, userRole) {

// Ganti bagian modal di UserManagementPage.js dengan kode berikut:

const pageContent = `
    <style>
        /* ========== DESIGN SYSTEM - TYPOGRAPHY ========== */
        :root {
            --font-xs: 0.75rem;
            --font-sm: 0.875rem;
            --font-base: 1rem;
            --font-lg: 1.125rem;
            --font-xl: 1.25rem;
            --font-2xl: 1.5rem;
            
            --weight-normal: 400;
            --weight-medium: 500;
            --weight-semibold: 600;
            --weight-bold: 700;
            
            --primary-color: #00bcd4;
            --primary-dark: #0097a7;
            --primary-light: #4dd0e1;
        }

        /* ========== MODAL ANIMATIONS ========== */
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ========== MODAL BACKDROP ========== */
        .modal-backdrop.show {
            opacity: 0.7 !important;
            backdrop-filter: blur(8px);
            background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 151, 167, 0.1));
        }

        /* ========== MODAL DIALOG ========== */
        .modal.show .modal-dialog {
            animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-content {
            border: none !important;
            border-radius: 24px !important;
            box-shadow: 
                0 0 0 1px rgba(0, 188, 212, 0.1),
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 80px rgba(0, 188, 212, 0.15) !important;
            overflow: hidden;
            background: #ffffff !important;
        }

        /* ========== MODAL HEADER (FINAL ATTEMPT) ========== */
        .modal-header-gradient {
            background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%); /* Cyan gradient */
            color: #1F2937;
            border: none;
            padding: 1.5rem 2rem;
            position: relative; /* Context for the absolute positioned button */
            display: flex;
            align-items: center;
        }

        .modal-header-gradient .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff; /* Changed to white */
            line-height: 1.2;
        }

        .modal-header-gradient .modal-subtitle {
            font-size: 0.9rem;
            font-weight: 400;
            color: #ffffff; /* Changed to white */
            margin-top: 0.25rem;
        }

        .modal-header-gradient .btn-close {
            /* Absolute Positioning Approach */
            position: absolute;
            top: 50%;
            right: 3rem !important; /* Force position */
            transform: translateY(calc(-50% + 40px)); /* Move down even more */
            
            /* Styling */
            background: transparent;
            opacity: 0.7;
            width: 36px; /* Smaller box */
            height: 36px; /* Smaller box */
            border-radius: 10px; /* Slightly smaller radius for smaller box */
            transition: all 0.2s ease-in-out;
            border: 1px solid rgba(255, 255, 255, 0.3); /* Visible glassy border */
            z-index: 10; /* High z-index */

            /* Flex properties for centering the SVG inside */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-header-gradient .btn-close:hover {
            /* Simple border-only hover effect */
            opacity: 1;
            border-color: rgba(0, 0, 0, 0.2);
        }
        
        /* This rule explicitly prevents any other CSS from adding an 'X' */
        .modal-header-gradient .btn-close::before,
        .modal-header-gradient .btn-close::after {
            content: none !important;
        }

        .modal-header-gradient .btn-close svg {
            width: 1.25rem;
            height: 1.25rem;
            stroke: white; /* White 'X' icon */
            stroke-width: 2.5;
        }

        /* ========== MODAL BODY PREMIUM ========== */
        .modal-body-modern {
            padding: 2.5rem !important;
            background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
            position: relative;
        }

        .modal-body-modern::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.2), transparent);
        }

        /* ========== PREMIUM INPUT DESIGN ========== */
        .glass-input-wrapper {
            position: relative;
            border-radius: 16px;
            background: white;
            border: 2px solid #E5E7EB;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
        }

        .glass-input-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.1), transparent);
            transition: left 0.5s;
        }

        .glass-input-wrapper:focus-within::before {
            left: 100%;
        }

        .glass-input-wrapper:focus-within {
            border-color: var(--primary-color);
            background: #F0F8FF;
            box-shadow: 
                0 0 0 4px rgba(33, 150, 243, 0.1),
                0 5px 15px rgba(33, 150, 243, 0.15);
            transform: translateY(-2px);
        }

        .glass-input-wrapper input,
        .glass-input-wrapper select {
            background: transparent;
            width: 100%;
            padding: 1rem 1.25rem;
            border: none;
            outline: none;
            font-size: 0.95rem;
            font-weight: 500;
            color: #1F2937;
            transition: all 0.3s;
        }

        .glass-input-wrapper input::placeholder {
            color: #9CA3AF;
            font-weight: 400;
        }

        .glass-input-wrapper select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%232196F3' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            padding-right: 3rem;
            width: 100%; /* Ensure consistent width */
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
        }

        /* ========== MODERN LABEL ========== */
        .form-label-modern {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #1F2937; /* Changed to match main header */
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0;
            line-height: 1;
        }

        .form-label-modern i {
            font-size: 1.25rem;
            color: var(--primary-color);
            background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(100, 181, 246, 0.1));
            padding: 0.4rem;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .form-label-modern .required-star {
            color: #EF4444;
            font-size: 1.1rem;
            margin-left: 0.25rem;
        }

        /* ========== HELPER TEXT PREMIUM ========== */
        .helper-text {
            font-size: 0.8rem;
            color: #6B7280;
            margin-top: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: rgba(33, 150, 243, 0.05);
            border-radius: 8px;
            border-left: 3px solid var(--primary-color);
        }

        .helper-text i {
            color: var(--primary-color);
            font-size: 1rem;
        }

        /* ========== ERROR ALERT PREMIUM ========== */
        .modal-error-alert {
            background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
            border: none;
            border-left: 4px solid #EF4444;
            color: #991B1B;
            padding: 1rem 1.25rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            display: none;
            animation: fadeInUp 0.4s ease;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }

        .modal-error-alert.show {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .modal-error-alert i {
            font-size: 1.5rem;
            flex-shrink: 0;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* ========== MODAL FOOTER ULTRA MODERN ========== */
        .modal-footer-modern {
            padding: 1.75rem 2.5rem !important;
            background: linear-gradient(to top, #fafafa, #ffffff);
            border: none;
            gap: 1rem;
            position: relative;
            display: flex;
            justify-content: flex-end;
        }

        .modal-footer-modern::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.2), transparent);
        }

        /* ========== ULTRA MODERN BUTTONS ========== */
        .btn-modern-cancel {
            background: white;
            border: 2px solid #E5E7EB;
            color: #6B7280;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.875rem 1.75rem;
            border-radius: 14px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-modern-cancel::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(107, 114, 128, 0.1);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .btn-modern-cancel:hover::before {
            width: 300px;
            height: 300px;
        }

        .btn-modern-cancel:hover {
            border-color: #9CA3AF;
            color: #374151;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .btn-modern-cancel i {
            position: relative;
            z-index: 1;
            font-size: 1.1rem;
            margin-right: 0.5rem;
        }

        .btn-modern-cancel span {
            position: relative;
            z-index: 1;
        }

        .btn-modern-primary {
            background: linear-gradient(135deg, #2196F3, #64B5F6);
            border: none;
            color: white;
            font-weight: 700;
            font-size: 0.95rem;
            padding: 0.875rem 2rem;
            border-radius: 14px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 
                0 4px 15px rgba(33, 150, 243, 0.4),
                0 0 0 0 rgba(33, 150, 243, 0.5);
            animation: buttonPulse 2s infinite;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        @keyframes buttonPulse {
            0%, 100% {
                box-shadow: 
                    0 4px 15px rgba(33, 150, 243, 0.4),
                    0 0 0 0 rgba(33, 150, 243, 0.5);
            }
            50% {
                box-shadow: 
                    0 4px 20px rgba(33, 150, 243, 0.5),
                    0 0 0 8px rgba(33, 150, 243, 0);
            }
        }

        .btn-modern-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }

        .btn-modern-primary:hover::before {
            left: 100%;
        }

        .btn-modern-primary:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 
                0 8px 25px rgba(33, 150, 243, 0.5),
                0 0 0 0 rgba(33, 150, 243, 0);
        }

        .btn-modern-primary:active {
            transform: translateY(-1px) scale(0.98);
        }

        .btn-modern-primary i,
        .btn-modern-primary span {
            position: relative;
            z-index: 1;
        }

        .btn-modern-primary i {
            font-size: 1.1rem;
            margin-right: 0.5rem;
        }

        /* ========== SPINNER MODERN ========== */
        .spinner-border-modern {
            width: 1.1rem;
            height: 1.1rem;
            border-width: 2.5px;
            margin-left: 0.5rem;
        }

        /* ========== FORM STAGGERED ANIMATION ========== */
        .form-group-animate {
            animation: fadeInUp 0.5s ease-out backwards;
        }

        .form-group-animate:nth-child(1) { animation-delay: 0.1s; }
        .form-group-animate:nth-child(2) { animation-delay: 0.15s; }
        .form-group-animate:nth-child(3) { animation-delay: 0.2s; }
        .form-group-animate:nth-child(4) { animation-delay: 0.25s; }
        .form-group-animate:nth-child(5) { animation-delay: 0.3s; }
        .form-group-animate:nth-child(6) { animation-delay: 0.35s; }

        /* ========== READONLY INPUT STYLE ========== */
        .glass-input-wrapper input[readonly] {
            background: rgba(33, 150, 243, 0.05);
            cursor: not-allowed;
            color: #6B7280;
        }

        /* ========== SEARCH INPUT DESIGN ========== */
        .search-input-wrapper {
            position: relative;
        }

        .search-input-wrapper input {
            width: 100%;
            padding: 0.875rem 3rem 0.875rem 3rem;
            border: 2px solid #E5E7EB;
            border-radius: 16px;
            font-size: 0.95rem;
            font-weight: 500;
            color: #1F2937;
            background: white;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            outline: none;
        }

        .search-input-wrapper input::placeholder {
            color: #9CA3AF;
            font-weight: 400;
        }

        .search-input-wrapper input:focus {
            border-color: var(--primary-color);
            background: #F0F8FF;
            box-shadow: 
                0 0 0 4px rgba(0, 188, 212, 0.1),
                0 5px 15px rgba(0, 188, 212, 0.15);
            transform: translateY(-2px);
        }

        .search-input-wrapper.has-value input {
            padding-right: 3.5rem;
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
            pointer-events: none;
            transition: color 0.3s;
        }

        .search-input-wrapper input:focus ~ .search-icon,
        .search-input-wrapper.has-value .search-icon {
            color: var(--primary-color);
        }

        .clear-search {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transition: all 0.2s;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .search-input-wrapper.has-value .clear-search {
            opacity: 0.6;
            pointer-events: auto;
        }

        .clear-search:hover {
            opacity: 1 !important;
            background: rgba(239, 68, 68, 0.1);
        }

        .clear-search svg {
            color: #6B7280;
        }

        .clear-search:hover svg {
            color: #EF4444;
        }
    </style>

    <div class="user-management-page">
      <!-- Header Section -->
      <div class="page-header-section" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 0 0.5rem; opacity: 0; animation: slideInRight 0.6s ease-out forwards;">
        <div>
          <h2 class="text-4xl font-bold text-gray-800">Manajemen Akun</h2>
          <p class="text-lg text-gray-600" style="margin: 0.5rem 0 0 0; color: #64748b; font-size: 14px;">Pantau semua akun di sistem ini</p>
        </div>
      </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <!-- Search Section -->
            <div class="search-input-wrapper" style="width: 400px;">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Cari akun..."
                autocomplete="off"
              />
              <button class="clear-search" id="clearSearch" title="Clear search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <button class="btn btn-primary btn-tambah-akun" id="btnTambahAkun">
                <i class="ti me-1">&#xeb4b;</i> Tambah Akun
            </button>
        </div>

        <div class="card card-datatable table-responsive p-0">
            <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
                <thead>
                <tr>
                    <th style="width: 80px;">No.</th>
                    <th>Nama Lengkap</th>
                    <th>Nama Pengguna</th>
                    <th>Peran</th>
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
                <i class="ti ti-user-edit" style="display: none;"></i> Edit Profil User
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
                    <i class="ti ti-user" style="display: none;"></i>Nama Lengkap
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="editNama" placeholder="Masukkan nama lengkap" required>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="editUsername" class="form-label-modern">
                    <i class="ti ti-at" style="display: none;"></i>Nama Pengguna
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="editUsername" placeholder="Masukkan nama pengguna" required readonly>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="editEmail" class="form-label-modern">
                    <i class="ti ti-mail" style="display: none;"></i>Alamat Email
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="email" id="editEmail" placeholder="contoh@email.com" required>
                  </div>
                </div>
              <div class="col-md-6 form-group-animate">
                <label for="editRole" class="form-label-modern">
                  <i class="ti ti-shield" style="display: none;"></i>Peran<span class="required-star">*</span>
                </label>
                <div class="glass-input-wrapper">
                  <select id="editRole" required>
                      <option value="1">Admin</option>
                      <option value="2">Verifikator</option>
                      <option value="3">Pengusul</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir</option>
                      <option value="6">Bendahara</option>
                      <option value="7">Rektorat</option>
                  </select>
                </div>
              </div>
                
                <div class="col-12 form-group-animate">
                  <label for="editPassword" class="form-label-modern">
                    <i class="ti ti-lock" style="display: none;"></i>Password Baru
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="password" id="editPassword" placeholder="Biarkan kosong jika tidak ingin mengubah">
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">
              Batal
            </button>
            <button type="button" class="btn btn-modern-primary" id="btnSaveProfile">
              Simpan Perubahan
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
                <i class="ti ti-user-plus" style="display: none;"></i> Tambah Akun Baru
              </h5>
              <p class="modal-subtitle mb-0">Buat akun untuk pengguna baru pada sistem</p>
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
                    <i class="ti ti-user" style="display: none;"></i>Nama Lengkap<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addNama" placeholder="Masukkan nama lengkap" required>
                  </div>
                </div>
                
                <div class="col-md-6 form-group-animate">
                  <label for="addUsername" class="form-label-modern">
                    <i class="ti ti-at" style="display: none;"></i>Nama Pengguna<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addUsername" placeholder="Masukkan nama pengguna" required>
                  </div>
                </div>

                <div class="col-12 form-group-animate">
                  <label for="addEmail" class="form-label-modern">
                    <i class="ti ti-mail" style="display: none;"></i>Alamat Email<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="email" id="addEmail" placeholder="contoh@email.com" required>
                  </div>
                </div>

                <div class="col-md-6 form-group-animate">
                  <label for="addRole" class="form-label-modern">
                    <i class="ti ti-shield" style="display: none;"></i>Peran<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <select id="addRole" required>
                      <option value="">Pilih Peran</option>
                      <option value="1">Admin</option>
                      <option value="2">Verifikator</option>
                      <option value="3">Pengusul</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir</option>
                      <option value="6">Bendahara</option>
                      <option value="7">Rektorat</option>
                    </select>
                  </div>
                </div>
                
                <div class="col-12 form-group-animate">
                  <label for="addPassword" class="form-label-modern">
                    <i class="ti ti-lock" style="display: none;"></i>Kata Sandi<span class="required-star">*</span>
                  </label>
                  <div class="glass-input-wrapper">
                    <input type="password" id="addPassword" placeholder="Minimal 6 karakter" required>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">
              Batal
            </button>
            <button type="button" class="btn btn-modern-primary" id="btnSaveAkunBaru">
              Simpan Akun
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
    baseURL: '/api', // Use relative URL
    endpoints: {
      getUsers: '/admin/users',
      createUser: '/admin/register',
      updateUser: (userId) => `/admin/users/${userId}`,
      deleteUser: (userId) => `/admin/users/${userId}`,
      changePassword: (userId) => `/admin/users/${userId}/change-password`,
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
  let state = {
    users: [],
    allUsers: [],
    filteredUsers: [],
    currentUser: null,
    searchQuery: "",
    searchTimeout: null,
  };

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

  // Generic API functions
  async function getUsersAPI() {
    return await apiRequest(API_CONFIG.endpoints.getUsers);
  }

  async function createUserAPI(userData) {
    return await apiRequest(API_CONFIG.endpoints.createUser, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async function updateUserAPI(userId, userData) {
    return await apiRequest(API_CONFIG.endpoints.updateUser(userId), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async function deleteUserAPI(userId) {
    return await apiRequest(API_CONFIG.endpoints.deleteUser(userId), {
      method: 'DELETE',
    });
  }

  async function changePasswordAPI(userId, passwordData) {
    return await apiRequest(API_CONFIG.endpoints.changePassword(userId), {
        method: 'PUT',
        body: JSON.stringify(passwordData),
    });
  }


  // ==============================================
  // UI FUNCTIONS
  // ==============================================
  
  function performSearch() {
    const query = state.searchQuery.toLowerCase().trim();
    
    if (!query) {
      state.users = [...state.allUsers];
      renderTableRows(state.users);
      return;
    }

    state.filteredUsers = state.allUsers.filter((user) => {
      const nama = (user.nama_lengkap || "").toLowerCase();
      const username = (user.username || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const role = (user.role || "").toLowerCase();
      
      return nama.includes(query) || username.includes(query) || email.includes(query) || role.includes(query);
    });

    state.users = [...state.filteredUsers];
    renderTableRows(state.users);
  }

  function debounceSearch() {
    if (state.searchTimeout) {
      clearTimeout(state.searchTimeout);
    }
    state.searchTimeout = setTimeout(() => {
      performSearch();
    }, 300);
  }

  function showTableLoading() {
    const tbody = document.getElementById('userTableBody');
    if (tbody) {
      tbody.innerHTML = window.createTableLoadingRow ? window.createTableLoadingRow(6, 'Memuat data pengguna...') : `
        <tr>
          <td colspan="7" class="text-center py-5">
            <p class="mt-2">Memuat data pengguna...</p>
          </td>
        </tr>
      `;
    }
  }
  
  async function fetchUsers() {
    showTableLoading();
    try {
        const response = await getUsersAPI();
        state.users = response.data.map(user => ({
            ...user,
            // Assuming the API returns roles as an array of strings
            role: user.roles && user.roles.length > 0 ? user.roles[0] : 'Tidak ada peran',
        }));
        state.users.sort((a, b) => a.user_id - b.user_id);
        state.allUsers = [...state.users];
        renderTableRows(state.users);
    } catch (error) {
        const tbody = document.getElementById('userTableBody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-5">
                        <p class="text-danger">Gagal memuat data pengguna.</p>
                        <p class="text-muted">${error.message || 'Silakan coba lagi nanti.'}</p>
                    </td>
                </tr>
            `;
        }
        console.error("Fetch users error:", error);
    }
  }
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
    
    if (window.setButtonLoading) {
      window.setButtonLoading(button, isLoading, 'Memproses...');
    } else {
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
  }

  function renderTableRows(data) {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <p>Tidak ada data pengguna untuk ditampilkan.</p>
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((user, index) => {
      const row = document.createElement('tr');
      row.style.animationDelay = `${0.2 + index * 0.1}s`; // Staggered animation
      row.dataset.userId = user.user_id;

      row.innerHTML = `
        <td>
          <span class="number-badge">${index + 1}</span>
        </td>
        <td><strong>${user.nama_lengkap}</strong><br><small>${user.email}</small></td>
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm btn-primary me-1 btn-edit-profile" 
            data-id="${user.user_id}"
            data-bs-toggle="tooltip"
            title="Edit Profil"
          >
            <i class="ti">&#xeb04;</i>
          </button>
          <button 
            class="btn btn-sm btn-danger btn-delete" 
            data-id="${user.user_id}"
            data-bs-toggle="tooltip"
            title="Hapus"
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
    document.querySelectorAll('.btn-edit-profile').forEach(btn => {
      btn.addEventListener('click', handleEditProfile);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  function handleEditProfile(e) {
    const userId = e.currentTarget.dataset.id;
    const user = state.users.find(u => u.user_id == userId);

    if (!user) {
      showError("User tidak ditemukan.");
      return;
    }

    state.currentUser = { ...user };
    
    document.getElementById('editUserId').value = state.currentUser.user_id;
    document.getElementById('editNama').value = state.currentUser.nama_lengkap;
    document.getElementById('editUsername').value = state.currentUser.username;
    document.getElementById('editEmail').value = state.currentUser.email;
    document.getElementById('editPassword').value = '';

    // Get role_id from role name
    const roleMap = { 'Admin': 1, 'Verifikator': 2, 'Pengusul': 3, 'PPK': 4, 'Wadir': 5, 'Bendahara': 6, 'Rektorat': 7 };
    const role_id = roleMap[state.currentUser.role] || 3; // Default to Pengusul
    document.getElementById('editRole').value = role_id;
    
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
    btnSaveProfile.addEventListener('click', async () => {
      const userId = document.getElementById('editUserId').value;
      const newNama = document.getElementById('editNama').value.trim();
      const newUsername = document.getElementById('editUsername').value.trim();
      const newEmail = document.getElementById('editEmail').value.trim();
      const newPassword = document.getElementById('editPassword').value.trim();
      const newRoleId = document.getElementById('editRole').value;

      if (!newNama || !newUsername || !newEmail || !newRoleId) {
        showModalError('Semua kolom harus diisi!', 'editProfileModal');
        return;
      }
      
      setButtonLoading('btnSaveProfile', true);
      hideModalError('editProfileModal');

      try {
        // Update user profile data
        const profileData = {
          nama_lengkap: newNama,
          email: newEmail,
          role_id: parseInt(newRoleId, 10),
          // username cannot be updated as per backend limitations
        };
        const updatedUser = await updateUserAPI(userId, profileData);

        // Update password if a new one is provided
        if (newPassword) {
          if (newPassword.length < 8) {
            throw { message: "Password minimal 8 karakter." };
          }
          await changePasswordAPI(userId, { 
            new_password: newPassword,
            new_password_confirmation: newPassword
          });
        }
        
        // Update state
        const userIndex = state.users.findIndex(u => u.user_id == userId);
        if (userIndex > -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            ...updatedUser.data,
            role: updatedUser.data.roles[0], // API returns roles array
          };
        }

        renderTableRows(state.users);
        editProfileModalInstance.hide();
        showSuccess("Profil berhasil diubah!");

      } catch (error) {
        showModalError(error.message || "Gagal mengupdate profil.", 'editProfileModal');
      } finally {
        setButtonLoading('btnSaveProfile', false);
      }
    });
  }

  async function handleDelete(e) {
    const btn = e.currentTarget;
    const userId = btn.dataset.id;

    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data pengguna ini akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteUserAPI(userId);
        state.users = state.users.filter(u => u.user_id != userId);
        await Swal.fire('Berhasil!', 'Akun berhasil dihapus!', 'success');
        renderTableRows(state.users);
      } catch (error) {
        Swal.fire('Error', error.message || 'Gagal menghapus user.', 'error');
      }
    }
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
      const roleId = document.getElementById('addRole').value;

      // Validasi form
      if (!nama || !username || !email || !password || !roleId) {
        showModalError('Semua kolom harus diisi!', 'tambahAkunModal');
        return;
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showModalError('Format email tidak valid!', 'tambahAkunModal');
        return;
      }

      // Validasi password (minimal 8 karakter)
      if (password.length < 8) {
        showModalError('Password minimal 8 karakter!', 'tambahAkunModal');
        return;
      }

      // Prepare data untuk API
      const userData = {
        username: username,
        password: password,
        nama_lengkap: nama,
        email: email,
        role_id: parseInt(roleId, 10)
      };

      try {
        setButtonLoading('btnSaveAkunBaru', true);
        hideModalError('tambahAkunModal');

        await createUserAPI(userData);
        
        await fetchUsers(); // Refresh the user list
        
        if (tambahAkunModalInstance) {
          tambahAkunModalInstance.hide();
        }
        
        document.getElementById('tambahAkunForm').reset();
        showSuccess("Akun baru berhasil ditambahkan!");

      } catch (error) {
        let errorMessage = 'Gagal menambahkan akun. ';
        if (error.status === 409) {
          errorMessage += 'Username atau email sudah terdaftar.';
        } else if (error.data && error.data.errors) {
            const errors = Object.values(error.data.errors).flat();
            errorMessage += errors.join(' ');
        } else if (error.message) {
            errorMessage += error.message;
        } else {
          errorMessage += 'Silakan coba lagi.';
        }
        showModalError(errorMessage, 'tambahAkunModal');
      } finally {
        setButtonLoading('btnSaveAkunBaru', false);
      }
    });
  }

  // ==============================================
  // SEARCH EVENT LISTENERS
  // ==============================================
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearch");
  const searchWrapper = document.querySelector(".search-input-wrapper");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery) {
        searchWrapper.classList.add("has-value");
      } else {
        searchWrapper.classList.remove("has-value");
      }
      debounceSearch();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        state.searchQuery = "";
        searchWrapper.classList.remove("has-value");
        performSearch();
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      searchWrapper.classList.remove("has-value");
      performSearch();
      searchInput.focus();
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchUsers();

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}