console.log("JS connected!");

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

const projectsContainer = document.querySelector('#projects-container');

function renderProjects(list) {
    if (!projectsContainer) return;
    const html = list.map(project => createProjectCard(project)).join('');
    projectsContainer.innerHTML = html;
}

renderProjects(projects);

let allPosts = [];

async function loadPosts() {
    const loading = document.querySelector('#loading');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Помилка сервера');
        }

        const data = await response.json();
        allPosts = data.slice(0, 10);
        renderPosts(allPosts);
        loading.style.display = 'none';

    } catch (error) {
        console.error(error);
        loading.textContent = 'Помилка завантаження';
    }
}

const postsContainer = document.querySelector('#posts-container');

function renderPosts(list) {
    if (!postsContainer) return;

    const html = list
        .map(post => `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `)
        .join('');

    postsContainer.innerHTML = html;
}

loadPosts();

const searchInput = document.querySelector('#search-input');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(value)
        );
        renderPosts(filtered);
    });
}


let tasks = [];

const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const btn = document.createElement('button');
        btn.textContent = 'X';
        btn.classList.add('delete-task-btn');

        btn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', () => {
        const value = taskInput.value.trim();

        if (value === '') return;

        tasks.push({ text: value });
        saveTasks();
        renderTasks();

        taskInput.value = '';
    });


    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });
}

loadTasks();
renderTasks();