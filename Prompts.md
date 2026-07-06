# Prompts.md — AI Pair-Programming Log

This file documents the prompts used with AI tools (per assignment instructions) to understand concepts, debug issues, and explain logic I didn't immediately grasp. Per FAQ #6: I did not push any code I couldn't explain — anything unclear here was rewritten in my own words after understanding it.

---

## Phase 1 — Async/Await & Fetch Basics

**Prompt:** "Explain how async/await works with fetch in JavaScript, and why I need to check `response.ok` or `response.status` before calling `.json()`."

**What I learned:** `fetch()` only rejects on network failure — a 404 or 500 still resolves successfully, so I have to manually check `response.status` and throw my own error for "not found" cases instead of relying on `.catch()` alone.

**Applied in:** `js/api.js` → `fetchGithubUser()`

---

## Phase 1 — Custom Error Classes

**Prompt:** "Why would I create a custom error class like `class UserNotFoundError extends Error` instead of just throwing a string?"

**What I learned:** Extending `Error` lets me use `instanceof` in my `catch` block to tell the difference between a "user not found" (404) case and any other kind of failure (network error, 500, etc.), so I can render different UI for each.

**Applied in:** `js/api.js`, `js/main.js` (the `catch` block distinguishes `UserNotFoundError` from generic errors)

---

## Phase 2 — Endpoint Chaining

**Prompt:** "How do I use the repos_url field from a GitHub user response to make a second fetch call?"

**What I learned:** The user object returned from `/users/{username}` already contains a `repos_url` field, so I don't need to hardcode a second URL — I just await a second fetch using that field, after the first one resolves.

**Applied in:** `js/main.js` (`searchForm` submit handler chains `fetchUserRepos(user.repos_url)`)

---

## Phase 2 — Date Formatting

**Prompt:** "How do I convert an ISO 8601 timestamp like 2023-01-25T12:00:00Z into a readable format like '25 Jan 2023' using vanilla JS, without a library like moment.js?"

**What I learned:** `new Date(isoString)` parses it automatically, and `toLocaleString('en-US', { month: 'short' })` gives the abbreviated month name without needing an external library.

**Applied in:** `js/dateUtils.js` → `formatISODate()`

---

## Phase 3 — Promise.all() for Parallel Requests

**Prompt:** "What's the difference between awaiting two fetches one after another vs using Promise.all(), and when should I use each?"

**What I learned:** Sequential awaits run one request, wait for it to finish, then start the next — doubling wait time. `Promise.all()` fires all requests simultaneously and waits for all to resolve together, which is faster when the requests don't depend on each other's results.

**Applied in:** `js/battleMode.js` → `runBattle()` (fetches both users + both repo lists in parallel)

---

## Phase 3 — Reduce for Star Calculation

**Prompt:** "How do I sum the stargazers_count field across an array of repo objects using reduce()?"

**What I learned:** `reduce()` takes an accumulator and the current item, letting me add `repo.stargazers_count` to a running total on each iteration, starting from 0.

**Applied in:** `js/battleMode.js` → `calculateTotalStars()`

---

## Debugging Session Example

**Issue:** Battle Mode was undercounting stars for users with more than 100 repositories.

**Prompt:** "Why would my star count be wrong for a user with a lot of repos, if I'm using the repos endpoint correctly?"

**What I learned:** The GitHub API paginates results at 100 per page by default, so a single fetch only returns the first 100 repos. I needed a `while` loop that keeps fetching subsequent pages until a page returns fewer than 100 results.

**Applied in:** `js/api.js` → `fetchAllUserRepos()` (pagination loop)

---

*All code above was written and tested by me after understanding the underlying async/fetch/reduce concepts explained through these prompts.*