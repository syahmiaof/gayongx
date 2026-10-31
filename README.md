<div align="center">
  <h1>GayongX — PSSGM Perak Digital Ecosystem</h1>
  <p><strong>Connected digital ecosystem, cultural heritage portal & AI assistant for Silat Seni Gayong Perak.</strong></p>

  <p>
    <a href="https://gayongx.syahmiaof.my"><img src="https://img.shields.io/badge/Demo-Live-60E1B5?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="Demo Live" /></a>
    <a href="https://github.com/syahmiaof/gayongx"><img src="https://img.shields.io/badge/Source-GitHub-60E1B5?style=for-the-badge&logo=github&logoColor=60E1B5&labelColor=101713" alt="GitHub Source" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-60E1B5?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="License MIT" /></a>
    <a href="https://syahmiaof.my"><img src="https://img.shields.io/badge/Author-syahmiaof-60E1B5?style=for-the-badge&logo=readme&logoColor=60E1B5&labelColor=101713" alt="Author syahmiaof" /></a>
  </p>
</div>

![GayongX public website](https://raw.githubusercontent.com/syahmiaof/syahmiaof/main/public/images/gayongx-website.jpg)

> **Ecosystem Status**: Active development. The public portal, interactive UI, and Tuah AI assistant are fully implemented; wider enterprise modules (gelanggang fleet operations, attendance, and certified syllabus exams) follow a staged roadmap.

---

## 📌 Direction & Vision

**GayongX** is an end-to-end digital ecosystem conceptualized for **Pertubuhan Silat Seni Gayong Malaysia (PSSGM) Negeri Perak**. It bridges centuries-old martial arts heritage with cutting-edge web engineering, responsive interaction design, and intelligent AI assistance:

1. **Public Identity & Heritage**: Introducing Silat Seni Gayong to the global audience with high-fidelity visuals, historical archives, and custom editorial design.
2. **Tuah Bot AI Assistant**: Digital syllabus guide powered by Google's modern `@google/genai` SDK, offering instant answers on techniques, philosophy, and rank belt progressions.
3. **Gelanggang & Operational Management**: Centralized member rosters, training schedules, and digital grading tracking.
4. **Inter-connected Platform Architecture**: Direct synergy with sister repositories:
   - **[GayongX Athlete Analytics](https://github.com/syahmiaof/gayongx-athlete-analytics)**: Real-time biometric and performance metrics for sparring athletes.
   - **[GayongX Warisan](https://github.com/syahmiaof/gayongx-warisan)**: Interactive 2D heritage combat game built with Phaser 3 and TypeScript.

---

## 🏛️ Ecosystem Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│                   GayongX Unified Client                         │
│       React 19 + TypeScript + Vite 8 + Tailwind CSS v4           │
└───────────────────────────────┬──────────────────────────────────┘
                                │
        ┌───────────────────────┼────────────────────────┐
        ▼                       ▼                        ▼
┌──────────────────┐  ┌──────────────────┐     ┌──────────────────┐
│ GSAP & Motion UI │  │ Tuah Bot AI Core │     │ Multi-Role Portal│
│ Smooth Animations│  │ (@google/genai)  │     │ - Public Member  │
│ Responsive Flow  │  │ Syllabus Engine  │     │ - Jurulatih      │
└──────────────────┘  └──────────────────┘     │ - Administrator  │
                                               └──────────────────┘
```

---

## 🗺️ Module Roadmap

| Module | Purpose & Scope | Implementation Status |
|---|---|---|
| **Public Portal** | Association overview, heritage history, rank belt matrix, and public enquiries. | ✅ Implemented & Deployed |
| **Tuah Bot AI** | Generative conversational assistant for syllabus queries and training etiquette. | ✅ Implemented (`@google/genai`) |
| **Role Picker & Demo** | Interactive live role-switcher (Public, Pelatih, Jurulatih, Pentadbir). | ✅ Implemented |
| **Gelanggang Operations** | Training centre directory, class schedules, and attendance check-in. | 🔄 In Active Development |
| **Grading & Certification** | Belt grading rubrics, examination records, and verification ledgers. | 📋 Planned Roadmap |
| **Athlete Analytics** | Combat performance, reaction speed, and biometric data tracking. | 🔗 Connected Sub-prototype |
| **GayongX Warisan** | 2D martial arts heritage game with syllabus move execution. | 🔗 Connected Sub-prototype |

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript 5.9, Vite 8 |
| **Styling & Design** | Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React |
| **Motion & Micro-interactions** | GSAP 3.15, `@gsap/react`, Motion 12 |
| **AI Integration** | Google GenAI SDK (`@google/genai` 2.4.0) |
| **Charts & Visuals** | Recharts, SVG Canvas |
| **Service & Deployment** | Express, Node.js, Vercel Edge Hosting, GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or compatible package manager

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/syahmiaof/gayongx.git
cd gayongx/pssgm-perak-digital-ecosystem

# Install dependencies
npm install

# Run typechecking and linting
npm run lint

# Build production bundle
npm run build

# Start local development server
npm run dev
```

---

## 🛡️ Verification & Quality Checks

- **Lint / Typecheck**: `npm run lint` (`tsc --noEmit`)
- **Production Build**: `npm run build` (`vite build`)
- **Cross-Platform Clean**: `npm run clean` (`node -e "fs.rmSync('dist', {recursive:true,force:true}); fs.rmSync('server.js', {force:true})"`)
- **Automated CI**: GitHub Actions workflow (`.github/workflows/ci.yml`) validates lint and production build on every push and PR to `main`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
(c) 2026 Muhammad Syahmi ([syahmiaof](https://syahmiaof.my)).
