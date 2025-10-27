// frontend/src/layout/sidebars/pengusulSidebar.js

export const pengusulSidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-logo demo">
          <img src="/assets/img/logo/logo.svg" alt="SIGAP PNJ" width="32">
        </span>
        <span class="app-brand-text demo menu-text fw-bold">SIGAP PNJ (Pengusul)</span>
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
        <span class="menu-header-text">Pengusul Pages</span>
      </li>

      <!-- Example Menu Items -->
      <li class="menu-item">
        <a href="/my-proposals" class="menu-link">
          <i class="menu-icon tf-icons ti ti-file-text"></i>
          <div data-i18n="My Proposals">My Proposals</div>
        </a>
      </li>

      <li class="menu-item">
        <a href="/submit-proposal" class="menu-link">
          <i class="menu-icon tf-icons ti ti-plus"></i>
          <div data-i18n="Submit Proposal">Submit New Proposal</div>
        </a>
      </li>
    </ul>
  </aside>
`;
