// frontend/src/layouts/DashboardLayout.js

import { adminSidebar } from './sidebars/adminSidebar.js';
import { pengusulSidebar } from './sidebars/pengusulSidebar.js';
import { verifikatorSidebar } from './sidebars/VerifikatorSidebar.js';
import { wadirSidebar } from './sidebars/WadirSidebar.js';
import { ppkSidebar } from './sidebars/PpkSidebar.js';
import { bendaharaSidebar } from './sidebars/BendaharaSidebar.js';

// Header Component
export const header = `
  <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item navbar-search-wrapper mb-0">
          <a class="nav-item nav-link search-toggler d-flex align-items-center px-0" href="javascript:void(0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search mr-4"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            <span class="d-none d-md-inline-block text-muted fw-normal">Search (Ctrl+/)</span>
          </a>
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row align-items-center ms-auto">


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
  </footer>
`;

// Main Layout Render Function
export function renderDashboardLayout(content, userRole) {
  console.log("renderDashboardLayout is running with role:", userRole);
  const rootElement = document.getElementById("root");

  let dynamicSidebar = "";
  switch (userRole) {
    case "admin":
      dynamicSidebar = adminSidebar;
      break;
    case 'pengusul':
      dynamicSidebar = pengusulSidebar;
      break;
    case 'verifikator':
      dynamicSidebar = verifikatorSidebar;
      break;
    case 'wadir':
      dynamicSidebar = wadirSidebar;
      break;
    case 'ppk':
      dynamicSidebar = ppkSidebar;
      break;
    case 'bendahara':
      dynamicSidebar = bendaharaSidebar;
      break;
    // Add more cases for other roles here
    default:
      // Fallback sidebar or an empty sidebar if role is not recognized
      dynamicSidebar = `
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
            <li class="menu-item active">
              <a href="/dashboard" class="menu-link">
                <i class="menu-icon tf-icons ti ti-smart-home"></i>
                <div data-i18n="Dashboard">Dashboard</div>
              </a>
            </li>
            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">General</span>
            </li>
            <li class="menu-item">
              <a href="/profile" class="menu-link">
                <i class="menu-icon tf-icons ti ti-user"></i>
                <div data-i18n="Profile">Profile</div>
              </a>
            </li>
          </ul>
        </aside>
      `;
      break;
  }

  const layoutHTML = `
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <!-- Sidebar -->
        ${dynamicSidebar}
        
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

  // Initialize sidebar logic
  initializeSidebar();

  // Fallback for the main mobile toggle if the full script isn't available
  initializeMenuToggle();
}

function initializeSidebar() {
  const menu = document.getElementById('layout-menu');
  if (!menu) return;

  const currentPath = window.location.pathname;

  // Set active state and open parent submenus
  const menuLinks = menu.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      const menuItem = link.closest('.menu-item');
      if (menuItem) {
        menuItem.classList.add('active');
        const parentSubmenu = menuItem.closest('.menu-submenu');
        if (parentSubmenu) {
          const parentMenuItem = parentSubmenu.closest('.menu-item');
          if (parentMenuItem) {
            parentMenuItem.classList.add('open');
          }
        }
      }
    }
  });

  // Hide all submenus by default, unless they should be open
  const submenus = menu.querySelectorAll('.menu-submenu');
  submenus.forEach(submenu => {
    const parentMenuItem = submenu.closest('.menu-item');
    if (parentMenuItem && !parentMenuItem.classList.contains('open')) {
      submenu.style.display = 'none';
    }
  });

  // Add click listeners to toggle submenus
  const menuToggles = menu.querySelectorAll('.menu-link.menu-toggle');
  menuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItem = toggle.closest('.menu-item');
      const submenu = menuItem.querySelector('.menu-submenu');

      if (submenu) {
        if (submenu.style.display === 'block') {
          submenu.style.display = 'none';
          menuItem.classList.remove('open');
        } else {
          submenu.style.display = 'block';
          menuItem.classList.add('open');
        }
      }
    });
  });
}


// Initialize menu toggle functionality (basic fallback)
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
