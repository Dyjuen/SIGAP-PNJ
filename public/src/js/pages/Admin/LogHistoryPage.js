// frontend/src/pages/admin/LogHistoryPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';

export function renderLogHistoryPage(path, userRole) {
  const pageContent = `
    <style>
      :root {
        --primary-color: #00bcd4;
      }
      
      .log-history-page {
        padding-bottom: 2rem;
      }

      /* Search & Filter Section */
      .filter-section {
        background: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin-bottom: 1.5rem;
        border: 1px solid #e2e8f0;
      }

      .search-input-wrapper {
        position: relative;
      }

      .search-input-wrapper input {
        padding-left: 2.5rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
      }

      .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
      }

      /* Table Styles */
      .table-responsive {
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #e2e8f0;
        overflow: hidden;
      }

      .table thead th {
        background: #f8fafc;
        color: #475569;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
      }

      .table tbody td {
        padding: 1rem 1.5rem;
        vertical-align: middle;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
      }

      .table tbody tr:last-child td {
        border-bottom: none;
      }

      .actor-info {
        display: flex;
        flex-direction: column;
      }

      .actor-name {
        font-weight: 600;
        color: #0f172a;
      }

      .actor-role {
        font-size: 0.75rem;
        color: #64748b;
      }

      .log-timestamp {
        white-space: nowrap;
        color: #64748b;
        font-size: 0.875rem;
      }
      
      .log-context {
        font-weight: 500;
        color: #0f172a;
      }

      .badge-role {
        display: inline-block;
        padding: 0.25em 0.6em;
        font-size: 0.75em;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.375rem;
      }

      /* Pagination */
      .pagination-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;
      }

      .btn-pagination {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: white;
        border: 1px solid #e2e8f0;
        color: #475569;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .btn-pagination:hover:not(:disabled) {
        background: #f8fafc;
        border-color: #cbd5e1;
        color: #0f172a;
      }

      .btn-pagination:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Loading State */
      .loading-row td {
        text-align: center;
        padding: 2rem;
        color: #94a3b8;
      }

      .spinner {
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid #e2e8f0;
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto 0.5rem;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>

    <div class="log-history-page">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Log History System</h2>

      <!-- Filter Section -->
      <div class="filter-section">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label text-sm font-semibold text-gray-600 mb-1">Search</label>
            <div class="search-input-wrapper">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" id="searchInput" class="form-control" placeholder="Cari aktivitas, user..." autocomplete="off">
            </div>
          </div>
          
          <div class="col-md-3">
            <label class="form-label text-sm font-semibold text-gray-600 mb-1">Role</label>
            <select id="roleFilter" class="form-select">
              <option value="">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Verifikator">Verifikator</option>
              <option value="Pengusul">Pengusul</option>
              <option value="PPK">PPK</option>
              <option value="Wadir">Wadir</option>
              <option value="Bendahara">Bendahara</option>
              <option value="Rektorat">Rektorat</option>
            </select>
          </div>

          <div class="col-md-5">
            <label class="form-label text-sm font-semibold text-gray-600 mb-1">Tanggal</label>
            <div class="input-group">
              <input type="date" id="startDate" class="form-control" placeholder="Mulai">
              <span class="input-group-text bg-light text-muted">s/d</span>
              <input type="date" id="endDate" class="form-control" placeholder="Selesai">
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th width="180">Waktu</th>
              <th width="250">Actor</th>
              <th>Aktivitas</th>
            </tr>
          </thead>
          <tbody id="logTableBody">
            <!-- Data will be populated here -->
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <div class="text-sm text-gray-500">
          Showing <span id="showingStart">0</span> to <span id="showingEnd">0</span> of <span id="totalRecords">0</span> entries
        </div>
        <div class="d-flex gap-2">
          <button id="prevBtn" class="btn-pagination" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Previous
          </button>
          <button id="nextBtn" class="btn-pagination" disabled>
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // LOGIC
  // ==============================================
  
  const state = {
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    filters: {
      search: '',
      role: '',
      startDate: '',
      endDate: ''
    }
  };

  const elements = {
    tableBody: document.getElementById('logTableBody'),
    searchInput: document.getElementById('searchInput'),
    roleFilter: document.getElementById('roleFilter'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    showingStart: document.getElementById('showingStart'),
    showingEnd: document.getElementById('showingEnd'),
    totalRecords: document.getElementById('totalRecords')
  };

  let searchTimeout;

  // Fetch Logs from API
  async function fetchLogs() {
    state.loading = true;
    renderTable(); // Show loading state

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: state.page,
        limit: state.limit,
        search: state.filters.search,
        role: state.filters.role,
        start_date: state.filters.startDate,
        end_date: state.filters.endDate
      });

      const response = await fetch(`/api/admin/logs?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        state.logs = result.data;
        state.total = result.pagination.total;
        state.totalPages = result.pagination.total_pages;
      } else {
        throw new Error(result.message || 'Error fetching logs');
      }

    } catch (error) {
      console.error('Error:', error);
      state.error = error.message;
    } finally {
      state.loading = false;
      renderTable();
      updatePagination();
    }
  }

  // Render Table
  function renderTable() {
    if (state.loading) {
      elements.tableBody.innerHTML = `
        <tr class="loading-row">
          <td colspan="3">
            <div class="spinner"></div>
            Loading log data...
          </td>
        </tr>
      `;
      return;
    }

    if (state.error) {
      elements.tableBody.innerHTML = `
        <tr class="loading-row">
          <td colspan="3" class="text-danger">
            ${state.error}
          </td>
        </tr>
      `;
      return;
    }

    if (!state.logs || state.logs.length === 0) {
      elements.tableBody.innerHTML = `
        <tr class="loading-row">
          <td colspan="3">
            No logs found.
          </td>
        </tr>
      `;
      return;
    }

    elements.tableBody.innerHTML = state.logs.map(log => `
      <tr>
        <td class="log-timestamp">
          ${formatDate(log.created_at)}
        </td>
        <td>
          <div class="actor-info">
            <span class="actor-name">${log.user_name || 'Unknown'}</span>
            <span class="actor-role">${log.user_role || '-'}</span>
          </div>
        </td>
        <td>
          <div class="log-description">
            ${log.description}
          </div>
          ${log.catatan ? `<div class="text-sm text-muted mt-1 fst-italic">Catatan: "${log.catatan}"</div>` : ''}
        </td>
      </tr>
    `).join('');
  }

  function updatePagination() {
    const start = (state.page - 1) * state.limit + 1;
    const end = Math.min(state.page * state.limit, state.total);
    
    elements.showingStart.textContent = state.total === 0 ? 0 : start;
    elements.showingEnd.textContent = end;
    elements.totalRecords.textContent = state.total;

    elements.prevBtn.disabled = state.page <= 1;
    elements.nextBtn.disabled = state.page >= state.totalPages;
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Event Listeners
  elements.prevBtn.addEventListener('click', () => {
    if (state.page > 1) {
      state.page--;
      fetchLogs();
    }
  });

  elements.nextBtn.addEventListener('click', () => {
    if (state.page < state.totalPages) {
      state.page++;
      fetchLogs();
    }
  });

  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.filters.search = e.target.value;
      state.page = 1;
      fetchLogs();
    }, 500);
  });

  elements.roleFilter.addEventListener('change', (e) => {
    state.filters.role = e.target.value;
    state.page = 1;
    fetchLogs();
  });

  elements.startDate.addEventListener('change', (e) => {
    state.filters.startDate = e.target.value;
    state.page = 1;
    fetchLogs();
  });

  elements.endDate.addEventListener('change', (e) => {
    state.filters.endDate = e.target.value;
    state.page = 1;
    fetchLogs();
  });

  // Initial Load
  fetchLogs();
}
