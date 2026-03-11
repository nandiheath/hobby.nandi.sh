# hobby.nandi.sh

This is a React application built with **Vite** and **Tailwind CSS (v4)**, designed to showcase hobby projects (miniatures, models), tutorials, and a searchable gallery. It is configured for static hosting on **GitHub Pages** with the custom domain **hobby.nandi.sh**.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher (v25.8.0 used during development)
- **npm**: v10 or higher (v11.11.0 used during development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hobby.nandi.sh.git
   cd hobby.nandi.sh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production Build

Create an optimized production bundle in the `dist/` directory:
```bash
npm run build
```

## 📂 Project Structure

- `src/components/`: Reusable UI components (e.g., `Navbar`).
- `src/pages/`: Main application views:
    - `Home`: Introduction and overview.
    - `Portfolio`: Showcase of finished models and miniatures.
    - `Tutorials`: Searchable list of hobby skills and guides.
    - `Gallery`: Searchable/filterable media gallery for WIP and finished work.
- `src/assets/`: Static assets like images and global styles.
- `public/`: Public assets, including the `CNAME` file for the custom domain.

## 🚢 Deployment

This project is configured to automatically deploy to **GitHub Pages** whenever changes are pushed to the `main` branch via GitHub Actions.

- **URL**: [https://hobby.nandi.sh](https://hobby.nandi.sh)
- **Workflow**: `.github/workflows/deploy.yml`

### Manual Deployment Steps (if needed)

1. Ensure `vite.config.js` has `base: '/'` for root domain hosting.
2. Ensure `public/CNAME` contains `hobby.nandi.sh`.
3. Build the project: `npm run build`.
4. Deploy the `dist/` folder to the `gh-pages` branch or configure GitHub Pages to use the "GitHub Actions" source.

## 🛠️ Built With

- **React**: Frontend library.
- **Vite**: Modern frontend build tool.
- **Tailwind CSS v4**: Utility-first CSS framework.
- **Bootstrap 5**: Component-based CSS framework via `react-bootstrap`.
- **React Router v7**: Client-side routing.
- **Lucide React**: Icon library.
