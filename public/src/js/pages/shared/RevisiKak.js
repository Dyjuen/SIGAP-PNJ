// frontend/src/pages/verifikator/RevisiKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderRevisiKakPage(path, userRole) {
  const isVerifikator = userRole.toLowerCase() === "verifikator";
  const isPengusul = userRole.toLowerCase() === "pengusul";

  const inputAttr = isPengusul ? "" : "readonly disabled";
  const inputStyle = isPengusul
    ? ""
    : "border-color: #F3F4F6 !important; background: #F3F4F6 !important; cursor: default;";
  const pageContent = `
    <style>
      /* Comment button styling */
      .comment-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }
      
      .comment-icon:hover {
        background: #00BCD4;
        color: white;
        transform: translateY(-50%) scale(1.1);
      }
      
      .comment-icon.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      
      .comment-icon.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      
      @keyframes pulse-comment {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      }
      
      .input-with-comment {
        position: relative;
      }
      
      .input-with-comment input,
      .input-with-comment textarea,
      .input-with-comment select {
        padding-right: 52px !important;
      }
      
      /* Row comment styling */
      .row-with-comment {
        position: relative;
        padding: 1rem;
        border: 2px solid #E5E7EB;
        border-radius: 12px;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
        background: white;
      }
      
      .row-with-comment:hover {
        border-color: #00BCD4;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
        transform: translateY(-2px);
      }
      
      .row-with-comment.has-row-comment {
        background: #FEF2F2;
        border-color: #FCA5A5;
      }
      
      .row-with-comment.has-row-comment:hover {
        border-color: #EF4444;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
      }
      
      .row-comment-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }
      
      .row-comment-icon:hover {
        background: #00BCD4;
        color: white;
        transform: translateY(-50%) scale(1.1);
      }
      
      .row-comment-icon.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      
      .row-comment-icon.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      
      .row-with-comment .input-with-comment input {
        padding-right: 12px !important;
      }
      
      /* Progress Steps */
      .progress-step-item {
        cursor: default;
      }
      
      .progress-step-circle {
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
      }
      
      /* Menu buttons */
      .menu-button {
        transition: all 0.3s ease;
      }
      
      .menu-button.active {
        border-color: #00BCD4 !important;
        background: rgba(0, 188, 212, 0.1) !important;
      }
      
      /* Step content */
      .step-content {
        display: none;
      }
      
      .step-content.active {
        display: block;
      }
      
      .main-step-content {
        display: none;
      }
      
      .main-step-content.active {
        display: block;
      }
      
      /* Modal styling */
      .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }
      
      .modal-header {
        border-bottom: 2px solid #F3F4F6;
        padding: 1.5rem;
        background: linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%);
        border-radius: 16px 16px 0 0;
      }
      
      .modal-title {
        color: #374151;
        font-weight: 700;
        font-size: 1.25rem;
      }
      
      .modal-body {
        padding: 2rem;
      }
      
      .form-control {
        border: 2px solid #E5E7EB;
        border-radius: 12px;
        padding: 1rem;
        font-size: 0.95rem;
        transition: all 0.3s ease;
      }
      
      .form-control:focus {
        border-color: #00BCD4;
        box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
        outline: none;
      }
      
      /* Action buttons */
      .action-buttons {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        margin-top: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 4px solid #EF4444;
      }
      
      .btn-primary-action {
        padding: 1rem 2.5rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .btn-revise {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        color: white;
      }
      
      .btn-revise:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
      }
      
      .btn-back {
        padding: 1rem 2rem;
        border-radius: 12px;
        background: #F3F4F6;
        color: #6B7280;
        font-weight: 600;
        border: 2px solid #E5E7EB;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .btn-back:hover {
        background: #E5E7EB;
        color: #374151;
      }
      
      /* RAB Grid */
      .grid-rab {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 1fr 1fr 2fr;
        gap: 1rem;
        align-items: end;
      }
      
      /* Comment count badge */
      .comment-count {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .comment-count i {
        font-size: 1.5rem;
      }
      
      .info-box {
        padding: 1rem;
        border-radius: 8px;
        background: #EFF6FF;
        border-left: 4px solid #3B82F6;
        margin-top: 1rem;
      }
      
      .info-box-text {
        font-size: 0.875rem;
        color: #1E40AF;
      }
    </style>

    <div class="kerangka-acuan-kerja-page">
      <!-- Progress Steps -->
      <div class="flex justify-center gap-24 mb-8 backdrop-blur-md p-6 rounded-xl shadow-lg" style="background: rgba(255, 255, 255, 0.8);">
        <div class="progress-step-item flex items-center justify-center gap-3 px-4">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style="background: #00BCD4; color: #FFFFFF;">1</div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #00BCD4;">Kerangka Acuan Kerja</div>
          </div>
        </div>
        <div class="progress-step-item flex items-center justify-center gap-3 px-4">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style="background: #E5E7EB; color: #6B7280;">2</div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Indikator Kinerja Utama</div>
            <div class="progress-step-subtext text-xs" style="color: #9CA3AF;">& RENSTRA</div>
          </div>
        </div>
        <div class="progress-step-item flex items-center justify-center gap-3 px-4">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style="background: #E5E7EB; color: #6B7280;">3</div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Rincian Anggaran Biaya</div>
          </div>
        </div>
      </div>

      <!-- Main Step 1: Kerangka Acuan Kerja -->
      <div class="main-step-content active" id="main-step-1">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex gap-8">
            <!-- Sidebar Menu -->
            <div class="flex flex-col gap-4 w-96">
              <button class="menu-button border-2 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3 active" data-menu="gambaran-umum" style="border-color: #00BCD4; background: rgba(0, 188, 212, 0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-file-text" style="font-size: 1rem; line-height: 1;">&#xff43;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Gambaran Umum</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="penerima-manfaat">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-users" style="font-size: 1rem; line-height: 1;">&#xf7cd;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Penerima Manfaat</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="strategi-pencapaian">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-target" style="font-size: 1rem; line-height: 1;">&#xeb35;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Strategi Pencapaian</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="indikator-kinerja">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-chart-bar" style="font-size: 1rem; line-height: 1;">&#xea59;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="kurun-waktu">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-calendar" style="font-size: 1rem; line-height: 1;">&#xea53;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</div>
              </button>
            </div>

            <!-- Main Form Area -->
            <div class="flex-1 min-h-[500px]">
              <div class="border border-gray-200 rounded-xl p-6">
                <!-- Step 1: Gambaran Umum -->
                <div class="step-content active" id="gambaran-umum">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Gambaran Umum</h4>

                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nama Kegiatan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="" data-field="namaKegiatan">
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="namaKegiatan" data-label="Nama Kegiatan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Gambaran Umum Kegiatan</label>
                    <div class="input-with-comment">
                      <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${inputStyle}" ${inputAttr} data-field="gambaranUmum"></textarea>
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="gambaranUmum" data-label="Gambaran Umum Kegiatan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Penerima Manfaat -->
                <div class="step-content" id="penerima-manfaat">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Penerima Manfaat</h4>
                  
                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Sasaran Utama</label>
                    <div id="sasaranUtamaContainer">
                      <!-- Dynamic content will be injected here -->
                    </div>
                  </div>

                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Manfaat</label>
                    <div id="manfaatContainer">
                      <!-- Dynamic content will be injected here -->
                    </div>
                  </div>
                </div>

                <!-- Step 3: Strategi Pencapaian -->
                <div class="step-content" id="strategi-pencapaian">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Strategi Pencapaian</h4>
                  
                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Metode Pelaksanaan</label>
                    <div class="input-with-comment">
                      <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${inputStyle}" ${inputAttr} data-field="metodePelaksanaan"></textarea>
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="metodePelaksanaan" data-label="Metode Pelaksanaan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tahapan Pelaksanaan</label>
                    <div id="tahapanPelaksanaanContainer">
                      <!-- Dynamic content will be injected here -->
                    </div>
                  </div>
                </div>

                <!-- Step 4: Indikator Kinerja -->
                <div class="step-content" id="indikator-kinerja">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja</h4>
                  
                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja</label>
                    <div id="indikatorKinerjaContainer">
                      <!-- Dynamic content will be injected here -->
                    </div>
                  </div>
                </div>

                <!-- Step 5: Kurun Waktu -->
                <div class="step-content" id="kurun-waktu">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</h4>
                  
                  <div class="grid grid-cols-2 gap-6">
                    <div class="mb-6">
                      <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tanggal Mulai</label>
                      <div class="input-with-comment">
                        <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="" data-field="tanggalMulai">
                        <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="tanggalMulai" data-label="Tanggal Mulai">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                    <div class="mb-6">
                      <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tanggal Selesai</label>
                      <div class="input-with-comment">
                        <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="" data-field="tanggalSelesai">
                        <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="tanggalSelesai" data-label="Tanggal Selesai">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" id="btnBack">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" id="btnNext">
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Step 2: IKU & Renstra -->
      <div class="main-step-content" id="main-step-2">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja Utama & Renstra</h4>
          
          <div class="mb-8" id="ikuRenstraContainer">
            <!-- Dynamic content will be injected here -->
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" id="btnBackIku">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" id="btnNextIku">
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Step 3: RAB -->
      <div class="main-step-content" id="main-step-3">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Rincian Anggaran Biaya</h4>
          
          <!-- Belanja Barang -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Barang</h5>
            <div id="belanjaBarangContainer">
              <!-- Dynamic content will be injected here -->
            </div>
          </div>

          <!-- Belanja Jasa -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Jasa</h5>
            <div id="belanjaJasaContainer">
              <!-- Dynamic content will be injected here -->
            </div>
          </div>

          <!-- Belanja Perjalanan -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Perjalanan</h5>
            <div id="belanjaPerjalananContainer">
              <!-- Dynamic content will be injected here -->
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" id="btnBackRab">
              <span>←</span> Back
            </button>
          </div>
        </div>
        <!-- Action Buttons (Fixed at bottom) -->
        <div class="action-buttons">
          ${
            isVerifikator
              ? `
          <button class="btn-back" onclick="window.location.href = '/verifikator/usulan'">
            <i class="ti ti-arrow-left">&#xea19;</i> Kembali
          </button>
          <div class="flex gap-4">
            <button class="btn-primary-action btn-revise" onclick="submitReview()">
              <i class="ti ti-send">&#xeae0;</i>
              Kirim Revisi
            </button>
          </div>
        `
              : isPengusul
              ? `
          <button class="btn-back" onclick="window.location.href = '/pengusul/usulan'">
            <i class="ti ti-arrow-left">&#xea19;</i> Kembali
          </button>
          <div class="flex gap-4">
            <button class="btn-primary-action btn-revise" onclick="submitRevisedKak()">
              <i class="ti ti-send">&#xeae0;</i>
              Submit KAK Revisi
            </button>
          </div>
        `
              : ""
          }
        </div>
      </div>

      <!-- Comment Count Badge -->
      <div class="comment-count" id="commentCountBadge" style="display: none;">
        <i class="ti ti-message-dots">&#xeaee;</i>
        <span id="commentCountText">0 Catatan</span>
      </div>
    </div>

    <!-- Field Comment Modal -->
    <div class="modal fade" id="fieldCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Catatan Revisi untuk <span id="fieldCommentLabel" style="color: #00BCD4; font-weight: 700;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai Saat Ini</label>
              <div class="p-3 rounded-lg" style="background: #F3F4F6; color: #374151;" id="currentFieldValue"></div>
            </div>
            <div id="fieldCommentInputContainer" style="${
              isPengusul ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Revisi</label>
              <textarea id="fieldCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi spesifik untuk field ini..."></textarea>
            </div>
            <div id="fieldCommentDisplayContainer" style="${
              isVerifikator ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Verifikator</label>
              <div class="p-3 rounded-lg" style="background: #E0F7FA; color: #374151;" id="fieldCommentDisplayText"></div>
            </div>
            <div class="info-box">
              <div class="info-box-text">
                <i class="ti ti-info-circle">&#xeac5;</i> Berikan masukan yang jelas dan konstruktif untuk membantu pengusul memperbaiki usulan.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              <i class="ti ti-x">&#xeb55;</i> Batal
            </button>
            ${
              isVerifikator
                ? `
              <button type="button" class="btn btn-primary" onclick="saveFieldComment()">
                <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
              </button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Row Comment Modal -->
    <div class="modal fade" id="rowCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Catatan Revisi untuk <span id="rowCommentLabel" style="color: #00BCD4; font-weight: 700;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai Saat Ini</label>
              <div class="p-3 rounded-lg" style="background: #F3F4F6; color: #374151;" id="currentRowValue"></div>
            </div>
            <div id="rowCommentInputContainer" style="${
              isPengusul ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Revisi</label>
              <textarea id="rowCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi untuk baris ini..."></textarea>
            </div>
            <div id="rowCommentDisplayContainer" style="${
              isVerifikator ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Verifikator</label>
              <div class="p-3 rounded-lg" style="background: #E0F7FA; color: #374151;" id="rowCommentDisplayText"></div>
            </div>
            <div class="info-box">
              <div class="info-box-text">
                <i class="ti ti-info-circle">&#xeac5;</i> Berikan masukan yang jelas dan konstruktif untuk membantu pengusul memperbaiki usulan.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              <i class="ti ti-x">&#xeb55;</i> Batal
            </button>
            ${
              isVerifikator
                ? `
              <button type="button" class="btn btn-primary" onclick="saveRowComment()">
                <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
              </button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---
  const pathSegments = path.split("/").filter(Boolean);
  const usulanId =
    pathSegments.length > 2 ? pathSegments[pathSegments.length - 1] : null;

  // State untuk menyimpan data KAK yang sudah di-fetch
  let kakDataState = null;

  let mainStep = 1;
  let currentStep = 1;
  const totalSteps = 5;
  const menuItems = [
    "gambaran-umum",
    "penerima-manfaat",
    "strategi-pencapaian",
    "indikator-kinerja",
    "kurun-waktu",
  ];

  // New structured comment state
  let fieldComments = {}; // For t_kak table fields
  let rowComments = {}; // For child table rows

  let currentCommentTarget = null;
  let fieldCommentModalInstance = null;
  let rowCommentModalInstance = null;

  let masterState = {
    iku: [],
    satuan: [],
  };

  // ==============================================
  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const config = { ...options, headers };
    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      if (typeof Swal !== "undefined") {
        Swal.fire({ icon: "error", title: "API Error", text: error.message });
      }
      throw error;
    }
  }

  // ==============================================
  // HELPER & CREATION FUNCTIONS
  // ==============================================
  const toSnakeCase = (str) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const formatCurrency = (amount) => {
    if (!amount) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getNameById = (id, list, idField, nameField) => {
    const item = list.find((d) => d[idField] == id);
    return item ? item[nameField] : "N/A";
  };

  const createReadOnlyRow = (value, index, type, pkValue, pkName) => `
    <div class="row-with-comment" data-row-type="${type}" data-pk-name="${pkName}" data-pk-value="${pkValue}">
      <div class="input-with-comment" style="padding-right: 60px;">
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${value}">
      </div>
      <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-label="${
        type.charAt(0).toUpperCase() + type.slice(1)
      } #${index + 1}">
        <i class="ti ti-message-circle-2">&#xeaed;</i>
      </button>
    </div>
  `;

  const createIndikatorKinerjaRow = (item, index) => `
    <div class="row-with-comment" data-row-type="t_kak_target" data-pk-name="target_id" data-pk-value="${
      item.target_id
    }">
      <div class="grid grid-cols-3 gap-4" style="padding-right: 60px;">
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.bulan_indikator || ""
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.deskripsi_target || ""
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.persentase_target || ""
  }">
        </div>
      </div>
      <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-label="Indikator Kinerja #${
        index + 1
      }">
        <i class="ti ti-message-circle-2">&#xeaed;</i>
      </button>
    </div>
  `;

  const createIkuRow = (item, index) => `
    <div class="row-with-comment" data-row-type="t_kak_iku" data-pk-name="kak_iku_id" data-pk-value="${
      item.kak_iku_id || item.iku_id
    }">
      <div class="grid grid-cols-2 gap-4" style="padding-right: 60px;">
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${getNameById(
    item.iku_id,
    masterState.iku,
    "iku_id",
    "nama_iku"
  )}">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai (%)</label>
          <div class="flex gap-2 items-center">
                        <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.persentase_target || "0"
  }">
            <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
          </div>
        </div>
      </div>
      <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-label="IKU & Nilai #${
        index + 1
      }">
        <i class="ti ti-message-circle-2">&#xeaed;</i>
      </button>
    </div>
  `;

  const createRabRow = (item, index) => `
    <div class="row-with-comment" data-row-type="t_kak_anggaran" data-pk-name="anggaran_id" data-pk-value="${
      item.anggaran_id
    }">
      <div class="grid-rab" style="padding-right: 60px;">
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.uraian || ""
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.volume1 || "1"
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${getNameById(
    item.satuan1_id,
    masterState.satuan,
    "satuan_id",
    "nama_satuan"
  )}">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.volume2 || "1"
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${
    item.satuan2_id
      ? getNameById(
          item.satuan2_id,
          masterState.satuan,
          "satuan_id",
          "nama_satuan"
        )
      : ""
  }">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${inputStyle}" ${inputAttr} value="${formatCurrency(
    item.harga_satuan
  )}">
        </div>
      </div>
      <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-label="Anggaran #${
        index + 1
      }">
        <i class="ti ti-message-circle-2">&#xeaed;</i>
      </button>
    </div>
  `;

  // ==============================================
  // DATA FETCH AND POPULATE - FIXED VERSION
  // ==============================================
  async function fetchAndPopulateData(kakId) {
    if (!kakId) {
      Swal.fire("Error", "ID Usulan tidak ditemukan di URL.", "error");
      return;
    }

    Swal.fire({
      title: "Memuat Data...",
      text: "Silakan tunggu sebentar.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const [kakResponse, ikuResponse, satuanResponse] = await Promise.all([
        apiRequest(`/kak/${kakId}/data`),
        apiRequest("/master/iku"),
        apiRequest("/master/satuan"),
      ]);

      masterState.iku = ikuResponse.data;
      masterState.satuan = satuanResponse.data;
      const kakData = kakResponse.data;

      // Simpan data KAK untuk digunakan saat submit
      kakDataState = kakData;

      // === FIX 1: Populate fieldComments dari root level kakData ===
      // Backend mengirim catatan langsung di root level dengan prefix catatan_
      const fieldMapping = {
        catatan_nama_kegiatan: "namaKegiatan",
        catatan_deskripsi_kegiatan: "gambaranUmum",
        catatan_metode_pelaksanaan: "metodePelaksanaan",
        catatan_tanggal_mulai: "tanggalMulai",
        catatan_tanggal_selesai: "tanggalSelesai",
      };

      for (const [backendKey, frontendKey] of Object.entries(fieldMapping)) {
        if (kakData[backendKey]) {
          fieldComments[toSnakeCase(frontendKey)] = kakData[backendKey];
          updateCommentButton(
            `.comment-icon[data-field="${frontendKey}"]`,
            kakData[backendKey]
          );
        }
      }

      // === FIX 2: Populate rowComments dari array child tables ===
      // Backend mengirim array langsung (manfaat, tahapan, target, iku, anggaran)
      const childTables = {
        manfaat: {
          array: kakData.manfaat,
          idField: "manfaat_id",
          tableName: "t_kak_manfaat",
        },
        tahapan: {
          array: kakData.tahapan,
          idField: "tahapan_id",
          tableName: "t_kak_tahapan",
        },
        target: {
          array: kakData.target,
          idField: "target_id",
          tableName: "t_kak_target",
        },
        iku: {
          array: kakData.iku,
          idField: "kak_iku_id",
          tableName: "t_kak_iku",
        },
        anggaran: {
          array: kakData.anggaran,
          idField: "anggaran_id",
          tableName: "t_kak_anggaran",
        },
      };

      for (const [key, config] of Object.entries(childTables)) {
        if (config.array && config.array.length > 0) {
          if (!rowComments[config.tableName]) {
            rowComments[config.tableName] = {};
          }
          config.array.forEach((item) => {
            if (item[config.idField] && item.catatan_verifikator) {
              const pkValue = item[config.idField];
              rowComments[config.tableName][pkValue] = item.catatan_verifikator;
            }
          });
        }
      }

      updateCommentCount();

      // Populate form fields
      document.querySelector('[data-field="namaKegiatan"]').value =
        kakData.nama_kegiatan || "";
      document.querySelector('[data-field="gambaranUmum"]').value =
        kakData.deskripsi_kegiatan || "";
      document.querySelector('[data-field="metodePelaksanaan"]').value =
        kakData.metode_pelaksanaan || "";
      document.querySelector('[data-field="tanggalMulai"]').value =
        kakData.tanggal_mulai || "";
      document.querySelector('[data-field="tanggalSelesai"]').value =
        kakData.tanggal_selesai || "";

      // Populate Sasaran & Manfaat
      const sasaranContainer = document.getElementById("sasaranUtamaContainer");
      const manfaatContainer = document.getElementById("manfaatContainer");
      sasaranContainer.innerHTML = "";
      manfaatContainer.innerHTML = "";
      if (kakData.manfaat && kakData.manfaat.length > 0) {
        kakData.manfaat.forEach((item, index) => {
          if (item.sasaran_utama) {
            sasaranContainer.innerHTML += createReadOnlyRow(
              item.sasaran_utama,
              index,
              "t_kak_manfaat",
              item.manfaat_id,
              "manfaat_id"
            );
          }
          if (item.manfaat) {
            manfaatContainer.innerHTML += createReadOnlyRow(
              item.manfaat,
              index,
              "t_kak_manfaat",
              item.manfaat_id,
              "manfaat_id"
            );
          }
        });
        // Update comment buttons after DOM rendered
        kakData.manfaat.forEach((item) => {
          if (item.catatan_verifikator) {
            updateCommentButton(
              `.row-with-comment[data-pk-value="${item.manfaat_id}"] .row-comment-icon`,
              item.catatan_verifikator
            );
          }
        });
      }

      // Populate Tahapan
      const tahapanContainer = document.getElementById(
        "tahapanPelaksanaanContainer"
      );
      tahapanContainer.innerHTML = "";
      if (kakData.tahapan && kakData.tahapan.length > 0) {
        kakData.tahapan.forEach((item, index) => {
          tahapanContainer.innerHTML += createReadOnlyRow(
            item.nama_tahapan,
            index,
            "t_kak_tahapan",
            item.tahapan_id,
            "tahapan_id"
          );
        });
        kakData.tahapan.forEach((item) => {
          if (item.catatan_verifikator) {
            updateCommentButton(
              `.row-with-comment[data-pk-value="${item.tahapan_id}"] .row-comment-icon`,
              item.catatan_verifikator
            );
          }
        });
      }

      // Populate Indikator Kinerja
      const indikatorContainer = document.getElementById(
        "indikatorKinerjaContainer"
      );
      indikatorContainer.innerHTML = "";
      if (kakData.target && kakData.target.length > 0) {
        kakData.target.forEach((item, index) => {
          indikatorContainer.innerHTML += createIndikatorKinerjaRow(
            item,
            index
          );
        });
        kakData.target.forEach((item) => {
          if (item.catatan_verifikator) {
            updateCommentButton(
              `.row-with-comment[data-pk-value="${item.target_id}"] .row-comment-icon`,
              item.catatan_verifikator
            );
          }
        });
      }

      // Populate IKU
      const ikuContainer = document.getElementById("ikuRenstraContainer");
      ikuContainer.innerHTML = "";
      if (kakData.iku && kakData.iku.length > 0) {
        kakData.iku.forEach((item, index) => {
          ikuContainer.innerHTML += createIkuRow(item, index);
        });
        // Update buttons after render, using kak_iku_id or fallback to iku_id
        kakData.iku.forEach((item) => {
          if (item.catatan_verifikator) {
            const pkValue = item.kak_iku_id || item.iku_id;
            updateCommentButton(
              `.row-with-comment[data-pk-value="${pkValue}"] .row-comment-icon`,
              item.catatan_verifikator
            );
          }
        });
      }

      // Populate RAB
      const belanjaBarangContainer = document.getElementById(
        "belanjaBarangContainer"
      );
      belanjaBarangContainer.innerHTML = "";
      const belanjaJasaContainer = document.getElementById(
        "belanjaJasaContainer"
      );
      belanjaJasaContainer.innerHTML = "";
      const belanjaPerjalananContainer = document.getElementById(
        "belanjaPerjalananContainer"
      );
      belanjaPerjalananContainer.innerHTML = "";

      if (kakData.anggaran && kakData.anggaran.length > 0) {
        kakData.anggaran.forEach((item, index) => {
          belanjaBarangContainer.innerHTML += createRabRow(item, index);
        });
        kakData.anggaran.forEach((item) => {
          if (item.catatan_verifikator) {
            updateCommentButton(
              `.row-with-comment[data-pk-value="${item.anggaran_id}"] .row-comment-icon`,
              item.catatan_verifikator
            );
          }
        });
      }

      Swal.close();
    } catch (error) {
      Swal.fire("Gagal Memuat Data", error.message, "error");
    }
  }

  // Initialize
  function init() {
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
    updateCommentCount();
    fetchAndPopulateData(usulanId);
  }

  function updateMainStepDisplay() {
    const stepIcons = {
      1: { class: "ti ti-file-text", entity: "&#xef40;" },
      2: { class: "ti ti-chart-bar", entity: "&#xea59;" },
      3: { class: "ti ti-currency-dollar", entity: "&#xeb84;" },
    };
    document.querySelectorAll(".progress-step-item").forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector(".progress-step-circle");
      const text = step.querySelector(".progress-step-text");
      const subtext = step.querySelector(".progress-step-subtext");
      circle.className =
        "progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300";
      if (stepNum < mainStep) {
        circle.style.background = "#10B981";
        circle.style.color = "#FFFFFF";
        circle.innerHTML =
          '<i class="ti ti-check" style="font-size: 1.125rem;">&#xea5e;</i>';
        text.style.color = "#10B981";
        if (subtext) subtext.style.color = "#10B981";
      } else if (stepNum === mainStep) {
        circle.style.background = "#00BCD4";
        circle.style.color = "#FFFFFF";
        circle.innerHTML = `<i class="${stepIcons[stepNum].class}" style="font-size: 1.125rem;">${stepIcons[stepNum].entity}</i>`;
        text.style.color = "#00BCD4";
        if (subtext) subtext.style.color = "#00BCD4";
      } else {
        circle.style.background = "#E5E7EB";
        circle.style.color = "#6B7280";
        circle.innerHTML = `<i class="${stepIcons[stepNum].class}" style="font-size: 1.125rem;">${stepIcons[stepNum].entity}</i>`;
        text.style.color = "#6B7280";
        if (subtext) subtext.style.color = "#9CA3AF";
      }
    });
    document
      .querySelectorAll(".main-step-content")
      .forEach((content, index) => {
        content.classList.toggle("active", index + 1 === mainStep);
      });
  }

  function updateStepDisplay() {
    if (mainStep !== 1) return;
    document.querySelectorAll(".menu-button").forEach((btn, index) => {
      const isActive = index + 1 === currentStep;
      btn.classList.toggle("active", isActive);
      btn.style.borderColor = isActive ? "#00BCD4" : "#E5E7EB";
      btn.style.background = isActive ? "rgba(0, 188, 212, 0.1)" : "";
    });
    document
      .querySelectorAll("#main-step-1 .step-content")
      .forEach((content) => {
        content.classList.toggle(
          "active",
          content.id === menuItems[currentStep - 1]
        );
      });
    document.getElementById("btnBack").style.visibility =
      currentStep === 1 ? "hidden" : "visible";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function attachEventListeners() {
    document.querySelectorAll(".menu-button").forEach((btn) => {
      btn.addEventListener("click", function () {
        const menuIndex = menuItems.indexOf(this.getAttribute("data-menu"));
        if (menuIndex !== -1) {
          currentStep = menuIndex + 1;
          updateStepDisplay();
        }
      });
    });
    document.getElementById("btnBack").addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
      }
    });
    document.getElementById("btnNext").addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
      } else {
        mainStep = 2;
        updateMainStepDisplay();
      }
    });
    document.getElementById("btnBackIku").addEventListener("click", () => {
      mainStep = 1;
      currentStep = totalSteps;
      updateMainStepDisplay();
      updateStepDisplay();
    });
    document.getElementById("btnNextIku").addEventListener("click", () => {
      mainStep = 3;
      updateMainStepDisplay();
    });
    document.getElementById("btnBackRab").addEventListener("click", () => {
      mainStep = 2;
      updateMainStepDisplay();
    });
  }

  window.openFieldCommentModal = function (btn) {
    const fieldKey = btn.getAttribute("data-field");
    const fieldLabel = btn.getAttribute("data-label");
    currentCommentTarget = { type: "field", key: toSnakeCase(fieldKey) };
    const commentText = fieldComments[currentCommentTarget.key] || "";

    const fieldCommentInputContainer = document.getElementById(
      "fieldCommentInputContainer"
    );
    const fieldCommentInput = document.getElementById("fieldCommentInput");
    const fieldCommentDisplayContainer = document.getElementById(
      "fieldCommentDisplayContainer"
    );
    const fieldCommentDisplayText = document.getElementById(
      "fieldCommentDisplayText"
    );
    const fieldCommentLabelEl = document.getElementById("fieldCommentLabel");
    const currentFieldValueEl = document.getElementById("currentFieldValue");

    fieldCommentLabelEl.textContent = fieldLabel;
    const input = btn
      .closest(".input-with-comment")
      .querySelector("input, textarea");
    currentFieldValueEl.textContent = (input ? input.value : "") || "(Kosong)";

    if (isVerifikator) {
      fieldCommentInputContainer.style.display = "block";
      fieldCommentDisplayContainer.style.display = "none";
      fieldCommentInput.value = commentText;
    } else if (isPengusul) {
      fieldCommentInputContainer.style.display = "none";
      fieldCommentDisplayContainer.style.display = "block";
      fieldCommentDisplayText.textContent =
        commentText || "(Tidak ada catatan)";
    }

    if (!fieldCommentModalInstance) {
      fieldCommentModalInstance = new bootstrap.Modal(
        document.getElementById("fieldCommentModal")
      );
    }
    if (isVerifikator || isPengusul) {
      fieldCommentModalInstance.show();
    }
  };

  window.openRowCommentModal = function (btn) {
    const rowElement = btn.closest(".row-with-comment");
    currentCommentTarget = {
      type: "row",
      table: rowElement.dataset.rowType,
      pk: rowElement.dataset.pkValue,
    };
    const rowLabel = btn.getAttribute("data-label");
    const commentText =
      rowComments[currentCommentTarget.table] &&
      rowComments[currentCommentTarget.table][currentCommentTarget.pk]
        ? rowComments[currentCommentTarget.table][currentCommentTarget.pk]
        : "";

    const rowCommentInputContainer = document.getElementById(
      "rowCommentInputContainer"
    );
    const rowCommentInput = document.getElementById("rowCommentInput");
    const rowCommentDisplayContainer = document.getElementById(
      "rowCommentDisplayContainer"
    );
    const rowCommentDisplayText = document.getElementById(
      "rowCommentDisplayText"
    );
    const rowCommentLabelEl = document.getElementById("rowCommentLabel");
    const currentRowValueEl = document.getElementById("currentRowValue");

    rowCommentLabelEl.textContent = rowLabel;
    const inputs = rowElement.querySelectorAll("input, textarea, select");
    let rowValues = Array.from(inputs)
      .map((input) => input.value)
      .filter(Boolean);
    currentRowValueEl.textContent = rowValues.join(" | ") || "(Kosong)";

    if (isVerifikator) {
      rowCommentInputContainer.style.display = "block";
      rowCommentDisplayContainer.style.display = "none";
      rowCommentInput.value = commentText;
    } else if (isPengusul) {
      rowCommentInputContainer.style.display = "none";
      rowCommentDisplayContainer.style.display = "block";
      rowCommentDisplayText.textContent = commentText || "(Tidak ada catatan)";
    }

    if (!rowCommentModalInstance) {
      rowCommentModalInstance = new bootstrap.Modal(
        document.getElementById("rowCommentModal")
      );
    }
    if (isVerifikator || (isPengusul && commentText)) {
      rowCommentModalInstance.show();
    }
  };

  window.saveFieldComment = function () {
    const comment = document.getElementById("fieldCommentInput").value.trim();
    const { key } = currentCommentTarget;
    if (comment) {
      fieldComments[key] = comment;
    } else {
      delete fieldComments[key];
    }

    // Convert snake_case back to camelCase for selector
    const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    updateCommentButton(`.comment-icon[data-field="${camelCaseKey}"]`, comment);
    updateCommentCount();
    fieldCommentModalInstance.hide();
    Swal.fire({
      icon: "success",
      title: "Tersimpan!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  window.saveRowComment = function () {
    const comment = document.getElementById("rowCommentInput").value.trim();
    const { table, pk } = currentCommentTarget;
    if (!rowComments[table]) {
      rowComments[table] = {};
    }
    if (comment) {
      rowComments[table][pk] = comment;
    } else {
      delete rowComments[table][pk];
    }
    updateCommentButton(
      `.row-with-comment[data-pk-value="${pk}"] .row-comment-icon`,
      comment
    );
    updateCommentCount();
    rowCommentModalInstance.hide();
    Swal.fire({
      icon: "success",
      title: "Tersimpan!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  function updateCommentButton(selector, comment) {
    const btn = document.querySelector(selector);
    if (btn) {
      const icon = btn.querySelector("i");
      btn.classList.toggle("has-comment", !!comment);
      icon.innerHTML = comment ? "&#xeaee;" : "&#xeaed;";
      if (btn.parentElement.classList.contains("row-with-comment")) {
        btn.parentElement.classList.toggle("has-row-comment", !!comment);
      }
    }
  }

  function updateCommentCount() {
    const fieldCount = Object.keys(fieldComments).length;
    let rowCount = 0;
    Object.values(rowComments).forEach((table) => {
      rowCount += Object.keys(table).length;
    });
    const totalCount = fieldCount + rowCount;

    const badge = document.getElementById("commentCountBadge");
    badge.style.display = totalCount > 0 ? "flex" : "none";
    document.getElementById(
      "commentCountText"
    ).textContent = `${totalCount} Catatan`;
  }

  window.submitReview = function () {
    const totalCount =
      Object.keys(fieldComments).length +
      Object.values(rowComments).reduce(
        (sum, table) => sum + Object.keys(table).length,
        0
      );

    if (totalCount === 0) {
      Swal.fire(
        "Perhatian!",
        "Harap berikan minimal satu catatan revisi sebelum mengirim.",
        "warning"
      );
      return;
    }

    // Convert fieldComments back to backend format (add catatan_ prefix)
    const catatanKak = {};
    for (const [key, value] of Object.entries(fieldComments)) {
      // Map frontend key back to backend key
      let backendKey = key;
      if (key === "gambaran_umum") {
        backendKey = "deskripsi_kegiatan";
      }
      catatanKak[backendKey] = value;
    }

    const anakPayload = {};
    for (const table in rowComments) {
      anakPayload[table] = [];
      for (const id in rowComments[table]) {
        anakPayload[table].push({
          id: id,
          catatan_verifikator: rowComments[table][id],
        });
      }
    }

    const payload = {
      catatan_kak: catatanKak,
      anak: anakPayload,
    };

    Swal.fire({
      title: "Kirim Revisi?",
      html: `Anda memiliki <strong>${totalCount}</strong> catatan revisi.<br>Usulan akan dikembalikan ke pengusul untuk diperbaiki.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Kirim Revisi",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/kak/${usulanId}/revise`, {
            method: "POST",
            body: JSON.stringify(payload),
          });

          await Swal.fire({
            icon: "success",
            title: "Terkirim!",
            text: "Catatan revisi telah dikirim ke pengusul.",
            timer: 2000,
            showConfirmButton: false,
          });

          window.location.href = "/verifikator/usulan";
        } catch (error) {
          Swal.fire("Gagal Mengirim", error.message, "error");
        }
      }
    });
  };

  window.resubmitKak = async function () {
    const kakFile = document.getElementById("kakFile");
    if (!kakFile || !kakFile.files || kakFile.files.length === 0) {
      Swal.fire(
        "Error",
        "Harap pilih file KAK revisi untuk diunggah.",
        "error"
      );
      return;
    }

    const file = kakFile.files[0];
    const formData = new FormData();
    formData.append("file", file);

    Swal.fire({
      title: "Kirim Ulang KAK?",
      text: `Anda akan mengunggah file '${file.name}' sebagai revisi KAK.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Kirim Ulang",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/kak/${usulanId}/resubmit`, {
            method: "POST",
            body: formData,
          });

          await Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "KAK revisi berhasil diunggah dan dikirim ulang.",
            timer: 2000,
            showConfirmButton: false,
          });

          window.location.href = "/pengusul/usulan";
        } catch (error) {
          Swal.fire("Gagal Mengunggah", error.message, "error");
        }
      }
    });
  };

  window.submitRevisedKak = async function () {
    if (!kakDataState) {
      Swal.fire(
        "Error",
        "Data KAK tidak tersedia. Silakan refresh halaman.",
        "error"
      );
      return;
    }

    // Validasi bahwa ada catatan dari verifikator
    const totalComments =
      Object.keys(fieldComments).length +
      Object.values(rowComments).reduce(
        (sum, table) => sum + Object.keys(table).length,
        0
      );

    if (totalComments === 0) {
      Swal.fire("Info", "Tidak ada catatan revisi dari verifikator.", "info");
      return;
    }

    Swal.fire({
      title: "Submit KAK Revisi?",
      html: `Anda akan mengirimkan ulang KAK yang telah diperbaiki sesuai <strong>${totalComments}</strong> catatan revisi.<br><br>Pastikan semua perbaikan sudah dilakukan dengan benar.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Submit KAK",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Prepare payload sesuai format backend
          const payload = {
            kak: {
              nama_kegiatan: kakDataState.nama_kegiatan,
              deskripsi_kegiatan: kakDataState.deskripsi_kegiatan,
              metode_pelaksanaan: kakDataState.metode_pelaksanaan,
              kurun_waktu_pelaksanaan: kakDataState.kurun_waktu_pelaksanaan,
              tanggal_mulai: kakDataState.tanggal_mulai,
              tanggal_selesai: kakDataState.tanggal_selesai,
              lokasi: kakDataState.lokasi,
              penerima_manfaat: [],
              tahapan_pelaksanaan: [],
              indikator_kinerja: [],
            },
            target_iku: [],
            rab: [],
          };

          // Populate penerima_manfaat
          if (kakDataState.manfaat && kakDataState.manfaat.length > 0) {
            payload.kak.penerima_manfaat = kakDataState.manfaat.map((m) => ({
              manfaat: m.manfaat,
              sasaran_utama: m.sasaran_utama,
            }));
          }

          // Populate tahapan_pelaksanaan
          if (kakDataState.tahapan && kakDataState.tahapan.length > 0) {
            payload.kak.tahapan_pelaksanaan = kakDataState.tahapan.map((t) => ({
              nama_tahapan: t.nama_tahapan,
              urutan: t.urutan,
            }));
          }

          // Populate indikator_kinerja (dari target)
          if (kakDataState.target && kakDataState.target.length > 0) {
            payload.kak.indikator_kinerja = kakDataState.target.map((t) => ({
              bulan_indikator: t.bulan_indikator,
              deskripsi_target: t.deskripsi_target,
              persentase_target: t.persentase_target,
            }));
          }

          // Populate target_iku
          if (kakDataState.iku && kakDataState.iku.length > 0) {
            payload.target_iku = kakDataState.iku.map((iku) => ({
              iku_id: iku.iku_id,
              persentase_target: iku.persentase_target,
            }));
          }

          // Populate rab
          if (kakDataState.anggaran && kakDataState.anggaran.length > 0) {
            payload.rab = kakDataState.anggaran.map((a) => ({
              uraian: a.uraian,
              volume1: a.volume1,
              satuan1_id: a.satuan1_id,
              volume2: a.volume2,
              satuan2_id: a.satuan2_id,
              volume3: a.volume3,
              satuan3_id: a.satuan3_id,
              harga_satuan: a.harga_satuan,
            }));
          }

          // Step 1: Update the KAK data
          await apiRequest(`/kak/${usulanId}/update`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });

          // Step 2: Submit the updated KAK for verification
          await apiRequest(`/kak/${usulanId}/submit`, {
            method: "POST",
          });

          await Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "KAK revisi berhasil disubmit dan dikirim untuk verifikasi ulang.",
            timer: 2000,
            showConfirmButton: false,
          });

          window.location.href = "/pengusul/usulan";
        } catch (error) {
          Swal.fire("Gagal Submit", error.message, "error");
        }
      }
    });
  };

  init();

  if (window.Helpers) {
    window.Helpers.init();
  }
}

export default renderRevisiKakPage;
