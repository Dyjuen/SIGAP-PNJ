// frontend/src/layout/sidebars/pengusulSidebar.js

export const pengusulSidebar = `
<style>
  /* Style for open but not active menu items */
  .menu-vertical .menu-item.open > .menu-link:not(.active) {
    background-color: rgba(0, 0, 0, 0.04); /* A subtle grey background */
  }
</style>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="/dashboard" class="app-brand-link">
        <span class="app-brand-logo demo">
          <img src="/assets/img/logo/logo2.svg" alt="Logo" style="width: 160px; height: 160px;">
        </span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
        <i class="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
        <i class="ti ti-x d-block d-xl-none ti-md align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->
      <li class="menu-item" id="menu-dashboard">
        <a href="/dashboard" class="menu-link">
          <i class="menu-icon tf-icons ti ti-smart-home"></i>
          <div data-i18n="Dashboard">Dashboard</div>
        </a>
      </li>

      <!-- Menu Section -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Menu</span>
      </li>

      <!-- Usulan Kegiatan -->
      <li class="menu-item">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons ti ti-file-text"></i>
          <div data-i18n="Usulan Kegiatan">Usulan Kegiatan</div>
        </a>
        <ul class="menu-submenu">
          <li class="menu-item">
            <a href="/usulan-kak" class="menu-link">
              <div data-i18n="Usulkan Kegiatan">Usulkan Kegiatan</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/monitoring-usulan" class="menu-link">
              <div data-i18n="Monitoring Usulan">Monitoring Usulan</div>
            </a>
          </li>
        </ul>
      </li>

      <!-- Pengajuan Kegiatan -->
      <li class="menu-item">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons ti ti-file-invoice"></i>
          <div data-i18n="Pengajuan Kegiatan">Pengajuan Kegiatan</div>
        </a>
        <ul class="menu-submenu">
          <li class="menu-item">
            <a href="/mengajukan-kegiatan" class="menu-link">
              <div data-i18n="Mengajukan Kegiatan">Mengajukan Kegiatan</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/monitoring-kegiatan" class="menu-link">
              <div data-i18n="Monitoring Kegiatan">Monitoring Kegiatan</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/pengajuan-lpj" class="menu-link">
              <div data-i18n="Pengajuan LPJ">Pengajuan LPJ</div>
            </a>
          </li>
        </ul>
      </li>

      <!-- Riwayat -->
      <li class="menu-item">
        <a href="/riwayat" class="menu-link">
          <i class="menu-icon tf-icons ti ti-history"></i>
          <div data-i18n="Riwayat">Riwayat</div>
        </a>
      </li>

      <!-- Pengaturan -->
      <li class="menu-item">
        <a href="/pengaturan" class="menu-link">
          <i class="menu-icon tf-icons ti ti-settings"></i>
          <div data-i18n="Pengaturan">Pengaturan</div>
        </a>
      </li>
    </ul>
  </aside>
`;
