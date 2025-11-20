// frontend/src/pages/verifikator/RevisiKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

const READONLY_ATTR = 'readonly disabled';
const READONLY_STYLE = 'border-color: #F3F4F6 !important; background: #F3F4F6 !important; cursor: default;';

export function renderRevisiKakPage(usulanId, userRole) {
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
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Pengusul Kegiatan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Nama Pengusul (Contoh Data)" data-field="pengusul">
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="pengusul" data-label="Pengusul Kegiatan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nama Kegiatan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Kegiatan Uji Coba (Contoh Data)" data-field="namaKegiatan">
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="namaKegiatan" data-label="Nama Kegiatan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Gambaran Umum Kegiatan</label>
                    <div class="input-with-comment">
                      <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${READONLY_STYLE}" ${READONLY_ATTR} data-field="gambaranUmum">Ini adalah deskripsi panjang dari gambaran umum kegiatan. (Contoh Data)</textarea>
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
                      <div class="row-with-comment" data-row="sasaran-0">
                        <div class="input-with-comment" style="padding-right: 60px;">
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Mahasiswa Baru (Contoh Data)" data-field="sasaran-0">
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="sasaran-0" data-label="Sasaran Utama #1">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                      <div class="row-with-comment" data-row="sasaran-1">
                        <div class="input-with-comment" style="padding-right: 60px;">
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Dosen Pembimbing (Contoh Data)" data-field="sasaran-1">
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="sasaran-1" data-label="Sasaran Utama #2">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Manfaat</label>
                    <div id="manfaatContainer">
                      <div class="row-with-comment" data-row="manfaat-0">
                        <div class="input-with-comment" style="padding-right: 60px;">
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Meningkatkan IPK (Contoh Data)" data-field="manfaat-0">
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="manfaat-0" data-label="Manfaat #1">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 3: Strategi Pencapaian -->
                <div class="step-content" id="strategi-pencapaian">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Strategi Pencapaian</h4>
                  
                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Metode Pelaksanaan</label>
                    <div class="input-with-comment">
                      <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${READONLY_STYLE}" ${READONLY_ATTR} data-field="metodePelaksanaan">Dilaksanakan secara daring melalui Zoom dan luring di gedung serbaguna. (Contoh Data)</textarea>
                      <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="metodePelaksanaan" data-label="Metode Pelaksanaan">
                        <i class="ti ti-message-circle-2">&#xeaed;</i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tahapan Pelaksanaan</label>
                    <div id="tahapanPelaksanaanContainer">
                      <div class="row-with-comment" data-row="tahapan-0">
                        <div class="input-with-comment" style="padding-right: 60px;">
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Persiapan logistik (Contoh Data)" data-field="tahapan-0">
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="tahapan-0" data-label="Tahapan Pelaksanaan #1">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                      <div class="row-with-comment" data-row="tahapan-1">
                        <div class="input-with-comment" style="padding-right: 60px;">
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Pelaksanaan inti (Contoh Data)" data-field="tahapan-1">
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="tahapan-1" data-label="Tahapan Pelaksanaan #2">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 4: Indikator Kinerja -->
                <div class="step-content" id="indikator-kinerja">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja</h4>
                  
                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja</label>
                    <div id="indikatorKinerjaContainer">
                      <div class="row-with-comment" data-row="indikator-0">
                        <div class="grid grid-cols-3 gap-4" style="padding-right: 60px;">
                          <div>
                            <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
                            <div class="input-with-comment">
                              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Maret" data-field="indikator-bulan-0">
                            </div>
                          </div>
                          <div>
                            <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
                            <div class="input-with-comment">
                              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="50% peserta hadir" data-field="indikator-desc-0">
                            </div>
                          </div>
                          <div>
                            <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
                            <div class="input-with-comment">
                              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="100 orang" data-field="indikator-target-0">
                            </div>
                          </div>
                        </div>
                        <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="indikator-0" data-label="Indikator Kinerja #1">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
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
                        <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2025-03-11" data-field="tanggalMulai">
                        <button class="comment-icon" onclick="openFieldCommentModal(this)" data-field="tanggalMulai" data-label="Tanggal Mulai">
                          <i class="ti ti-message-circle-2">&#xeaed;</i>
                        </button>
                      </div>
                    </div>
                    <div class="mb-6">
                      <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tanggal Selesai</label>
                      <div class="input-with-comment">
                        <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2025-03-15" data-field="tanggalSelesai">
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
            <div class="row-with-comment" data-row="iku-0">
              <div class="grid grid-cols-2 gap-4" style="padding-right: 60px;">
                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
                  <div class="input-with-comment">
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} data-field="iku-0">
                      <option value="">Indikator A (Contoh Data)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai (%)</label>
                  <div class="input-with-comment">
                    <div class="flex gap-2 items-center">
                      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="10" data-field="iku-nilai-0">
                      <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="iku-0" data-label="IKU & Nilai #1">
                <i class="ti ti-message-circle-2">&#xeaed;</i>
              </button>
            </div>
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
              <div class="row-with-comment" data-row="bb-0">
                <div class="grid-rab" style="padding-right: 60px;">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Kertas A4" data-field="bb-uraian-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="10" data-field="bb-qty1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="rim" data-field="bb-satuan1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="1" data-field="bb-qty2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="kegiatan" data-field="bb-satuan2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="50.000" data-field="bb-harga-0">
                    </div>
                  </div>
                </div>
                <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="bb-0" data-label="Belanja Barang #1">
                  <i class="ti ti-message-circle-2">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>

          <!-- Belanja Jasa -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Jasa</h5>
            <div id="belanjaJasaContainer">
              <div class="row-with-comment" data-row="bj-0">
                <div class="grid-rab" style="padding-right: 60px;">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Honorarium Pembicara" data-field="bj-uraian-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2" data-field="bj-qty1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="orang" data-field="bj-satuan1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2" data-field="bj-qty2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="jam" data-field="bj-satuan2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="200.000" data-field="bj-harga-0">
                    </div>
                  </div>
                </div>
                <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="bj-0" data-label="Belanja Jasa #1">
                  <i class="ti ti-message-circle-2">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>

          <!-- Belanja Perjalanan -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Perjalanan</h5>
            <div id="belanjaPerjalananContainer">
              <div class="row-with-comment" data-row="bp-0">
                <div class="grid-rab" style="padding-right: 60px;">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Transport Lokal" data-field="bp-uraian-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2" data-field="bp-qty1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="orang" data-field="bp-satuan1-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="3" data-field="bp-qty2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="hari" data-field="bp-satuan2-0">
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <div class="input-with-comment">
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="150.000" data-field="bp-harga-0">
                    </div>
                  </div>
                </div>
                <button class="row-comment-icon" onclick="openRowCommentModal(this)" data-row="bp-0" data-label="Belanja Perjalanan #1">
                  <i class="ti ti-message-circle-2">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" id="btnBackRab">
              <span>←</span> Back
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons (Fixed at bottom) -->
      <div class="action-buttons">
        <button class="btn-back" onclick="window.history.back()">
          <i class="ti ti-arrow-left">&#xea19;</i> Kembali
        </button>
        <div class="flex gap-4">
          <button class="btn-primary-action btn-revise" onclick="submitReview()">
            <i class="ti ti-send">&#xeae0;</i>
            Kirim Revisi
          </button>
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
            <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Revisi</label>
            <textarea id="fieldCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi spesifik untuk field ini..."></textarea>
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
            <button type="button" class="btn btn-primary" onclick="saveFieldComment()">
              <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
            </button>
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
            <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Revisi</label>
            <textarea id="rowCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi untuk baris ini..."></textarea>
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
            <button type="button" class="btn btn-primary" onclick="saveRowComment()">
              <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---
  let mainStep = 1;
  let currentStep = 1;
  const totalSteps = 5;
  const menuItems = ['gambaran-umum', 'penerima-manfaat', 'strategi-pencapaian', 'indikator-kinerja', 'kurun-waktu'];
  
  let fieldComments = {};
  let rowComments = {};
  let currentCommentField = null;
  let currentCommentRow = null;
  let fieldCommentModalInstance = null;
  let rowCommentModalInstance = null;

  // Initialize
  function init() {
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
    updateCommentCount();
  }

  // Update Main Progress Step Display
function updateMainStepDisplay() {
    // Definisi ikon untuk setiap langkah utama
    const stepIcons = {
        1: { class: 'ti ti-file-text', entity: '&#xef40;' }, // KAK
        2: { class: 'ti ti-chart-bar', entity: '&#xea59;' }, // IKU & RENSTRA
        3: { class: 'ti ti-currency-dollar', entity: '&#xeb84;' } // RAB
    };

    const progressSteps = document.querySelectorAll(".progress-step-item");
    
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector(".progress-step-circle");
      const text = step.querySelector(".progress-step-text");
      const subtext = step.querySelector(".progress-step-subtext");

      // Reset style dasar
      circle.className = "progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300";
      
      if (stepNum < mainStep) {
        // State: Selesai (Completed) -> Tampilkan Centang
        circle.style.background = "#10B981"; // Hijau
        circle.style.color = "#FFFFFF";
        circle.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
        circle.innerHTML = '<i class="ti ti-check" style="font-size: 1.125rem; line-height: 1; display: flex; align-items: center; justify-content: center;">&#xea5e;</i>'; // Icon Check with entity
        
        text.style.color = "#10B981";
        if (subtext) subtext.style.color = "#10B981";

      } else if (stepNum === mainStep) {
        // State: Sedang Aktif (Active) -> Tampilkan Ikon Langkah
        circle.style.background = "#00BCD4"; // Cyan
        circle.style.color = "#FFFFFF";
        circle.style.boxShadow = "0 4px 12px rgba(0, 188, 212, 0.4)";
        // Fix: Gunakan entity dari object stepIcons dengan styling untuk center
        circle.innerHTML = `<i class="${stepIcons[stepNum].class}" style="font-size: 1.125rem; line-height: 1; display: flex; align-items: center; justify-content: center;">${stepIcons[stepNum].entity}</i>`; 
        
        text.style.color = "#00BCD4";
        if (subtext) subtext.style.color = "#00BCD4";

      } else {
        // State: Belum Aktif (Upcoming) -> Tampilkan Ikon Langkah (Abu-abu)
        circle.style.background = "#E5E7EB"; // Abu-abu
        circle.style.color = "#6B7280";
        circle.style.boxShadow = "none";
        // Fix: Gunakan entity dari object stepIcons dengan styling untuk center
        circle.innerHTML = `<i class="${stepIcons[stepNum].class}" style="font-size: 1.125rem; line-height: 1; display: flex; align-items: center; justify-content: center;">${stepIcons[stepNum].entity}</i>`;
        
        text.style.color = "#6B7280";
        if (subtext) subtext.style.color = "#9CA3AF";
      }
    });

    // Show/hide main step content (Logika konten tetap sama)
    document
      .querySelectorAll(".main-step-content")
      .forEach((content, index) => {
        if (index + 1 === mainStep) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
}

  // Update Step Display
  function updateStepDisplay() {
    if (mainStep !== 1) return;

    document.querySelectorAll('.menu-button').forEach((btn, index) => {
      if (index + 1 === currentStep) {
        btn.classList.add('active');
        btn.style.borderColor = '#00BCD4';
        btn.style.background = 'rgba(0, 188, 212, 0.1)';
      } else {
        btn.classList.remove('active');
        btn.style.borderColor = '#E5E7EB';
        btn.style.background = '';
      }
    });

    document.querySelectorAll('.step-content').forEach((content, index) => {
      if (index + 1 === currentStep) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    const btnBack = document.getElementById('btnBack');
    if (btnBack) {
      btnBack.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Menu buttons
    document.querySelectorAll('.menu-button').forEach((btn) => {
      btn.addEventListener('click', function() {
        const menuTarget = this.getAttribute('data-menu');
        const menuIndex = menuItems.indexOf(menuTarget);
        if (menuIndex !== -1) {
          currentStep = menuIndex + 1;
          updateStepDisplay();
        }
      });
    });

    // Navigation buttons
    const btnBack = document.getElementById('btnBack');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepDisplay();
        }
      });
    }

    const btnNext = document.getElementById('btnNext');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepDisplay();
        } else {
          mainStep = 2;
          updateMainStepDisplay();
        }
      });
    }

    const btnBackIku = document.getElementById('btnBackIku');
    if (btnBackIku) {
      btnBackIku.addEventListener('click', () => {
        mainStep = 1;
        currentStep = totalSteps;
        updateMainStepDisplay();
        updateStepDisplay();
      });
    }

    const btnNextIku = document.getElementById('btnNextIku');
    if (btnNextIku) {
      btnNextIku.addEventListener('click', () => {
        mainStep = 3;
        updateMainStepDisplay();
      });
    }

    const btnBackRab = document.getElementById('btnBackRab');
    if (btnBackRab) {
      btnBackRab.addEventListener('click', () => {
        mainStep = 2;
        updateMainStepDisplay();
      });
    }
  }

  // Open Field Comment Modal
  window.openFieldCommentModal = function(btn) {
    const fieldKey = btn.getAttribute('data-field');
    const fieldLabel = btn.getAttribute('data-label');
    currentCommentField = fieldKey;

    // Get current field value
    const input = btn.closest('.input-with-comment').querySelector('input, textarea, select');
    const currentValue = input ? input.value : '';

    document.getElementById('fieldCommentLabel').textContent = fieldLabel;
    document.getElementById('currentFieldValue').textContent = currentValue || '(Kosong)';
    document.getElementById('fieldCommentInput').value = fieldComments[fieldKey] || '';

    if (!fieldCommentModalInstance) {
      if (typeof bootstrap !== 'undefined') {
        fieldCommentModalInstance = new bootstrap.Modal(document.getElementById('fieldCommentModal'));
      } else {
        console.error('Bootstrap 5 JS not found.');
        return;
      }
    }
    fieldCommentModalInstance.show();
  };

  // Open Row Comment Modal
  window.openRowCommentModal = function(btn) {
    const rowKey = btn.getAttribute('data-row');
    const rowLabel = btn.getAttribute('data-label');
    currentCommentRow = rowKey;

    // Get current row values
    const rowElement = btn.closest('.row-with-comment');
    const inputs = rowElement.querySelectorAll('input, textarea, select');
    let rowValues = [];
    inputs.forEach(input => {
      if (input.value) rowValues.push(input.value);
    });
    const currentValue = rowValues.join(' | ');

    document.getElementById('rowCommentLabel').textContent = rowLabel;
    document.getElementById('currentRowValue').textContent = currentValue || '(Kosong)';
    document.getElementById('rowCommentInput').value = rowComments[rowKey] || '';

    if (!rowCommentModalInstance) {
      if (typeof bootstrap !== 'undefined') {
        rowCommentModalInstance = new bootstrap.Modal(document.getElementById('rowCommentModal'));
      } else {
        console.error('Bootstrap 5 JS not found.');
        return;
      }
    }
    rowCommentModalInstance.show();
  };

  // Save Field Comment
  window.saveFieldComment = function() {
    const commentInput = document.getElementById('fieldCommentInput');
    if (currentCommentField) {
      const comment = commentInput.value.trim();
      
      if (comment) {
        fieldComments[currentCommentField] = comment;
      } else {
        delete fieldComments[currentCommentField];
      }

      // Update button appearance
      const btn = document.querySelector(`.comment-icon[data-field="${currentCommentField}"]`);
      if (btn) {
        const icon = btn.querySelector('i');
        if (comment) {
          btn.classList.add('has-comment');
          icon.innerHTML = '&#xeaee;'; // ti-message-dots
        } else {
          btn.classList.remove('has-comment');
          icon.innerHTML = '&#xeaed;'; // ti-message-circle-2
        }
      }

      updateCommentCount();

      if (fieldCommentModalInstance) {
        fieldCommentModalInstance.hide();
      }

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Tersimpan!',
          text: comment ? 'Catatan berhasil disimpan' : 'Catatan dihapus',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  };

  // Save Row Comment
  window.saveRowComment = function() {
    const commentInput = document.getElementById('rowCommentInput');
    if (currentCommentRow) {
      const comment = commentInput.value.trim();
      
      if (comment) {
        rowComments[currentCommentRow] = comment;
      } else {
        delete rowComments[currentCommentRow];
      }

      // Update row and button appearance
      const rowElement = document.querySelector(`.row-with-comment[data-row="${currentCommentRow}"]`);
      const btn = document.querySelector(`.row-comment-icon[data-row="${currentCommentRow}"]`);
      
      if (rowElement && btn) {
        const icon = btn.querySelector('i');
        if (comment) {
          rowElement.classList.add('has-row-comment');
          btn.classList.add('has-comment');
          icon.innerHTML = '&#xeaee;'; // ti-message-dots
        } else {
          rowElement.classList.remove('has-row-comment');
          btn.classList.remove('has-comment');
          icon.innerHTML = '&#xeaed;'; // ti-message-circle-2
        }
      }

      updateCommentCount();

      if (rowCommentModalInstance) {
        rowCommentModalInstance.hide();
      }

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Tersimpan!',
          text: comment ? 'Catatan berhasil disimpan' : 'Catatan dihapus',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  };

  // Update Comment Count
  function updateCommentCount() {
    const fieldCount = Object.keys(fieldComments).length;
    const rowCount = Object.keys(rowComments).length;
    const totalCount = fieldCount + rowCount;
    
    const badge = document.getElementById('commentCountBadge');
    const countText = document.getElementById('commentCountText');
    
    if (totalCount > 0) {
      badge.style.display = 'flex';
      countText.textContent = `${totalCount} Catatan`;
    } else {
      badge.style.display = 'none';
    }
  }

  // Submit Review
  window.submitReview = function() {
    const fieldCount = Object.keys(fieldComments).length;
    const rowCount = Object.keys(rowComments).length;
    const totalCount = fieldCount + rowCount;

    if (totalCount === 0) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian!',
          text: 'Harap berikan minimal satu catatan revisi sebelum mengirim',
          confirmButtonColor: '#EF4444'
        });
      } else {
        alert('Harap berikan minimal satu catatan revisi sebelum mengirim');
      }
      return;
    }

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Kirim Revisi?',
        html: `Anda memiliki <strong>${totalCount}</strong> catatan revisi.<br>Usulan akan dikembalikan ke pengusul untuk diperbaiki.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Ya, Kirim Revisi',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Mengirim status: Direvisi');
          console.log('Catatan Field:', fieldComments);
          console.log('Catatan Baris:', rowComments);
          
          Swal.fire({
            icon: 'success',
            title: 'Terkirim!',
            text: 'Catatan revisi telah dikirim ke pengusul',
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    } else {
      if (confirm(`Kirim ${totalCount} catatan revisi?`)) {
        console.log('Catatan Field:', fieldComments);
        console.log('Catatan Baris:', rowComments);
        alert('Catatan revisi terkirim! Cek console log.');
      }
    }
  };

  // Initialize
  init();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}

// Export for ES6 module
export default renderRevisiKakPage;