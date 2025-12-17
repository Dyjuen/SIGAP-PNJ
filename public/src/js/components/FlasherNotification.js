/**
 * Flasher Notification System
 * Menampilkan notifikasi sebagai toast yang dapat dilihat tanpa interaksi modal
 */

export class FlasherNotification {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  /**
   * Inisialisasi container untuk flasher notifications
   */
  initContainer() {
    let container = document.getElementById("flasher-notification-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "flasher-notification-container";
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 450px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    this.container = container;
  }

  /**
   * Tampilkan notifikasi flasher
   * @param {string} message - Pesan yang akan ditampilkan
   * @param {string} type - Tipe notifikasi: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Durasi tampil dalam ms (default: 3000)
   */
  show(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `flasher-notification flasher-${type}`;
    notification.style.cssText = `
      padding: 18px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: auto;
      max-width: 100%;
      word-wrap: break-word;
      white-space: pre-wrap;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      border-left: 5px solid;
      font-weight: 500;
      letter-spacing: 0.3px;
    `;

    // Set warna berdasarkan type dengan tema SIGAP-PNJ
    const colors = {
      success: {
        bg: "rgba(16, 185, 129, 0.15)",
        text: "#047857",
        border: "#10b981",
      },
      error: {
        bg: "rgba(239, 68, 68, 0.15)",
        text: "#dc2626",
        border: "#ef4444",
      },
      warning: {
        bg: "rgba(245, 158, 11, 0.15)",
        text: "#b45309",
        border: "#f59e0b",
      },
      info: {
        bg: "rgba(0, 188, 212, 0.15)",
        text: "#0891b2",
        border: "#00bcd4",
      },
    };

    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    notification.style.borderLeftColor = color.border;

    // Content wrapper
    const contentDiv = document.createElement("div");
    contentDiv.style.cssText = "flex: 1;";
    contentDiv.textContent = message;
    notification.appendChild(contentDiv);

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: ${color.text};
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.2s ease;
      flex-shrink: 0;
      opacity: 0.7;
    `;
    closeBtn.onmouseover = () => {
      closeBtn.style.backgroundColor = color.border;
      closeBtn.style.opacity = "1";
      closeBtn.style.color = "white";
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.backgroundColor = "transparent";
      closeBtn.style.opacity = "0.7";
      closeBtn.style.color = color.text;
    };

    const closeNotification = () => {
      notification.style.animation = "slideOutRight 0.3s ease-in forwards";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    };

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      clearTimeout(timeout);
      closeNotification();
    });

    notification.appendChild(closeBtn);

    this.container.appendChild(notification);

    // Auto remove after duration
    const timeout = setTimeout(() => {
      if (notification.parentNode) {
        closeNotification();
      }
    }, duration);

    return notification;
  }

  /**
   * Shortcut untuk success notification
   */
  success(message, duration = 3000) {
    return this.show(message, "success", duration);
  }

  /**
   * Shortcut untuk error notification
   */
  error(message, duration = 3000) {
    return this.show(message, "error", duration);
  }

  /**
   * Shortcut untuk warning notification
   */
  warning(message, duration = 3000) {
    return this.show(message, "warning", duration);
  }

  /**
   * Shortcut untuk info notification
   */
  info(message, duration = 3000) {
    return this.show(message, "info", duration);
  }

  /**
   * Tampilkan notifikasi untuk kegiatan overdue PPK
   * @param {Object} overdueData - Objek berisi count dan names dari kegiatan overdue
   * @param {number} overdueData.count - Jumlah kegiatan overdue
   * @param {Object[]} overdueData.kegiatan - Array objek kegiatan overdue, masing-masing dengan nama_kegiatan dan overdue_days
   * @param {number} duration - Durasi tampil dalam ms (default: 10000)
   */
  showOverdueKegiatanNotification(overdueData, duration = 10000) {
    const { count, kegiatan } = overdueData; // Ambil 'kegiatan' langsung
    if (count === 0 || !kegiatan || kegiatan.length === 0) {
      return; // Tidak ada notifikasi jika tidak ada yang overdue
    }

    // Loop through each overdue activity and show a separate notification
    kegiatan.forEach((item) => {
      const message = `Kegiatan "${item.nama_kegiatan}" belum diperiksa sejak ${item.overdue_days} hari yang lalu, silakan dicek segera.`;
      this.show(message, "warning", duration); // Use 'this.show' to show individual notifications
    });
  }

  /**
   * Clear semua notifikasi
   */
  clearAll() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}

// Buat singleton instance dan expose ke global window
window.flasher = new FlasherNotification();

// Buat singleton instance dan expose ke global window
window.flasher = new FlasherNotification();

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .flasher-notification {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .flasher-notification:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  .flasher-notification button:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    #flasher-notification-container {
      max-width: 90vw !important;
      right: 10px !important;
    }

    .flasher-notification {
      font-size: 14px !important;
      padding: 16px 16px !important;
    }
  }
`;
document.head.appendChild(style);

export default window.flasher;
