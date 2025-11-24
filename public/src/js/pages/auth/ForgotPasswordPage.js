import { authService } from "../../api/authService.js";

export function renderForgotPasswordPage() {
  const rootElement = document.getElementById("root");

  const forgotPasswordHTML = `
        <style>
            /* ========== ANIMATIONS ========== */
            @keyframes fadeSlideIn {
                from {
                    opacity: 0;
                    filter: blur(4px);
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    filter: blur(0px);
                    transform: translateY(0px);
                }
            }

            @keyframes slideRightIn {
                from {
                    opacity: 0;
                    filter: blur(4px);
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    filter: blur(0px);
                    transform: translateX(0px);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }

            /* Animation Classes */
            .animate-element {
                opacity: 0;
                animation: fadeSlideIn 0.6s ease-out forwards;
            }

            .animate-slide-right {
                opacity: 0;
                animation: slideRightIn 0.8s ease-out forwards;
            }

            /* Animation Delays */
            .animate-delay-100 { animation-delay: 0.1s; }
            .animate-delay-200 { animation-delay: 0.2s; }
            .animate-delay-300 { animation-delay: 0.3s; }
            .animate-delay-400 { animation-delay: 0.4s; }
            .animate-delay-500 { animation-delay: 0.5s; }
            .animate-delay-600 { animation-delay: 0.6s; }
            .animate-delay-700 { animation-delay: 0.7s; }
            .animate-delay-800 { animation-delay: 0.8s; }
            .animate-delay-900 { animation-delay: 0.9s; }

            /* ========== GLASS MORPHISM INPUT ========== */
            .glass-input-wrapper {
                border-radius: 1rem;
                border: 1px solid rgba(209, 213, 219, 0.5);
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(8px);
                transition: all 0.3s ease;
            }

            .glass-input-wrapper:focus-within {
                border-color: rgba(51, 200, 218, 0.7);
                background: rgba(51, 200, 218, 0.1);
                box-shadow: 0 0 0 3px rgba(51, 200, 218, 0.1);
            }

            .glass-input {
                background-color: transparent;
                width: 100%;
                padding: 1rem;
                border-radius: 1rem;
                outline: none;
                font-size: 0.875rem;
            }

            .glass-input::placeholder {
                color: rgba(107, 114, 128, 0.7);
            }

            /* ========== ALERT STYLES ========== */
            .alert {
                padding: 12px 16px;
                border-radius: 1rem;
                margin-bottom: 16px;
                display: none;
                backdrop-filter: blur(8px);
                animation: fadeSlideIn 0.3s ease-out;
            }

            .alert-error {
                background: linear-gradient(135deg, rgba(254, 226, 226, 0.95) 0%, rgba(252, 165, 165, 0.85) 100%);
                border: 1px solid rgba(252, 165, 165, 0.6);
                color: #991B1B;
            }

            .alert-success {
                background: linear-gradient(135deg, rgba(209, 250, 229, 0.95) 0%, rgba(134, 239, 172, 0.85) 100%);
                border: 1px solid rgba(134, 239, 172, 0.6);
                color: #065F46;
            }

            /* ========== LOADING SPINNER ========== */
            .spinner {
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                animation: spin 1s linear infinite;
                display: inline-block;
                margin-right: 8px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* ========== MODERN BUTTON ========== */
            .modern-button {
                background: linear-gradient(135deg, #33C8DA 0%, #2BA9B8 100%);
                border: none;
                color: white;
                font-weight: 600;
                padding: 1rem;
                border-radius: 1rem;
                transition: all 0.7s ease;
                cursor: pointer;
                width: 100%;
                position: relative;
                overflow: hidden;
            }

            .modern-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s ease;
            }

            .modern-button:hover::before {
                left: 100%;
            }

            .modern-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px -6px rgba(51, 200, 218, 0.5);
            }

            .modern-button:active {
                transform: translateY(0);
            }

            .modern-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }

            /* ========== BACK BUTTON COMPACT ========== */
            .back-button-compact {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0;
                background: transparent;
                border: none;
                color: #4B5563;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: color 0.3s ease;
                text-decoration: none;
            }

            .back-button-compact:hover {
                color: #33C8DA;
            }

            /* ========== CONTAINER STYLES ========== */
            .forgot-container {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(20px);
                border-radius: 2rem;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                padding: 3rem;
                border: 1px solid rgba(255, 255, 255, 0.5);
            }

            .logo-container {
                width: 4rem;
                height: 4rem;
                border-radius: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
            }

            .icon-container {
                width: 4rem;
                height: 4rem;
                border-radius: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(51, 200, 218, 0.1) 0%, rgba(43, 169, 184, 0.05) 100%);
                border: 2px solid rgba(51, 200, 218, 0.2);
            }

            /* ========== RESPONSIVE ========== */
            @media (max-width: 640px) {
                .forgot-container {
                    padding: 2rem 1.5rem;
                }
            }
        </style>
        
        <div style="background-image: url('/assets/img/backgrounds/Auth.png'); background-size: cover; background-position: center; min-height: 100vh;" class="flex items-center justify-center">
            <div class="w-full max-w-lg px-4">
                <div class="forgot-container animate-element animate-delay-100">
                    <!-- Back Button Compact -->
                    <div class="mb-6">
                        <button id="back-button" class="back-button-compact">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            Kembali
                        </button>
                    </div>

                    <!-- Icon -->
                    <div class="flex justify-center mb-6 animate-element animate-delay-300">
                        <div class="icon-container">
                            <svg class="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                    
                    <!-- Welcome Text -->
                    <h2 class="text-center text-3xl font-bold text-gray-800 mb-2 animate-element animate-delay-400" style="letter-spacing: -0.02em;">
                        Lupa Password?
                    </h2>
                    <p class="text-center text-gray-600 text-sm mb-6 animate-element animate-delay-500">
                        Masukkan username dan email aktif Anda. Admin akan mengirimkan password baru ke email Anda.
                    </p>

                    <!-- Alert Messages -->
                    <div id="error-alert" class="alert alert-error"></div>
                    <div id="success-alert" class="alert alert-success"></div>
                    
                    <!-- Form -->
                    <form id="forgot-password-form">
                        <!-- Username Field -->
                        <div class="mb-4 animate-element animate-delay-600">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                                Username
                            </label>
                            <div class="glass-input-wrapper">
                                <input 
                                    class="glass-input" 
                                    id="username" 
                                    type="text" 
                                    placeholder="Masukkan username Anda"
                                    required
                                >
                            </div>
                        </div>
                        
                        <!-- Email Field -->
                        <div class="mb-6 animate-element animate-delay-700">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">
                                Email Aktif
                            </label>
                            <div class="glass-input-wrapper">
                                <input 
                                    class="glass-input" 
                                    id="email" 
                                    type="email" 
                                    placeholder="Masukkan email aktif Anda"
                                    required
                                >
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                Password baru akan dikirim ke email ini
                            </p>
                        </div>
                        
                        <!-- Submit Button -->
                        <button 
                            type="submit" 
                            id="submit-button"
                            class="modern-button animate-element animate-delay-800"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

  rootElement.innerHTML = forgotPasswordHTML;

  // Get form elements
  const form = document.getElementById("forgot-password-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const submitButton = document.getElementById("submit-button");
  const backButton = document.getElementById("back-button");
  const errorAlert = document.getElementById("error-alert");
  const successAlert = document.getElementById("success-alert");

  // Show error message
  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.style.display = "block";
    successAlert.style.display = "none";
    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }

  // Show success message
  function showSuccess(message) {
    successAlert.textContent = message;
    successAlert.style.display = "block";
    errorAlert.style.display = "none";
  }

  // Set loading state
  function setLoading(isLoading) {
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span>Mengirim...';
      usernameInput.disabled = true;
      emailInput.disabled = true;
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = "Reset Password";
      usernameInput.disabled = false;
      emailInput.disabled = false;
    }
  }

  // Handle back button
  backButton.addEventListener("click", () => {
    window.location.href = "/login";
  });

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    // Validate input
    if (!username || !email) {
      showError("Username dan email harus diisi!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Format email tidak valid!");
      return;
    }

    setLoading(true);

    try {
      // Call forgot password API
      const response = await authService.forgotPassword({
        username,
        email,
      });

      // Request successful
      if (response.success) {
        showSuccess(
          response.message || 
          "Permintaan reset password berhasil! Password baru telah dikirim ke email Anda. Silakan cek inbox atau folder spam."
        );
        
        // Clear form
        usernameInput.value = "";
        emailInput.value = "";
        
        // Redirect to login after 5 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        showError(
          response.message || 
          "Permintaan gagal! Username atau email tidak ditemukan."
        );
      }
      
      setLoading(false);
    } catch (error) {
      // Handle error
      const errorMessage =
        error.message || 
        "Terjadi kesalahan! Silakan coba lagi atau hubungi admin.";
      showError(errorMessage);
      setLoading(false);
    }
  });

  // Ensure the loading state is reset when the page is rendered
  setLoading(false);
}