// frontend/src/pages/pengusul/KerangkaAcuanKerja.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderKerangkaAcuanKerja(userRole) {
  const pageContent = `
    <style>
      /* --- Custom CSS for Multi-Step Form --- */
      
      /* 1. Main Background */
      .layout-wrapper {
        background-image: url('/assets/img/backgrounds/BG.png') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      .content-wrapper {
        background: transparent !important;
      }
      .layout-navbar, .content-footer, .layout-menu {
        background: #FFFFFF !important;
      }

      /* 2. Sidebar */
      .app-brand-text {
        color: #00BCD4 !important;
        font-size: 20px !important;
        font-weight: 700 !important;
      }
      .menu-inner .menu-item.active > .menu-link {
        background: #00BCD4 !important;
        color: #ffffff !important;
        border-radius: 8px;
        margin: 0 0.5rem;
        backdrop-filter: blur(5px);
      }

      /* 3. Container */
      .container-xxl {
        max-width: 96% !important;
      }

      /* 4. Progress Steps */
      .progress-steps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }

      .step-item {
        flex: 1;
        text-align: center;
        position: relative;
        padding: 0 1rem;
      }

      .step-number {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: #E5E7EB;
        color: #6B7280;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 0.5rem;
        font-weight: 700;
        font-size: 18px;
        transition: all 0.3s ease;
      }

      .step-item.active .step-number {
        background: #00BCD4;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
      }

      .step-item.completed .step-number {
        background: #10B981;
        color: white;
      }

      .step-title {
        font-size: 13px;
        font-weight: 600;
        color: #6B7280;
        line-height: 1.3;
      }

      .step-subtitle {
        font-size: 11px;
        color: #9CA3AF;
        margin-top: 2px;
      }

      .step-item.active .step-title {
        color: #00BCD4;
      }

      .step-item.active .step-subtitle {
        color: #4DD0E1;
      }

      /* 5. Form Content Area */
      .form-content-area {
        display: flex;
        gap: 2rem;
      }

      .sidebar-menu {
        flex: 0 0 380px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .menu-button {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 2px solid transparent;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        text-align: left;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .menu-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      .menu-button.active {
        background: rgba(0, 188, 212, 0.1);
        border-color: #00BCD4;
      }

      .menu-button .menu-icon {
        width: 24px;
        height: 24px;
        background: #00BCD4;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
      }

      .menu-button .menu-text {
        font-weight: 600;
        color: #00BCD4;
        font-size: 15px;
      }

      .main-form-area {
        flex: 1;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        min-height: 500px;
      }

      /* 6. Form Elements */
      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        display: block;
        font-size: 14px;
      }

      .form-control, .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid #E5E7EB;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
        background: white;
      }

      .form-control:focus, .form-select:focus {
        outline: none;
        border-color: #00BCD4;
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
      }

      textarea.form-control {
        min-height: 200px;
        resize: vertical;
      }

      /* 7. Dynamic Fields */
      .dynamic-field-group {
        margin-bottom: 2rem;
      }

      .dynamic-field-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      .dynamic-field-item .form-control {
        flex: 1;
      }

      .btn-remove-field {
        background: #EF4444;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
        margin-top: 0;
      }

      .btn-remove-field:hover {
        background: #DC2626;
        transform: scale(1.1);
      }

      .btn-add-field {
        background: #00BCD4;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-block;
      }

      .btn-add-field:hover {
        background: #0097A7;
        transform: translateY(-2px);
      }

      /* 8. Navigation Buttons */
      .form-navigation {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }

      .btn-back, .btn-next {
        padding: 0.75rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .btn-back {
        background: rgba(0, 188, 212, 0.1);
        color: #00BCD4;
      }

      .btn-back:hover {
        background: rgba(0, 188, 212, 0.2);
      }

      .btn-next {
        background: #00BCD4;
        color: white;
      }

      .btn-next:hover {
        background: #0097A7;
        transform: translateY(-2px);
      }

      /* 9. Three Column Layout */
      .three-column-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      /* 10. Hidden Step */
      .step-content {
        display: none;
      }

      .step-content.active {
        display: block;
      }
    </style>

    <div class="kerangka-acuan-kerja-page">
      <!-- Progress Steps -->
      <div class="progress-steps">
        <div class="step-item active" data-step="1">
          <div class="step-number">1</div>
          <div class="step-title">Kerangka Acuan Kerja</div>
        </div>
        <div class="step-item" data-step="2">
          <div class="step-number">2</div>
          <div class="step-title">Indikator Kinerja Utama</div>
          <div class="step-subtitle">& RENSTRA</div>
        </div>
        <div class="step-item" data-step="3">
          <div class="step-number">3</div>
          <div class="step-title">Rincian Anggaran Biaya</div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="form-content-area">
        <!-- Sidebar Menu -->
        <div class="sidebar-menu">
          <button class="menu-button active" data-menu="gambaran-umum">
            <div class="menu-icon">O</div>
            <div class="menu-text">Gambaran Umum</div>
          </button>
          <button class="menu-button" data-menu="penerima-manfaat">
            <div class="menu-icon">O</div>
            <div class="menu-text">Penerima Manfaat</div>
          </button>
          <button class="menu-button" data-menu="strategi-pencapaian">
            <div class="menu-icon">O</div>
            <div class="menu-text">Strategi Pencapaian</div>
          </button>
          <button class="menu-button" data-menu="indikator-kinerja">
            <div class="menu-icon">O</div>
            <div class="menu-text">Indikator Kinerja</div>
          </button>
          <button class="menu-button" data-menu="kurun-waktu">
            <div class="menu-icon">O</div>
            <div class="menu-text">Kurun Waktu Pelaksanaan</div>
          </button>
        </div>

        <!-- Main Form Area -->
        <div class="main-form-area">
          <!-- Step 1: Gambaran Umum -->
          <div class="step-content active" id="gambaran-umum">
            <h4 style="color: #00BCD4; margin-bottom: 1.5rem; font-weight: 700;">Gambaran Umum</h4>
            
            <div class="form-group">
              <label class="form-label">Pengusul Kegiatan</label>
              <input type="text" class="form-control" placeholder="Input" id="pengusul">
            </div>

            <div class="form-group">
              <label class="form-label">Nama Kegiatan</label>
              <input type="text" class="form-control" placeholder="Input" id="namaKegiatan">
            </div>

            <div class="form-group">
              <label class="form-label">Gambaran Umum Kegiatan</label>
              <textarea class="form-control" placeholder="Input" id="gambaranUmum"></textarea>
            </div>
          </div>

          <!-- Step 2: Penerima Manfaat -->
          <div class="step-content" id="penerima-manfaat">
            <h4 style="color: #00BCD4; margin-bottom: 1.5rem; font-weight: 700;">Penerima Manfaat</h4>
            
            <div class="dynamic-field-group">
              <label class="form-label">Sasaran Utama</label>
              <div id="sasaranUtamaContainer">
                <div class="dynamic-field-item">
                  <input type="text" class="form-control" placeholder="Input">
                  <button type="button" class="btn-remove-field" onclick="removeField(this)">
                    <span style="font-size: 20px; font-weight: bold;">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="btn-add-field" onclick="addSasaranUtama()">Tambah</button>
            </div>

            <div class="dynamic-field-group">
              <label class="form-label">Manfaat</label>
              <div id="manfaatContainer">
                <div class="dynamic-field-item">
                  <input type="text" class="form-control" placeholder="Input">
                  <button type="button" class="btn-remove-field" onclick="removeField(this)">
                    <span style="font-size: 20px; font-weight: bold;">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="btn-add-field" onclick="addManfaat()">Tambah</button>
            </div>
          </div>

          <!-- Step 3: Strategi Pencapaian -->
          <div class="step-content" id="strategi-pencapaian">
            <h4 style="color: #00BCD4; margin-bottom: 1.5rem; font-weight: 700;">Strategi Pencapaian</h4>
            
            <div class="form-group">
              <label class="form-label">Metode Pelaksanaan</label>
              <textarea class="form-control" placeholder="Input" id="metodePelaksanaan"></textarea>
            </div>

            <div class="dynamic-field-group">
              <label class="form-label">Tahapan Pelaksanaan</label>
              <div id="tahapanPelaksanaanContainer">
                <div class="dynamic-field-item">
                  <input type="text" class="form-control" placeholder="Input">
                  <button type="button" class="btn-remove-field" onclick="removeField(this)">
                    <span style="font-size: 20px; font-weight: bold;">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="btn-add-field" onclick="addTahapanPelaksanaan()">Tambah</button>
            </div>
          </div>

          <!-- Step 4: Indikator Kinerja -->
          <div class="step-content" id="indikator-kinerja">
            <h4 style="color: #00BCD4; margin-bottom: 1.5rem; font-weight: 700;">Indikator Kinerja</h4>
            
            <div class="dynamic-field-group">
              <label class="form-label">Indikator Kinerja</label>
              <div id="indikatorKinerjaContainer">
                <div class="dynamic-field-item">
                  <div class="three-column-row">
                    <div>
                      <label class="form-label" style="font-size: 12px;">Bulan</label>
                      <input type="text" class="form-control" placeholder="Input">
                    </div>
                    <div>
                      <label class="form-label" style="font-size: 12px;">Indikator Keberhasilan</label>
                      <input type="text" class="form-control" placeholder="Input">
                    </div>
                    <div>
                      <label class="form-label" style="font-size: 12px;">Target</label>
                      <input type="text" class="form-control" placeholder="Input">
                    </div>
                  </div>
                  <button type="button" class="btn-remove-field" onclick="removeField(this)" style="margin-top: 0.5rem;">
                    <span style="font-size: 20px; font-weight: bold;">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="btn-add-field" onclick="addIndikatorKinerja()">Tambah</button>
            </div>

            <div class="dynamic-field-group">
              <label class="form-label">Tahapan Pelaksanaan</label>
              <div id="tahapanPelaksanaanKinerjaContainer">
                <div class="dynamic-field-item">
                  <input type="text" class="form-control" placeholder="Input">
                  <button type="button" class="btn-remove-field" onclick="removeField(this)">
                    <span style="font-size: 20px; font-weight: bold;">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="btn-add-field" onclick="addTahapanPelaksanaanKinerja()">Tambah</button>
            </div>
          </div>

          <!-- Step 5: Kurun Waktu Pelaksanaan -->
          <div class="step-content" id="kurun-waktu">
            <h4 style="color: #00BCD4; margin-bottom: 1.5rem; font-weight: 700;">Kurun Waktu Pelaksanaan</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div class="form-group">
                <label class="form-label">Tanggal Mulai</label>
                <input type="date" class="form-control" id="tanggalMulai" value="2025-03-11">
              </div>

              <div class="form-group">
                <label class="form-label">Tanggal Selesai</label>
                <input type="date" class="form-control" id="tanggalSelesai">
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="form-navigation">
            <button class="btn-back" id="btnBack">
              <span>←</span> Back
            </button>
            <button class="btn-next" id="btnNext">
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render the main layout
  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---

  let currentStep = 1;
  const totalSteps = 5;
  const menuItems = [
    "gambaran-umum",
    "penerima-manfaat",
    "strategi-pencapaian",
    "indikator-kinerja",
    "kurun-waktu",
  ];

  // Initialize
  function init() {
    updateStepDisplay();
    attachEventListeners();
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Menu buttons
    document.querySelectorAll(".menu-button").forEach((btn) => {
      btn.addEventListener("click", function () {
        const menuTarget = this.getAttribute("data-menu");
        const menuIndex = menuItems.indexOf(menuTarget);
        if (menuIndex !== -1) {
          currentStep = menuIndex + 1;
          updateStepDisplay();
        }
      });
    });

    // Back button
    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepDisplay();
        }
      });
    }

    // Next button
    const btnNext = document.getElementById("btnNext");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepDisplay();
        } else {
          // Submit form or go to next major step
          alert(
            "Form Step 1 selesai! Lanjut ke Indikator Kinerja Utama & RENSTRA"
          );
        }
      });
    }
  }

  // Update Step Display
  function updateStepDisplay() {
    // Update menu buttons
    document.querySelectorAll(".menu-button").forEach((btn, index) => {
      if (index + 1 === currentStep) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update content
    document.querySelectorAll(".step-content").forEach((content, index) => {
      if (index + 1 === currentStep) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });

    // Update navigation buttons
    const btnBack = document.getElementById("btnBack");
    const btnNext = document.getElementById("btnNext");

    if (btnBack) {
      btnBack.style.visibility = currentStep === 1 ? "hidden" : "visible";
    }

    if (btnNext) {
      btnNext.textContent = currentStep === totalSteps ? "Submit" : "Next →";
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Dynamic Field Functions (Global scope)
  window.removeField = function (btn) {
    const item = btn.closest(".dynamic-field-item");
    const container = item.parentElement;
    if (container.children.length > 1) {
      item.remove();
    } else {
      alert("Minimal harus ada 1 field!");
    }
  };

  window.addSasaranUtama = function () {
    const container = document.getElementById("sasaranUtamaContainer");
    const newItem = document.createElement("div");
    newItem.className = "dynamic-field-item";
    newItem.innerHTML = `
      <input type="text" class="form-control" placeholder="Input">
      <button type="button" class="btn-remove-field" onclick="removeField(this)">
        <span style="font-size: 20px; font-weight: bold;">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addManfaat = function () {
    const container = document.getElementById("manfaatContainer");
    const newItem = document.createElement("div");
    newItem.className = "dynamic-field-item";
    newItem.innerHTML = `
      <input type="text" class="form-control" placeholder="Input">
      <button type="button" class="btn-remove-field" onclick="removeField(this)">
        <span style="font-size: 20px; font-weight: bold;">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addTahapanPelaksanaan = function () {
    const container = document.getElementById("tahapanPelaksanaanContainer");
    const newItem = document.createElement("div");
    newItem.className = "dynamic-field-item";
    newItem.innerHTML = `
      <input type="text" class="form-control" placeholder="Input">
      <button type="button" class="btn-remove-field" onclick="removeField(this)">
        <span style="font-size: 20px; font-weight: bold;">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addIndikatorKinerja = function () {
    const container = document.getElementById("indikatorKinerjaContainer");
    const newItem = document.createElement("div");
    newItem.className = "dynamic-field-item";
    newItem.innerHTML = `
      <div class="three-column-row">
        <div>
          <label class="form-label" style="font-size: 12px;">Bulan</label>
          <input type="text" class="form-control" placeholder="Input">
        </div>
        <div>
          <label class="form-label" style="font-size: 12px;">Indikator Keberhasilan</label>
          <input type="text" class="form-control" placeholder="Input">
        </div>
        <div>
          <label class="form-label" style="font-size: 12px;">Target</label>
          <input type="text" class="form-control" placeholder="Input">
        </div>
      </div>
      <button type="button" class="btn-remove-field" onclick="removeField(this)" style="margin-top: 0.5rem;">
        <span style="font-size: 20px; font-weight: bold;">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addTahapanPelaksanaanKinerja = function () {
    const container = document.getElementById(
      "tahapanPelaksanaanKinerjaContainer"
    );
    const newItem = document.createElement("div");
    newItem.className = "dynamic-field-item";
    newItem.innerHTML = `
      <input type="text" class="form-control" placeholder="Input">
      <button type="button" class="btn-remove-field" onclick="removeField(this)">
        <span style="font-size: 20px; font-weight: bold;">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  // Initialize
  init();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
