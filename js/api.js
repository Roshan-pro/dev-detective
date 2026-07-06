const GITHUB_API_BASE = "https://api.github.com";


class UserNotFoundError extends Error {
  constructor(username) {
    super(`User "${username}" not found`);
    this.name = "UserNotFoundError";
  }
}


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


async function fetchUserRepos(reposUrl) {
  const response = await fetch(`${reposUrl}?sort=updated&per_page=5`);

  if (!response.ok) {
    throw new Error(`GitHub API error while fetching repos: ${response.status}`);
  }

  return response.json();
}


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