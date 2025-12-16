// frontend/src/layout/sidebars/PpkSidebar.js

export const ppkSidebar = `
<style>
  /* ============== MODERN SIDEBAR FIXES - INLINE INTEGRATION ============== */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .layout-wrapper {
    display: flex;
    min-height: 100vh;
  }

  .layout-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 0;
    transition: margin-left 0.28s ease-in-out;
    margin-top: -67px;
  }

  @media (min-width: 1200px) {
    .layout-page:not(.sidebar-collapsed-content):not(.sidebar-expanded-content) {
      margin-left: -140px;
    }
    .layout-page.sidebar-collapsed-content {
      margin-left: -140px !important;
    }
    .layout-page.sidebar-expanded-content {
      margin-left: 90px !important;
    }
  }

  @media (max-width: 1199px) {
    .layout-page {
      margin-left: 0;
    }
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container-fluid-full {
    width: 100%;
    padding: 0.25rem;
    flex: 1;
  }

  .layout-navbar {
    position: sticky;
    margin-bottom: 20px;
    top: 0;
    z-index: 999;
  }

  .content-footer {
    margin-top: auto;
  }

  .layout-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }

  .layout-overlay.show {
    opacity: 1;
    visibility: visible;
  }

  .menu-mobile-toggler {
    position: flex;
    bottom: 2rem;
    right: 4rem;
    z-index: 1060;
    display: none;
  }

  @media (max-width: 1199px) {
    .menu-mobile-toggler {
      display: block;
    }
  }

  /* ============== SIDEBAR BASE ============== */
  #layout-menu {
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    width: 70px; /* Default collapsed state untuk desktop */
    transition: width 0.28s ease-in-out;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    border-right: 1px solid #f1f5f9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* Mobile default expanded */
  @media (max-width: 1199px) {
    #layout-menu {
      width: 300px;
    }
  }

  /* ============== COLLAPSED STATE (DESKTOP) ============== */
  @media (min-width: 1200px) {
    #layout-menu:not(.sidebar-expanded-js) {
      width: 70px;
      overflow: hidden;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-text,
    #layout-menu:not(.sidebar-expanded-js) .app-brand-text {
      display: none !important;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-link {
      width: 54px;
      margin: 0 auto;
      padding: 0 !important;
      border-radius: 0.375rem !important;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-link .menu-icon {
      width: 54px;
      height: 54px;
      background: transparent;
      border-radius: 0.375rem;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .app-brand {
      justify-content: center;
      padding: 1.25rem 0;
    }

    #layout-menu:not(.sidebar-expanded-js) .app-brand-logo {
      margin: 0;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-inner {
      padding: 0.5rem 0;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-item {
      width: 100%;
      padding: 0;
    }

    #layout-menu:not(.sidebar-expanded-js) .user-profile-section {
      padding: 0.5rem;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .user-profile-card {
      padding: 0;
      border-radius: 0.375rem;
      justify-content: center;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .user-info {
      display: none !important;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .user-avatar {
      margin: 0;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .logout-section {
      padding: 0.5rem;
    }
    
    #layout-menu:not(.sidebar-expanded-js) #sidebar-toggle {
      display: none !important;
    }
  }

  /* ============== EXPANDED STATE (DESKTOP) ============== */
  @media (min-width: 1200px) {
    #layout-menu.sidebar-expanded-js {
      width: 300px;
    }

    #layout-menu.sidebar-expanded-js .menu-text,
    #layout-menu.sidebar-expanded-js .app-brand-text {
      opacity: 1;
      visibility: visible;
      width: auto;
      transition: opacity 0.2s ease-in-out 0.1s;
    }

    #layout-menu.sidebar-expanded-js .app-brand {
      justify-content: flex-start;
    }

    #layout-menu.sidebar-expanded-js .menu-item {
      padding: 0 8px;
    }
    
    #layout-menu.sidebar-expanded-js .user-profile-section {
      padding: 1rem 0.5rem;
    }

    #layout-menu.sidebar-expanded-js .logout-section {
      padding: 0.5rem 0.5rem 1rem 0.5rem;
    }
  }

  /* ============== APP BRAND / LOGO ============== */
  .app-brand {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
    overflow: visible;
  }

  .app-brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    overflow: visible;
  }

  .app-brand-logo {
    width: 38px;
    height: 38px;
    min-width: 38px;
    flex-shrink: 0;
    position: relative;
    overflow: visible;
  }

  .app-brand-logo img {
    object-fit: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  /* Logo states untuk animasi */
  .logo-collapsed {
    opacity: 1;
    width: 38px;
    height: 38px;
  }

  .logo-expanded {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
    width: 200px;
    height: auto;
    max-height: 50px;
  }

  /* Ketika sidebar expanded */
  #layout-menu.sidebar-expanded-js .logo-collapsed {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }

  #layout-menu.sidebar-expanded-js .logo-expanded {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  #layout-menu.sidebar-expanded-js .app-brand-logo {
    width:250px;
    min-width: 250px;
    right: auto;
    left: auto;
  }

  .app-brand-text {
    font-weight: 700;
    font-size: 1.1rem;
    color: #0f172a;
    white-space: nowrap;
  }
  
  /* Toggle Button Styles */
  #sidebar-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: auto;
    color: #64748b;
    display: none;
    transition: all 0.2s ease;
    border-radius: 0.375rem;
  }
  
  #sidebar-toggle:hover {
    background: #e0f7fa;
    color: #00bcd4;
  }
  
  #sidebar-toggle svg {
    transition: transform 0.3s ease;
  }
  
  #layout-menu.sidebar-expanded-js #sidebar-toggle svg {
    transform: rotate(180deg);
  }

  /* ============== MENU ============== */
  .menu-inner {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 1rem 0.5rem;
  }

  .menu-item {
    margin-bottom: 0.25rem;
    list-style: none;
    padding: 0;
  }

  .menu-link {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0;
    text-decoration: none;
    color: #475569;
    border-radius: 0.5rem;
    transition: all 0.28s ease;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    height: 54px;
    overflow: hidden;
    width: 100%;
  }

  .menu-link:hover {
    background: #e0f7fa;
    color: #00bcd4;
    transform: translateX(2px);
  }

  .menu-link.active,
  .menu-item.active > .menu-link {
    background: #00bcd4;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
  }

  .menu-item.active > .menu-link .menu-icon {
    background: #00bcd4;
    color: white;
  }

  .menu-text {
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    flex: 1;
  }

  /* Icon container */
  .menu-icon {
    width: 54px;
    height: 54px;
    min-width: 54px;
    flex-shrink: 0;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #64748b;
    background: transparent;
    transition: all 0.2s ease;
  }

  .menu-icon svg {
    width: 24px;
    height: 24px;
    display: block;
  }

  .menu-icon i {
    font-size: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
    opacity: 0.5 !important;
    width: 100% !important;
    height: 100% !important;
    transition: all 0.2s ease;
  }

  .menu-link:hover .menu-icon {
    color: #00bcd4;
    transform: scale(1.05);
  }

  .menu-link:hover .menu-icon i {
    opacity: 1 !important;
  }

  #layout-menu.sidebar-expanded-js .menu-icon i {
    opacity: 1 !important;
  }

  .menu-link.active .menu-icon,
  .menu-item.active > .menu-link .menu-icon {
    background: #00bcd4 !important;
    color: white !important;
    border-radius: 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .menu-link.active .menu-icon i,
  .menu-item.active > .menu-link .menu-icon i {
    opacity: 1 !important;
    font-size: 30px !important;
    transform: scale(1) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .menu-link.active:hover .menu-icon,
  .menu-item.active > .menu-link:hover .menu-icon {
    color: white;
  }

  /* ============== USER PROFILE SECTION ============== */
  .user-profile-section {
    flex-shrink: 0;
    padding: 1rem 0;
    margin-top: auto;
  }
  
  .user-profile-card {
    background: #e0f7fa;
    border-radius: 0.375rem;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    height: 54px;
    display: flex;
    align-items: center;
  }

  .user-profile-card:active {
    transform: translateX(0);
  }
  
  .user-profile-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }
  
  .user-avatar {
    width: 54px;
    height: 54px;
    min-width: 54px;
    border-radius: 0.375rem;
    background: #00bcd4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    color: white;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }
  
  .user-info {
    flex: 1;
    overflow: hidden;
    padding-right: 0.75rem;
  }
  
  .user-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: #0f172a;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease;
  }
  
  .user-role {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0.15rem 0 0 0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .user-role::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }
  
  .user-profile-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, padding 0.3s ease;
    opacity: 0;
    padding: 0 0.75rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #b2ebf2;
    border-radius: 0 0 0.375rem 0.375rem;
    z-index: 10;
  }
  
  .user-profile-card.expanded {
    border-radius: 0.375rem 0.375rem 0 0;
  }
  
  .user-profile-card.expanded .user-profile-details {
    max-height: 200px;
    opacity: 1;
    padding: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-email {
    font-size: 0.8rem;
    color: #475569;
    margin: 0;
    padding: 0.5rem;
    background: white;
    border-radius: 0.375rem;
    word-break: break-all;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .user-email svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  /* ============== LOGOUT SECTION ============== */
  .logout-section {
    flex-shrink: 0;
    padding: 0.5rem 0 1rem 0;
    border-top: 1px solid #e2e8f0;
  }

  #logout-btn .menu-icon {
    color: #ef4444 !important;
    background: transparent;
    border-radius: 0.375rem;
  }
  
  #logout-btn:hover .menu-icon {
    color: #dc2626 !important;
    background: transparent;
  }
  
  #logout-btn:hover .menu-text {
    color: #dc2626 !important;
  }
  
  #logout-btn:hover {
    background-color: #fee2e2 !important;
    transform: translateX(2px);
  }
  
  #logout-btn {
    color: #ef4444 !important;
    border-radius: 0.375rem !important;
  }

  /* ============== MOBILE RESPONSIVE ============== */
  @media (max-width: 1199px) {
    #layout-menu {
      transform: translateX(-100%);
      z-index: 1100;
      transition: transform 0.3s ease-in-out;
    }

    #layout-menu.show {
      transform: translateX(0);
    }
    
    /* Logo always show extended on mobile */
    #layout-menu .logo-collapsed {
      opacity: 0 !important;
      transform: scale(0.8) !important;
    }
    
    #layout-menu .logo-expanded {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
    
    #sidebar-toggle {
      display: none !important;
    }
  }
  
  /* Show toggle button on desktop */
  @media (min-width: 1200px) {
    #sidebar-toggle {
      display: block !important;
    }
  }

  /* ============== TOOLTIP ============== */
  @media (min-width: 1200px) {
    #layout-menu:not(.sidebar-expanded-js) .menu-link[data-tooltip] {
      position: relative;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-link[data-tooltip]::before {
      content: attr(data-tooltip);
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      background: #1e293b;
      color: white;
      padding: 0.35rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.8rem;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      z-index: 1000;
    }

    #layout-menu:not(.sidebar-expanded-js) .menu-link[data-tooltip]:hover::before {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) scale(1);
    }
    
    /* Tooltip untuk user profile saat collapsed */
    #layout-menu:not(.sidebar-expanded-js) .user-profile-card {
      position: relative;
    }
    
    #layout-menu:not(.sidebar-expanded-js) .user-profile-card::after {
      content: attr(data-user-name);
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      background: #1e293b;
      color: white;
      padding: 0.35rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.8rem;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      z-index: 1000;
    }
  }
  
  /* ============== SCROLLBAR ============== */
  .menu-inner::-webkit-scrollbar {
    width: 6px;
  }

  .menu-inner::-webkit-scrollbar-track {
    background: transparent;
  }

  .menu-inner::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
    transition: background 0.2s ease;
  }

  .menu-inner::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
</style>

<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
  <div class="app-brand demo">
    <a href="/ppk/dashboard" class="app-brand-link">
      <span class="app-brand-logo demo">
        <img src="/assets/img/logo/logo.svg" alt="Logo" class="logo-collapsed">
        <img src="/assets/img/logo/logo2.svg" alt="Logo Extended" class="logo-expanded">
      </span>
    </a>
    <button id="sidebar-toggle" class="menu-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
  </div>

  <ul class="menu-inner">
    <!-- Dashboard -->
    <li class="menu-item">
      <a href="/ppk/dashboard" class="menu-link" data-tooltip="Dashboard">
        <span class="menu-icon">
          <i class="ti ti-home">&#xecde;</i>
        </span>
        <span class="menu-text">Dasbor</span>
      </a>
    </li>

    <!-- Monitoring Kegiatan -->
    <li class="menu-item">
      <a href="/ppk/kegiatan/monitoring" class="menu-link" data-tooltip="Monitoring Kegiatan">
        <span class="menu-icon">
          <i class="ti ti-eye">&#xea9a;</i>
        </span>
        <span class="menu-text">Pemantauan Kegiatan</span>
      </a>
    </li>

    <!-- Riwayat -->
    <li class="menu-item">
      <a href="/ppk/riwayat" class="menu-link" data-tooltip="Riwayat">
        <span class="menu-icon">
          <i class="ti ti-history">&#xebea;</i>
        </span>
        <span class="menu-text">Riwayat Kegiatan</span>
      </a>
    </li>
  </ul>

  <!-- User Profile Section -->
  <div class="user-profile-section">
    <div class="user-profile-card" id="user-profile-card" data-user-name="">
      <div class="user-profile-header">
        <div class="user-avatar" id="user-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="user-info">
          <p class="user-name" id="user-name"></p>
          <p class="user-role" id="user-role"></p>
        </div>
      </div>
      <div class="user-profile-details">
        <p class="user-email" id="user-email">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span></span>
        </p>
      </div>
    </div>
  </div>

  <!-- Logout Section -->
  <div class="logout-section">
    <a href="#" class="menu-link" id="logout-btn" data-tooltip="Logout">
      <span class="menu-icon">
        <i class="ti ti-logout">&#xeba8;</i>
      </span>
      <span class="menu-text">Keluar</span>
    </a>
  </div>
</aside>

<script>
  // ============= PPK SIDEBAR API INTEGRATION =============
  // Global functions for user data management
  function loadUserData() {
    console.log('[PPK SIDEBAR] 🚀 Starting loadUserData...');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      console.log('[PPK SIDEBAR] ✅ Found cached user data');
      try {
        const userData = JSON.parse(storedUserData);
        updateUserProfile(userData);
      } catch (e) {
        console.error('[PPK SIDEBAR] ❌ Error parsing cached data:', e);
      }
    }
    
    // Always fetch fresh data from API
    console.log('[PPK SIDEBAR] 🌐 Fetching fresh data from API...');
    fetchUserDataFromAPI();
  }

  function fetchUserDataFromAPI() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('[PPK SIDEBAR] ❌ No token found');
      return;
    }

    console.log('[PPK SIDEBAR] 📡 Calling /api/auth/profile...');

    fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('[PPK SIDEBAR] 📥 Response status:', response.status);
        return response.json();
      })
      .then(result => {
        console.log('[PPK SIDEBAR] 📦 API Response:', result);
        
        if (result.success && result.data) {
          const userData = {
            name: result.data.nama_lengkap || result.data.username || 'User',
            email: result.data.email || '',
            role: result.data.roles && result.data.roles.length > 0 
                  ? result.data.roles[0] 
                  : 'PPK',
            username: result.data.username || ''
          };
          
          console.log('[PPK SIDEBAR] ✅ Mapped userData:', userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          updateUserProfile(userData);
        } else {
          console.error('[PPK SIDEBAR] ❌ Invalid API response structure');
        }
      })
      .catch(error => {
        console.error('[PPK SIDEBAR] ❌ API Error:', error);
      });
  }

  function updateUserProfile(userData) {
    console.log('[PPK SIDEBAR] 🎨 Updating UI with:', userData);
    
    const userNameEl = document.getElementById('user-name');
    const userEmailEl = document.querySelector('#user-email span');
    const userRoleEl = document.getElementById('user-role');
    const userAvatarEl = document.getElementById('user-avatar');
    const userProfileCard = document.getElementById('user-profile-card');
    
    if (userData.name && userNameEl) {
      userNameEl.textContent = userData.name;
      console.log('[PPK SIDEBAR] ✅ Updated name:', userData.name);
      
      // Update avatar with initials
      const initials = userData.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
      
      if (userAvatarEl) {
        userAvatarEl.textContent = initials;
        console.log('[PPK SIDEBAR] ✅ Updated avatar:', initials);
      }
      
      if (userProfileCard) {
        userProfileCard.setAttribute('data-user-name', userData.name);
      }
    }
    
    if (userData.email && userEmailEl) {
      userEmailEl.textContent = userData.email;
      console.log('[PPK SIDEBAR] ✅ Updated email:', userData.email);
    }
    
    if (userData.role && userRoleEl) {
      userRoleEl.textContent = userData.role;
      console.log('[PPK SIDEBAR] ✅ Updated role:', userData.role);
    }
  }

  // DOMContentLoaded - main initialization
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[PPK SIDEBAR] 🎬 DOMContentLoaded fired');
    
    const sidebar = document.getElementById('layout-menu');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const userProfileCard = document.getElementById('user-profile-card');
    
    // User Profile Card Toggle
    if (userProfileCard) {
      userProfileCard.addEventListener('click', function(e) {
        e.preventDefault();
        const isDesktop = window.innerWidth >= 1200;
        const isSidebarExpanded = sidebar.classList.contains('sidebar-expanded-js');
        
        if (!isDesktop || isSidebarExpanded) {
          this.classList.toggle('expanded');
        }
      });
    }
    
    // Load user data with small delay to ensure DOM is ready
    setTimeout(() => {
      loadUserData();
    }, 200);
    
    // Set active menu based on current URL
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link[href]');
    
    menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && currentPath.includes(href)) {
        link.classList.add('active');
        link.closest('.menu-item').classList.add('active');
      }
    });
    
    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin logout?')) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          window.location.href = '/logout';
        }
      });
    }
    
    // Close user profile when clicking outside (mobile)
    document.addEventListener('click', function(e) {
      if (userProfileCard && !userProfileCard.contains(e.target)) {
        userProfileCard.classList.remove('expanded');
      }
    });
  });

  // Backup: window.load event
  window.addEventListener('load', function() {
    console.log('[PPK SIDEBAR] 🔄 Window loaded - checking if data populated');
    const userNameEl = document.getElementById('user-name');
    if (userNameEl && !userNameEl.textContent.trim()) {
      console.log('[PPK SIDEBAR] ⚠️ Name empty on window.load, retrying...');
      loadUserData();
    }
  });

  // Debug tools
  window.ppkSidebarDebug = {
    loadUserData,
    fetchUserDataFromAPI,
    updateUserProfile,
    checkElements: function() {
      console.log('[PPK SIDEBAR DEBUG] 🔍 Element check:');
      console.log('  user-name:', document.getElementById('user-name'));
      console.log('  user-email:', document.querySelector('#user-email span'));
      console.log('  user-role:', document.getElementById('user-role'));
      console.log('  user-avatar:', document.getElementById('user-avatar'));
    }
  };

  console.log('[PPK SIDEBAR] ✅ Debug tools ready! Use window.ppkSidebarDebug');
</script>
`;
