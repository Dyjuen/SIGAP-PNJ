// frontend/src/js/pages/UnauthorizedPage.js

export function renderUnauthorizedPage() {
  const rootElement = document.getElementById("root");

  const pageHTML = `
    <style>
      .unauthorized-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f3f4f6;
        font-family: 'Public Sans', sans-serif;
        text-align: center;
        padding: 2rem;
      }
      .unauthorized-card {
        background-color: white;
        border-radius: 1rem;
        padding: 3rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 100%;
      }
      .unauthorized-code {
        font-size: 5rem;
        font-weight: 800;
        color: #33C8DA;
        margin-bottom: 0.5rem;
      }
      .unauthorized-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
      }
      .unauthorized-message {
        color: #4b5563;
        margin-bottom: 2rem;
      }
      .unauthorized-button {
        display: inline-block;
        background-color: #33C8DA;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: background-color 0.3s;
      }
      .unauthorized-button:hover {
        background-color: #29aebf;
      }
    </style>
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="unauthorized-code">403</div>
        <h1 class="unauthorized-title">Akses Ditolak</h1>
        <p class="unauthorized-message">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login dengan akun yang sesuai.
        </p>
        <a href="/login" class="unauthorized-button" data-link>Kembali ke Login</a>
      </div>
    </div>
  `;

  rootElement.innerHTML = pageHTML;
}
