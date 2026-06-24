(() => {
  "use strict";

  const client = window.jejakSupabase;
  const setupWarning = document.querySelector("#home-setup-warning");
  const greeting = document.querySelector("#account-greeting");
  const signOutButton = document.querySelector("#signout-button");
  const searchForm = document.querySelector("#site-search-form");
  const searchInput = document.querySelector("#site-search-input");
  const searchStatus = document.querySelector("#search-results-status");
  const storyCards = [...document.querySelectorAll(".story-card")];
  const navToggle = document.querySelector("#nav-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const currentYear = document.querySelector("#current-year");

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  function authPageUrl() {
    return new URL("./index.html", window.location.href).href;
  }

  async function requireSession() {
    if (!client) {
      setupWarning.hidden = false;
      window.setTimeout(() => window.location.replace(authPageUrl()), 1200);
      return;
    }

    const { data, error } = await client.auth.getSession();
    const session = data?.session;

    if (error || !session) {
      window.location.replace(authPageUrl());
      return;
    }

    const user = session.user;
    let displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "traveler";

    try {
      const { data: profile } = await client
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.display_name) displayName = profile.display_name;
    } catch {
      // The authentication session is still valid even if profile loading fails.
    }

    greeting.textContent = `Hello, ${displayName}`;
  }

  signOutButton.addEventListener("click", async () => {
    if (!client) {
      window.location.replace(authPageUrl());
      return;
    }

    signOutButton.disabled = true;
    signOutButton.textContent = "Signing out…";

    const { error } = await client.auth.signOut({ scope: "local" });
    if (error) {
      signOutButton.disabled = false;
      signOutButton.textContent = "Sign out";
      window.alert(error.message);
      return;
    }

    window.location.replace(authPageUrl());
  });

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();

    if (!query) {
      storyCards.forEach((card) => { card.hidden = false; });
      searchStatus.textContent = "";
      return;
    }

    let matches = 0;
    storyCards.forEach((card) => {
      const searchableText = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
      const visible = searchableText.includes(query);
      card.hidden = !visible;
      if (visible) matches += 1;
    });

    searchStatus.textContent = `${matches} ${matches === 1 ? "story" : "stories"} found for “${rawQuery.trim()}”`;
    document.querySelector("#stories-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
  });

  searchInput.addEventListener("search", () => runSearch(searchInput.value));

  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("is-open", !open);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });

  requireSession();
})();
