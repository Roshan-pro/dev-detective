const battleResultArea = document.getElementById("battleResultArea");

function calculateTotalStars(repos) {
  return repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
}

function renderBattleCard(user, totalStars, isWinner) {
  return `
    <div class="battle-card ${isWinner ? "winner" : "loser"}">
      <span class="battle-tag ${isWinner ? "win" : "lose"}">${isWinner ? "Case Won" : "Case Closed"}</span>
      <div class="profile-card" style="align-items:center;">
        <img src="${user.avatar_url}" alt="${user.login} avatar" style="width:64px;height:64px;">
        <div class="profile-info">
          <h2>${user.name || user.login}</h2>
          <p>@${user.login}</p>
        </div>
      </div>
      <div class="stars">⭐ ${totalStars} total stars</div>
    </div>
  `;
}

async function runBattle(usernameOne, usernameTwo) {
  renderLoading(battleResultArea);

  try {
    const [userOne, userTwo, reposOne, reposTwo] = await Promise.all([
      fetchGithubUser(usernameOne),
      fetchGithubUser(usernameTwo),
      fetchAllUserRepos(usernameOne),
      fetchAllUserRepos(usernameTwo),
    ]);

    const starsOne = calculateTotalStars(reposOne);
    const starsTwo = calculateTotalStars(reposTwo);
    const oneWins = starsOne >= starsTwo;

    battleResultArea.innerHTML = `
      <span class="evidence-label">Verdict</span>
      <div class="battle-wrapper">
        ${renderBattleCard(userOne, starsOne, oneWins)}
        ${renderBattleCard(userTwo, starsTwo, !oneWins)}
      </div>
    `;
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      renderError(battleResultArea, err.message);
    } else {
      renderGenericError(battleResultArea, err.message);
    }
  }
}