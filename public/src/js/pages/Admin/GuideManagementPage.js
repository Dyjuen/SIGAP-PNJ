// frontend/src/pages/Admin/GuideManagementPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';
import { adminSidebar } from '../../layout/sidebars/adminSidebar.js';

export function renderGuideManagementPage(path, userRole) {
  const pageContent = `
    <style>
      /* Design System */
      :root {
        --primary-color: #00bcd4;
        --primary-dark: #0097a7;
        --primary-light: #4dd0e1;
      }

      /* Animations */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes modalFadeInScale {
        from { 
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes backdropFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Animations */
      .guide-management-page {
        animation: fadeInUp 0.5s ease-out;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1F2937;
        margin-bottom: 0.5rem;
      }

      .page-subtitle {
        font-size: 0.95rem;
        color: #6B7280;
      }

      /* Card Styles */
      .guide-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        transition: all 0.3s ease;
      }

      .guide-card:hover {
        box-shadow: 0 10px 25px rgba(0, 188, 212, 0.15);
        transform: translateY(-2px);
      }

      /* Modal Styles */
      .modal-backdrop {
        background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 151, 167, 0.1));
      }

      .modal-backdrop.show {
        opacity: 0.7 !important;
        backdrop-filter: blur(8px);
        animation: backdropFadeIn 0.3s ease-out;
      }

      /* Modal Animations - Bootstrap Style */
      .modal.fade .modal-dialog {
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        transform: translateY(-50px);
        opacity: 0;
      }

      .modal.show .modal-dialog {
        transform: translateY(0);
        opacity: 1;
      }

      /* Modal Content Animation */
      .modal.show .modal-content {
        animation: modalContentBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes modalContentBounce {
        0% {
          transform: scale(0.7);
          opacity: 0;
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .modal-content {
        border: none !important;
        border-radius: 24px !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
      }

      .modal-header-gradient {
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%);
        color: #1F2937;
        border: none;
        padding: 1.5rem 2rem;
      }

      .modal-header-gradient .modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #ffffffff;
      }

      .modal-header-gradient .btn-close {
        background: rgba(255, 255, 255, 0.9);
        opacity: 1;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        animation: none !important;
        transform: none !important;
      }

      .modal-header-gradient .btn-close:hover {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .modal-header-gradient .btn-close:active {
        background: rgba(255, 255, 255, 0.8);
      }

      .modal-body-modern {
        padding: 2rem;
        background: #f9fafb;
      }

      .modal-footer-modern {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e5e7eb;
        background: white;
      }

      /* Form Styles */
      .glass-input-wrapper {
        position: relative;
      }

      .modal-body-modern label {
        transition: color 0.2s ease;
      }

      .modal-body-modern .glass-input-wrapper:focus-within + label,
      .modal-body-modern label:hover {
        color: var(--primary-color);
      }

      .glass-input-wrapper input,
      .glass-input-wrapper select,
      .glass-input-wrapper textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        background: white;
      }

      .glass-input-wrapper input:focus,
      .glass-input-wrapper select:focus,
      .glass-input-wrapper textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
        transform: translateY(-2px);
      }

      /* Form input animations */
      @keyframes inputFocus {
        0% { transform: scale(1); }
        50% { transform: scale(1.01); }
        100% { transform: scale(1); }
      }

      .glass-input-wrapper input:focus,
      .glass-input-wrapper select:focus {
        animation: inputFocus 0.3s ease;
      }

      .file-upload-area {
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .file-upload-area:hover {
        border-color: var(--primary-color);
        background: rgba(0, 188, 212, 0.02);
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
      }

      .file-upload-area.dragover {
        border-color: var(--primary-color);
        background: rgba(0, 188, 212, 0.05);
        transform: scale(1.02);
        box-shadow: 0 6px 20px rgba(0, 188, 212, 0.2);
      }

      /* Button Styles */
      .btn-modern-primary {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: white !important;
        border: none;
        padding: 0.875rem 1.75rem;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-modern-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 188, 212, 0.3);
        color: white !important;
      }

      .btn-modern-primary:focus,
      .btn-modern-primary:active {
        color: white !important;
      }

      .btn-modern-cancel {
        background: #f3f4f6;
        color: #6B7280;
        border: none;
        padding: 0.875rem 1.75rem;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-modern-cancel:hover {
        background: #e5e7eb;
        color: #374151;
      }

      /* Table Styles */
      .table-modern {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .table-modern thead {
        background: linear-gradient(135deg, #f0fdff 0%, #e0f7fa 100%);
      }

      .table-modern th {
        font-weight: 600;
        color: #1F2937;
        padding: 1rem;
        border: none;
      }

      .table-modern td {
        padding: 1rem;
        vertical-align: middle;
        border-top: 1px solid #f3f4f6;
      }

      .table-modern tbody tr:hover {
        background: rgba(0, 188, 212, 0.02);
      }

      /* Badge Styles */
      .role-badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
      }

      .badge-admin { background: #fef3c7; color: #92400e; }
      .badge-pengusul { background: #dbeafe; color: #1e40af; }
      .badge-verifikator { background: #fce7f3; color: #9f1239; }
      .badge-ppk { background: #f3e8ff; color: #6b21a8; }
      .badge-wadir { background: #ede9fe; color: #5b21b6; }
      .badge-bendahara { background: #dcfce7; color: #166534; }
      .badge-direktur { background: #e0e7ff; color: #3730a3; }

      /* Empty State */
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: #9CA3AF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .empty-state svg {
        width: 80px;
        height: 80px;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      /* Loading Spinner */
      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }

      /* Search Input */
      .search-box {
        position: relative;
      }

      .search-box input {
        padding-left: 2.75rem !important;
        padding-right: 1rem;
      }

      .search-box::before {
        content: '';
        position: absolute;
        left: 0.875rem;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        pointer-events: none;
        z-index: 1;
      }

      /* Preview Modal Styles */
      .swal-lg {
        width: 90% !important;
        max-width: 1000px !important;
      }

      .swal-lg .swal2-html-container {
        max-height: 70vh !important;
        overflow-y: auto !important;
      }

      .swal-lg embed,
      .swal-lg iframe {
        border-radius: 8px;
      }
    </style>

    <div class="guide-management-page">
      <!-- Page Header -->
      <!-- Header Section -->
      <div class="page-header-section" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 0 0.5rem; opacity: 0; animation: slideInRight 0.6s ease-out forwards;">
        <div>
          <h2 class="text-4xl font-bold text-gray-800">Manajemen Panduan</h2>
          <p class="text-lg text-gray-600" style="margin: 0.5rem 0 0 0; color: #64748b; font-size: 14px;">Kelola panduan dan video tutorial untuk setiap peran pengguna</p>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="search-box" style="width: 300px;">
          <input 
            type="text" 
            id="searchInput" 
            class="form-control" 
            placeholder="Cari panduan..."
            style="border-radius: 12px; border: 2px solid #e5e7eb;"
          >
        </div>
        <button class="btn btn-modern-primary" data-bs-toggle="modal" data-bs-target="#addGuideModal">
          <i class="ti me-2">&#xeb0b;</i>Tambah Panduan
        </button>
      </div>

      <!-- Guides Table -->
      <div class="table-modern">
        <table class="table table-modern mb-0">
          <thead>
            <tr>
              <th style="width: 5%;">No</th>
              <th style="width: 30%;">Judul</th>
              <th style="width: 20%;">Peran</th>
              <th style="width: 30%;">Media</th>
              <th style="width: 15%;">Aksi</th>
            </tr>
          </thead>
          <tbody id="guidesTableBody">
            <tr>
              <td colspan="6">
                <div class="spinner-container">
                  ${window.createLoadingState ? window.createLoadingState('Memuat panduan...') : '<div class="text-center">Memuat...</div>'}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Guide Modal -->
    <div class="modal fade" id="addGuideModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header modal-header-gradient">
            <div>
              <h5 class="modal-title">Tambah Panduan Baru</h5>
              <p class="modal-subtitle mb-0" style="font-size: 0.9rem; color: #3e536e; margin-top: 0.25rem;">Unggah PDF dan link video tutorial</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body modal-body-modern">
            <div id="addGuideError" class="alert alert-danger" style="display: none; margin-bottom: 1.5rem;"></div>
            <form id="addGuideForm">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-semibold">Judul Panduan</label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addTitle" placeholder="Contoh: Panduan Pengajuan KAK" required>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Peran Pengguna</label>
                  <div class="glass-input-wrapper">
                    <select id="addRole" required>
                      <option value="">Pilih Peran</option>
                      <option value="3">Pengusul</option>
                      <option value="2">Verifikator</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir II</option>
                      <option value="6">Bendahara</option>
                    </select>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Tipe Media</label>
                  <div class="d-flex gap-3">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="addTipeMedia" id="addTipeMediaDoc" value="document" checked>
                      <label class="form-check-label" for="addTipeMediaDoc">
                        Dokumen (PDF/DOCX)
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="addTipeMedia" id="addTipeMediaVideo" value="video">
                      <label class="form-check-label" for="addTipeMediaVideo">
                        Video (YouTube Link)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="addDocSection">
                  <label class="form-label fw-semibold">File Dokumen</label>
                  <div class="file-upload-area" id="pdfUploadArea">
                    <input type="file" id="addPdfFile" accept=".pdf,.docx" style="display: none;">
                    <i class="ti" style="font-size: 2.5rem; color: #00bcd4; display: block; margin-bottom: 0.5rem;">&#xea76;</i>
                    <p class="mb-1 fw-semibold">Klik atau drag & drop file</p>
                    <p class="text-muted small mb-0">PDF, DOCX (Maks. 10MB)</p>
                  </div>
                  <div id="pdfFileName" class="mt-2 text-success small" style="display: none;"></div>
                </div>

                <div class="col-12" id="addVideoSection" style="display: none;">
                  <label class="form-label fw-semibold">Link Video (YouTube)</label>
                  <div class="glass-input-wrapper">
                    <input type="url" id="addVideoUrl" placeholder="https://www.youtube.com/watch?v=...">
                  </div>
                  <small class="text-muted">Gunakan URL YouTube, bukan URL embed</small>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-modern-primary" id="btnSaveGuide">Simpan Panduan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Guide Modal -->
    <div class="modal fade" id="editGuideModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header modal-header-gradient">
            <div>
              <h5 class="modal-title">Edit Panduan</h5>
              <p class="modal-subtitle mb-0" style="font-size: 0.9rem; color: #ffffffff; margin-top: 0.25rem;">Perbarui informasi panduan</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body modal-body-modern">
            <div id="editGuideError" class="alert alert-danger" style="display: none; margin-bottom: 1.5rem;"></div>
            <form id="editGuideForm">
              <input type="hidden" id="editGuideId">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-semibold">Judul Panduan</label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="editTitle" required>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Role Pengguna</label>
                  <div class="glass-input-wrapper">
                    <select id="editRole" required>
                      <option value="">Pilih Role</option>
                      <option value="3">Pengusul</option>
                      <option value="2">Verifikator</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir II</option>
                      <option value="6">Bendahara</option>
                    </select>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Tipe Media</label>
                  <div class="d-flex gap-3">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="editTipeMedia" id="editTipeMediaDoc" value="document" checked>
                      <label class="form-check-label" for="editTipeMediaDoc">
                        Dokumen (PDF/DOCX)
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="editTipeMedia" id="editTipeMediaVideo" value="video">
                      <label class="form-check-label" for="editTipeMediaVideo">
                        Video (YouTube Link)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="editDocSection">
                  <label class="form-label fw-semibold">File Dokumen (Kosongkan jika tidak diubah)</label>
                  <div class="file-upload-area" id="editPdfUploadArea">
                    <input type="file" id="editPdfFile" accept=".pdf,.docx" style="display: none;">
                    <i class="ti" style="font-size: 2.5rem; color: #00bcd4; display: block; margin-bottom: 0.5rem;">&#xea76;</i>
                    <p class="mb-1 fw-semibold">Klik atau drag & drop file PDF baru</p>
                    <p class="text-muted small mb-0">PDF, DOCX (Maks. 10MB)</p>
                  </div>
                  <div id="editPdfFileName" class="mt-2 text-success small" style="display: none;"></div>
                  <div id="currentPdfInfo" class="mt-2 text-info small"></div>
                </div>

                <div class="col-12" id="editVideoSection" style="display: none;">
                  <label class="form-label fw-semibold">Link Video (YouTube)</label>
                  <div class="glass-input-wrapper">
                    <input type="url" id="editVideoUrl" placeholder="https://www.youtube.com/watch?v=...">
                  </div>
                  <small class="text-muted">Gunakan URL YouTube, bukan URL embed</small>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer modal-footer-modern">
            <button type="button" class="btn btn-modern-cancel" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-modern-primary" id="btnUpdateGuide">Update Panduan</button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // State
  let guides = [];
  let addModalInstance = null;
  let editModalInstance = null;

  // API Helper
  async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const defaultHeaders = {
      'Authorization': `Bearer ${token}`,
      ...(options.isFormData ? {} : { 'Content-Type': 'application/json' })
    };

    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    const data = await response.json();
    if (!response.ok) {
      // Handle validation errors (422)
      if (response.status === 422 && data.errors) {
        const errorMessages = Object.values(data.errors).flat().join(', ');
        throw new Error(errorMessages || data.message || 'Validasi gagal');
      }
      throw new Error(data.message || 'Terjadi kesalahan');
    }
    return data;
  }

  // Role mapping
  const roleNames = {
    1: 'Admin',
    2: 'Verifikator',
    3: 'Pengusul',
    4: 'PPK',
    5: 'Wadir II',
    6: 'Bendahara',
    7: 'Direktur'
  };

  const roleBadgeClasses = {
    1: 'badge-admin',
    2: 'badge-verifikator',
    3: 'badge-pengusul',
    4: 'badge-ppk',
    5: 'badge-wadir',
    6: 'badge-bendahara',
    7: 'badge-direktur'
  };

  // Fetch guides
  async function fetchGuides() {
    const tbody = document.getElementById('guidesTableBody');
    tbody.innerHTML = window.createTableLoadingRow 
      ? window.createTableLoadingRow(6, 'Memuat panduan...')
      : '<tr><td colspan="6" class="text-center">Memuat...</td></tr>';

    try {
      const response = await apiRequest('/panduan');
      guides = response.data || [];
      renderGuidesTable();
    } catch (error) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-danger">
            <p class="mb-0">Gagal memuat panduan: ${error.message}</p>
          </td>
        </tr>
      `;
    }
  }

  function renderGuidesTable(filteredGuides = null) {
    const tbody = document.getElementById('guidesTableBody');
    const guidesToRender = filteredGuides || guides;

    if (guidesToRender.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="empty-state">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p>Belum ada panduan</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = guidesToRender.map((guide, index) => {
      let mediaCell = '<span class="text-muted">Tidak ada media</span>';
      if (guide.path_media) {
        if (guide.tipe_media === 'document') {
          const fileName = guide.path_media.split('/').pop();
          mediaCell = `
            <div>
              <small class="d-block mb-2">
                <i class="ti me-1">&#xea76;</i>${fileName}
              </small>
              <button class="btn btn-sm btn-outline-primary" onclick="window.previewGuideDocument('${guide.panduan_id}')">
                <i class="ti me-1">&#xebcc;</i>Preview
              </button>
            </div>
          `;
        } else if (guide.tipe_media === 'video') {
          mediaCell = `
            <button class="btn btn-sm btn-outline-danger" onclick="window.previewGuideVideo('${guide.path_media}')">
              <i class="ti me-1">&#xeae4;</i>Tonton Video
            </button>
          `;
        }
      } else if (guide.tipe_media === 'document') {
        // Document type but no file
        mediaCell = `<span class="text-warning small"><i class="ti me-1">&#xeb90;</i>File tidak tersedia</span>`;
      } else if (guide.tipe_media === 'video') {
        // Video type but no URL
        mediaCell = `<span class="text-warning small"><i class="ti me-1">&#xeb90;</i>URL tidak tersedia</span>`;
      }

      return `
        <tr>
          <td>${index + 1}</td>
          <td>
            <div class="fw-semibold">${guide.judul_panduan || '-'}</div>
          </td>
          <td>
            <span class="role-badge ${roleBadgeClasses[guide.target_role_id] || 'badge-admin'}">
              ${roleNames[guide.target_role_id] || 'Unknown'}
            </span>
          </td>
          <td>${mediaCell}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" onclick="window.editGuide(${guide.panduan_id})" data-bs-toggle="tooltip" title="Edit Panduan">
              <i class="ti">&#xeb04;</i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="window.deleteGuide(${guide.panduan_id})" data-bs-toggle="tooltip" title="Hapus">
              <i class="ti">&#xeb55;</i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
    
    // Initialize tooltips for action buttons
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  // File upload handling
  function setupFileUpload(uploadAreaId, fileInputId, fileNameDisplayId) {
    const uploadArea = document.getElementById(uploadAreaId);
    const fileInput = document.getElementById(fileInputId);
    const fileNameDisplay = document.getElementById(fileNameDisplayId);

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragleave');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        if (allowedTypes.includes(files[0].type)) {
          fileInput.files = files;
          showFileName(files[0], fileNameDisplay);
        } else {
          Swal.fire('Error', 'Hanya file PDF dan DOCX yang diizinkan.', 'error');
        }
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        if (allowedTypes.includes(e.target.files[0].type)) {
          showFileName(e.target.files[0], fileNameDisplay);
        } else {
          Swal.fire('Error', 'Hanya file PDF dan DOCX yang diizinkan.', 'error');
          e.target.value = ''; // Clear the input
        }
      }
    });
  }

  function showFileName(file, displayElement) {
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire('Error', 'File terlalu besar. Maksimal 10MB.', 'error');
      return;
    }
    displayElement.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    displayElement.style.display = 'block';
    return true;
  }

  // Add guide
  async function addGuide() {
    const title = document.getElementById('addTitle').value.trim();
    const roleId = document.getElementById('addRole').value;
    const tipeMedia = document.querySelector('input[name="addTipeMedia"]:checked').value;

    if (!title || !roleId) {
      const errorAlert = document.getElementById('addGuideError');
      errorAlert.textContent = 'Judul dan Role wajib diisi';
      errorAlert.style.display = 'block';
      document.querySelector('#addGuideModal .modal-body').scrollTop = 0;
      return;
    }

    // Validate Media
    if (tipeMedia === 'document') {
      const docFile = document.getElementById('addPdfFile').files[0];
      if (!docFile) {
        const errorAlert = document.getElementById('addGuideError');
        errorAlert.textContent = 'File Dokumen wajib diunggah';
        errorAlert.style.display = 'block';
        document.querySelector('#addGuideModal .modal-body').scrollTop = 0;
        return;
      }
    } else if (tipeMedia === 'video') {
      const videoUrl = document.getElementById('addVideoUrl').value.trim();
      if (!videoUrl) {
        const errorAlert = document.getElementById('addGuideError');
        errorAlert.textContent = 'Link Video wajib diisi';
        errorAlert.style.display = 'block';
        document.querySelector('#addGuideModal .modal-body').scrollTop = 0;
        return;
      }
    }

    const formData = new FormData();
    formData.append('judul_panduan', title);
    formData.append('target_role_id', roleId);
    formData.append('tipe_media', tipeMedia);

    if (tipeMedia === 'document') {
      const docFile = document.getElementById('addPdfFile').files[0];
      formData.append('path_media', docFile);
    } else if (tipeMedia === 'video') {
      const videoUrl = document.getElementById('addVideoUrl').value.trim();
      formData.append('path_media', videoUrl);
    }

    // Debug: Log FormData contents
    console.log('FormData being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }

    const btnSave = document.getElementById('btnSaveGuide');
    if (window.setButtonLoading) {
      window.setButtonLoading(btnSave, true, 'Menyimpan...');
    }

    try {
      await apiRequest('/panduan', {
        method: 'POST',
        body: formData,
        isFormData: true
      });

      // Success - hide modal first
      addModalInstance.hide();
      
      if (window.setButtonLoading) {
        window.setButtonLoading(btnSave, false);
      }

      document.getElementById('addGuideForm').reset();
      document.getElementById('pdfFileName').style.display = 'none';
      toggleMediaInputs('add'); // Reset to default view

      await Swal.fire('Berhasil!', 'Panduan berhasil ditambahkan', 'success');
      fetchGuides();
    } catch (error) {
      // Error - keep modal open and show error in modal
      if (window.setButtonLoading) {
        window.setButtonLoading(btnSave, false);
      }
      
      console.error('Error adding guide:', error);
      const errorAlert = document.getElementById('addGuideError');
      errorAlert.textContent = error.message;
      errorAlert.style.display = 'block';
      
      // Scroll to top of modal to show error
      document.querySelector('#addGuideModal .modal-body').scrollTop = 0;
    }
  }

  // Edit guide
  window.editGuide = async function(id) {
    const guide = guides.find(g => g.panduan_id == id);
    if (!guide) return;

    document.getElementById('editGuideId').value = guide.panduan_id;
    document.getElementById('editTitle').value = guide.judul_panduan || '';
    document.getElementById('editRole').value = guide.target_role_id || '';

    if (guide.tipe_media === 'video') {
      document.getElementById('editTipeMediaVideo').checked = true;
      document.getElementById('editVideoUrl').value = guide.path_media || '';
      document.getElementById('currentPdfInfo').textContent = '';
    } else { // 'document' or other/null cases
      document.getElementById('editTipeMediaDoc').checked = true;
      document.getElementById('editVideoUrl').value = '';
      if (guide.path_media) {
        const fileName = guide.path_media.split('/').pop();
        document.getElementById('currentPdfInfo').textContent = `✓ File saat ini: ${fileName}`;
      } else {
        document.getElementById('currentPdfInfo').textContent = 'Belum ada file';
      }
    }
    
    toggleMediaInputs('edit');

    document.getElementById('editPdfFileName').style.display = 'none';
    document.getElementById('editPdfFile').value = '';

    editModalInstance.show();
  };

  // Update guide
  async function updateGuide() {
    const id = document.getElementById('editGuideId').value;
    const title = document.getElementById('editTitle').value.trim();
    const roleId = document.getElementById('editRole').value;
    const tipeMedia = document.querySelector('input[name="editTipeMedia"]:checked').value;

    if (!title || !roleId) {
      const errorAlert = document.getElementById('editGuideError');
      errorAlert.textContent = 'Judul dan Role wajib diisi';
      errorAlert.style.display = 'block';
      document.querySelector('#editGuideModal .modal-body').scrollTop = 0;
      return;
    }

    // Validate video URL if tipe_media is video
    if (tipeMedia === 'video') {
      const videoUrl = document.getElementById('editVideoUrl').value.trim();
      if (!videoUrl) {
        const errorAlert = document.getElementById('editGuideError');
        errorAlert.textContent = 'Link Video wajib diisi';
        errorAlert.style.display = 'block';
        document.querySelector('#editGuideModal .modal-body').scrollTop = 0;
        return;
      }
    }

    const formData = new FormData();
    formData.append('judul_panduan', title);
    formData.append('target_role_id', roleId);
    formData.append('tipe_media', tipeMedia);
    formData.append('_method', 'PUT');

    if (tipeMedia === 'document') {
      const docFile = document.getElementById('editPdfFile').files[0];
      // Only append file if user selected a new one
      if (docFile) {
        formData.append('path_media', docFile);
      }
      // If no new file, backend will keep existing file
    } else if (tipeMedia === 'video') {
      const videoUrl = document.getElementById('editVideoUrl').value.trim();
      formData.append('path_media', videoUrl);
    }

    const btnUpdate = document.getElementById('btnUpdateGuide');
    if (window.setButtonLoading) {
      window.setButtonLoading(btnUpdate, true, 'Menyimpan...');
    }

    try {
      await apiRequest(`/panduan/${id}`, {
        method: 'POST',
        body: formData,
        isFormData: true
      });

      if (window.setButtonLoading) {
        window.setButtonLoading(btnUpdate, false);
      }

      // Hide modal before showing alert
      editModalInstance.hide();
      await Swal.fire('Berhasil!', 'Panduan berhasil diperbarui', 'success');
      fetchGuides();
    } catch (error) {
      if (window.setButtonLoading) {
        window.setButtonLoading(btnUpdate, false);
      }
      
      // Show error in modal instead of hiding it
      console.error('Error updating guide:', error);
      const errorAlert = document.getElementById('editGuideError');
      errorAlert.textContent = error.message;
      errorAlert.style.display = 'block';
      
      // Scroll to top of modal to show error
      document.querySelector('#editGuideModal .modal-body').scrollTop = 0;
    }
  }

  // Delete guide
  window.deleteGuide = async function(id) {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data panduan ini akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await apiRequest(`/panduan/${id}`, { method: 'DELETE' });
        await Swal.fire('Berhasil!', 'Panduan berhasil dihapus!', 'success');
        fetchGuides();
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  // Search
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = guides.filter(g => 
      (g.judul_panduan || '').toLowerCase().includes(query) ||
      (roleNames[g.target_role_id] || '').toLowerCase().includes(query)
    );
    renderGuidesTable(filtered);
  });

  // Initialize modals
  addModalInstance = new bootstrap.Modal(document.getElementById('addGuideModal'));
  editModalInstance = new bootstrap.Modal(document.getElementById('editGuideModal'));

  // Auto-focus first input when modals open
  document.getElementById('addGuideModal').addEventListener('shown.bs.modal', function() {
    document.getElementById('addGuideError').style.display = 'none';
    document.getElementById('addTitle').focus();
  });
  
  document.getElementById('editGuideModal').addEventListener('shown.bs.modal', function() {
    document.getElementById('editGuideError').style.display = 'none';
    document.getElementById('editTitle').focus();
  });

  // Keyboard shortcuts for modals
  document.getElementById('addGuideModal').addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      addModalInstance.hide();
    }
  });

  document.getElementById('editGuideModal').addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      editModalInstance.hide();
    }
  });

  // Setup file uploads
  setupFileUpload('pdfUploadArea', 'addPdfFile', 'pdfFileName');
  setupFileUpload('editPdfUploadArea', 'editPdfFile', 'editPdfFileName');

  // Event listeners
  document.getElementById('btnSaveGuide').addEventListener('click', addGuide);
  document.getElementById('btnUpdateGuide').addEventListener('click', updateGuide);

  // Preview functions
  window.previewGuideDocument = async function(panduan_id) {
    const guide = guides.find(g => g.panduan_id == panduan_id);
    if (!guide || !guide.path_media) {
      Swal.fire('Error', 'File tidak ditemukan', 'error');
      return;
    }

    Swal.fire({
      title: 'Memproses Dokumen...',
      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/panduan/${panduan_id}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error(`Gagal mengambil file (${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      
      // Check if it's a PDF
      if (contentType && contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        Swal.close();
        
        // Open PDF in new tab
        window.open(objectUrl, '_blank');
        
        // Clean up after a delay
        setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      } else {
        // For other file types, trigger download
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const fileName = guide.path_media.split('/').pop();
        
        Swal.close();
        
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      }

    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.message || 'Gagal memuat dokumen', 'error');
    }
  };

  window.previewGuideVideo = function(videoUrl) {
    // Convert YouTube URL to embed URL
    let embedUrl = videoUrl;
    
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      // Extract video ID from various YouTube URL formats
      let videoId = '';
      
      if (videoUrl.includes('youtube.com/watch?v=')) {
        videoId = videoUrl.split('watch?v=')[1].split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
      } else if (videoUrl.includes('youtube.com/embed/')) {
        videoId = videoUrl.split('embed/')[1].split('?')[0];
      }
      
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    const previewContent = `
      <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
        <iframe 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
          src="${embedUrl}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;

    Swal.fire({
      title: 'Video Tutorial',
      html: previewContent,
      width: '90%',
      didOpen: (modal) => {
        modal.classList.add('swal-lg');
      }
    });
  };

  // --- Media Type Logic ---
  function toggleMediaInputs(modalType) {
    const docSection = document.getElementById(`${modalType}DocSection`);
    const videoSection = document.getElementById(`${modalType}VideoSection`);
    const selectedRadio = document.querySelector(`input[name="${modalType}TipeMedia"]:checked`);

    if (selectedRadio && selectedRadio.value === 'document') {
      docSection.style.display = 'block';
      videoSection.style.display = 'none';
      document.getElementById(`${modalType}VideoUrl`).value = '';
    } else if (selectedRadio && selectedRadio.value === 'video') {
      docSection.style.display = 'none';
      videoSection.style.display = 'block';
      const fileInput = document.getElementById(`${modalType}PdfFile`);
      if (fileInput) {
        fileInput.value = '';
      }
      const fileNameDisplay = document.getElementById(`${modalType}PdfFileName`);
      if (fileNameDisplay) {
          fileNameDisplay.style.display = 'none';
      }
    }
  }

  document.querySelectorAll('input[name="addTipeMedia"]').forEach(radio => {
    radio.addEventListener('change', () => toggleMediaInputs('add'));
  });

  document.querySelectorAll('input[name="editTipeMedia"]').forEach(radio => {
    radio.addEventListener('change', () => toggleMediaInputs('edit'));
  });

  // --- End Media Type Logic ---

  // Initial load
  fetchGuides();
}