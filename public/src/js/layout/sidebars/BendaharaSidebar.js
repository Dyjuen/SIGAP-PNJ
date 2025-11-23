// frontend/src/layout/sidebars/BendaharaSidebar.js

export const bendaharaSidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="/bendahara/dashboard" data-link class="app-brand-link">
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
      <!-- Pencairan Dana -->
      <li class="menu-item">
        <a href="/bendahara/kegiatan/pencairan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-wallet">&#xeb75;</i>
          <div data-i18n="Pencairan Dana">Pencairan Dana</div>
        </a>
      </li>

      <!-- Monitoring Kegiatan -->
      <li class="menu-item">
        <a href="/bendahara/kegiatan/monitoring" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-presentation-analytics">&#xea9a;</i>
          <div data-i18n="Monitoring Kegiatan">Monitoring Kegiatan</div>
        </a>
      </li>

      <!-- Daftar LPJ -->
      <li class="menu-item">
        <a href="/bendahara/kegiatan/lpj" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-list-details">&#xef40;</i>
          <div data-i18n="Daftar LPJ">Daftar LPJ</div>
        </a>
      </li>

      <!-- Riwayat -->
      <li class="menu-item">
        <a href="/bendahara/riwayat" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-history">&#xebea;</i>
          <div data-i18n="Riwayat">Riwayat</div>
        </a>
      </li>

      <!-- Pengaturan -->
      <li class="menu-item">
        <a href="/bendahara/pengaturan" data-link class="menu-link">
          <i class="menu-icon tf-icons ti ti-settings">&#xeb20;</i>
          <div data-i18n="Pengaturan">Pengaturan</div>
        </a>
      </li>
    </ul>
    <ul class="menu-inner py-1">
      <li class="menu-item">
        <a href="/login" data-link class="menu-link" id="logout-btn">
          <i class="menu-icon tf-icons ti ti-logout"></i>
          <div data-i18n="Logout">Logout</div>
        </a>
      </li>
    </ul>
  </aside>
`;
