# 📋 Instrucciones para Usar un Servidor Web Local

Para que las descargas de archivos funcionen correctamente, necesitas usar un servidor web local. Aquí tienes varias opciones:

## 🚀 Opción 1: Python (Más Fácil)

Si tienes Python instalado:

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta uno de estos comandos:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Abre tu navegador y ve a: `http://localhost:8000`

## 🌐 Opción 2: Node.js (http-server)

Si tienes Node.js instalado:

1. Instala http-server globalmente:
```bash
npm install -g http-server
```

2. En la carpeta del proyecto, ejecuta:
```bash
http-server -p 8000
```

3. Abre tu navegador y ve a: `http://localhost:8000`

## 🔧 Opción 3: Live Server (VS Code)

Si usas Visual Studio Code:

1. Instala la extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 📁 Opción 4: XAMPP / WAMP

Si tienes XAMPP o WAMP instalado:

1. Copia la carpeta del proyecto a `htdocs` (XAMPP) o `www` (WAMP)
2. Abre tu navegador y ve a: `http://localhost/repositoriodigital_SE`

## ⚠️ Importante

- **NO** abras el archivo `index.html` directamente desde el explorador de archivos (file://)
- **SÍ** usa siempre un servidor web local (http://localhost)
- Esto es necesario porque los navegadores bloquean el acceso a archivos locales por seguridad

## ✅ Verificación

Una vez que tengas el servidor corriendo:
1. Abre `http://localhost:8000` en tu navegador
2. Ve a la sección "Repositorios"
3. Haz clic en un proyecto
4. Intenta descargar un archivo individual o el ZIP completo

Si funciona, verás que los archivos se descargan correctamente.

