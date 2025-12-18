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
      padding: 20px 25px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      animation: slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      pointer-events: auto;
      max-width: 100%;
      word-wrap: break-word;
      white-space: pre-wrap;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 15px;
      border-left: 6px solid;
      font-weight: 600;
      letter-spacing: 0.4px;
      backdrop-filter: blur(8px);
      background-color: rgba(255, 255, 255, 0.9);
      transition: all 0.3s ease;
    `;

    // Set warna berdasarkan type dengan tema SIGAP-PNJ
    const colors = {
      success: {
        bg: "rgba(16, 185, 129, 0.1)",
        text: "#047857",
        border: "#10b981",
      },
      error: {
        bg: "rgba(239, 68, 68, 0.1)",
        text: "#dc2626",
        border: "#ef4444",
      },
      warning: {
        bg: "rgba(245, 158, 11, 0.1)",
        text: "#b45309",
        border: "#f59e0b",
      },
      info: {
        bg: "rgba(0, 188, 212, 0.1)",
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
    closeBtn.innerHTML = "&times;"; /* Use proper multiplication sign for 'x' */
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: ${color.text};
      font-size: 24px; /* Slightly larger */
      cursor: pointer;
      padding: 0;
      width: 32px; /* Larger hit area */
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px; /* More rounded */
      transition: all 0.3s ease; /* Smoother transition */
      flex-shrink: 0;
      opacity: 0.6; /* Slightly less opaque by default */
    `;
    closeBtn.onmouseover = () => {
      closeBtn.style.backgroundColor = color.border;
      closeBtn.style.opacity = "1";
      closeBtn.style.color = "white";
      closeBtn.style.transform = "scale(1.1)"; /* Subtle scale on hover */
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.backgroundColor = "transparent";
      closeBtn.style.opacity = "0.6";
      closeBtn.style.color = color.text;
      closeBtn.style.transform = "scale(1)";
    };

    const closeNotification = () => {
      notification.style.animation = "slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards"; // Bouncy exit animation
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 400);
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
      transform: translateX(100%);
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
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .flasher-notification {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Modern ease-in-out */
  }

  .flasher-notification:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px) scale(1.01); /* More pronounced lift and slight scale */
  }

  .flasher-notification button:active {
    transform: scale(0.9); /* More noticeable press effect */
  }

  @media (max-width: 768px) {
    #flasher-notification-container {
      max-width: 95vw !important; /* Slightly wider on mobile */
      right: 10px !important;
      top: 10px !important; /* Move slightly up on mobile */
    }

    .flasher-notification {
      font-size: 14px !important;
      padding: 16px 16px !important;
    }
  }
`;
document.head.appendChild(style);

export default window.flasher;
