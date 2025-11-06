export function createFooter() {
  const footerHTML = `
    <footer class="bg-[#2BA9B8] text-white rounded-t-3xl flex flex-col w-full">
      <div class="py-4 px-48 w-full">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex flex-col md:flex-row items-center justify-start w-full">
            <div class="flex flex-col mb-4 md:mb-0 w-2/5 my-10 border-r border-white/30 pr-2 mr-6">
              <div class="flex items-center pb-4">
                <img src="/assets/img/logo/logo-white.svg" alt="SIGAP Logo" class="h-8 w-auto mr-3">
                <div class="font-bold text-lg">SIGAP</div>
              </div>
              <div class="text-sm">Sistem Informasi Pengajuan KAK & LPJ</div>
              <div class="text-sm py-4">Membantu digitalisasi proses administrasi kegiatan kampus  secara cepat, transparan, dan efisien.</div>
            </div>
            <div class="text-sm w-1/3 my-10">
              <p class='font-bold pb-6'>SECTIONS</p>
              <div class='flex flex-col gap-4'>
                <div class='flex gap-6'>
                  <a class='hover:-translate-y-1 transition-discrete duration-200'>Home</a>
                  <a class='hover:-translate-y-1 transition-discrete duration-200'>Features</a>
                  <a class='hover:-translate-y-1 transition-discrete duration-200'>Roles</a>
                  <a class='hover:-translate-y-1 transition-discrete duration-200'>FAQs</a>
                  <a class='hover:-translate-y-1 transition-discrete duration-200'>Contact us</a>
                </div>
              </div>
            </div>
          </div>
          <div class="text-sm w-1/3 my-10">
            <p class='font-bold pb-4'>HUBUNGI KAMI</p>
            <div class='flex flex-col gap-4'>
              <div class='flex flex-col gap-2'>
                <a class='hover:translate-x-1 transition-discrete duration-200'>sigap@pnj.ac.id</a>
                <a class='hover:translate-x-1 transition-discrete duration-200'>+62 812 1302 0861</a>
                <a class='hover:translate-x-1 transition-discrete duration-200'>Politeknik Negeri Jakarta,<br> Kampus UI Depok</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" bg-[#267A84] py-4 px-48 w-full flex justify-between items-center">
        <span>© 2025 SIGAP PNJ - Sistem Informasi Pengajuan KAK & LPJ</span>
        <div class='flex gap-8'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>        </div>
      </div>
    </footer>
  `;

  // Jika ada elemen dengan id 'footer', tambahkan footer ke sana
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  } else {
    // Jika tidak ada container, tambahkan ke akhir body
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
}
