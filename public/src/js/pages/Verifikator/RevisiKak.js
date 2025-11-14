// frontend/src/pages/verifikator/RevisiKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

// Utility to render read-only fields/selects
const READONLY_ATTR = 'readonly disabled';
const READONLY_STYLE = 'border-color: #F3F4F6 !important; background: #F3F4F6 !important; cursor: default;';

export function renderRevisiKakPage(usulanId, userRole) {
  const pageContent = `
    <style>
      .section-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 2rem;
        margin-bottom: 1.5rem;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .section-card:hover {
        border-color: #E0F7FA;
        box-shadow: 0 10px 15px -3px rgba(0, 188, 212, 0.1), 0 4px 6px -2px rgba(0, 188, 212, 0.05);
      }
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #F3F4F6;
      }
      
      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #00BCD4;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .section-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
      }
      
      .btn-comment {
        position: relative;
        padding: 0.75rem;
        border-radius: 12px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .btn-comment:hover {
        background: #00BCD4;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      .btn-comment.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      
      .btn-comment.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      
      @keyframes pulse-comment {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
      }
      
      .comment-badge {
        position: absolute;
        top: -6px;
        right: -6px;
        background: #EF4444;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
        border: 2px solid white;
      }
      
      .rab-section {
        background: #FAFAFA;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .rab-item-card {
        background: white;
        border: 2px solid #E5E7EB;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
      }
      
      .rab-item-card:hover {
        border-color: #00BCD4;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
      }
      
      .rab-item-card.has-comment {
        border-color: #FCA5A5;
        background: #FEF2F2;
      }
      
      .btn-comment-item {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .btn-comment-item:hover {
        background: #00BCD4;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      .btn-comment-item.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
      }
      
      .btn-comment-item.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      
      .page-header {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
        color: white;
        border-radius: 16px;
        padding: 2.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 10px 15px -3px rgba(0, 188, 212, 0.3);
      }
      
      .page-header h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: white;
      }
      
      .page-header p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.05rem;
      }
      
      .form-label-enhanced {
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        display: block;
      }
      
      .action-buttons {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        margin-top: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 4px solid #00BCD4;
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
      
      .btn-approve {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
        color: white;
      }
      
      .btn-approve:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
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
      
      .rab-category-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: white;
        border-radius: 12px;
        border-left: 4px solid #00BCD4;
      }
      
      .rab-category-icon {
        width: 36px;
        height: 36px;
        background: #E0F7FA;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #00BCD4;
      }
      
      .rab-category-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #374151;
      }
      
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
      
      .modal-footer {
        border-top: 2px solid #F3F4F6;
        padding: 1.5rem;
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
      
      .comment-count-badge {
        background: #EF4444;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-left: 1rem;
      }
      
      .grid-rab {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 1fr 1fr 2fr auto;
        gap: 1rem;
        align-items: end;
      }
    </style>

    <div class="usulan-kak-page">
      <!-- Page Header -->
      <div class="page-header">
        <h3>Review Usulan KAK #${usulanId || '001'}</h3>
        <p>Berikan catatan revisi per bagian dan per item RAB sebelum mengirim kembali ke pengusul</p>
      </div>

      <!-- Gambaran Umum Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-file-description">&#xf028;</i>
            </div>
            Gambaran Umum
          </div>
          <button type="button" class="btn-comment" data-section="gambaran-umum" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Pengusul Kegiatan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Nama Pengusul (Contoh Data)">
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Nama Kegiatan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Kegiatan Uji Coba (Contoh Data)">
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Gambaran Umum Kegiatan</label>
          <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${READONLY_STYLE}" ${READONLY_ATTR}>Ini adalah deskripsi panjang dari gambaran umum kegiatan. (Contoh Data)</textarea>
        </div>
      </div>

      <!-- Penerima Manfaat Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-users">&#xebf2;</i>
            </div>
            Penerima Manfaat
          </div>
          <button type="button" class="btn-comment" data-section="penerima-manfaat" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Sasaran Utama</label>
          <div class="space-y-3">
            <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Mahasiswa Baru (Contoh Data)">
            <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Dosen Pembimbing (Contoh Data)">
          </div>
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Manfaat</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Meningkatkan IPK (Contoh Data)">
        </div>
      </div>

      <!-- Strategi Pencapaian Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-target">&#xeb35;</i>
            </div>
            Strategi Pencapaian
          </div>
          <button type="button" class="btn-comment" data-section="strategi-pencapaian" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Metode Pelaksanaan</label>
          <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm min-h-[200px] resize-y" style="${READONLY_STYLE}" ${READONLY_ATTR}>Dilaksanakan secara daring melalui Zoom dan luring di gedung serbaguna. (Contoh Data)</textarea>
        </div>
        
        <div class="mb-6">
          <label class="form-label-enhanced">Tahapan Pelaksanaan</label>
          <div class="space-y-3">
            <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Persiapan logistik (Contoh Data)">
            <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Pelaksanaan inti (Contoh Data)">
          </div>
        </div>
      </div>

      <!-- Indikator Kinerja Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-chart-line">&#xea5c;</i>
            </div>
            Indikator Kinerja
          </div>
          <button type="button" class="btn-comment" data-section="indikator-kinerja" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="rab-item-card">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="form-label-enhanced">Bulan</label>
              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Maret">
            </div>
            <div>
              <label class="form-label-enhanced">Indikator Keberhasilan</label>
              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="50% peserta hadir">
            </div>
            <div>
              <label class="form-label-enhanced">Target</label>
              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="100 orang">
            </div>
          </div>
        </div>
      </div>

      <!-- Kurun Waktu Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-calendar">&#xea53;</i>
            </div>
            Kurun Waktu Pelaksanaan
          </div>
          <button type="button" class="btn-comment" data-section="kurun-waktu-pelaksanaan" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="form-label-enhanced">Tanggal Mulai</label>
            <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2025-03-11">
          </div>
          <div>
            <label class="form-label-enhanced">Tanggal Selesai</label>
            <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2025-03-15">
          </div>
        </div>
      </div>

      <!-- IKU dan Renstra Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-trophy">&#xeb45;</i>
            </div>
            Indikator Kinerja Utama dan Renstra
          </div>
          <button type="button" class="btn-comment" data-section="iku-renstra" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label-enhanced">Indikator Kinerja Utama</label>
            <select class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR}>
              <option>Indikator A (Contoh Data)</option>
            </select>
          </div>
          <div>
            <label class="form-label-enhanced">Nilai (%)</label>
            <div class="flex gap-2 items-center">
              <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="10">
              <span class="px-3 py-3 text-sm font-semibold text-gray-600">%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RAB Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">
              <i class="ti ti-receipt">&#xedfd;</i>
            </div>
            Rincian Anggaran Biaya
          </div>
          <button type="button" class="btn-comment" data-section="rab-global" onclick="openCommentModal(this)">
            <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
          </button>
        </div>

        <!-- Belanja Barang -->
        <div class="rab-section">
          <div class="rab-category-header">
            <div class="rab-category-icon">
              <i class="ti ti-package">&#xeaff;</i>
            </div>
            <div class="rab-category-title">Belanja Barang</div>
          </div>
          
          <div class="rab-item-card" data-item-id="bb-1">
            <div class="grid-rab">
              <div>
                <label class="form-label-enhanced">Uraian</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm rab-item-uraian" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Kertas A4">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="10">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="rim">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="1">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="kegiatan">
              </div>
              <div>
                <label class="form-label-enhanced">Harga Satuan</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="50.000">
              </div>
              <div class="flex items-end pb-3">
                <button type="button" class="btn-comment-item" data-item-id="bb-1" onclick="openItemCommentModal(this)">
                  <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Belanja Jasa -->
        <div class="rab-section">
          <div class="rab-category-header">
            <div class="rab-category-icon">
              <i class="ti ti-briefcase">&#xea46;</i>
            </div>
            <div class="rab-category-title">Belanja Jasa</div>
          </div>
          
          <div class="rab-item-card" data-item-id="bj-1">
            <div class="grid-rab">
              <div>
                <label class="form-label-enhanced">Uraian</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm rab-item-uraian" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Honorarium Pembicara">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="orang">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="jam">
              </div>
              <div>
                <label class="form-label-enhanced">Harga Satuan</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="200.000">
              </div>
              <div class="flex items-end pb-3">
                <button type="button" class="btn-comment-item" data-item-id="bj-1" onclick="openItemCommentModal(this)">
                  <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Belanja Perjalanan -->
        <div class="rab-section">
          <div class="rab-category-header">
            <div class="rab-category-icon">
              <i class="ti ti-plane">&#xeb6f;</i>
            </div>
            <div class="rab-category-title">Belanja Perjalanan</div>
          </div>
          
          <div class="rab-item-card" data-item-id="bp-1">
            <div class="grid-rab">
              <div>
                <label class="form-label-enhanced">Uraian</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm rab-item-uraian" style="${READONLY_STYLE}" ${READONLY_ATTR} value="Transport Lokal">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="2">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 1</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="orang">
              </div>
              <div>
                <label class="form-label-enhanced">Qty 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="3">
              </div>
              <div>
                <label class="form-label-enhanced">Satuan 2</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="hari">
              </div>
              <div>
                <label class="form-label-enhanced">Harga Satuan</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${READONLY_STYLE}" ${READONLY_ATTR} value="150.000">
              </div>
              <div class="flex items-end pb-3">
                <button type="button" class="btn-comment-item" data-item-id="bp-1" onclick="openItemCommentModal(this)">
                  <i class="ti ti-message-circle-2 text-xl">&#xeaed;</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-back" onclick="window.history.back()">
          <i class="ti ti-arrow-left">&#xea19;</i> Kembali
        </button>
        <div class="flex gap-4">
          <button class="btn-primary-action btn-revise" onclick="submitReview('REVISI')">
            <i class="ti ti-x">&#xeb55;</i>
            Kirim Revisi
          </button>
          <button class="btn-primary-action btn-approve" onclick="submitReview('SETUJU')">
            <i class="ti ti-check">&#xea5e;</i>
            Setujui Usulan
          </button>
        </div>
      </div>
    </div>

    <!-- Section Comment Modal -->
    <div class="modal fade" id="commentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Catatan Revisi untuk <span id="commentSectionTitle" style="color: #00BCD4; font-weight: 700;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label class="form-label-enhanced mb-3">Tuliskan catatan revisi spesifik untuk bagian ini</label>
            <textarea id="commentInput" class="form-control" rows="6" placeholder="Contoh: Gambaran umum kegiatan perlu lebih detail mengenai metodologi yang akan digunakan..."></textarea>
            <div class="mt-3 text-sm text-gray-600">
              <i class="ti ti-info-circle">&#xeac5;</i> Catatan akan dikirim ke pengusul untuk diperbaiki
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              <i class="ti ti-x">&#xeb55;</i> Batal
            </button>
            <button type="button" class="btn btn-primary" onclick="saveSectionComment()">
              <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Item Comment Modal -->
    <div class="modal fade" id="itemCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
               Catatan Revisi untuk Item: <span id="itemCommentTitle" style="color: #00BCD4; font-weight: 700;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label class="form-label-enhanced mb-3">Tuliskan catatan revisi spesifik untuk item RAB ini</label>
            <textarea id="itemCommentInput" class="form-control" rows="6" placeholder="Contoh: Harga terlalu tinggi dari standar pasar. Harap disesuaikan dengan harga wajar..."></textarea>
            <div class="mt-3 p-3 rounded-lg" style="background: #FEF3C7; border-left: 4px solid #F59E0B;">
              <div class="text-sm" style="color: #92400E;">
                <strong>Tips:</strong> Berikan alasan spesifik seperti:
                <ul class="mt-2 ml-4">
                  <li>Harga tidak sesuai standar</li>
                  <li>Kuantitas tidak wajar</li>
                  <li>Item tidak relevan dengan kegiatan</li>
                  <li>Perlu justifikasi tambahan</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              <i class="ti ti-x">&#xeb55;</i> Batal
            </button>
            <button type="button" class="btn btn-primary" onclick="saveItemComment()">
              <i class="ti ti-check">&#xea5e;</i> Simpan Catatan
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---
  let currentCommentSection = null;
  let currentCommentItem = null;
  let commentModalInstance = null;
  let itemCommentModalInstance = null;

  const sectionTitles = {
    'gambaran-umum': 'Gambaran Umum',
    'penerima-manfaat': 'Penerima Manfaat',
    'strategi-pencapaian': 'Strategi Pencapaian',
    'indikator-kinerja': 'Indikator Kinerja',
    'kurun-waktu-pelaksanaan': 'Kurun Waktu Pelaksanaan',
    'iku-renstra': 'IKU dan Renstra',
    'rab-global': 'Rincian Anggaran Biaya (Global)',
  };

  const sectionComments = {};
  const itemComments = {};

  // --- Section Comment Functions ---
  window.openCommentModal = function (btn) {
    const sectionKey = btn.getAttribute("data-section");
    currentCommentSection = sectionKey;

    const titleEl = document.getElementById("commentSectionTitle");
    const commentInput = document.getElementById("commentInput");

    if (titleEl) titleEl.textContent = sectionTitles[sectionKey] || "Bagian";
    commentInput.value = sectionComments[sectionKey] || "";

    if (!commentModalInstance) {
      if (typeof bootstrap !== "undefined") {
        commentModalInstance = new bootstrap.Modal(document.getElementById("commentModal"));
      } else {
        console.error("Bootstrap 5 JS not found.");
        return;
      }
    }
    commentModalInstance.show();
  };

  window.saveSectionComment = function () {
    const commentInput = document.getElementById("commentInput");
    if (currentCommentSection) {
      sectionComments[currentCommentSection] = commentInput.value.trim();

      const btn = document.querySelector(`.btn-comment[data-section="${currentCommentSection}"]`);
      if (btn) {
        const icon = btn.querySelector('i');
        if (sectionComments[currentCommentSection]) {
          btn.classList.add('has-comment');
          icon.classList.remove('ti-message-circle-2');
          icon.classList.add('ti-message-dots');
          
          // Add badge
          let badge = btn.querySelector('.comment-badge');
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'comment-badge';
            badge.textContent = '!';
            btn.appendChild(badge);
          }
        } else {
          btn.classList.remove('has-comment');
          icon.classList.remove('ti-message-dots');
          icon.classList.add('ti-message-circle-2');
          
          // Remove badge
          const badge = btn.querySelector('.comment-badge');
          if (badge) badge.remove();
        }
      }

      if (commentModalInstance) {
        commentModalInstance.hide();
      }
      
      // Show success message
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Tersimpan!',
          text: 'Catatan bagian berhasil disimpan',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        alert('Catatan bagian berhasil disimpan!');
      }
    }
  };

  // --- Item Comment Functions ---
  window.openItemCommentModal = function (btn) {
    const itemId = btn.getAttribute("data-item-id");
    currentCommentItem = itemId;

    const itemCard = btn.closest('.rab-item-card');
    const uraianInput = itemCard ? itemCard.querySelector('.rab-item-uraian') : null;
    const uraianText = uraianInput ? uraianInput.value : `ID: ${itemId}`;

    const titleEl = document.getElementById("itemCommentTitle");
    const commentInput = document.getElementById("itemCommentInput");

    if (titleEl) titleEl.textContent = uraianText;
    commentInput.value = itemComments[itemId] || "";

    if (!itemCommentModalInstance) {
      if (typeof bootstrap !== "undefined") {
        itemCommentModalInstance = new bootstrap.Modal(document.getElementById("itemCommentModal"));
      } else {
        console.error("Bootstrap 5 JS not found.");
        return;
      }
    }
    itemCommentModalInstance.show();
  };

  window.saveItemComment = function () {
    const commentInput = document.getElementById("itemCommentInput");
    if (currentCommentItem) {
      itemComments[currentCommentItem] = commentInput.value.trim();

      const btn = document.querySelector(`.btn-comment-item[data-item-id="${currentCommentItem}"]`);
      const itemCard = btn ? btn.closest('.rab-item-card') : null;
      
      if (btn && itemCard) {
        if (itemComments[currentCommentItem]) {
          btn.classList.add('has-comment');
          itemCard.classList.add('has-comment');
          
          const icon = btn.querySelector('i');
          icon.classList.remove('ti-message-circle-2');
          icon.classList.add('ti-message-dots');
          
          // Add badge
          let badge = btn.querySelector('.comment-badge');
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'comment-badge';
            badge.textContent = '!';
            btn.appendChild(badge);
          }
        } else {
          btn.classList.remove('has-comment');
          itemCard.classList.remove('has-comment');
          
          const icon = btn.querySelector('i');
          icon.classList.remove('ti-message-dots');
          icon.classList.add('ti-message-circle-2');
          
          // Remove badge
          const badge = btn.querySelector('.comment-badge');
          if (badge) badge.remove();
        }
      }

      if (itemCommentModalInstance) {
        itemCommentModalInstance.hide();
      }
      
      // Show success message
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Tersimpan!',
          text: 'Catatan item berhasil disimpan',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        alert('Catatan item berhasil disimpan!');
      }
    }
  };

  // --- Submit Review Function ---
  window.submitReview = function (action) {
    if (action === 'SETUJU') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Setujui Usulan?',
          text: 'Usulan akan diteruskan ke tahap selanjutnya',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#00BCD4',
          cancelButtonColor: '#6B7280',
          confirmButtonText: 'Ya, Setujui',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Mengirim status: Disetujui');
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Usulan telah disetujui',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              // window.location.href = '/verifikator/dashboard';
            });
          }
        });
      } else {
        if (confirm('Setujui usulan ini?')) {
          alert('Usulan disetujui!');
        }
      }
    } else if (action === 'REVISI') {
      const hasSectionComments = Object.values(sectionComments).some(c => c.length > 0);
      const hasItemComments = Object.values(itemComments).some(c => c.length > 0);

      if (!hasSectionComments && !hasItemComments) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'warning',
            title: 'Perhatian!',
            text: 'Harap berikan minimal satu catatan revisi sebelum mengirim',
            confirmButtonColor: '#00BCD4'
          });
        } else {
          alert('Harap berikan minimal satu catatan revisi sebelum mengirim');
        }
        return;
      }

      const totalComments = Object.keys(sectionComments).filter(k => sectionComments[k]).length + 
                           Object.keys(itemComments).filter(k => itemComments[k]).length;

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Kirim Revisi?',
          html: `Anda memiliki <strong>${totalComments}</strong> catatan revisi.<br>Usulan akan dikembalikan ke pengusul untuk diperbaiki.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#EF4444',
          cancelButtonColor: '#6B7280',
          confirmButtonText: 'Ya, Kirim Revisi',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Mengirim status: Direvisi');
            console.log('Catatan Bagian:', sectionComments);
            console.log('Catatan Item RAB:', itemComments);
            
            Swal.fire({
              icon: 'success',
              title: 'Terkirim!',
              text: 'Catatan revisi telah dikirim ke pengusul',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              // window.location.href = '/verifikator/dashboard';
            });
          }
        });
      } else {
        if (confirm(`Kirim ${totalComments} catatan revisi?`)) {
          console.log('Catatan Bagian:', sectionComments);
          console.log('Catatan Item RAB:', itemComments);
          alert('Catatan revisi terkirim! Cek console log.');
        }
      }
    }
  };

  // Initialize
  if (window.Helpers) {
    window.Helpers.init();
  }
}