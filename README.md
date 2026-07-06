# 🔍 Dev-Detective

A client-side application that interfaces with the official **GitHub REST API** to search user profiles, browse their repositories, and compare two developers head-to-head in "Battle Mode."

Built with **vanilla JavaScript** (no framework) to practice Promises, `async/await`, and JSON parsing before transitioning to React.

---

## Features

### Phase 1 — Base MVP
- Search input + responsive Profile Card component
- Async `GET` request to `https://api.github.com/users/{username}`
- Renders Avatar, Name, Bio, Join Date, and Portfolio URL
- **Loading state**: spinner shown while the promise resolves
- **Error handling**: clean "User Not Found" UI on a 404 — app never crashes

### Phase 2 — Data Expansion & Formatting
- Endpoint chaining: uses `repos_url` from the first API response to fetch repos
- Renders the Top 5 latest repositories as clickable links (open in new tab)
- Utility function converts ISO timestamps (`2023-01-25T12:00:00Z`) into human-readable dates (`25 Jan 2023`)

### Phase 3 — Advanced Logic & State Comparison
- "Battle Mode" toggle reveals a dual-username input UI
- Fetches both users + all their repos in parallel via `Promise.all()`
- Reduces each user's repos to a **Total Stars** count
- Conditionally renders a green "Winner" card and a red "Loser" card

---

## Tech Stack
- HTML5
- CSS3 (custom, no framework)
- Vanilla JavaScript (ES6+, native `fetch`)
- GitHub REST API v3

---

## Project Structure
```
    dev-detective/
    ├── index.html          # Markup + mode toggle + form UI
    ├── css/
    │   └── style.css       # All styling
    └── js/
        ├── dateUtils.js     # ISO date formatting utility
        ├── api.js           # All GitHub API calls (fetch logic, error classes)
        ├── domRenderer.js    # Renders loading/error/profile/repo states to DOM
        ├── battleMode.js     # Battle Mode logic (Promise.all, star calculation)
        └── main.js           # Event listeners wiring everything together
```

---

## How to Run

No build tools or dependencies required.

1. Clone/download this repository.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge).
3. Try a valid username (e.g. `octocat`) and an invalid one (e.g. `asdkjhaskjdh123`) to see both success and error states.

---

## API Endpoints Used

| Purpose | Endpoint |
|---|---|
| Get user profile | `GET https://api.github.com/users/{username}` |
| Get user repos | `GET {repos_url}?sort=updated&per_page=5` |
| Get all repos (Battle Mode) | `GET https://api.github.com/users/{username}/repos?per_page=100&page={n}` |

> ⚠️ GitHub limits unauthenticated requests to **60/hour**. If you hit a `403 rate limit exceeded`, wait or use a Personal Access Token in the request headers.

---

## Known Limitations
- No authentication/PAT support built in yet (optional per FAQ #5, only required if rate-limited).
- Battle Mode paginates all repos for accuracy, which can be slower for users with hundreds of repositories.

---

## Author
[Roshan Kumar] — Sprint 03, Dev-Detective Data Integration