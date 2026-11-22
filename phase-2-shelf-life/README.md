# ShelfLife: Reading Tracker and Discovery

ShelfLife is a single-page React app for readers. You can search millions of books from the [Open Library](https://openlibrary.org/developers/api) API, open a book to see its description, subjects and editions, and sort books onto three shelves: **Want to Read**, **Reading** and **Finished**. The app also shows reading statistics and lets you set a personal reading goal. Your shelves, reviews, goal and theme are saved in the browser, so they are still there when you reload the page.

**ISTE.340.600 Client Programming, Fall 2026, Group 3 (RIT Dubai)**

| Member | Student ID |
|---|---|
| Jamile Obeid | 762004935 |
| Zara Mahreen | 768009316 |
| Nihar Gandhi | 768009162 |
| Kripa Susan Jacob | 405008096 |

---

## Features

| Page | Route | What it does |
|---|---|---|
| **Discover** (home) | `/` | Search by title, author or subject from a single search box. Results update as you type. Filter by genre (Fiction, Mystery, Poetry and more). Results come 24 at a time with a **Load More** button. |
| **Book Details** | `/books/:id` | Large cover, description, subjects and a list of editions. A shelf selector adds the book to a shelf, and you can leave a star rating and a written review (up to 500 characters). |
| **My Shelves** | `/shelves` | Your books, grouped by shelf. Move a book to another shelf or remove it. |
| **Statistics** | `/statistics` | Total books, books finished, books you want to read, top genre, a genre donut chart and a bar chart of books per publication decade. |
| **Reading Goal** | `/reading-goal` | A validated form for your name, a goal of 1 to 365 books, a timeframe (month or year) and an optional motivation of up to 250 characters. Each field shows its own error message. |

Every page:
- shows **skeleton loading cards** while data is loading
- shows a **specific error message** with a **Try Again** button if the network is down, Open Library limits requests or the server fails
- shows a **friendly empty state** when there is nothing to show
- works on phones and laptops (the navigation turns into a hamburger menu on small screens)
- supports a **light and dark theme**, which is remembered between visits

---

## Prerequisites

| Tool | Version | Check with |
|---|---|---|
| [Node.js](https://nodejs.org/) | **20.19 or newer**, or **22.12 or newer**. Vite 8 requires this. | `node -v` |
| npm | Comes with Node.js | `npm -v` |
| Git | Any recent version | `git --version` |
| A modern browser | Chrome, Edge, Firefox or Safari | |
| Internet connection | The app fetches live data from Open Library | |

**You do not need an API key or any environment variables.** Open Library's API is free and public. There is no `.env` file, and no keys are in the repository.

---

## Install and run

```bash
# 1. Clone the repository
git clone https://github.com/jamileeobeid/ShelfLife.git

# 2. Go into the app folder (package.json is here, not in the repository root)
cd ShelfLife/phase-2-shelf-life

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open the address Vite prints in the terminal, usually **http://localhost:5173**.

To stop the server, press `Ctrl + C` in the terminal.

### Other commands

All of these run from the `phase-2-shelf-life` folder.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds an optimised production version into `dist/` |
| `npm run preview` | Serves the `dist/` build locally so you can check it (run `npm run build` first) |
| `npm run lint` | Runs ESLint over the project |

---

## Tech stack

- **React 19** with function components and hooks (`useState`, `useEffect`, `useReducer`, `useRef`, `useContext`)
- **Vite 8** for the development server and production builds
- **React Router 7** for client-side routing between five pages, with no full page reloads
- **Open Library API**, fetched with `async`/`await`
  - Search: `https://openlibrary.org/search.json`
  - Work details: `https://openlibrary.org/works/{id}.json`
  - Editions: `https://openlibrary.org/works/{id}/editions.json`
  - Covers: `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg`
- **Plain CSS files**, one per component or page, with CSS variables for the light and dark themes
- **localStorage** to save data between visits

---

## Project structure

```
phase-2-shelf-life/
├── index.html
├── package.json
├── vite.config.js
├── public/                  # Placeholder images (missing covers, empty states)
└── src/
    ├── main.jsx             # Entry point
    ├── App.jsx              # Router and route definitions
    ├── index.css            # Global styles and light/dark theme variables
    ├── components/          # Reusable UI pieces
    │   ├── NavBar.jsx           # Navigation, hamburger menu, theme toggle
    │   ├── Layout.jsx           # Shared page layout (NavBar + <Outlet />)
    │   ├── SearchBar.jsx        # Search input on Discover
    │   ├── Book3DItem.jsx       # 3D book card in the Discover grid
    │   ├── BookInfo.jsx         # Cover and info block on Book Details
    │   ├── ShelfSelect.jsx      # Shelf dropdown
    │   ├── BookReview.jsx       # Star rating and review
    │   ├── SubjectList.jsx, EditionList.jsx
    │   ├── ShelfSidebar.jsx, BookList.jsx, ShelfBookCard.jsx
    │   ├── StatCard.jsx, GenreDonut.jsx
    │   ├── Skeleton.jsx         # Loading placeholders
    │   ├── ErrorState.jsx       # Error messages with Try Again
    │   ├── EmptyState.jsx       # Empty and no-results messages
    │   └── Button.jsx
    ├── pages/               # One file per route
    │   ├── Discover.jsx
    │   ├── BookDetails.jsx
    │   ├── MyShelves.jsx
    │   ├── ShelfStatistics.jsx
    │   └── ReadingGoal.jsx
    ├── state/               # Shared global state
    │   ├── BookContext.jsx      # Context provider and useBooks() hook
    │   └── booksReducer.js      # Reducers for shelves and reviews
    └── services/
        └── openLibrary.js       # All API calls, error handling, caching
```

---

## How it works

### Shared state (Context)
`BookContext` wraps the whole app. It holds the user's shelved books and reviews in two `useReducer` reducers and makes them available through the `useBooks()` hook. Book Details, My Shelves and Statistics all read and update this same state.

### Persistence (localStorage)
| Key | What it stores |
|---|---|
| `shelflife-books` | Books on your shelves and which shelf each one is on |
| `shelflife-reviews` | Your star ratings and reviews |
| `shelflife-reading-goal` | Your saved reading goal |
| `shelflife-theme` | `light` or `dark` |

Every read and write is wrapped in `try`/`catch`. If storage is blocked, for example in some private-browsing modes, or the saved data is corrupted, the app still works and starts with empty shelves.

### API layer (`services/openLibrary.js`)
- All requests go through a single `fetchJSON()` helper. It turns failures into error codes: `NETWORK`, `RATE_LIMIT` (HTTP 429), `SERVER` and `PARSE`. `ErrorState` uses each code to show the matching message.
- Requests are spaced at least 340 ms apart so Open Library doesn't rate-limit the app.
- Discover waits 350 ms after you stop typing before it searches. It uses an `AbortController` to cancel older requests, so an earlier search can't overwrite newer results.
- Search results are cached in memory. Going back to an earlier search or genre is instant.
- Books with missing data still display. A missing title, author or year shows as "Unknown", and a missing cover shows a placeholder image.

---

## Testing the loading, error and empty states

1. **Loading:** Open Discover, or type a search. Grey skeleton cards appear while the request is running.
2. **Error:** Open DevTools (F12), go to **Network**, choose **Offline** and run a new search. Open a new search term rather than an old one, because cached results still load offline. The "Lost in the stacks" message appears. Switch back to **No throttling** and click **Try Again**.
3. **Empty:** Search for nonsense such as `xqzwplk`. The no-results message appears. Shelves and Statistics show their own empty states before you add any books.
4. **Form validation:** On Reading Goal, submit the empty form, then try a goal of `0` or `500`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js (it includes npm) and reopen your terminal. |
| `npm run dev` says it can't find `package.json` | You are in the wrong folder. Run `cd phase-2-shelf-life` first. |
| An error about Node version, or `Cannot find native binding` | Update Node.js to 20.19 or newer, or 22.12 or newer. Then delete `node_modules` and `package-lock.json` and run `npm install` again. |
| Port 5173 is already in use | Vite will try the next free port automatically. Use the address it prints. |
| Books don't load | Check your internet connection. Open Library is sometimes slow, so wait a moment and click **Try Again**. |
| You want to reset all saved data | In DevTools, go to **Application**, then **Local Storage**, then `http://localhost:5173`, and clear the `shelflife-*` keys. |

---

## AI use

The team used AI tools during development. The prompt log and our reflection are submitted with Phase 5 as a separate document. They record what we accepted, what we rejected and why.

---

## Credits

- Book data and covers: [Open Library](https://openlibrary.org/), a project of the Internet Archive
- Discover hero image: [Unsplash](https://unsplash.com/)
