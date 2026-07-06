const resultArea = document.getElementById("resultArea");

function renderLoading(container) {
  container.innerHTML = `
    <div class="loader">
      <div class="spinner"></div>
      Pulling the file...
    </div>
  `;
}

function renderError(container, message) {
  container.innerHTML = `
    <div class="error-box">
      <div class="stamp stamp-red">No Record</div>
      <p>${message}</p>
    </div>
  `;
}

function renderGenericError(container, message) {
  container.innerHTML = `
    <div class="error-box">
      <div class="stamp stamp-red">Investigation Stalled</div>
      <p>${message}</p>
    </div>
  `;
}

function renderProfile(container, user) {
  container.innerHTML = `
    <div class="stamp stamp-green">Match Found</div>
    <div class="profile-card">
      <img src="${user.avatar_url}" alt="${user.login} avatar">
      <div class="profile-info">
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || "No bio on file"}</p>
        <p>📅 Filed since: ${formatISODate(user.created_at)}</p>
        <p>🔗 <a href="${user.html_url}" target="_blank" rel="noopener">${user.html_url}</a></p>
      </div>
    </div>
    <span class="evidence-label">Exhibit A — Recent Activity</span>
    <ul class="repo-list" id="repoList"></ul>
  `;
}

function renderRepos(repos) {
  const repoList = document.getElementById("repoList");
  if (!repoList) return;

  if (!repos.length) {
    repoList.innerHTML = `<li>No public repositories on file.</li>`;
    return;
  }

  repoList.innerHTML = repos
    .slice(0, 5)
    .map(
      (repo, i) => `
      <li>
        <span class="exhibit-tag">EX-${String(i + 1).padStart(2, "0")}</span>
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
        <div class="repo-meta">
          ⭐ ${repo.stargazers_count} &nbsp;·&nbsp; Last touched: ${formatISODate(repo.updated_at)}
        </div>
      </li>
    `
    )
    .join("");
}