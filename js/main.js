const singleModeBtn = document.getElementById("singleModeBtn");
const battleModeBtn = document.getElementById("battleModeBtn");
const singleSearchSection = document.getElementById("singleSearch");
const battleSearchSection = document.getElementById("battleSearch");

singleModeBtn.addEventListener("click", () => {
  singleModeBtn.classList.add("active");
  battleModeBtn.classList.remove("active");
  singleSearchSection.classList.remove("hidden");
  battleSearchSection.classList.add("hidden");
});

battleModeBtn.addEventListener("click", () => {
  battleModeBtn.classList.add("active");
  singleModeBtn.classList.remove("active");
  battleSearchSection.classList.remove("hidden");
  singleSearchSection.classList.add("hidden");
});

// ----- Phase 1 & 2: Single user search -----
const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  renderLoading(resultArea);

  try {
    const user = await fetchGithubUser(username);
    renderProfile(resultArea, user);

    // Phase 2: chain second request using repos_url from first response
    const repos = await fetchUserRepos(user.repos_url);
    renderRepos(repos);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      renderError(resultArea, err.message);
    } else {
      renderGenericError(resultArea, err.message);
    }
  }
});

// ----- Phase 3: Battle mode search -----
const battleForm = document.getElementById("battleForm");
const userOneInput = document.getElementById("userOneInput");
const userTwoInput = document.getElementById("userTwoInput");

battleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const u1 = userOneInput.value.trim();
  const u2 = userTwoInput.value.trim();
  if (!u1 || !u2) return;

  await runBattle(u1, u2);
});