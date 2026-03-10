# 🥁 Generador de Beats

Un secuenciador de 16 pasos interactivo y generador de ritmos construido para la web.

---

## 📖 Sobre el proyecto

Este proyecto fue desarrollado como parte de mi aprendizaje en desarrollo web. El objetivo principal es practicar programación y experimentar con el manejo de la Web Audio API para la generación de ritmos musicales directamente en el navegador, aplicando al mismo tiempo conceptos avanzados de estado global y diseño de interfaces modernas.

---

## ✨ Características

- **Generador de ritmos:** Secuenciador de 16 pasos clásico tipo caja de ritmos.
- **Controles de reproducción:** Opciones para reproducir, pausar y detener el beat, además de control de Tempo (BPM).
- **Interfaz visual e interactiva:** Diseño moderno, oscuro estilo "premium" con feedback visual en cada paso.
- **Múltiples sonidos:** Selección y configuración de distintos instrumentos (kick, snare, hi-hats, etc.).
- **Soporte multi-idioma:** Interfaz disponible en español e inglés.
- **Diseño responsive:** Adaptable a diferentes tamaños de pantalla y dispositivos.

---

## 🛠️ Tecnologías utilizadas

- **JavaScript / TypeScript** - Lenguaje principal y tipado.
- **React** - Biblioteca para la interfaz de usuario.
- **Next.js** - Framework de React.
- **Tailwind CSS** - Estilos utilitarios para un diseño rápido y moderno.
- **Tone.js (Web Audio API)** - Motor para la síntesis y control de audio en el navegador.
- **Zustand** - Manejo del estado global de la aplicación.

---

## 🚀 Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/generador-de-beats.git
   ```

2. Entra a la carpeta del proyecto:

   ```bash
   cd generador-de-beats
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 🎮 Uso

1. **Selecciona los sonidos:** Haz clic en las celdas de la cuadrícula (grid) para activar o desactivar un instrumento en un paso específico del compás.
2. **Ajusta el Tempo:** Usa el control de BPM para modificar la velocidad de reproducción a tu gusto.
3. **Reproduce tu patrón:** Pulsa el botón de "Play" para escuchar la secuencia de ritmos que has creado.
4. **Experimenta:** Cambia los sonidos en tiempo real y observa cómo los indicadores visuales siguen el ritmo actual.

---

## 📂 Estructura del proyecto

- `/app` - Contiene la configuración de Next.js, rutas principales y vista global de la aplicación.
- `/components` - Componentes reutilizables de React (PlayButton, BeatGrid, TempoControl, etc.).
- `/store` - Archivos para la gestión del estado global utilizando Zustand.
- `/lib` - Archivos de configuración o funciones utilitarias (como traducciones para multi-idioma).
- `/types` - Definiciones de tipado TypeScript para el proyecto.

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado específicamente con el propósito de practicar y potenciar mis habilidades en:

- Desarrollo web moderno (React, Next.js).
- Lógica de programación estructurada.
- Manejo de audio en el navegador usando Web Audio API (Tone.js).
- Gestión de estado global complejo optimizado con Zustand.
- Creación de interfaces interactivas y atractivas con Tailwind CSS.

---

## 💡 Posibles mejoras futuras

- Añadir más paquetes de sonido e instrumentos editables.
- Funcionalidad para guardar y cargar tus beats favoritos en el navegador o en la nube.
- Opción para exportar el beat actual a un archivo de audio (.wav o .mp3).
- Diferentes estilos visuales o temas seleccionables.
- Mapeo del teclado para reproducir sonidos en vivo de madera ininterrumpida.

---

## ✍️ Autor

**José**  
_Desarrollador en aprendizaje_
