console.log("JS connected!");

// =========================================
// ЧАСТИНА 1: Тема та Модальне вікно (З попередньої лаби)
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
// ЧАСТИНА 2: Динамічний рендеринг та пошук (Нова лаба)
// =========================================

const projects = [
    { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
    { id: 2, title: "Todo App", tech: "JavaScript" },
    { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

// Функція створення HTML однієї картки
function createProjectCard(project) {
    return `
        <article class="project-card">
            <h3>${project.title}</h3>
            <p>${project.tech}</p>
        </article>
    `;
}

const container = document.querySelector('#projects-container');

// Функція рендерингу (через map)
function renderProjects(list) {
    if (!container) return;
    const html = list.map(project => createProjectCard(project)).join('');
    container.innerHTML = html;
}

// Виклик генерації при завантаженні сторінки
renderProjects(projects);

// Реалізація пошуку (Filter)
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