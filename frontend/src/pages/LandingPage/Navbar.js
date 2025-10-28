export function createNavbar() {
  const html = `
		<header class="bg-white fixed top-5 w-[60vw] left-1/2 transform -translate-x-1/2 ">
			<div class="container mx-auto px-4">
				<div class="flex items-center justify-between h-16">
					<div class="flex items-center">
						<a href="/" class="flex items-center gap-3">
							<img src="/frontend/public/assets/img/logo/logo.svg" alt="SIGAP" class="h-8 w-auto" />
							<span class="hidden sm:inline-block font-bold text-teal-600">SIGAP</span>
						</a>
					</div>

					<nav class="hidden md:flex items-center space-x-6 text-sm text-gray-700">
						<a href="#" class="hover:text-teal-600">Home</a>
						<a href="#" class="hover:text-teal-600">Features</a>
						<a href="#" class="hover:text-teal-600">Roles</a>
						<a href="#" class="hover:text-teal-600">FAQ</a>
						<a href="#" class="hover:text-teal-600">Contact us</a>
						<div class="relative">
							<button class="hover:text-teal-600">Pages ▼</button>
						</div>
					</nav>

					<div class="flex items-center gap-3">
						<a href="/app" class="hidden sm:inline-block bg-[#00C2D0] text-white px-4 py-2 rounded-lg hover:bg-[#00A9B8] transition">Masuk Ke Aplikasi</a>

						<!-- Mobile menu button -->
						<button id="nav-toggle" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
							<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile menu -->
			<div id="mobile-menu" class="md:hidden hidden">
				<div class="px-4 pb-4 space-y-2">
					<a href="#" class="block py-2 text-gray-700">Home</a>
					<a href="#" class="block py-2 text-gray-700">Features</a>
					<a href="#" class="block py-2 text-gray-700">Roles</a>
					<a href="#" class="block py-2 text-gray-700">FAQ</a>
					<a href="#" class="block py-2 text-gray-700">Contact us</a>
					<a href="/app" class="block py-2 bg-[#00C2D0] text-white rounded-lg text-center">Masuk Ke Aplikasi</a>
				</div>
			</div>
		</header>
	`;

  return html;
}
