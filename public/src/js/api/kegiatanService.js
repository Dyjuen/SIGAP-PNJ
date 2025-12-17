// public/src/js/api/kegiatanService.js

const API_BASE_URL = "/api";

export const kegiatanService = {
  /**
   * Mengambil daftar kegiatan overdue untuk persetujuan PPK.
   * @returns {Promise<Object>} Response dengan count dan names dari kegiatan overdue.
   */
  async getOverdueKegiatanForPpk() {
    try {
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");

      if (!token) {
        console.warn("Token tidak ditemukan. Tidak dapat mengambil kegiatan overdue.");
        return { count: 0, names: [] };
      }

      const response = await fetch(`${API_BASE_URL}/kegiatan/overdue-ppk`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes if necessary
        console.error("Gagal mengambil kegiatan overdue:", data.message || "Unknown error");
        return { count: 0, names: [] };
      }

      return data.data; // Mengembalikan objek { count, names, kegiatan }
    } catch (error) {
      console.error("Error saat mengambil kegiatan overdue:", error);
      return { count: 0, names: [] };
    }
  },
};
