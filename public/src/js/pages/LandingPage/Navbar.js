export function createNavbar() {
  const html = `
    <header class="bg-white/10 backdrop-blur-sm border border-white/40 shadow-lg fixed top-5 w-[80vw] rounded-lg left-1/2 transform -translate-x-1/2 z-[9999]">
      <div class="mx-auto px-10">
        <div class="flex items-center justify-between h-16 lg:h-[72px]">
          <!-- Logo -->
          <div class="flex items-center">
            <a href="/" class="flex items-center gap-3">
              <img src="/assets/img/logo/logoland.svg" alt="SIGAP" class="h-10 lg:h-12 w-auto" />
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-2 text-[15px] font-medium">
            <a href="#landingHero" class="nav-item">Beranda</a>
            <a href="#landingFeatures" class="nav-item">Fitur Utama</a>
            <a href="#landingRoles" class="nav-item">Peran</a>
            <a href="#landingFAQ" class="nav-item">FAQ</a>
            <a href="#landingContact" class="nav-item">Kontak Kami</a>
          </nav>

          <!-- CTA Button -->
          <div class="flex items-center gap-3">
            <a href="/login" class="cta-btn hidden sm:inline-flex items-center bg-[#33C8DA] text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg gap-2 font-medium text-sm lg:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cta-icon">
                <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M21 12h-13l3 -3" />
                <path d="M11 15l-3 -3" />
              </svg>
              <span class="whitespace-nowrap">Masuk Ke Aplikasi</span>
            </a>

            <!-- Mobile menu button -->
            <button id="nav-toggle" class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100/50 transition-colors">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="lg:hidden hidden border-t border-gray-200 bg-white/98 backdrop-blur-md rounded-b-xl">
        <div class="px-6 py-5 space-y-3">
          <a href="#landingHero" class="mobile-item">Home</a>
          <a href="#landingFeatures" class="mobile-item">Features</a>
          <a href="#landingRoles" class="mobile-item">Roles</a>
          <a href="#landingFAQ" class="mobile-item">FAQ</a>
          <a href="#landingContact" class="mobile-item">Contact us</a>
          <a href="/login" class="flex items-center justify-center gap-2 mt-4 py-3 bg-[#33C8DA] text-white rounded-lg font-medium hover:bg-[#2BA9B8] transition-colors shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M21 12h-13l3 -3" />
              <path d="M11 15l-3 -3" />
            </svg>
            Masuk Ke Aplikasi
          </a>
        </div>
      </div>
    </header>

    <style>
      .nav-item {
        position: relative;
        padding: 0.5rem 1rem;
        color: #4b5563;
        transition: color 0.7s ease;
      }
      
      .nav-item::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #33C8DA, transparent);
        transition: width 0.7s ease, left 0.7s ease;
      }
      
      .nav-item:hover {
        color: #33C8DA;
      }
      
      .nav-item:hover::before {
        width: 80%;
        left: 10%;
      }
      
      .cta-btn {
        position: relative;
        overflow: hidden;
        transition: transform 0.7s ease, box-shadow 0.7s ease;
      }
      
      .cta-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }
      
      .cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -6px rgba(51, 200, 218, 0.5);
      }
      
      .cta-btn:hover::before {
        left: 100%;
      }
      
      .cta-btn:hover .cta-icon {
        animation: nudge 0.4s ease;
      }
      
      .mobile-item {
        display: block;
        padding: 0.625rem 0;
        color: #374151;
        font-weight: 500;
        transition: color 0.2s ease, transform 0.2s ease;
      }
      
      .mobile-item:hover {
        color: #33C8DA;
        transform: translateX(4px);
      }
    </style>
  `;

  return html;
}