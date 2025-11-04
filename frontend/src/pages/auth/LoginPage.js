// frontend/src/pages/auth/LoginPage.js

import { authService } from "../../api/authService.js";

export function renderLoginPage() {
  const rootElement = document.getElementById("root");

  const loginFormHTML = `
        <style>
            /* Transparent input background */
            .input-transparent {
                background-color: transparent;
            }
            .input-transparent:focus {
                background-color: rgba(249, 250, 251, 0.5);
            }
            
            /* Custom Checkbox */
            .custom-checkbox {
                appearance: none;
                width: 18px;
                height: 18px;
                border: 2px solid #D1D5DB;
                border-radius: 4px;
                background-color: white;
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

            /* Error Alert */
            .error-alert {
                background-color: #FEE2E2;
                border: 1px solid #FCA5A5;
                color: #991B1B;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 16px;
                display: none;
            }

            /* Loading Spinner */
            .spinner {
                border: 2px solid #f3f3f3;
                border-top: 2px solid #33C8DA;
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
        </style>
        
        <div style="background-image: url('/assets/img/backgrounds/Auth.png'); background-size: cover; background-position: center; min-height: 100vh;" class="flex items-center justify-center">
            <div class="w-full max-w-lg px-4">
                <!-- Container putih dengan padding dan shadow -->
                <div class="bg-white/60 rounded-2xl shadow-lg px-12 py-10">
                    <!-- Logo di bagian atas -->
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 rounded-xl flex items-center justify-center">
                            <img src="/assets/img/logo/logo.svg" alt="SIGAP PNJ Logo" class="w-10 h-10">
                        </div>
                    </div>
                    
                    <!-- Welcome Text -->
                    <h2 class="text-center text-2xl font-bold text-gray-800 mb-2">
                        Welcome to SIGAP PNJ! 
                    </h2>
                    <p class="text-center text-gray-500 text-sm mb-6">
                        Silahkan input username dan password kamu
                    </p>

                    <!-- Error Alert -->
                    <div id="error-alert" class="error-alert"></div>
                    
                    <!-- Form -->
                    <form id="login-form">
                        <!-- Username Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                                Username
                            </label>
                            <input 
                                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent input-transparent" 
                                id="username" 
                                type="text" 
                                value=""
                                required
                            >
                        </div>
                        
                        <!-- Password Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
                                Password
                            </label>
                            <div class="relative">
                                <input 
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent input-transparent" 
                                    id="password" 
                                    type="password" 
                                    value=""
                                    required
                                >
                                <button 
                                    type="button" 
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    id="togglePassword"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Captcha Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-semibold mb-2" for="captcha">
                                Captcha
                            </label>
                            <div class="flex items-center">
                                <img src="/api/captcha" alt="Captcha" id="captcha-image" class="rounded-lg">
                                <button type="button" id="reload-captcha" class="ml-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M4 4l16 16"></path></svg>
                                </button>
                            </div>
                            <input 
                                class="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent input-transparent" 
                                id="captcha" 
                                type="text" 
                                placeholder="Enter captcha"
                                required
                            >
                        </div>
                        
                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between mb-6">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" id="remember-me" class="custom-checkbox" checked>
                                <span class="ml-2 text-sm text-gray-700">Ingat Saya</span>
                            </label>
                            <a href="#" class="text-sm text-[#33C8DA] hover:text-cyan-500 font-medium">
                                Forgot Password?
                            </a>
                        </div>
                        
                        <!-- Login Button -->
                        <button 
                            type="submit" 
                            id="login-button"
                            class="w-full bg-[#33C8DA] hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>
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
      loginButton.textContent = "Login";
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

        // Determine redirect path based on role
        let redirectPath = "/dashboard";

        if (roles.includes("Admin")) {
          redirectPath = "/user-management";
        } else if (roles.includes("Verifikator")) {
          redirectPath = "/verifikator/dashboard";
        } else if (roles.includes("Wadir")) {
          redirectPath = "/wadir/dashboard";
        } else if (roles.includes("PPK")) {
          redirectPath = "/ppk/dashboard";
        } else if (roles.includes("Bendahara")) {
          redirectPath = "/bendahara/dashboard";
        }

        // Redirect to appropriate page
        window.location.pathname = redirectPath;
      } else {
        // Reload captcha on failed login from server
        document.getElementById("captcha-image").src =
          "/api/captcha?" + new Date().getTime();
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
        "/api/captcha?" + new Date().getTime();
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

      // Update icon
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
        "/api/captcha?" + new Date().getTime();
    });
  }
}