// frontend/src/pages/admin/UserManagementPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';
import { adminSidebar } from '../../layout/sidebars/adminSidebar.js';

export function renderUserManagementPage(path, userRole) {

  const pageContent = `
    <div class="user-management-page">
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

    <div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">Edit Profil</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="editProfileError" class="alert alert-danger" style="display: none;"></div>
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
            <button type="button" class="btn btn-primary" id="btnSaveProfile">
              <span class="button-text">Selesai</span>
              <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
            </button>
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
            <div id="tambahAkunError" class="alert alert-danger" style="display: none;"></div>
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
                <label for="addRole" class="form-label">Role</label>
                <select id="addRole" class="form-select" required>
                  <option value="">Pilih Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User" selected>User</option>
                </select>
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
            <button type="button" class="btn btn-primary" id="btnSaveAkunBaru">
              <span class="button-text">Simpan Akun</span>
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
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
  }

  function hideModalError(modalId = 'tambahAkunModal') {
    const errorDiv = document.getElementById(`${modalId === 'tambahAkunModal' ? 'tambahAkunError' : 'editProfileError'}`);
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

  function updateStats() {
    const activeCount = users.filter(u => u.status === 'Aktif').length;
    const inactiveCount = users.filter(u => u.status === 'Non-Aktif').length;
    
    const activeEl = document.getElementById('activeUserCount');
    const inactiveEl = document.getElementById('inactiveUserCount');
    
    if (activeEl) activeEl.textContent = activeCount;
    if (inactiveEl) inactiveEl.textContent = inactiveCount;
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
        alert('Akun baru berhasil ditambahkan!');

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

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}