# Work Items (Jira/GitHub Issues)

## Epic: React Migration (Phase 1)

- [x] Initialize React + Vite project (`npm create vite`) `[TASK-001]`
- [x] Install Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`) `[TASK-001]`
- [x] Configure Tailwind (`npx tailwindcss init -p`) `[TASK-001]`
- [x] Install Firebase SDK (`npm install firebase`) `[TASK-001]`
- [x] Install utilities: `date-fns`, `react-router-dom`, `framer-motion`, `lucide-react`, `chart.js` `[TASK-001]`

### [TASK-002] Port Core Layout

**Priority**: High
**Status**: Done
**Description**: Re-create the main application shell in React.

- [x] Create `App.jsx` with Router
- [x] Create `Sidebar` component
- [x] Create `Header` component
- [x] Migrate `style.css` variables to `tailwind.config.js`

### [TASK-003] Port Dashboard Feature

**Priority**: High
**Status**: Done
**Description**: Implement the main "Hub" view.

- [x] Create `Dashboard` page component
- [x] Create `InsightCard` component
- [x] Implement "Kanban" style columns (Ready, Logged, Internalized)

### [TASK-004] Port Archive Feature

**Priority**: Medium
**Status**: Done
**Description**: Implement the Archive timeline view.

- [x] Create `Archive` page component
- [x] Implement Timeline visualization

### [TASK-005] Port Statistics Feature

**Priority**: Low
**Status**: Done
**Description**: Implement the Statistics dashboard.

- [x] Create `Statistics` page component
- [x] Implement Charts (Chart.js wrapper)
- [x] Implement Heatmap component

### [TASK-006] Data Layer & State

**Priority**: Critical
**Status**: Done
**Description**: Handle data persistence.

- [x] Setup Firebase config
- [x] Create `InsightContext` or Store
- [x] Implement Service layer for DB operations
- [x] (Fallback) Implement localStorage adapter if keys missing
