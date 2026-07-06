const GITHUB_API_BASE = "https://api.github.com";

/**
 * Custom error so callers can distinguish "user not found" from
 * other network/server failures.
 */
class UserNotFoundError extends Error {
  constructor(username) {
    super(`User "${username}" not found`);
    this.name = "UserNotFoundError";
  }
}

/**
 * Fetches a single GitHub user's profile data.
 * Throws UserNotFoundError on 404, generic Error otherwise.
 */
async function fetchGithubUser(username) {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);

  if (response.status === 404) {
    throw new UserNotFoundError(username);
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches a user's repos using the repos_url returned from the
 * user object (Phase 2 endpoint chaining), sorted by latest updated,
 * capped to top 5.
 */
async function fetchUserRepos(reposUrl) {
  const response = await fetch(`${reposUrl}?sort=updated&per_page=5`);

  if (!response.ok) {
    throw new Error(`GitHub API error while fetching repos: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches ALL repos for a user (used in Battle Mode to sum stars).
 * Paginates in case a user has more than 100 repos.
 */
async function fetchAllUserRepos(username) {
  let page = 1;
  let allRepos = [];

  while (true) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error while fetching repos: ${response.status}`);
    }

    const repos = await response.json();
    allRepos = allRepos.concat(repos);

    if (repos.length < 100) break;
    page++;
  }

  return allRepos;
}