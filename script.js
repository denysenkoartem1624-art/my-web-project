console.log("JS connected!");

// =========================================
// ЧАСТИНА 1: Тема та Модальне вікно
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});

const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
    }
});

// =========================================
// ЧАСТИНА 2: Динамічний рендеринг та пошук
// =========================================
const projects = [
    { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
    { id: 2, title: "Todo App", tech: "JavaScript" },
    { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

function createProjectCard(project) {
    return `
        <article class="project-card">
            <h3>${project.title}</h3>
            <p>${project.tech}</p>
        </article>
    `;
}

const container = document.querySelector('#projects-container');

function renderProjects(list) {
    if (!container) return;
    const html = list.map(project => createProjectCard(project)).join('');
    container.innerHTML = html;
}

renderProjects(projects);

const searchInput = document.querySelector('#search-input');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(value)
        );
        renderProjects(filtered);
    });
}

// =========================================
// ЧАСТИНА 3: Робота з API (Fetch, async/await)
// =========================================
async function loadPosts() {
    const loading = document.querySelector('#loading');
    const postsContainer = document.querySelector('#posts-container');

    try {
        // Запит на сервер (виправлено посилання з методички)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Перевірка на помилки сервера
        if (!response.ok) {
            throw new Error('Server error');
        }

        // Отримання даних
        const data = await response.json();

        // Формування HTML для перших 5 постів
        const html = data.slice(0, 5)
            .map(post => `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `)
            .join('');

        // Вивід на сторінку та приховування напису "Завантаження..."
        postsContainer.innerHTML = html;
        loading.style.display = 'none';

    } catch (error) {
        console.error(error);
        loading.textContent = 'Помилка завантаження даних';
    }
}

// Виклик функції при завантаженні сторінки
loadPosts();