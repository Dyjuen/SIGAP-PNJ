// frontend/src/layouts/DashboardLayout.js

// Sidebar Component
export const sidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-logo demo">
          <img src="/assets/img/logo/logo.svg" alt="SIGAP PNJ" width="32">
        </span>
        <span class="app-brand-text demo menu-text fw-bold">SIGAP PNJ</span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
        <i class="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
        <i class="ti ti-x d-block d-xl-none ti-md align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->
      <li class="menu-item active">
        <a href="/dashboard" class="menu-link">
          <i class="menu-icon tf-icons ti ti-smart-home"></i>
          <div data-i18n="Dashboard">Dashboard</div>
        </a>
      </li>

      <!-- Menu Section -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Pages</span>
      </li>

      <!-- Example Menu Items -->
      <li class="menu-item">
        <a href="/users" class="menu-link">
          <i class="menu-icon tf-icons ti ti-users"></i>
          <div data-i18n="Users">Users</div>
        </a>
      </li>

      <li class="menu-item">
        <a href="/settings" class="menu-link">
          <i class="menu-icon tf-icons ti ti-settings"></i>
          <div data-i18n="Settings">Settings</div>
        </a>
      </li>
    </ul>
  </aside>
`;

// Header Component
export const header = `
  <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="ti ti-menu-2 ti-md"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item navbar-search-wrapper mb-0">
          <a class="nav-item nav-link search-toggler d-flex align-items-center px-0" href="javascript:void(0);">
            <i class="ti ti-search ti-md me-2 me-lg-4 ti-lg"></i>
            <span class="d-none d-md-inline-block text-muted fw-normal">Search (Ctrl+/)</span>
          </a>
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <!-- Language -->
        <li class="nav-item dropdown-language dropdown">
          <a class="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
            <i class="ti ti-language rounded-circle ti-md"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="javascript:void(0);" data-language="en" data-text-direction="ltr">
                <span class="align-middle">English</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="javascript:void(0);" data-language="id" data-text-direction="ltr">
                <span class="align-middle">Indonesia</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ Language -->

        <!-- Notification -->
        <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
          <a class="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <span class="position-relative">
              <i class="ti ti-bell ti-md"></i>
              <span class="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
            </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center py-3">
                <h6 class="mb-0 me-auto">Notification</h6>
                <div class="d-flex align-items-center">
                  <span class="badge rounded-pill bg-label-primary fs-xsmall me-2">8 New</span>
                </div>
              </div>
            </li>
            <li class="dropdown-notifications-list scrollable-container">
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action dropdown-notifications-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar">
                        <span class="avatar-initial rounded-circle bg-label-success">
                          <i class="ti ti-check"></i>
                        </span>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="small mb-1">New notification</h6>
                      <small class="mb-1 d-block text-body">Sample notification message</small>
                      <small class="text-muted">1h ago</small>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li class="border-top">
              <div class="d-grid p-4">
                <a class="btn btn-primary btn-sm d-flex" href="javascript:void(0);">
                  <small class="align-middle">View all notifications</small>
                </a>
              </div>
            </li>
          </ul>
        </li>
        <!--/ Notification -->

        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
            <div class="avatar avatar-online">
              <img src="/assets/img/avatars/default-avatar.png" alt class="rounded-circle" />
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="/profile">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                      <img src="/assets/img/avatars/default-avatar.png" alt class="rounded-circle" />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-0">John Doe</h6>
                    <small class="text-muted">Admin</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="dropdown-divider my-1"></div>
            </li>
            <li>
              <a class="dropdown-item" href="/profile">
                <i class="ti ti-user me-3 ti-md"></i><span class="align-middle">My Profile</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/settings">
                <i class="ti ti-settings me-3 ti-md"></i><span class="align-middle">Settings</span>
              </a>
            </li>
            <li>
              <div class="dropdown-divider my-1"></div>
            </li>
            <li>
              <a class="dropdown-item" href="/logout">
                <i class="ti ti-logout me-3 ti-md"></i><span class="align-middle">Log Out</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
    </div>

    <!-- Search Small Screens -->
    <div class="navbar-search-wrapper search-input-wrapper d-none">
      <input type="text" class="form-control search-input container-xxl border-0" placeholder="Search..." aria-label="Search..." />
      <i class="ti ti-x search-toggler cursor-pointer"></i>
    </div>
  </nav>
`;

// Footer Component
export const footer = `
  <footer class="content-footer footer bg-footer-theme">
    <div class="container-xxl">
      <div class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
        <div class="text-body">
          © ${new Date().getFullYear()}, made with ❤️ by 
          <a href="javascript:void(0)" target="_blank" class="footer-link">SIGAP PNJ Team</a>
        </div>
        <div class="d-none d-lg-inline-block">
          <a href="/documentation" class="footer-link me-4">Documentation</a>
          <a href="/support" class="footer-link">Support</a>
        </div>
      </div>
    </div>
  </footer>
`;

// Main Layout Render Function
export function renderDashboardLayout(content) {
  const rootElement = document.getElementById("root");

  const layoutHTML = `
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <!-- Sidebar -->
        ${sidebar}
        
        <!-- Mobile Menu Toggle -->
        <div class="menu-mobile-toggler d-xl-none rounded-1">
          <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1">
            <i class="ti tabler-menu icon-base"></i>
            <i class="ti tabler-chevron-right icon-base"></i>
          </a>
        </div>

        <!-- Layout Page -->
        <div class="layout-page">
          <!-- Header -->
          ${header}

          <!-- Content Wrapper -->
          <div class="content-wrapper">
            <!-- Content -->
            <div class="container-xxl flex-grow-1 container-p-y">
              ${content}
            </div>
            
            <!-- Footer -->
            ${footer}

            <div class="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
      
      <!-- Drag Target -->
      <div class="drag-target"></div>
    </div>
  `;

  rootElement.innerHTML = layoutHTML;

  // Initialize menu toggle functionality
  initializeMenuToggle();
}

// Initialize menu toggle functionality
function initializeMenuToggle() {
  const menuToggle = document.querySelector(".layout-menu-toggle");
  const layoutMenu = document.getElementById("layout-menu");

  if (menuToggle && layoutMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle("layout-menu-expanded");
    });
  }
}
