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
                    <th>Role</th>
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
                  <input type="text" id="editUsername" class="form-control" placeholder="Masukkan username" required readonly>
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
                    <label for="editRole" class="form-label">Role</label>
                    <select id="editRole" class="form-select" required>
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
                  <option value="1">Admin</option>
                  <option value="3" selected>User</option>
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
    currentUser: null,
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
  
  function showTableLoading() {
    const tbody = document.getElementById('userTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
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
            role: user.roles && user.roles.length > 0 ? user.roles[0] : 'Tidak ada role',
            // Add a static status for now, as it's not in the API response
            status: 'Aktif' 
        }));
        renderTableRows(state.users);
        updateStats();
    } catch (error) {
        const tbody = document.getElementById('userTableBody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
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

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5">
                    <p>Tidak ada data pengguna untuk ditampilkan.</p>
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((user, index) => {
      // TODO: The user status is not yet available from the API.
      // Defaulting to 'Aktif'. This needs to be updated once the API provides this information.
      const status = user.status || 'Aktif';
      const statusClass = status === 'Aktif' ? 'bg-label-success' : 'bg-label-danger';
      
      const row = document.createElement('tr');
      row.dataset.userId = user.user_id;

      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${index + 1}</span>
        </td>
        <td><strong>${user.nama_lengkap}</strong><br><small>${user.email}</small></td>
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${status}</span>
        </td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm me-2 btn-edit-profile" 
            data-id="${user.user_id}"
          >
            <i class="ti me-1">&#xeb04;</i> Edit Profil
          </button>
          <button 
            class="btn btn-sm btn-danger btn-delete" 
            data-id="${user.user_id}"
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
        const filteredUsers = state.users.filter(user => 
          user.nama_lengkap.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm)
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
        showModalError('Nama, username, email, dan role tidak boleh kosong!', 'editProfileModal');
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
        showSuccess("Profil berhasil diupdate!");

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

    const confirmed = await confirmAction(
      "Yakin ingin menghapus?",
      "Data user ini akan dihapus secara permanen."
    );

    if (confirmed) {
      const row = btn.closest("tr");
      row.style.transition = "all 0.3s";
      row.style.opacity = "0";
      row.style.transform = "translateX(-20px)";

      try {
        await deleteUserAPI(userId);
        state.users = state.users.filter(u => u.user_id != userId);
        setTimeout(() => {
          renderTableRows(state.users);
          updateStats();
          showSuccess("User berhasil dihapus!");
        }, 300);
      } catch (error) {
        showError(error.message || "Gagal menghapus user.");
        row.style.opacity = "1";
        row.style.transform = "translateX(0)";
      }
    }
  }


  function updateStats() {
    // TODO: The user status is not yet available from the API.
    // This function should be updated once the API provides status information.
    const activeCount = state.users.filter(u => (u.status || 'Aktif') === 'Aktif').length;
    const inactiveCount = state.users.filter(u => (u.status || 'Aktif') === 'Non-Aktif').length;
    
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
      const roleId = document.getElementById('addRole').value;

      // Validasi form
      if (!nama || !username || !email || !password || !roleId) {
        showModalError('Semua field harus diisi!', 'tambahAkunModal');
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
  // INITIALIZATION
  // ==============================================
  fetchUsers();

  // Initialize Vuexy menu
  if (window.Helpers) {
    window.Helpers.init();
  }
}