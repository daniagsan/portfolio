# Daniel Aguilera — Interactive Portfolio

A high-performance, neo-brutalist interactive portfolio designed to showcase the intersection of **Software Engineering** and **Product/Brand Design**. Built with React, Vite, and Tailwind CSS v4.

## 🏗️ The Vision

This project isn't just a resume; it's a technical demonstration of **System Thinking**. It utilizes a "Hardened Design" aesthetic—characterized by heavy borders, sharp 4x4 shadows, and high-contrast typography—to mirror the robustness of backend engineering with the precision of brand identity.

### Key Interactive Features:
- **Magical Mode Switch**: Toggles the entire project context between **[SYSTEMS_BUILT]** (Engineering) and **[BRAND_SYSTEMS]** (Design).
- **Project Cube**: A custom-built, 3x3 Rubik-style interactive 3D component with physics-based rotation, drag-to-pin mechanics, and context-aware faces.
- **Autonomous Floating Bots**: Collision-aware agents (Claude & Gemini) that roam the tech stack section, reacting to boundaries and user interaction.
- **Snap-Mandatory Navigation**: A seamless full-screen vertical scrolling experience with lazy-loaded section modules.
- **PDF-to-Web Viewer**: Custom image viewer for high-fidelity brand manuals and identity systems.

## 🛠️ Tech Stack

### Frontend & UI
- **React 19**: Leveraging `Suspense` and `lazy` for optimal performance and code splitting.
- **Vite**: Ultra-fast HMR and build pipelines.
- **Tailwind CSS v4**: Utilizing the new CSS-first configuration and `@theme` directives.
- **Framer Motion**: Powering complex layout transitions, 3D transformations, and spring-based physics.
- **Lucide React**: Minimalist, semantic iconography.

### System Architecture (Represented in Data)
- **Languages**: Python (Django), Java, TypeScript.
- **Infrastructure**: Docker, PostgreSQL, Redis, Celery (Distributed Tasks).
- **AI**: Gemini 1.5 Flash, Claude API, LangChain orchestration.

## 📂 Project Structure

```bash
src/
├── components/
│   ├── sections/      # Portfolio modules (Hero, Tech, Experience, etc.)
│   │   └── projects/  # The complex 3D ProjectCube and ImageViewer
│   └── ui/            # Reusable Neo-brutalist atoms (Switch, SectionHeader)
├── data/              # Centralized portfolio.ts (The single source of truth)
├── hooks/             # Custom physics and interaction hooks (useFloatingBot)
├── lib/               # Animation variants and shared utilities
└── assets/            # Tech icons and brand manual assets
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/daniagsan/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run in development**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🎨 Design Philosophy: "Neo-Brutalist Engineering"
The design language is built on three pillars:
1.  **Rawness**: Visible "grid" logic and raw HTML/CSS aesthetics.
2.  **Robustness**: Heavy `border-black` and `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` to represent solid infrastructure.
3.  **Interactivity**: High-feedback UI (hover lifts, active state transforms) to ensure the user feels the "weight" of the digital objects.

---

**Built with 🖤 by Daniel Aguilera**
[LinkedIn](https://www.linkedin.com/in/daniagsan/) | [GitHub](https://github.com/daniagsan)
