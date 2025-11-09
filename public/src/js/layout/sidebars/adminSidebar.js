// frontend/src/layout/sidebars/adminSidebar.js

export const adminSidebar = `
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="/dashboard" data-link class="app-brand-link">
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

    <ul class="menu-inner py-1 ps ps--active-y">
      <li class="menu-item active">
        <a href="/user-management" data-link class="menu-link">
          <i class="menu-icon tf-icons ti">&#xeb4d;</i>
          <div data-i18n="User Management">User Management</div>
        </a>
      </li>
      <li class="menu-item">
        <a href="/template" data-link class="menu-link">
          <i class="menu-icon tf-icons ti">&#xeb39;</i>
          <div data-i18n="Daftar Template">Daftar Template</div>
        </a>
      </li>
      <li class="menu-item">
        <a href="/settings" data-link class="menu-link">
          <i class="menu-icon tf-icons ti">&#xeb20;</i>
          <div data-i18n="Pengaturan">Pengaturan</div>
        </a>
      </li>
    </ul>
  </aside>
`;
