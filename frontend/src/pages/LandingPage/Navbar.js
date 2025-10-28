export function createNavbar() {
  const html = `
		<header class="bg-white/10 backdrop-blur-sm border border-white fixed top-5 w-[80vw] rounded-lg left-1/2 transform -translate-x-1/2 py-1">
			<div class=" mx-auto px-10">
				<div class="flex items-center justify-between h-16">
					<div class="flex items-center justify-start gap-16">
						<div class="flex items-center">
							<a href="/" class="flex items-center gap-3">
								<img src="/assets/img/logo/logo.svg" alt="SIGAP" class="h-12 w-auto" />
								<span class="hidden sm:inline-block font-bold text-2xl text-[#3ADBFF]">SIGAP</span>
							</a>
						</div>

						<nav class="hidden md:flex items-center space-x-8 text-md text-gray-700">
							<a href="#" class="hover:text-black/60 text-[#33C8DA]">Home</a>
							<a href="#" class="hover:text-black/60">Features</a>
							<a href="#" class="hover:text-black/60">Roles</a>
							<a href="#" class="hover:text-black/60">FAQ</a>
							<a href="#" class="hover:text-black/60">Contact us</a>
						</nav>
					</div>
					<div class="flex items-center gap-3">
						<a href="/app" class="hidden sm:inline-flex items-center bg-[#33C8DA] text-white px-4 py-3 rounded-lg gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M21 12h-13l3 -3" /><path d="M11 15l-3 -3" /></svg>
							<span class="whitespace-nowrap">Masuk Ke Aplikasi</span>
						</a>

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
