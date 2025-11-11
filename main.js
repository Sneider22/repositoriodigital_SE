// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LÓGICA DE LA VENTANA MODAL ---
    const modal = document.getElementById("projectModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.querySelector(".close-btn");

    // Abrir modal
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Cerrar modal con la 'X'
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar modal si se hace clic fuera de ella
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- 2. SIMULACIÓN DE INICIO DE SESIÓN ---
    const loginBtn = document.getElementById("loginBtn");
    let isLoggedIn = false;

    loginBtn.addEventListener("click", () => {
        isLoggedIn = !isLoggedIn; // Invierte el estado
        if (isLoggedIn) {
            loginBtn.textContent = "Perfil (Conectado)";
            loginBtn.style.backgroundColor = "#28a745"; // Verde
            openModalBtn.style.display = "inline-block"; // Muestra el botón de añadir
            alert("¡Inicio de sesión simulado! Ahora puedes añadir proyectos.");
        } else {
            loginBtn.textContent = "Iniciar Sesión";
            loginBtn.style.backgroundColor = "var(--secondary-color)"; // Color original
            openModalBtn.style.display = "none"; // Oculta el botón de añadir
        }
    });

    // --- 3. GESTIÓN DEL FORMULARIO PARA AÑADIR PROYECTOS ---
    const projectForm = document.getElementById("projectForm");
    const repositoryGrid = document.getElementById("repository-grid");

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault(); // ¡MUY IMPORTANTE! Evita que la página se recargue

        // Recolectar datos del formulario
        const title = document.getElementById("projectTitle").value;
        const description = document.getElementById("description").value;
        const career = document.getElementById("career").options[document.getElementById("career").selectedIndex].text;
        const year = document.getElementById("publishYear").value;
        const subjectType = document.getElementById("subjectType").options[document.getElementById("subjectType").selectedIndex].text;
        const coverPhotoInput = document.getElementById("coverPhoto");

        let coverPhotoUrl = "https://via.placeholder.com/400x250.png?text=Nuevo+Proyecto";

        // Si el usuario subió una foto, crear una URL temporal para mostrarla
        if (coverPhotoInput.files && coverPhotoInput.files[0]) {
            coverPhotoUrl = URL.createObjectURL(coverPhotoInput.files[0]);
        }
        
        // Crear la nueva tarjeta (card)
        const newCard = document.createElement("div");
        newCard.classList.add("project-card");
        
        newCard.innerHTML = `
            <img src="${coverPhotoUrl}" alt="Portada de ${title}">
            <div class="card-content">
                <h3>${title}</h3>
                <p class="card-description">${description}</p>
                <div class="tags">
                    <span class="tag">${career}</span>
                    <span class="tag">${year}</span>
                    <span class="tag">${subjectType}</span>
                </div>
                <a href="#" class="card-link">Ver más</a>
            </div>
        `;

        // Añadir la nueva tarjeta al principio del grid
        repositoryGrid.prepend(newCard);

        // Limpiar el formulario y cerrar el modal
        projectForm.reset();
        modal.style.display = "none";
        
        alert("¡Proyecto añadido con éxito!");
    });

    // --- 4. LÓGICA DEL BUSCADOR ---
    const searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("keyup", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const projectCards = repositoryGrid.getElementsByClassName("project-card");

        // Recorrer todas las tarjetas y ocultar las que no coincidan
        Array.from(projectCards).forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector(".card-description").textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "flex"; // 'flex' porque así están definidas en el CSS
            } else {
                card.style.display = "none"; // Ocultar
            }
        });
    });

    // --- 5. NAVEGACIÓN SUAVE (SMOOTH SCROLL) ---
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el salto brusco
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth', // Animación de scroll
                block: 'start' // Alinear al inicio de la sección
            });
        });
    });

});