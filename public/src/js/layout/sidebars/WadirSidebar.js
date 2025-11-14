// frontend/src/layout/sidebars/WadirSidebar.js

export const wadirSidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="/wadir/dashboard" data-link class="app-brand-link">
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
      <!-- Verifikasi Kegiatan -->
      <li class="menu-item">
        <a href="/wadir/verifikasi-kegiatan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-check">&#xea5e;</i>
          <div data-i18n="Verifikasi Kegiatan">Verifikasi Kegiatan</div>
        </a>
      </li>

      <!-- Monitoring Kegiatan -->
      <li class="menu-item">
        <a href="/wadir/monitoring-kegiatan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-presentation-analytics">&#xea9a;</i>
          <div data-i18n="Monitoring Kegiatan">Monitoring Kegiatan</div>
        </a>
      </li>

      <!-- Pengaturan -->
      <li class="menu-item">
        <a href="/wadir/pengaturan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-settings">&#xeb20;</i>
          <div data-i18n="Pengaturan">Pengaturan</div>
        </a>
      </li>
    </ul>
  </aside>
`;
