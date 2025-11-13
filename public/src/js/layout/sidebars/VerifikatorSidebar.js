// frontend/src/layout/sidebars/VerifikatorSidebar.js

export const verifikatorSidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="/verifikator/dashboard" data-link class="app-brand-link">
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
      <!-- Monitoring Usulan -->
      <li class="menu-item">
        <a href="/verifikator/monitoring-usulan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-file-search">&#xea9a;</i>
          <div data-i18n="Monitoring Usulan">Monitoring Usulan</div>
        </a>
      </li>

      <!-- Riwayat -->
      <li class="menu-item">
        <a href="/verifikator/riwayat" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-history">&#xebea;</i>
          <div data-i18n="Riwayat">Riwayat</div>
        </a>
      </li>

      <!-- Pengaturan -->
      <li class="menu-item">
        <a href="/verifikator/pengaturan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-settings">&#xeb20;</i>
          <div data-i18n="Pengaturan">Pengaturan</div>
        </a>
      </li>
    </ul>
  </aside>
`;
