// alerts.js
// SweetAlert2 modal examples

document.addEventListener("DOMContentLoaded", () => {
  // Basic Alerts
  document.getElementById("basic-alert")?.addEventListener("click", () => {
    Swal.fire({
      text: "Any fool can use a computer!",
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("with-title")?.addEventListener("click", () => {
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("footer-alert")?.addEventListener("click", () => {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("html-alert")?.addEventListener("click", () => {
    Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: "You can use <b>bold text</b>, <a href='#'>links</a>, and other HTML tags",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "<i class='fa fa-thumbs-up'></i> Great!",
      cancelButtonText: "<i class='fa fa-thumbs-down'></i>",
      confirmButtonColor: "#00BCD4",
    });
  });

  // Positions
  const positions = ["top-start", "top-end", "bottom-start", "bottom-end"];
  positions.forEach((pos) => {
    document.getElementById(`position-${pos}`)?.addEventListener("click", () => {
      Swal.fire({
        position: pos,
        icon: "success",
        title: `Alert at ${pos}`,
        showConfirmButton: false,
        timer: 1500,
        confirmButtonColor: "#00BCD4",
      });
    });
  });

  // Animation examples
  const animations = {
    "bounce-in-animation": "animate__bounceIn",
    "fade-in-animation": "animate__fadeIn",
    "flip-x-animation": "animate__flipInX",
    "tada-animation": "animate__tada",
    "shake-animation": "animate__shakeX",
  };
  for (const [id, anim] of Object.entries(animations)) {
    document.getElementById(id)?.addEventListener("click", () => {
      Swal.fire({
        title: "Custom animation",
        showClass: { popup: `animate__animated ${anim}` },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
        confirmButtonColor: "#00BCD4",
      });
    });
  }

  // Type examples
  const types = ["success", "info", "warning", "error", "question"];
  types.forEach((type) => {
    document.getElementById(`type-${type}`)?.addEventListener("click", () => {
      Swal.fire({
        icon: type,
        title: `${type.toUpperCase()}!`,
        text: `This is a ${type} alert.`,
        confirmButtonColor: "#00BCD4",
      });
    });
  });

  // Custom Options
  document.getElementById("custom-image")?.addEventListener("click", () => {
    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("auto-close")?.addEventListener("click", () => {
    Swal.fire({
      title: "Auto close alert!",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => Swal.showLoading(),
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("outside-click")?.addEventListener("click", () => {
    Swal.fire({
      title: "Click outside to close",
      allowOutsideClick: true,
      confirmButtonColor: "#00BCD4",
    });
  });

  document.getElementById("progress-steps")?.addEventListener("click", async () => {
    const steps = ["1", "2", "3"];
    const swalQueueStep = Swal.mixin({
      confirmButtonText: "Next →",
      progressSteps: steps,
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
    });

    let result;
    for (let i = 0; i < steps.length; i++) {
      result = await swalQueueStep.fire({
        title: `Step ${i + 1}`,
        currentProgressStep: i,
      });
      if (result.dismiss) break;
    }
    if (result.value) Swal.fire("All done!", "", "success");
  });

  // Confirm dialogs
  document.getElementById("confirm-text")?.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#00BCD4",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#00BCD4",
        });
    });
  });

  document.getElementById("confirm-color")?.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#00BCD4",
        });
    });
  });

  // ===============================
  // Custom reusable alert functions
  // ===============================

  // Simple success alert
  window.showSuccess = function (message) {
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: message,
      confirmButtonText: "OK",
      confirmButtonColor: "#00BCD4",
    });
  };

  // Simple error alert
  window.showError = function (message) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: message,
      confirmButtonText: "OK",
      confirmButtonColor: "#00BCD4",
    });
  };

  // Simple info alert
  window.showInfo = function (message) {
    Swal.fire({
      icon: "info",
      title: "Informasi",
      text: message,
      confirmButtonText: "OK",
      confirmButtonColor: "#00BCD4",
    });
  };
  
  // SweetAlert2 reusable confirm dialog
window.confirmAction = async function (title, text, confirmText = "Ya", cancelText = "Batal") {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00BCD4",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return result.isConfirmed;
};

});

// SweetAlert2 reusable textarea prompt
window.promptTextarea = async function (title, placeholder = "", required = false) {
  const result = await Swal.fire({
    title: title,
    input: "textarea",
    inputPlaceholder: placeholder,
    inputValidator: (value) => {
      if (required && (!value || value.trim() === "")) {
        return "Field ini wajib diisi!";
      }
    },
    showCancelButton: true,
    confirmButtonColor: "#00BCD4",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
  });

  return result.value; // null/undefined if cancelled
};

// SweetAlert2 reusable number input
window.promptNumber = async function (title, min = 1) {
  const result = await Swal.fire({
    title: title,
    input: "number",
    inputAttributes: {
      min: min,
      step: 1,
    },
    showCancelButton: true,
    confirmButtonColor: "#00BCD4",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
  });

  return result.value; // null/undefined if cancelled
};
