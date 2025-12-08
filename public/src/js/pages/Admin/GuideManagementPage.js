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

      @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(-50px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* Page Styles */
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
      .modal-backdrop.show {
        opacity: 0.7 !important;
        backdrop-filter: blur(8px);
        background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 151, 167, 0.1));
      }

      .modal.show .modal-dialog {
        animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
        color: #1F2937;
      }

      .modal-header-gradient .btn-close {
        background: rgba(255, 255, 255, 0.9);
        opacity: 1;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        transition: none;
      }

      .modal-header-gradient .btn-close:hover {
        background: rgba(255, 255, 255, 0.9);
        opacity: 1;
        transform: none;
      }

      .modal-body-modern {
        padding: 2rem;
        background: #f9fafb;
      }

      .modal-footer-modern {
        padding: 1.25rem 2rem;
        border-top: 1px solid #e5e7eb;
        background: white;
      }

      /* Form Styles */
      .glass-input-wrapper {
        position: relative;
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
      }

      .file-upload-area {
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        background: white;
      }

      .file-upload-area:hover {
        border-color: var(--primary-color);
        background: rgba(0, 188, 212, 0.02);
      }

      .file-upload-area.dragover {
        border-color: var(--primary-color);
        background: rgba(0, 188, 212, 0.05);
      }

      /* Button Styles */
      .btn-modern-primary {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-modern-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 188, 212, 0.3);
        color: white;
      }

      .btn-modern-cancel {
        background: #f3f4f6;
        color: #6B7280;
        border: none;
        padding: 0.75rem 1.5rem;
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
        padding-left: 2.5rem;
        padding-right: 1rem;
      }

      .search-box::before {
        content: '';
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        pointer-events: none;
      }
    </style>

    <div class="guide-management-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Manajemen Panduan</h1>
        <p class="page-subtitle">Kelola panduan dan video tutorial untuk setiap role pengguna</p>
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
          <i class="ti ti-plus me-2"></i>Tambah Panduan
        </button>
      </div>

      <!-- Guides Table -->
      <div class="table-modern">
        <table class="table table-modern mb-0">
          <thead>
            <tr>
              <th style="width: 5%;">#</th>
              <th style="width: 25%;">Judul</th>
              <th style="width: 15%;">Role</th>
              <th style="width: 20%;">File PDF</th>
              <th style="width: 20%;">Video</th>
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
            <form id="addGuideForm">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-semibold">Judul Panduan</label>
                  <div class="glass-input-wrapper">
                    <input type="text" id="addTitle" placeholder="Contoh: Panduan Pengajuan KAK" required>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Role Pengguna</label>
                  <div class="glass-input-wrapper">
                    <select id="addRole" required>
                      <option value="">Pilih Role</option>
                      <option value="1">Admin</option>
                      <option value="2">Pengusul</option>
                      <option value="3">Verifikator</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir II</option>
                      <option value="6">Bendahara</option>
                      <option value="7">Direktur</option>
                    </select>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">File PDF</label>
                  <div class="file-upload-area" id="pdfUploadArea">
                    <input type="file" id="addPdfFile" accept=".pdf" style="display: none;">
                    <svg class="mb-3" style="width: 48px; height: 48px; color: #00bcd4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <p class="mb-1 fw-semibold">Klik atau drag & drop file PDF</p>
                    <p class="text-muted small mb-0">Maksimal 10MB</p>
                  </div>
                  <div id="pdfFileName" class="mt-2 text-success small" style="display: none;"></div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Link Video (Embed URL)</label>
                  <div class="glass-input-wrapper">
                    <input type="url" id="addVideoUrl" placeholder="https://www.youtube.com/embed/...">
                  </div>
                  <small class="text-muted">Gunakan URL embed YouTube/Vimeo, bukan URL normal</small>
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
              <p class="modal-subtitle mb-0" style="font-size: 0.9rem; color: #3e536e; margin-top: 0.25rem;">Perbarui informasi panduan</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body modal-body-modern">
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
                      <option value="1">Admin</option>
                      <option value="2">Pengusul</option>
                      <option value="3">Verifikator</option>
                      <option value="4">PPK</option>
                      <option value="5">Wadir II</option>
                      <option value="6">Bendahara</option>
                      <option value="7">Direktur</option>
                    </select>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">File PDF (Kosongkan jika tidak diubah)</label>
                  <div class="file-upload-area" id="editPdfUploadArea">
                    <input type="file" id="editPdfFile" accept=".pdf" style="display: none;">
                    <svg class="mb-3" style="width: 48px; height: 48px; color: #00bcd4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <p class="mb-1 fw-semibold">Klik atau drag & drop file PDF baru</p>
                    <p class="text-muted small mb-0">Maksimal 10MB</p>
                  </div>
                  <div id="editPdfFileName" class="mt-2 text-success small" style="display: none;"></div>
                  <div id="currentPdfInfo" class="mt-2 text-info small"></div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Link Video (Embed URL)</label>
                  <div class="glass-input-wrapper">
                    <input type="url" id="editVideoUrl" placeholder="https://www.youtube.com/embed/...">
                  </div>
                  <small class="text-muted">Gunakan URL embed YouTube/Vimeo, bukan URL normal</small>
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
      throw new Error(data.message || 'Terjadi kesalahan');
    }
    return data;
  }

  // Role mapping
  const roleNames = {
    1: 'Admin',
    2: 'Pengusul',
    3: 'Verifikator',
    4: 'PPK',
    5: 'Wadir II',
    6: 'Bendahara',
    7: 'Direktur'
  };

  const roleBadgeClasses = {
    1: 'badge-admin',
    2: 'badge-pengusul',
    3: 'badge-verifikator',
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

  // Render table
  function renderGuidesTable(filteredGuides = null) {
    const tbody = document.getElementById('guidesTableBody');
    const guidesToRender = filteredGuides || guides;

    if (guidesToRender.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6">
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

    tbody.innerHTML = guidesToRender.map((guide, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>
          <div class="fw-semibold">${guide.judul || '-'}</div>
        </td>
        <td>
          <span class="role-badge ${roleBadgeClasses[guide.role_id] || 'badge-admin'}">
            ${roleNames[guide.role_id] || 'Unknown'}
          </span>
        </td>
        <td>
          ${guide.file_pdf ? `
            <a href="/api/panduan/${guide.panduan_id}/file" target="_blank" class="btn btn-sm btn-outline-primary">
              <i class="ti ti-file-text me-1"></i>Lihat PDF
            </a>
          ` : '<span class="text-muted">Tidak ada file</span>'}
        </td>
        <td>
          ${guide.video_url ? `
            <a href="${guide.video_url}" target="_blank" class="btn btn-sm btn-outline-success">
              <i class="ti ti-video me-1"></i>Lihat Video
            </a>
          ` : '<span class="text-muted">Tidak ada video</span>'}
        </td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="window.editGuide(${guide.panduan_id})">
            <i class="ti ti-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="window.deleteGuide(${guide.panduan_id})">
            <i class="ti ti-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // File upload handling
  function setupFileUpload(uploadAreaId, fileInputId, fileNameDisplayId) {
    const uploadArea = document.getElementById(uploadAreaId);
    const fileInput = document.getElementById(fileInputId);
    const fileNameDisplay = document.getElementById(fileNameDisplayId);

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'application/pdf') {
        fileInput.files = files;
        showFileName(files[0], fileNameDisplay);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        showFileName(e.target.files[0], fileNameDisplay);
      }
    });
  }

  function showFileName(file, displayElement) {
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire('Error', 'File terlalu besar. Maksimal 10MB', 'error');
      return;
    }
    displayElement.textContent = `✓ ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    displayElement.style.display = 'block';
  }

  // Add guide
  async function addGuide() {
    const title = document.getElementById('addTitle').value.trim();
    const roleId = document.getElementById('addRole').value;
    const pdfFile = document.getElementById('addPdfFile').files[0];
    const videoUrl = document.getElementById('addVideoUrl').value.trim();

    if (!title || !roleId) {
      Swal.fire('Error', 'Judul dan Role wajib diisi', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('judul', title);
    formData.append('role_id', roleId);
    if (pdfFile) formData.append('file_pdf', pdfFile);
    if (videoUrl) formData.append('video_url', videoUrl);

    const btnSave = document.getElementById('btnSaveGuide');
    if (window.setButtonLoading) {
      window.setButtonLoading(btnSave, true, 'Menyimpan...');
    } else {
      btnSave.disabled = true;
      btnSave.textContent = 'Menyimpan...';
    }

    try {
      await apiRequest('/panduan', {
        method: 'POST',
        body: formData,
        isFormData: true
      });

      if (window.setButtonLoading) {
        window.setButtonLoading(btnSave, false);
      } else {
        btnSave.disabled = false;
        btnSave.textContent = 'Simpan Panduan';
      }

      addModalInstance.hide();
      document.getElementById('addGuideForm').reset();
      document.getElementById('pdfFileName').style.display = 'none';

      await Swal.fire('Berhasil!', 'Panduan berhasil ditambahkan', 'success');
      fetchGuides();
    } catch (error) {
      if (window.setButtonLoading) {
        window.setButtonLoading(btnSave, false);
      } else {
        btnSave.disabled = false;
        btnSave.textContent = 'Simpan Panduan';
      }
      Swal.fire('Error', error.message, 'error');
    }
  }

  // Edit guide
  window.editGuide = async function(id) {
    const guide = guides.find(g => g.panduan_id == id);
    if (!guide) return;

    document.getElementById('editGuideId').value = guide.panduan_id;
    document.getElementById('editTitle').value = guide.judul || '';
    document.getElementById('editRole').value = guide.role_id || '';
    document.getElementById('editVideoUrl').value = guide.video_url || '';
    document.getElementById('editPdfFileName').style.display = 'none';
    document.getElementById('editPdfFile').value = '';

    const currentPdfInfo = document.getElementById('currentPdfInfo');
    if (guide.file_pdf) {
      currentPdfInfo.textContent = `✓ File saat ini: ${guide.file_pdf}`;
    } else {
      currentPdfInfo.textContent = 'Belum ada file PDF';
    }

    editModalInstance.show();
  };

  // Update guide
  async function updateGuide() {
    const id = document.getElementById('editGuideId').value;
    const title = document.getElementById('editTitle').value.trim();
    const roleId = document.getElementById('editRole').value;
    const pdfFile = document.getElementById('editPdfFile').files[0];
    const videoUrl = document.getElementById('editVideoUrl').value.trim();

    if (!title || !roleId) {
      Swal.fire('Error', 'Judul dan Role wajib diisi', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('judul', title);
    formData.append('role_id', roleId);
    if (pdfFile) formData.append('file_pdf', pdfFile);
    if (videoUrl) formData.append('video_url', videoUrl);

    const btnUpdate = document.getElementById('btnUpdateGuide');
    if (window.setButtonLoading) {
      window.setButtonLoading(btnUpdate, true, 'Menyimpan...');
    } else {
      btnUpdate.disabled = true;
      btnUpdate.textContent = 'Menyimpan...';
    }

    try {
      await apiRequest(`/panduan/${id}`, {
        method: 'PUT',
        body: formData,
        isFormData: true
      });

      if (window.setButtonLoading) {
        window.setButtonLoading(btnUpdate, false);
      } else {
        btnUpdate.disabled = false;
        btnUpdate.textContent = 'Update Panduan';
      }

      editModalInstance.hide();
      await Swal.fire('Berhasil!', 'Panduan berhasil diperbarui', 'success');
      fetchGuides();
    } catch (error) {
      if (window.setButtonLoading) {
        window.setButtonLoading(btnUpdate, false);
      } else {
        btnUpdate.disabled = false;
        btnUpdate.textContent = 'Update Panduan';
      }
      Swal.fire('Error', error.message, 'error');
    }
  }

  // Delete guide
  window.deleteGuide = async function(id) {
    const result = await Swal.fire({
      title: 'Hapus Panduan?',
      text: 'Tindakan ini tidak dapat dibatalkan',
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
        await Swal.fire('Terhapus!', 'Panduan berhasil dihapus', 'success');
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
      (g.judul || '').toLowerCase().includes(query) ||
      (roleNames[g.role_id] || '').toLowerCase().includes(query)
    );
    renderGuidesTable(filtered);
  });

  // Initialize modals
  addModalInstance = new bootstrap.Modal(document.getElementById('addGuideModal'));
  editModalInstance = new bootstrap.Modal(document.getElementById('editGuideModal'));

  // Setup file uploads
  setupFileUpload('pdfUploadArea', 'addPdfFile', 'pdfFileName');
  setupFileUpload('editPdfUploadArea', 'editPdfFile', 'editPdfFileName');

  // Event listeners
  document.getElementById('btnSaveGuide').addEventListener('click', addGuide);
  document.getElementById('btnUpdateGuide').addEventListener('click', updateGuide);

  // Initial load
  fetchGuides();
}
