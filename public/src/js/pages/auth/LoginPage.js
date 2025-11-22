import { authService } from "../../api/authService.js";

export function renderLoginPage() {
  const rootElement = document.getElementById("root");

  const loginFormHTML = `
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

            @keyframes testimonialIn {
                from {
                    opacity: 0;
                    filter: blur(4px);
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    filter: blur(0px);
                    transform: translateY(0px) scale(1);
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

            .animate-testimonial {
                opacity: 0;
                animation: testimonialIn 0.6s ease-out forwards;
            }

            /* Animation Delays */
            .animate-delay-100 { animation-delay: 0.1s; }
            .animate-delay-200 { animation-delay: 0.2s; }
            .animate-delay-250 { animation-delay: 0.25s; }
            .animate-delay-300 { animation-delay: 0.3s; }
            .animate-delay-400 { animation-delay: 0.4s; }
            .animate-delay-450 { animation-delay: 0.45s; }
            .animate-delay-500 { animation-delay: 0.5s; }
            .animate-delay-600 { animation-delay: 0.6s; }
            .animate-delay-700 { animation-delay: 0.7s; }
            .animate-delay-800 { animation-delay: 0.8s; }
            .animate-delay-900 { animation-delay: 0.9s; }
            .animate-delay-1000 { animation-delay: 1s; }
            .animate-delay-1200 { animation-delay: 1.2s; }
            .animate-delay-1400 { animation-delay: 1.4s; }

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
            
            /* ========== CUSTOM CHECKBOX ========== */
            .custom-checkbox {
                appearance: none;
                width: 18px;
                height: 18px;
                border: 2px solid rgba(209, 213, 219, 0.8);
                border-radius: 4px;
                background-color: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            
            .custom-checkbox:checked {
                background-color: #33C8DA;
                border-color: #33C8DA;
            }
            
            .custom-checkbox:checked::after {
                content: '';
                position: absolute;
                left: 5px;
                top: 2px;
                width: 4px;
                height: 8px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
            
            .custom-checkbox:hover {
                border-color: #33C8DA;
            }
            
            .custom-checkbox:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(51, 200, 218, 0.2);
            }

            /* ========== ERROR ALERT ========== */
            .error-alert {
                background: linear-gradient(135deg, rgba(254, 226, 226, 0.95) 0%, rgba(252, 165, 165, 0.85) 100%);
                border: 1px solid rgba(252, 165, 165, 0.6);
                color: #991B1B;
                padding: 12px 16px;
                border-radius: 1rem;
                margin-bottom: 16px;
                display: none;
                backdrop-filter: blur(8px);
                animation: fadeSlideIn 0.3s ease-out;
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

            /* ========== CONTAINER STYLES ========== */
            .login-container {
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

            .captcha-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.5rem;
            }

            .captcha-image {
                border-radius: 0.75rem;
                border: 2px solid rgba(51, 200, 218, 0.3);
                box-shadow: 0 4px 12px rgba(51, 200, 218, 0.15);
                transition: all 0.3s ease;
                background: white;
            }

            .captcha-image:hover {
                border-color: rgba(51, 200, 218, 0.5);
                box-shadow: 0 6px 16px rgba(51, 200, 218, 0.25);
            }

            .reload-captcha-btn {
                padding: 0.625rem;
                border-radius: 0.75rem;
                background: linear-gradient(135deg, rgba(51, 200, 218, 0.1) 0%, rgba(43, 169, 184, 0.05) 100%);
                backdrop-filter: blur(8px);
                border: 2px solid rgba(51, 200, 218, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .reload-captcha-btn:hover {
                background: linear-gradient(135deg, rgba(51, 200, 218, 0.2) 0%, rgba(43, 169, 184, 0.15) 100%);
                border-color: rgba(51, 200, 218, 0.6);
                transform: rotate(180deg);
                box-shadow: 0 4px 12px rgba(51, 200, 218, 0.2);
            }
            
            .reload-captcha-btn svg {
                color: #33C8DA;
                transition: color 0.3s ease;
            }
            
            .reload-captcha-btn:hover svg {
                color: #2BA9B8;
            }

            .link-text {
                color: #33C8DA;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.7s ease;
            }

            .link-text:hover {
                color: #2BA9B8;
                text-decoration: underline;
            }

            /* ========== RESPONSIVE ========== */
            @media (max-width: 640px) {
                .login-container {
                    padding: 2rem 1.5rem;
                }
            }

            /* ========== TESTIMONIALS (OPTIONAL) ========== */
            .testimonial-card {
                display: flex;
                gap: 0.75rem;
                align-items: start;
                border-radius: 1.5rem;
                background: rgba(255, 255, 255, 0.4);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 1.25rem;
                width: 16rem;
            }

            .testimonial-avatar {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 1rem;
                object-fit: cover;
            }

            .testimonial-text {
                font-size: 0.875rem;
                line-height: 1.5;
            }

            /* ========== HIDE DEFAULT EYE ICON ON PASSWORD FIELDS ========== */
            input[type="password"]::-ms-reveal,
            input[type="password"]::-ms-clear {
                display: none;
            }
        </style>
        
        <div style="background-image: url('/assets/img/backgrounds/Auth.png'); background-size: cover; background-position: center; min-height: 100vh;" class="flex items-center justify-center">
            <div class="w-full max-w-lg px-4">
                <div class="login-container animate-element animate-delay-100">
                    <!-- Logo -->
                    <div class="flex justify-center mb-6 animate-element animate-delay-200">
                        <div class="logo-container">
                            <img src="/assets/img/logo/logo.svg" alt="SIGAP PNJ Logo" class="w-10 h-10">
                        </div>
                    </div>
                    
                    <!-- Welcome Text -->
                    <h2 class="text-center text-3xl font-bold text-gray-800 mb-2 animate-element animate-delay-300" style="letter-spacing: -0.02em;">
                        Welcome to SIGAP PNJ! 
                    </h2>
                    <p class="text-center text-gray-600 text-sm mb-6 animate-element animate-delay-400">
                        Silahkan input username dan password kamu
                    </p>

                    <!-- Error Alert -->
                    <div id="error-alert" class="error-alert"></div>
                    
                    <!-- Form -->
                    <form id="login-form">
                        <!-- Username Field -->
                        <div class="mb-4 animate-element animate-delay-500">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                                Username
                            </label>
                            <div class="glass-input-wrapper">
                                <input 
                                    class="glass-input" 
                                    id="username" 
                                    type="text" 
                                    placeholder="Masukkan username Anda"
                                    value=""
                                    required
                                >
                            </div>
                        </div>
                        
                        <!-- Password Field -->
                        <div class="mb-4 animate-element animate-delay-600">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
                                Password
                            </label>
                            <div class="glass-input-wrapper">
                                <div class="relative">
                                    <input 
                                        class="glass-input" 
                                        style="padding-right: 3rem;"
                                        id="password" 
                                        type="password" 
                                        placeholder="Masukkan password Anda"
                                        value=""
                                        required
                                    >
                                    <button 
                                        type="button" 
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        id="togglePassword"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Captcha Field -->
                        <div class="mb-4 animate-element animate-delay-700">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="captcha">
                                Captcha
                            </label>
                            <div class="captcha-container">
                                <img src="/api/captcha" alt="Captcha" id="captcha-image" class="captcha-image">
                                <button type="button" id="reload-captcha" class="reload-captcha-btn">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>
                            <div class="glass-input-wrapper">
                                <input 
                                    class="glass-input" 
                                    id="captcha" 
                                    type="text" 
                                    placeholder="Masukkan kode captcha"
                                    required
                                >
                            </div>
                        </div>
                        
                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between mb-6 animate-element animate-delay-800">
                            <label class="flex items-center cursor-pointer gap-2">
                                <input type="checkbox" id="remember-me" class="custom-checkbox" checked>
                                <span class="text-sm text-gray-700">Ingat Saya</span>
                            </label>
                            <a href="/forgot-password" class="text-sm link-text">
                                Lupa Password?
                            </a>
                        </div>
                        
                        <!-- Login Button -->
                        <button 
                            type="submit" 
                            id="login-button"
                            class="modern-button animate-element animate-delay-900"
                        >
                            Login
                        </button>
                    </form>

                    <!-- Optional: Additional Info -->
                    <p class="text-center text-sm text-gray-500 mt-6 animate-element animate-delay-1000">
                        Sistem Informasi Pengelolaan Anggaran dan Pelaporan
                    </p>
                </div>
            </div>
        </div>
    `;

  rootElement.innerHTML = loginFormHTML;

  // Get form elements
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const captchaInput = document.getElementById("captcha");
  const rememberMeCheckbox = document.getElementById("remember-me");
  const loginButton = document.getElementById("login-button");
  const errorAlert = document.getElementById("error-alert");

  // Show error message
  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.style.display = "block";
    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 5000);
  }

  // Set loading state
  function setLoading(isLoading) {
    if (isLoading) {
      loginButton.disabled = true;
      loginButton.innerHTML = '<span class="spinner"></span>Loading...';
      usernameInput.disabled = true;
      passwordInput.disabled = true;
      captchaInput.disabled = true;
    } else {
      loginButton.disabled = false;
      loginButton.innerHTML = "Login";
      usernameInput.disabled = false;
      passwordInput.disabled = false;
      captchaInput.disabled = false;
    }
  }

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const captcha = captchaInput.value.trim();
    const rememberMe = rememberMeCheckbox.checked;

    // Validate input
    if (!username || !password || !captcha) {
      showError("Username, password, dan captcha harus diisi!");
      return;
    }

    setLoading(true);

    try {
      // Call login API
      const response = await authService.login({
        username,
        password,
        captcha,
        remember_me: rememberMe,
      });

      // Login successful
      if (response.success) {
        const user = response.data.user;
        const roles = user.roles || [];

        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);

        // Store the user's primary role in localStorage
        if (roles.length > 0) {
          const primaryRole = roles[0];
          localStorage.setItem("userRole", primaryRole);

          // Redirect based on user's role
          const rolePath = primaryRole.toLowerCase();
          let redirectPath = `/${rolePath}/dashboard`; // Default redirect

          switch (primaryRole) {
            case "Verifikator":
              redirectPath = `/${rolePath}/monitoring-usulan`;
              break;
            case "Wadir":
              redirectPath = `/${rolePath}/verifikasi-kegiatan`;
              break;
            case "PPK":
              redirectPath = `/${rolePath}/setujui-kegiatan`;
              break;
            case "Bendahara":
              redirectPath = `/${rolePath}/pencairan-dana`;
              break;
          }
          window.location.pathname = redirectPath;
        } else {
          // Handle case where user has no roles
          showError(
            "Login berhasil, tetapi tidak ada peran yang ditetapkan untuk pengguna ini."
          );
          setLoading(false);
        }
      } else {
        // Reload captcha on failed login from server
        document.getElementById("captcha-image").src =
          "/api/captcha?t=" + new Date().getTime();
        showError(response.message || "Login gagal!");
        setLoading(false);
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error.message || "Login gagal! Silakan cek username dan password Anda.";
      showError(errorMessage);
      // Reload captcha on error
      document.getElementById("captcha-image").src =
        "/api/captcha?t=" + new Date().getTime();
      setLoading(false);
    }
  });

  // Password toggle functionality
  const togglePasswordButton = document.getElementById("togglePassword");
  if (passwordInput && togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Update icon with smooth transition
      if (type === "text") {
        togglePasswordButton.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
          </svg>
        `;
      } else {
        togglePasswordButton.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        `;
      }
    });
  }

  // Add event listener for the captcha reload button
  const reloadCaptchaButton = document.getElementById("reload-captcha");
  if (reloadCaptchaButton) {
    reloadCaptchaButton.addEventListener("click", () => {
      // Append a timestamp to the src to prevent caching
      document.getElementById("captcha-image").src =
        "/api/captcha?t=" + new Date().getTime();
    });
  }

  // Add a pageshow event listener to reset the loading state
  window.addEventListener("pageshow", function (event) {
    // The event.persisted property is true if the page is from the cache
    if (event.persisted) {
      setLoading(false);
    }
  });

  // Ensure the loading state is reset when the page is rendered
  setLoading(false);
}