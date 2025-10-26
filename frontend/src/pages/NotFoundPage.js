export function renderNotFoundPage() {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = `
        <div class="p-8 text-center">
            <h1 class="text-4xl font-bold">404</h1>
            <p>Page Not Found</p>
            <a href="/" data-link>Go Home</a>
        </div>
    `;
}