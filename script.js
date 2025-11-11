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

// Desactivar la restauración automática del scroll del navegador
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
    updateUI();
    
    // Asegurar que la página comience desde arriba al cargar
    window.scrollTo(0, 0);
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

    // ============================================
    // PROYECTOS PRECARGADOS - INSTRUCCIONES
    // ============================================
    // Para agregar proyectos con archivos reales:
    // 
    // 1. Coloca los archivos en una carpeta (ej: /proyectos/proyecto1/)
    // 2. Usa la función loadProjectFiles() para cargar los archivos
    //    o define fileData manualmente con:
    //    - name: nombre del archivo
    //    - content: ArrayBuffer, Blob, string (texto), o string base64 (data:image/jpeg;base64,...)
    //    - type: MIME type del archivo (ej: 'application/pdf', 'image/jpeg', 'text/plain')
    //
    // Ejemplo de proyecto con archivos:
    // {
    //     id: 4,
    //     title: 'Mi Proyecto',
    //     ...otros campos...,
    //     files: ['archivo1.pdf', 'archivo2.jpg'],
    //     fileData: [
    //         {
    //             name: 'archivo1.pdf',
    //             content: arrayBufferDelPDF, // ArrayBuffer leído con FileReader
    //             type: 'application/pdf'
    //         },
    //         {
    //             name: 'archivo2.jpg',
    //             content: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==', // Base64
    //             type: 'image/jpeg'
    //         }
    //     ]
    // }
    // ============================================
    
    

    // Establecer año máximo dinámicamente
    const currentYear = new Date().getFullYear();
    const yearInput = document.getElementById('projectYear');
    if (yearInput) {
        yearInput.max = currentYear;
    }

    // Cargar proyectos reales desde la carpeta proyectos (sin esperar archivos)
    loadRealProjectsSync();

    updateStats();
    renderProjects();
    
    // Intentar cargar archivos en segundo plano (puede fallar sin servidor)
    loadRealProjectsFiles();
}

// Función para cargar proyectos reales SIN archivos (sincrónico)
function loadRealProjectsSync() {
    // Proyecto 1: Base de Datos - Sneider Araque y Freddy Aleman
    projects.push({
        id: projects.length + 1,
        title: 'Base de Datos Inmuebles',
        carrera: 'Ingeniería de Sistemas',
        semestre: '5',
        materia: 'Base de Datos',
        linea: 'Bases de Datos',
        year: 2023,
        sede: 'Extensión Caracas',
        keywords: 'base de datos, sql, entrega final, proyecto, html, css, javascript',
        description: 'Proyecto final de Base de Datos desarrollado por Sneider Araque y Freddy Aleman. Incluye diseño de base de datos, implementación y documentación completa. El proyecto se centró en la implementación completa de un sistema de bases de datos para una plataforma de gestión de inmuebles. En el front-end se desarrollaron formularios interactivos con HTML, CSS y JavaScript. El back-end se sustentó en MySQL Server, administrado mediante MySQL Workbench y phpMyAdmin. El diseño de la estructura se basó en un Diagrama Entidad- Relación (DER) para modelar la información de propietarios y clientes. La actividad resultó en una base de datos funcional, completamente documentada y diseñada para una gestión eficiente de un portal inmobiliario.',
        link: null,
        image: null,
        files: [
            'Sneider Araque y Freddy Aleman - Entrega Final.pdf',
            'Sneider Araque y Freddy Aleman - Entrega Final.rar',
            'forms clientes.html',
            'forms inmuebles.html',
            'forms propietarios.html',
            'inmuebles.sql',
            'form_clientes.sql',
            'form_inmuebles.sql',
            'form_propietarios.sql',
            'style forms.css',
            'clientes.png',
            'inmuebles.png',
            'propietarios.png',
        
        ],
        fileData: [], // Se cargará después si es posible
        author: 'Sneider Araque y Freddy Aleman',
        profesor: 'Nelly Escorcha', // Puedes cambiar esto con el nombre del profesor
        date: '05/11/2025'
    });

    // Proyecto 2: Servicio Comunitario
    projects.push({
        id: projects.length + 1,
        title: 'Creación de una página web para la ampliación de la oferta de servicios de cursos en la Escuela para el Emprendimiento María Auxiliadora',
        carrera: 'Ingeniería de Sistemas',
        semestre: '8',
        materia: 'Servicio Comunitario',
        linea: 'Servicio Social, Sistema o tecnología de información y Sistema Multimedia ',
        year: 2024,
        sede: 'Extensión Caracas',
        keywords: 'servicio comunitario, sistemas, proyecto social, comunidad, página web, colegio, ampliación',
        description: 'El proyecto tuvo como Objetivo General la creación de una página web para la Escuela para el Emprendimiento María Auxiliadora, buscando ampliar la oferta de servicios y su alcance en la comunidad. La Justificación principal reside en la necesidad de superar barreras geográficas (ampliar el público), centralizar la información (servicios, horarios, noticias) para facilitar el acceso, optimizar los procesos internos (inscripción y administración) y fortalecer la identidad institucional al mostrar logros e integrar canales de comunicación bidireccional. Los Objetivos Específicos se centraron en identificar necesidades, analizar portales web de referencia y diseñar la página con funcionalidad y accesibilidad. Como Resultados Esperados, se proyectó un aumento de visibilidad, mayor eficiencia en la gestión, fortalecimiento de la comunidad y un impacto social positivo al facilitar el acceso a programas educativos y de emprendimiento.',
        link: 'https://sc-mariaauxiliadora.vercel.app/',
        image: null,
        files: [
            'Servicio Comunitario - Sistemas.pdf',
            'servicio-comunitario-master.zip'
        ],
        fileData: [], // Se cargará después si es posible
        author: 'Sneider Araque, Angel Melchor, Rubel Maneiro y Eric Gomes', // Puedes cambiar esto con el nombre del autor
        profesor: 'Yerlin Herrera', // Puedes cambiar esto con el nombre del profesor
        date: '10/02/2025'
    });

    // Proyecto 3: Simulación Digital - Sneider Araque
    projects.push({
        id: projects.length + 1,
        title: 'Simulación de Sistema Oscilatorio',
        carrera: 'Ingeniería de Sistemas',
        semestre: '8',
        materia: 'Simulación Digital',
        linea: 'Simulación y Modelado',
        year: 2024,
        sede: 'Extensión Caracas',
        keywords: 'simulación, digital, modelado, sistemas',
        description: 'El proyecto consistió en el desarrollo de un Simulador Web Interactivo de un Oscilador Armónico Simple (masa y resorte), utilizando HTML, CSS y JavaScript como tecnologías principales. Un oscilador armónico simple es un sistema físico fundamental donde una masa conectada a un resorte genera un movimiento oscilatorio periódico, esencial en física e ingeniería. El simulador permite a los usuarios modificar parámetros clave como la masa, la constante del resorte, la elongación y la velocidad inicial. Su característica principal es la visualización y análisis en tiempo real del comportamiento del sistema. Esto se logra mediante gráficos dinámicos (implementados con Chart.js) que representan la evolución de la elongación, velocidad, aceleración, fuerza y la energía total del sistema. Además de los controles de parámetros y los botones de control (iniciar, pausar, reiniciar), el simulador incorpora un diseño responsivo (adaptable a diferentes dispositivos) y funciones de usabilidad como un selector de modo claro/oscuro. El objetivo es facilitar el análisis rápido y el aprendizaje del movimiento armónico simple.',
        link: 'https://simulacion-dig.vercel.app/',
        image: null,
        files: [
            'simulacion-dig-sneider-araque.zip',
            'elongacion.png',
            'velocidad.png',
            'aceleracion.png',
            'energia.png',
            'fuerza.png'
        ],
        fileData: [], // Se cargará después si es posible
        author: 'Sneider Araque',
        profesor: 'Roger Hau', // Puedes cambiar esto con el nombre del profesor
        date: '28/11/2024'
    });

// Proyecto 4: Mercado Municipal - Sofia Sanchez
projects.push({
    id: projects.length + 1,
    title: 'Mercado Municipal',
    carrera: 'Arquitectura',
    semestre: '6',
    materia: 'Diseño VI',
    linea: 'Diseño Arquitectónico',
    year: 2023,
    sede: 'Extensión Caracas',
    keywords: 'diseño, mercado, mercado municipal, planos, render',
    description: 'El trabajo consistió en la elaboración integral de planos arquitectónicos para un mercado municipal. Se utilizó una metodología de representación bidimensional y tridimensional para visualizar el procedimiento de diseño y construcción. La creación de los planos y la documentación técnica se realizó mediante software especializado, incluyendo AutoCAD (para dibujo técnico detallado) y Revit (para modelado de información de construcción - BIM). Además, se complementó el proyecto con la construcción de una maqueta física, que sirvió como simulación tridimensional para una mejor comprensión espacial y visualización del diseño propuesto.',
    link: null,
    image: null,
    files: [
        'Mercado Municipal Sofia Sanchez - Entrega Final.pdf',
        'mercado municipal.dwg',
        'mercado revit.rvt',
        'mercado_municipal.png',
        'entrada_principal.png',
        'entrada_principal_2.png',
        'entrada_principal_3.png',
        'entrada_principal_4.png',
        'rampa_principal.png',
        
    ],
    fileData: [], // Se cargará después si es posible
    author: 'Sofia Sanchez',
    profesor: 'Martin Bilbao', // Puedes cambiar esto con el nombre del profesor
    date: '08/03/2023'
});

}

// Función para cargar los archivos reales de los proyectos (asíncrono, puede fallar)
async function loadRealProjectsFiles() {
    try {
        // Buscar proyectos sin fileData y cargar sus archivos
        const proyectosSinArchivos = projects.filter(p => 
            p.fileData && p.fileData.length === 0 && 
            p.files && p.files.length > 0
        );

        for (const proyecto of proyectosSinArchivos) {
            try {
                // Usar las rutas basadas en los nombres de archivos del proyecto
                const urls = proyecto.files.map(fileName => getFilePath(proyecto, fileName));

                if (urls.length > 0) {
                    const archivos = await loadMultipleFiles(urls);
                    if (archivos.length > 0) {
                        proyecto.fileData = archivos;
                        console.log(`Archivos cargados para: ${proyecto.title}`);
                    }
                }
            } catch (error) {
                console.warn(`No se pudieron cargar archivos para ${proyecto.title}:`, error);
                // Continuar con el siguiente proyecto
            }
        }

        // Actualizar la interfaz si se cargaron archivos
        renderProjects();
        updateStats();
    } catch (error) {
        console.warn('Algunos archivos no se pudieron cargar (normal si no hay servidor web):', error);
    }
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

    // Hacer scroll al inicio de la página cuando se cambia de sección
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showMessage('Debes iniciar sesión para subir proyectos', 'error');
        return;
    }

    const filesInput = document.getElementById('projectFiles');
    const files = Array.from(filesInput.files);
    
    if (files.length === 0) {
        showMessage('Debes seleccionar al menos un archivo', 'error');
        return;
    }

    // Leer los archivos y convertirlos a fileData
    const fileDataPromises = files.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: file.name,
                    content: e.target.result, // ArrayBuffer o base64 según el tipo
                    type: file.type || 'application/octet-stream'
                });
            };
            reader.onerror = reject;
            // Leer como ArrayBuffer para archivos binarios
            reader.readAsArrayBuffer(file);
        });
    });

    try {
        const fileData = await Promise.all(fileDataPromises);
        
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
            profesor: document.getElementById('projectProfesor').value || null,
            link: document.getElementById('projectLink').value || null,
            image: null,
            files: files.map(f => f.name),
            fileData: fileData.map(fd => ({
                name: fd.name,
                content: fd.content, // ArrayBuffer
                type: fd.type
            })),
            author: currentUser.name,
            date: new Date().toISOString().split('T')[0]
        };

        projects.unshift(newProject);
        renderProjects();
        updateStats();
        hideModal(projectModal);
        showMessage('Proyecto subido exitosamente', 'success');
        projectForm.reset();
    } catch (error) {
        console.error('Error al procesar archivos:', error);
        showMessage('Error al procesar los archivos', 'error');
    }
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
                <button class="btn-secondary" onclick="event.stopPropagation(); verDetalleProyecto(${project.id})">
                    <i class="fas fa-eye"></i> Ver Detalles
                </button>
                <button class="btn-secondary" onclick="event.stopPropagation(); downloadProject(${project.id})">
                    <i class="fas fa-download"></i> Descargar
                </button>
            </div>
        </div>
    `;
    
    // Agregar evento click al card para ver detalles
    card.addEventListener('click', () => {
        verDetalleProyecto(project.id);
    });
    
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
    // Stats removed from homepage
    // document.getElementById('totalProjects').textContent = projects.length;
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

// Funciones para la página de detalle del proyecto
const backToListBtn = document.getElementById('backToList');
const proyectoDetalleContent = document.getElementById('proyectoDetalleContent');
const proyectoDetalleSection = document.getElementById('proyecto-detalle');

// Handler para el botón de volver
if (backToListBtn) {
    backToListBtn.addEventListener('click', () => {
        showSection('repositorios');
    });
}

// Función para ver el detalle del proyecto
function verDetalleProyecto(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Mostrar la sección de detalle
    showSection('proyecto-detalle');
    
    // Asegurar scroll al inicio cuando se abre un proyecto
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 100);
    
    // Crear el HTML del detalle
    const keywords = project.keywords.split(',').map(k => k.trim());
    
    // Detectar imágenes en los archivos del proyecto
    const imageFiles = [];
    const nonImageFiles = [];
    
    if (project.files && project.files.length > 0) {
        project.files.forEach((file, index) => {
            const ext = file.split('.').pop().toLowerCase();
            if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) {
                imageFiles.push({ name: file, index: index });
            } else {
                nonImageFiles.push({ name: file, index: index });
            }
        });
    }
    
    // Crear galería de imágenes si hay imágenes
    let galeriaHTML = '';
    if (imageFiles.length > 0) {
        galeriaHTML = `
            <div class="detalle-galeria">
                <h3><i class="fas fa-images"></i> Galería de Imágenes</h3>
                <div class="galeria-grid">
        `;
        imageFiles.forEach(img => {
            const filePath = getFilePath(project, img.name);
            galeriaHTML += `
                <div class="galeria-card">
                    <img src="${filePath}" alt="${img.name}" class="galeria-imagen" loading="lazy" onerror="this.style.display='none'">
                    <div class="galeria-card-overlay">
                        <span class="galeria-nombre">${img.name}</span>
                        <button class="btn-galeria-download" onclick="event.stopPropagation(); downloadSingleFile(${project.id}, ${img.index})" title="Descargar imagen">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        galeriaHTML += `
                </div>
            </div>
        `;
    }
    
    let archivosHTML = '';
    // Solo mostrar archivos que NO son imágenes (las imágenes van en la galería)
    if (nonImageFiles.length > 0) {
        archivosHTML = `
            <div class="detalle-archivos">
                <h3><i class="fas fa-folder"></i> Archivos del Proyecto</h3>
                <div class="archivos-list">
        `;
        nonImageFiles.forEach(({ name: file, index }) => {
            const icono = getFileIcon(file);
            const fileData = project.fileData && project.fileData[index] ? project.fileData[index] : null;
            let fileSize = '-';
            if (fileData && fileData.content) {
                if (fileData.content instanceof ArrayBuffer) {
                    fileSize = formatFileSize(fileData.content.byteLength);
                } else if (fileData.content instanceof Blob) {
                    fileSize = formatFileSize(fileData.content.size);
                } else if (typeof fileData.content === 'string') {
                    // Si es base64, calcular el tamaño real
                    if (fileData.content.startsWith('data:')) {
                        const base64Data = fileData.content.split(',')[1];
                        fileSize = formatFileSize((base64Data.length * 3) / 4);
                    } else {
                        // Texto plano
                        fileSize = formatFileSize(new Blob([fileData.content]).size);
                    }
                } else {
                    fileSize = formatFileSize(fileData.content.length || 0);
                }
            }
            archivosHTML += `
                <div class="archivo-item">
                    <div class="archivo-info">
                        <i class="${icono} archivo-icono"></i>
                        <span class="archivo-nombre">${file}</span>
                    </div>
                    <div class="archivo-actions">
                        <span class="archivo-tamaño">${fileSize}</span>
                        <button class="btn-download-small" onclick="event.stopPropagation(); downloadSingleFile(${project.id}, ${index})" title="Descargar archivo individual">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        archivosHTML += `
                </div>
            </div>
        `;
    }
    
    proyectoDetalleContent.innerHTML = `
        <div class="detalle-header">
            <h1 class="detalle-titulo">${project.title}</h1>
            <div class="detalle-meta">
                <span class="detalle-tag">${project.carrera}</span>
                <span class="detalle-tag">${project.semestre}° Semestre</span>
                <span class="detalle-tag">${project.year}</span>
                <span class="detalle-tag">${project.sede}</span>
                <span class="detalle-tag">${project.materia}</span>
            </div>
        </div>
        
        <div class="detalle-info-grid">
            <div class="detalle-info-item">
                <span class="detalle-info-label">Autor:</span>
                <span class="detalle-info-value">${project.author || 'No especificado'}</span>
            </div>
            ${project.profesor ? `
            <div class="detalle-info-item">
                <span class="detalle-info-label">Profesor:</span>
                <span class="detalle-info-value">${project.profesor}</span>
            </div>
            ` : ''}
            <div class="detalle-info-item">
                <span class="detalle-info-label">Fecha de Publicación:</span>
                <span class="detalle-info-value">${formatDate(project.date)}</span>
            </div>
            ${project.linea ? `
            <div class="detalle-info-item">
                <span class="detalle-info-label">Línea de Investigación:</span>
                <span class="detalle-info-value">${project.linea}</span>
            </div>
            ` : ''}
        </div>
        
        ${project.link ? `
        <div class="detalle-link-section">
            <h3><i class="fas fa-link"></i> Enlace del Proyecto</h3>
            <a href="${project.link}" target="_blank" class="btn-link" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <i class="fas fa-external-link-alt"></i> Ver Proyecto en Línea
            </a>
        </div>
        ` : ''}
        
        <div class="detalle-descripcion">
            <h3><i class="fas fa-align-left"></i> Descripción del Proyecto</h3>
            <p>${project.description}</p>
        </div>
        
        ${galeriaHTML}
        
        <div class="detalle-palabras-clave">
            <h3><i class="fas fa-tags"></i> Palabras Clave</h3>
            <div class="palabras-clave-list">
                ${keywords.map(keyword => `<span class="palabra-clave-tag">${keyword}</span>`).join('')}
            </div>
        </div>
        
        ${archivosHTML}
        
        <div class="detalle-acciones">
            <button class="btn-download" onclick="downloadProjectAsZip(${project.id})">
                <i class="fas fa-download"></i> Descargar Todos los Archivos (.ZIP)
            </button>
        </div>
    `;
}

// Función para obtener el ícono según el tipo de archivo
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
        'dwg': 'fas fa-file-image',
        'rvt': 'fas fa-file-image',
        'skp': 'fas fa-file-image',
        'max': 'fas fa-cube',
        '3ds': 'fas fa-cube',
        'blend': 'fas fa-cube',
        'cpp': 'fas fa-file-code',
        'java': 'fas fa-file-code',
        'js': 'fas fa-file-code',
        'py': 'fas fa-file-code',
        'html': 'fas fa-file-code',
        'css': 'fas fa-file-code',
        'php': 'fas fa-file-code',
        'sql': 'fas fa-database',
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive',
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image',
        'gif': 'fas fa-file-image',
    };
    return iconMap[ext] || 'fas fa-file';
}

// Función para formatear el tamaño de archivo
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Función para convertir contenido a Blob
function contentToBlob(content, type) {
    // Si ya es un Blob
    if (content instanceof Blob) {
        return content;
    }
    // Si es ArrayBuffer
    if (content instanceof ArrayBuffer) {
        return new Blob([content], { type: type || 'application/octet-stream' });
    }
    // Si es Uint8Array
    if (content instanceof Uint8Array) {
        return new Blob([content], { type: type || 'application/octet-stream' });
    }
    // Si es string
    if (typeof content === 'string') {
        // Si es base64 data URL
        if (content.startsWith('data:')) {
            const base64Data = content.split(',')[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return new Blob([bytes], { type: type || 'application/octet-stream' });
        }
        // Si es texto plano
        return new Blob([content], { type: type || 'text/plain' });
    }
    // Por defecto, convertir a string
    return new Blob([String(content)], { type: type || 'application/octet-stream' });
}

// Función para obtener la ruta del archivo según el proyecto
function getFilePath(project, fileName) {
    // Mapear proyectos a sus rutas
    if (project.title.includes('Base de Datos')) {
        return `proyectos/Base de Datos - Sneider Araque y Freddy Aleman/${fileName}`;
    } else if (project.title.includes('Servicio Comunitario') || project.title.includes('página web')) {
        return `proyectos/Serv. Comunitario/${fileName}`;
    } else if (project.title.includes('Simulación Digital') || project.title.includes('Simulación de Sistema')) {
        return `proyectos/Simulación Digital - Sneider Araque/${fileName}`;
    } else if (project.title.includes('Mercado Municipal')) {
        return `proyectos/Mercado Municipal - Sofia Sanchez/${fileName}`;
    }
    return `proyectos/${fileName}`;
}

// Función para descargar un archivo individual
function downloadSingleFile(projectId, fileIndex) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.files || !project.files[fileIndex]) {
        showMessage('Archivo no disponible', 'error');
        return;
    }
    
    const fileName = project.files[fileIndex];
    
    // Si hay fileData cargado, usar ese contenido
    if (project.fileData && project.fileData[fileIndex] && project.fileData[fileIndex].content) {
        try {
            const fileData = project.fileData[fileIndex];
            const blob = contentToBlob(fileData.content, fileData.type);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showMessage(`Descargando: ${fileName}`, 'success');
            return;
        } catch (error) {
            console.error('Error al descargar archivo desde fileData:', error);
        }
    }
    
    // Si no hay fileData, usar enlace directo al archivo
    try {
        const filePath = getFilePath(project, fileName);
        const a = document.createElement('a');
        a.href = filePath;
        a.download = fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showMessage(`Abriendo: ${fileName}`, 'success');
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        showMessage('Error al descargar el archivo. Asegúrate de usar un servidor web local.', 'error');
    }
}

// Función para descargar todos los archivos como ZIP
async function downloadProjectAsZip(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    if (!window.JSZip) {
        showMessage('Error: JSZip no está disponible', 'error');
        return;
    }
    
    showMessage(`Preparando descarga ZIP de: ${project.title}`, 'success');
    
    try {
        const zip = new JSZip();
        let archivosCargados = 0;
        
        // Agregar cada archivo al ZIP
        if (project.fileData && project.fileData.length > 0) {
            // Si hay fileData cargado, usarlo
            for (let i = 0; i < project.fileData.length; i++) {
                const fileData = project.fileData[i];
                const fileName = fileData.name || project.files[i];
                
                if (fileData.content) {
                    const blob = contentToBlob(fileData.content, fileData.type);
                    const arrayBuffer = await blob.arrayBuffer();
                    zip.file(fileName, arrayBuffer);
                    archivosCargados++;
                }
            }
        }
        
        // Si no hay fileData o faltan archivos, intentar cargarlos desde las rutas
        if (archivosCargados === 0 && project.files && project.files.length > 0) {
            try {
                const urls = project.files.map(fileName => getFilePath(project, fileName));
                const archivos = await loadMultipleFiles(urls);
                
                for (const archivo of archivos) {
                    if (archivo.content instanceof ArrayBuffer) {
                        zip.file(archivo.name, archivo.content);
                        archivosCargados++;
                    }
                }
            } catch (error) {
                console.warn('No se pudieron cargar archivos desde rutas:', error);
            }
        }
        
        // Si aún no hay archivos, crear un README con información
        if (archivosCargados === 0) {
            const profesorInfo = project.profesor ? `Profesor: ${project.profesor}\n` : '';
            zip.file('README.txt', `Proyecto: ${project.title}\nAutor: ${project.author}\n${profesorInfo}Fecha: ${project.date}\n\nDescripción:\n${project.description}\n\nArchivos del proyecto:\n${project.files.join('\n')}\n\nNOTA: Para descargar los archivos reales, necesitas usar un servidor web local.\nLos archivos están en la carpeta: ${getFilePath(project, project.files[0]).replace(/\/[^\/]+$/, '')}`);
        }
        
        // Generar el ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.title.replace(/[^a-z0-9]/gi, '_')}_archivos.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (archivosCargados > 0) {
            showMessage(`ZIP descargado exitosamente con ${archivosCargados} archivo(s): ${project.title}`, 'success');
        } else {
            showMessage(`ZIP descargado con información del proyecto. Usa un servidor web local para descargar los archivos reales.`, 'success');
        }
    } catch (error) {
        console.error('Error al crear ZIP:', error);
        showMessage('Error al crear el archivo ZIP. Asegúrate de usar un servidor web local.', 'error');
    }
}

// Actualizar la función downloadProject
function downloadProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        showMessage(`Descargando archivos de: ${project.title}`, 'success');
        // Llamar a la función de descarga como ZIP
        setTimeout(() => downloadProjectAsZip(projectId), 1000);
    }
}

// ============================================
// FUNCIÓN HELPER: Cargar archivos desde URLs
// ============================================
// Esta función te ayuda a cargar archivos desde URLs para proyectos precargados
// Ejemplo de uso:
// loadFileFromURL('proyectos/proyecto1/archivo.pdf').then(fileData => {
//     // fileData = { name: 'archivo.pdf', content: ArrayBuffer, type: 'application/pdf' }
//     // Úsalo en fileData del proyecto
// });
async function loadFileFromURL(url, fileName = null) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const name = fileName || url.split('/').pop() || 'archivo';
        
        return {
            name: name,
            content: arrayBuffer,
            type: contentType
        };
    } catch (error) {
        console.error('Error al cargar archivo:', error);
        throw error;
    }
}

// Función helper para cargar múltiples archivos desde URLs
// Ejemplo: loadMultipleFiles(['proyectos/p1/a.pdf', 'proyectos/p1/b.jpg'])
async function loadMultipleFiles(urls) {
    try {
        const fileDataPromises = urls.map(url => loadFileFromURL(url));
        return await Promise.all(fileDataPromises);
    } catch (error) {
        console.error('Error al cargar archivos:', error);
        throw error;
    }
}

// Hacer las funciones globales para que funcionen con onclick
window.verDetalleProyecto = verDetalleProyecto;
window.downloadProjectAsZip = downloadProjectAsZip;
window.downloadSingleFile = downloadSingleFile;
window.downloadProject = downloadProject;
window.loadFileFromURL = loadFileFromURL;
window.loadMultipleFiles = loadMultipleFiles;
