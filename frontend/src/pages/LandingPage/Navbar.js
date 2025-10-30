export function createNavbar() {
  const html = `
    <header class="bg-white/10 backdrop-blur-sm border border-white/40 shadow-lg fixed top-5 w-[80vw] rounded-lg left-1/2 transform -translate-x-1/2 z-[9999]">
      <div class="mx-auto px-10">
        <div class="flex items-center justify-between h-16 lg:h-[72px]">
          <!-- Left: Logo and Nav -->
          <div class="flex items-center justify-start gap-12 lg:gap-20">
            <!-- Logo -->
            <div class="flex items-center">
              <a href="/" class="flex items-center gap-3">
                <img src="/assets/img/logo/logoland.svg" alt="SIGAP" class="h-10 lg:h-12 w-auto" />
              </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-gray-600">
              <a href="#landingHero" class="hover:text-[#33C8DA] text-[#] transition-colors">Home</a>
              <a href="#landingFeatures" class="hover:text-[#33C8DA] transition-colors">Features</a>
              <a href="#landingRoles" class="hover:text-[#33C8DA] transition-colors">Roles</a>
              <a href="#landingFAQ" class="hover:text-[#33C8DA] transition-colors">FAQ</a>
              <a href="#landingContact" class="hover:text-[#33C8DA] transition-colors">Contact us</a>

            </nav>
          </div>

          <!-- Right: CTA Button -->
          <div class="flex items-center gap-3">
            <a href="/login" class="hidden sm:inline-flex items-center bg-[#33C8DA] text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg gap-2 hover:bg-[#2BA9B8] transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm lg:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <a href="#landingHero" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">Home</a>
          <a href="#landingFeatures" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">Features</a>
          <a href="#landingRoles" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">Roles</a>
          <a href="#landingFAQ" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">FAQ</a>
          <a href="#landingContact" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">Contact us</a>
          <a href="#" class="block py-2.5 text-gray-700 hover:text-[#33C8DA] transition-colors font-medium">Pages</a>
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
  `;

  return html;
}