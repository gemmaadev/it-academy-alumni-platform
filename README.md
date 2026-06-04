<div align="center">

<img src="public/logos/xlumni-logo.svg" alt="XLumni Logo" width="220" />


### Alumni Networking Platform for IT Academy Barcelona

Connect with fellow graduates, discover opportunities and grow your professional network.

[🚀 Live Demo](https://it-alumni-platform.netlify.app/)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

</div>

## Preview

### 🖥️ Desktop

| Login | Home page                            | Networking                            | Job opportunities                        |
| ------ | ------------------------------- | ------------------------------------- | ------------------------------- |
| ![Login page](/public/screenshots/desk-login.png)  | ![Home Screen](/public/screenshots/desk-home.png) | ![Networking page](/public/screenshots/desk-networking.png) | ![Jobs page](/public/screenshots/desk-jobs.png) |

### 📱 Mobile

| Splash                              | Login                              | Home                              | Networking                              | Job opportunities                         |
| ----------------------------------- | ---------------------------------- | --------------------------------- | --------------------------------------- | --------------------------------- |
| ![](/public/screenshots/mobile-splash.png) | ![](/public/screenshots/mobile-login.png) | ![](/public/screenshots/mobile-home.png) | ![](/public/screenshots/mobile-networking.png) | ![](/public/screenshots/mobile-jobs.png) |


## Core features

### Alumni network
- Browse alumni profiles fetched from a live mock API
- Real-time search by name, position and location
- Responsive card layout adapted for mobile and desktop
- Recent activity feed and alumni suggestions
### Job board
- Dynamic job listings fetched from a live mock API
- Filter by industry and experience level (mobile)
- Search by title, company and location
- Adapted layout for mobile and desktop
### Mobile experience
- Welcome splash page with call to action
- Mobile-first responsive design
- Bottom navigation bar with active state
- Native-feeling SPA navigation (no page reloads)



## Tech stack

| Category        | Technology                                             |
| --------------- | ------------------------------------------------------ |
| Bundler         | [Vite](https://vitejs.dev/)                            |
| Language        | TypeScript (Vanilla)                                   |
| Styles          | Native CSS (Custom Properties, Nesting)                |
| Mock API        | [My JSON Server](https://my-json-server.typicode.com/) |
| Testing         | [Vitest](https://vitest.dev/)                          |
| Version Control | Git + GitHub (Git Flow)                                |
| Deployment      | Netlify                                                |

---

## Getting started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/gemmaadev/it-academy-alumni-platform.git

# 2. Navigate to the project directory
cd it-academy-alumni-platform

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Testing

```bash
# Run unit tests
npm run test
```

Tests cover the alumni filtering logic based on **Gherkin** scenarios.

---

## Project structure

```
src/
├── apiServices/       # External API calls
├── components/        # HTML components (header, footer, bottom-nav)
├── logic/             # Page logic (TypeScript)
├── pages/             # HTML views
├── styles/            # CSS per component and page
├── tests/             # Unit tests and Gherkin scenarios
└── types/             # TypeScript interfaces
```

---

## API

Data is fetched from a mock API hosted on **My JSON Server**:

- 👥 Alumni: `https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/alumni`
- 💼 Jobs: `https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/jobs`
- 📰 Activity: `https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/activity`

---

## Author

**Gemma Maeso** · [@gemmaadev](https://github.com/gemmaadev)

Project developed as part of the **IT Academy** program by Barcelona Activa.

---
