# 📚 Repositorio Digital

## 🎯 Descripción

Plataforma web para la gestión, almacenamiento y difusión de proyectos académicos. Permite a estudiantes y profesores compartir trabajos de manera organizada y accesible.

## ✨ Características Principales

### 🔐 Autenticación
- Registro e inicio de sesión de usuarios
- Gestión de perfiles por carrera
- Sesiones persistentes

### 📁 Gestión de Proyectos
- Subida de proyectos con formulario completo
- Múltiples formatos de archivo soportados
- Sistema de palabras clave
- Categorización por carrera, semestre, tipo y sede
- Campo de Profesor (opcional)
- Enlace del proyecto (opcional)

### 🔍 Búsqueda y Filtros
- Búsqueda en tiempo real por título, descripción y palabras clave
- Filtros por carrera, semestre, tipo de proyecto y sede
- Resultados instantáneos

### 📥 Descarga de Archivos
- Descarga individual de archivos
- Descarga completa del proyecto en formato ZIP
- Pre-carga de proyectos con archivos asociados

### 🖼️ Galería de Imágenes
- Visualización automática de imágenes del proyecto en formato cards
- Detección automática de archivos de imagen (PNG, JPG, JPEG, GIF, WEBP, SVG)
- Cards con overlay interactivo y descarga individual

### 🎨 Interfaz de Usuario
- Diseño responsive optimizado para móviles, tablets y desktop
- Tema claro y oscuro
- Scroll automático al inicio al abrir proyectos
- Navegación intuitiva entre secciones
- Animaciones suaves

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsive con variables CSS
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **JSZip** - Generación de archivos ZIP
- **Font Awesome** - Iconografía

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones recientes)
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1200px+)

## 🚀 Instalación

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. Para descargas de archivos, se recomienda usar un servidor local (ver `INSTRUCCIONES_SERVIDOR.md`)

### Estructura de Archivos
```
repositoriodigital_SE/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── main.js             # Lógica adicional
├── proyectos/          # Carpeta con proyectos pre-cargados
│   ├── Base de Datos - Sneider Araque y Freddy Aleman/
│   ├── Serv. Comunitario/
│   ├── Simulación Digital - Sneider Araque/
│   └── Mercado Municipal - Sofia Sanchez/
└── README.md           # Documentación
```

## 📋 Funcionalidades Detalladas

### Subida de Proyectos
- Título, carrera, semestre, materia/tipo
- Año, sede, palabras clave, descripción
- Campo de Profesor (opcional)
- Enlace del proyecto (opcional)
- Múltiples archivos (PDF, ZIP, RAR, imágenes, etc.)

### Visualización de Proyectos
- Cards con información completa
- Página de detalle con:
  - Información del proyecto
  - Sección de enlace (si aplica)
  - Descripción completa
  - Galería de imágenes en cards
  - Palabras clave
  - Lista de archivos descargables

### Descarga de Archivos
- Descarga individual por archivo
- Descarga completa en ZIP con todos los archivos
- Soporte para proyectos pre-cargados

## 🎨 Personalización

- **Tema Claro**: Azul oscuro con fondo blanco
- **Tema Oscuro**: Fondo oscuro con acentos azules
- Cambio de tema persistente en Local Storage

## 📈 Características Técnicas

- Diseño Mobile First
- CSS Grid y Flexbox para layouts
- Variables CSS para temas dinámicos
- Local Storage para persistencia
- Carga asíncrona de archivos
- Generación de ZIP en el cliente

## 🔧 Requisitos para Descargas

Para que las descargas funcionen correctamente, es necesario usar un servidor web local debido a restricciones de seguridad del navegador. Consulta `INSTRUCCIONES_SERVIDOR.md` para más detalles.

## 📄 Licencia

Proyecto desarrollado para uso académico. Todos los derechos reservados.

---

*Repositorio Digital - Versión Beta*
