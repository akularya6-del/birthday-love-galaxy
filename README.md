<div align="center">

# birthday-love-galaxy

**An immersive 3D astronomical web celebration powered by React 19, Three.js, React Three Fiber, GSAP, and custom WebGL shaders.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat-square&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=flat-square&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

---

## 🌌 Overview

**birthday-love-galaxy** is a visual web experience that transforms a personal birthday celebration into an interactive celestial voyage. Visitors navigate through dynamic starfields, planetary orbits, interactive constellation messages, and reactive post-processing visual shaders.

Built with cutting-edge 3D web technologies including React Three Fiber, React Three Drei, GSAP timeline sequencing, and Lenis smooth scrolling.

---

## ✨ Features

- **3D Celestial Canvas**: Dynamic particle starfields, procedural nebulae, and interactive orbital bodies.
- **Scroll-Driven Storytelling**: Cinematic transitions synchronized with smooth scrolling powered by Lenis and GSAP.
- **Custom Shaders**: WebGL post-processing passes with bloom, depth-of-field, and chromatic aberration effects.
- **Responsive & Performant**: Highly optimized render loops using React Three Fiber with Oxlint static analysis.

---

## 🏗️ Architecture & Tech Stack

```
birthday-love-galaxy/
├── src/
│   ├── App.jsx             # Root layout and 3D Canvas container
│   ├── main.jsx            # Entry mount point
│   ├── components/         # 3D meshes, starfields, lighting, and HUD overlays
│   ├── hooks/              # Custom animation and viewport hooks
│   ├── styles/             # Modular CSS and shader definitions
│   └── utils/              # Math helpers and celestial coordinate converters
├── public/                 # Static vector assets
├── package.json            # React 19 + Three.js dependencies
└── vite.config.js          # Fast HMR Vite build configuration
```

---

## 🚀 Quickstart

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akularya6-del/birthday-love-galaxy.git
   cd birthday-love-galaxy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
