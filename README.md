### Mini Competition Dashboard (Frontend)

A Binance-inspired dark-theme React + TypeScript frontend for a Mini Competition Dashboard. Backend is not ready; this project ships with a clean, fully-typed mock API you can later replace with real endpoints.

#### Tech Stack
- React (functional components + hooks)
- TypeScript
- React Router v6
- Styling: CSS (Binance-inspired: dark background + yellow accent `#F0B90B`)
- Mock API utilities (in-memory)

#### Features
- Authentication pages: `/register`, `/login`
  - Register → mock `POST /register` → `{ success: true }`
  - Login → mock `POST /login` → `{ token: "mock-jwt-token-<email-b64>" }`
  - On success: token saved to `localStorage` and redirect to `/dashboard`
  - On error: toast message
- Dashboard `/dashboard`
  - Fetch list: mock `GET /competitions`
  - Card view with name, entry fee, prize pool, participants, Join button
  - Loading + error states; retry button
  - Join: mock `POST /competitions/{id}/join` → success or "Already joined"
  - On success: toast + button becomes "Joined" (disabled), participants +1
  - Search filter + simple pagination
- Logout in the header (clears token, redirects to `/login`)
- Global loading spinner, toast notifications, and an Error Boundary
- Fully typed API/client and data models

#### Project Structure
```
src/
  api/
    apiClient.ts        # API wrapper (uses mockApi now)
    auth.ts             # register/login wrappers
    competitions.ts     # competitions list/join
  components/
    Button.tsx
    CompetitionCard.tsx
    ErrorBoundary.tsx
    Header.tsx
    Spinner.tsx
    Toast.tsx
    styles.css          # Theme + component styles
  hooks/
    useAuth.tsx         # Auth context + actions
  pages/
    Dashboard.tsx
    Login.tsx
    Register.tsx
  router/
    AppRouter.tsx       # Routing + protected route
  types/
    Competition.ts      # Types and ApiResponse
  utils/
    events.ts           # Global loading/toast events
    mockApi.ts          # In-memory mock endpoints
```

#### Mock API Details (utils/mockApi.ts)
- Endpoints:
  - `POST /register` → `{ success: true }` or `{ success: false, message }`
  - `POST /login` → `{ token: string }` or `{ success: false, message }`
  - `GET /competitions` → `Competition[]` (adds `joined` computed from token)
  - `POST /competitions/:id/join` → `{ success: true }` or `{ success: false, message }`
- Auth: expects `Authorization: Bearer <token>` for joining and to compute `joined` states.
- Storage: in-memory objects inside the browser tab (not persisted across reloads).

To replace with a real backend later:
- Swap calls inside `src/api/apiClient.ts` from `mockFetch` to `fetch`/`axios`.
- Keep the same method signatures in `src/api/*.ts` so the app code remains unchanged.

#### Styling & Theme
- Dark/black background, yellow accent `#F0B90B`.
- Clean cards, bold headings, rounded corners, modern crypto look.
- Applied globally via `src/components/styles.css` and used by all pages/components.

#### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open http://localhost:3000

#### Usage
- Register a new user at `/register`, then login at `/login`.
- After login you will be redirected to `/dashboard`.
- Use the search field to filter competitions and pagination controls to navigate.
- Click Join on any competition; subsequent attempts show an error toast (Already joined).
- Use Logout in the header to clear your session.

#### Notes
- This project was bootstrapped with CRA (Create React App) and updated for React Router v6.
- Global loading and toasts are handled via a small event utility in `src/utils/events.ts`.
- The error boundary wraps the entire app and shows a friendly error card on failures.
