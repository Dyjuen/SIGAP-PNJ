// frontend/src/pages/auth/LoginPage.js

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
                    <h2 class="text-center text-2xl font-semibold text-gray-800 mb-2">
                        Welcome to SIGAP PNJ! 👋
                    </h2>
                    <p class="text-center text-gray-500 text-sm mb-6">
                        Silahkan input email dan password kamu
                    </p>
                    
                    <!-- Form -->
                    <form id="login-form">
                        <!-- Email Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
                                Email
                            </label>
                            <input 
                                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent input-transparent" 
                                id="email" 
                                type="email" 
                                placeholder="email"
                                value=""
                            >
                        </div>
                        
                        <!-- Password Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
                                Password
                            </label>
                            <div class="relative">
                                <input 
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent input-transparent" 
                                    id="password" 
                                    type="password" 
                                    placeholder="password"
                                >
                                <button 
                                    type="button" 
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onclick="togglePassword()"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between mb-6">
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" class="custom-checkbox" checked>
                                <span class="ml-2 text-sm text-gray-700">Ingat Saya</span>
                            </label>
                            <a href="#" class="text-sm text-[#33C8DA] hover:text-cyan-500 font-medium">
                                Forgot Password?
                            </a>
                        </div>
                        
                        <!-- Login Button -->
                        <button 
                            type="submit" 
                            class="w-full bg-[#33C8DA] hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                        >
                            Login
                        </button>
                        <div class="text-center mt-4">
                            <a href="/dashboard" data-link class="text-sm text-cyan-600 hover:underline">Go to Dashboard (Demo)</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    `;

  rootElement.innerHTML = loginFormHTML;

  // --- START: LOGIN LOGIC ---
  const form = document.getElementById("login-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page from reloading

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "rafif@gmail.com" && password === "rafifrafif") {
      alert("Login berhasil!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } else {
      alert("Email atau password salah!");
    }
  });
  // --- END: LOGIN LOGIC ---

  // Add event listener for the password toggle button
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = passwordInput?.nextElementSibling;

  if (passwordInput && togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      // Toggle the type attribute
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle the icon
      const icon = togglePasswordButton.querySelector("i");
      if (icon) {
        if (type === "password") {
          icon.classList.remove("tabler-eye");
          icon.classList.add("tabler-eye-off");
        } else {
          icon.classList.remove("tabler-eye-off");
          icon.classList.add("tabler-eye");
        }
      }
    });
  }
}
