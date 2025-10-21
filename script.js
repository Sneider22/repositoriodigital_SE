// Estado de la aplicación
let currentUser = null;
let projects = [];
let users = [];

// Elementos del DOM
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userMenu = document.getElementById('userMenu');
const userName = document.getElementById('userName');
const themeToggle = document.getElementById('themeToggle');
const addProjectBtn = document.getElementById('addProjectBtn');
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const carreraFilter = document.getElementById('carreraFilter');
const semestreFilter = document.getElementById('semestreFilter');
const tipoFilter = document.getElementById('tipoFilter');
const sedeFilter = document.getElementById('sedeFilter');

// Modales
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const projectModal = document.getElementById('projectModal');

// Formularios
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const projectForm = document.getElementById('projectForm');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
    updateUI();
});

function initializeApp() {
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            showSection(target);
        });
    });

    // Botones de autenticación
    loginBtn.addEventListener('click', () => showModal('loginModal'));
    registerBtn.addEventListener('click', () => showModal('registerModal'));
    logoutBtn.addEventListener('click', logout);
    addProjectBtn.addEventListener('click', () => showModal('projectModal'));

    // Toggle de tema
    themeToggle.addEventListener('click', toggleTheme);

    // Cerrar modales
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal);
        });
    });

    // Cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    // Formularios
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    projectForm.addEventListener('submit', handleProjectSubmit);

    // Búsqueda y filtros
    searchInput.addEventListener('input', filterProjects);
    carreraFilter.addEventListener('change', filterProjects);
    semestreFilter.addEventListener('change', filterProjects);
    tipoFilter.addEventListener('change', filterProjects);
    sedeFilter.addEventListener('change', filterProjects);

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon();
    }
}

function loadSampleData() {
    // Datos de ejemplo
    users = [
        { id: 1, name: 'Juan Pérez', email: 'juan@email.com', carrera: 'Ingeniería de Sistemas' },
        { id: 2, name: 'María García', email: 'maria@email.com', carrera: 'Arquitectura' },
        { id: 3, name: 'Carlos López', email: 'carlos@email.com', carrera: 'Ingeniería Electrónica' }
    ];

    projects = [
        {
            id: 1,
            title: 'Sistema de Gestión Académica',
            carrera: 'Ingeniería de Sistemas',
            semestre: '8',
            materia: 'Trabajo de Grado',
            linea: 'Desarrollo de Software',
            year: 2024,
            sede: 'Sede Principal Barcelona',
            keywords: 'sistema, gestión, académica, web, base de datos',
            description: 'Sistema web completo para la gestión académica de estudiantes, profesores y administradores. Incluye módulos de matrícula, calificaciones, horarios y reportes.',
            link: 'https://github.com/juan/sistema-academico',
            image: null,
            files: ['sistema.zip'],
            author: 'Juan Pérez',
            date: '2024-01-15'
        },
        {
            id: 2,
            title: 'Centro Cultural Moderno',
            carrera: 'Arquitectura',
            semestre: '9',
            materia: 'Diseño Arquitectónico V',
            linea: 'Arquitectura Sostenible',
            year: 2024,
            sede: 'Extensión Valencia',
            keywords: 'arquitectura, sostenible, cultural, diseño, espacios',
            description: 'Proyecto de centro cultural con enfoque en sostenibilidad y accesibilidad. Incluye espacios para exposiciones, biblioteca, auditorio y áreas verdes.',
            link: '',
            image: null,
            files: ['centro-cultural.dwg', 'centro-cultural.rvt', 'renderizado.jpg'],
            author: 'María García',
            date: '2024-02-10'
        },
        {
            id: 3,
            title: 'Robot Autónomo de Limpieza',
            carrera: 'Ingeniería Electrónica',
            semestre: '7',
            materia: 'Proyecto Integrador',
            linea: 'Robótica',
            year: 2024,
            sede: 'Extensión Maracaibo',
            keywords: 'robótica, autónomo, limpieza, sensores, navegación',
            description: 'Desarrollo de un robot autónomo para limpieza de espacios interiores. Utiliza sensores de proximidad, cámara de visión artificial y algoritmos de navegación.',
            link: 'https://github.com/carlos/robot-limpieza',
            image: null,
            files: ['codigo-robot.zip', 'esquematicos.pdf', 'manual.pdf'],
            author: 'Carlos López',
            date: '2024-01-28'
        }
    ];

    // Establecer año máximo dinámicamente
    const currentYear = new Date().getFullYear();
    const yearInput = document.getElementById('projectYear');
    if (yearInput) {
        yearInput.max = currentYear;
    }

    updateStats();
    renderProjects();
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Actualizar navegación
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulación de login (en producción sería con backend)
    const user = users.find(u => u.email === email);
    if (user && password.length >= 6) {
        currentUser = user;
        updateUI();
        hideModal(loginModal);
        showMessage('Inicio de sesión exitoso', 'success');
        loginForm.reset();
    } else {
        showMessage('Credenciales incorrectas', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const carrera = document.getElementById('registerCarrera').value;

    // Validaciones básicas
    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    if (users.find(u => u.email === email)) {
        showMessage('El correo ya está registrado', 'error');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: users.length + 1,
        name,
        email,
        carrera
    };

    users.push(newUser);
    currentUser = newUser;
    updateUI();
    hideModal(registerModal);
    showMessage('Registro exitoso', 'success');
    registerForm.reset();
}

function handleProjectSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showMessage('Debes iniciar sesión para subir proyectos', 'error');
        return;
    }

    const formData = new FormData(projectForm);
    const newProject = {
        id: projects.length + 1,
        title: document.getElementById('projectTitle').value,
        carrera: document.getElementById('projectCarrera').value,
        semestre: document.getElementById('projectSemestre').value,
        materia: document.getElementById('projectMateria').value,
        linea: document.getElementById('projectLinea').value || null,
        year: parseInt(document.getElementById('projectYear').value),
        sede: document.getElementById('projectSede').value,
        keywords: document.getElementById('projectKeywords').value,
        description: document.getElementById('projectDescription').value,
        link: document.getElementById('projectLink').value || null,
        image: null,
        files: Array.from(document.getElementById('projectFiles').files).map(f => f.name),
        author: currentUser.name,
        date: new Date().toISOString().split('T')[0]
    };

    projects.unshift(newProject);
    renderProjects();
    updateStats();
    hideModal(projectModal);
    showMessage('Proyecto subido exitosamente', 'success');
    projectForm.reset();
}

function logout() {
    currentUser = null;
    updateUI();
    showMessage('Sesión cerrada', 'success');
}

function updateUI() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        addProjectBtn.style.display = 'inline-flex';
        userName.textContent = currentUser.name;
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
        addProjectBtn.style.display = 'none';
    }
}

function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const imageUrl = project.image || null;
    const imageHtml = imageUrl 
        ? `<img src="${imageUrl}" alt="${project.title}" class="project-image">`
        : `<div class="project-image"><i class="fas fa-folder-open"></i></div>`;

    card.innerHTML = `
        ${imageHtml}
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-meta">
                <span class="project-tag">${project.carrera}</span>
                <span class="project-tag">${project.semestre}° Semestre</span>
                <span class="project-tag">${project.year}</span>
                <span class="project-tag">${project.sede}</span>
            </div>
            <div class="project-keywords">
                <strong>Palabras clave:</strong> ${project.keywords}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-actions">
                ${project.link ? `<a href="${project.link}" target="_blank" class="btn-secondary"><i class="fas fa-external-link-alt"></i> Ver Proyecto</a>` : ''}
                <button class="btn-secondary" onclick="downloadProject(${project.id})">
                    <i class="fas fa-download"></i> Descargar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const carreraValue = carreraFilter.value;
    const semestreValue = semestreFilter.value;
    const tipoValue = tipoFilter.value;
    const sedeValue = sedeFilter.value;

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                           project.description.toLowerCase().includes(searchTerm) ||
                           project.materia.toLowerCase().includes(searchTerm) ||
                           project.keywords.toLowerCase().includes(searchTerm);
        
        const matchesCarrera = !carreraValue || project.carrera === carreraValue;
        const matchesSemestre = !semestreValue || project.semestre === semestreValue;
        const matchesTipo = !tipoValue || project.materia.toLowerCase().includes(tipoValue.toLowerCase());
        const matchesSede = !sedeValue || project.sede === sedeValue;

        return matchesSearch && matchesCarrera && matchesSemestre && matchesTipo && matchesSede;
    });

    // Limpiar grid y mostrar proyectos filtrados
    projectsGrid.innerHTML = '';
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function downloadProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        showMessage(`Descargando archivos de: ${project.title}`, 'success');
        // En producción aquí se manejaría la descarga real de archivos
    }
}

function updateStats() {
    document.getElementById('totalProjects').textContent = projects.length;
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function showMessage(message, type) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insertar mensaje en la sección activa
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        activeSection.insertBefore(messageDiv, activeSection.firstChild);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Funciones adicionales para funcionalidad avanzada
function exportProjects() {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'proyectos.json';
    link.click();
    URL.revokeObjectURL(url);
}

function importProjects(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedProjects = JSON.parse(e.target.result);
                projects = [...projects, ...importedProjects];
                renderProjects();
                updateStats();
                showMessage('Proyectos importados exitosamente', 'success');
            } catch (error) {
                showMessage('Error al importar archivo', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Funciones de utilidad
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Event listeners adicionales
document.addEventListener('keydown', function(e) {
    // Cerrar modales con Escape
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            hideModal(activeModal);
        }
    }
});

// Prevenir envío de formularios con Enter en campos de búsqueda
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        filterProjects();
    }
});

// Animaciones de entrada para las cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador a las cards cuando se renderizan
function applyCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Llamar a las animaciones después de renderizar
setTimeout(applyCardAnimations, 100);
