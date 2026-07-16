(() => {
  "use strict";

  const SESSION_KEY = "jejak_nusantara_session_v1";
  const client = window.jejakSupabase;

  const greeting = document.querySelector("#account-greeting");
  const signOutButton = document.querySelector("#signout-button");
  const searchForm = document.querySelector("#site-search-form");
  const searchInput = document.querySelector("#site-search-input");
  const searchStatus = document.querySelector("#search-results-status");
  const storyCards = [...document.querySelectorAll(".story-card, .program-detail-card, .split-page-card")];
  const navToggle = document.querySelector("#nav-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const currentYear = document.querySelector("#current-year");
  const feedbackForm = document.querySelector("#feedback-form");
  const feedbackStatus = document.querySelector("#feedback-status");
  const feedbackPreview = document.querySelector("#feedback-preview");
  const FEEDBACK_KEY = "jejak_nusantara_feedback_v1";



  if (currentYear) currentYear.textContent = String(new Date().getFullYear());


  function readFeedbackList() {
    try {
      const stored = localStorage.getItem(FEEDBACK_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveFeedback(entry) {
    const feedbackList = readFeedbackList();
    feedbackList.unshift(entry);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackList.slice(0, 30)));
  }

  function renderFeedbackPreview(entry) {
    if (!feedbackPreview || !entry) return;
    feedbackPreview.hidden = false;
    feedbackPreview.innerHTML = `
      <strong>Feedback terakhir:</strong>
      <span>${entry.topic} · ${entry.ratingLabel}</span>
      <p>“${entry.message}”</p>
      <small>Dikirim oleh ${entry.name}${entry.role ? ` — ${entry.role}` : ""}</small>
    `;
  }

  function handleFeedbackSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const ratingValue = formData.get("rating");
    const ratingOption = form.querySelector(`#feedback-rating option[value="${ratingValue}"]`);
    const entry = {
      name: String(formData.get("name") || "Pembaca").trim(),
      role: String(formData.get("role") || "").trim(),
      topic: String(formData.get("topic") || "Keseluruhan").trim(),
      rating: ratingValue,
      ratingLabel: ratingOption ? ratingOption.textContent : "Feedback",
      message: String(formData.get("message") || "").trim(),
      createdAt: new Date().toISOString()
    };

    saveFeedback(entry);
    renderFeedbackPreview(entry);
    if (feedbackStatus) {
      feedbackStatus.textContent = "Terima kasih, feedback sudah terkirim dan tersimpan di browser ini.";
      feedbackStatus.classList.add("is-success");
    }
    form.reset();
  }

  function authPageUrl() {
    return new URL("./index.html", window.location.href).href;
  }

  function readSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async function requireSession() {
    if (!client) {
      localStorage.removeItem(SESSION_KEY);
      window.location.replace(authPageUrl());
      return;
    }

    const { data, error } = await client.auth.getSession();
    if (error || !data?.session) {
      localStorage.removeItem(SESSION_KEY);
      window.location.replace(authPageUrl());
      return;
    }

    const user = data.session.user;
    let displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "pembaca";

    try {
      const { data: profile } = await client
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.display_name) displayName = profile.display_name;
    } catch (error) {
      console.info("Profil tidak tersedia, memakai nama dari akun.");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email: user.email,
      displayName,
      signedInAt: new Date().toISOString(),
      provider: "supabase"
    }));

    if (greeting) greeting.textContent = `Halo, ${displayName}`;
  }


  signOutButton?.addEventListener("click", async () => {
    signOutButton.disabled = true;
    signOutButton.textContent = "Keluar…";

    try {
      if (client) await client.auth.signOut({ scope: "local" });
    } catch (error) {
      console.warn("Supabase sign out failed:", error);
    }

    localStorage.removeItem(SESSION_KEY);
    window.location.replace(authPageUrl());
  });

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    if (!query) {
      storyCards.forEach((card) => { card.hidden = false; });
      document.querySelectorAll(".story-category").forEach((section) => { section.hidden = false; });
      searchStatus.textContent = "Kolom pencarian sudah aktif. Ketik lokasi, program, atau kata kunci untuk memfilter cerita di halaman ini.";
      return;
    }

    let matches = 0;
    storyCards.forEach((card) => {
      const searchableText = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
      const visible = searchableText.includes(query);
      card.hidden = !visible;
      if (visible) matches += 1;
    });

    document.querySelectorAll(".story-category").forEach((section) => {
      const visibleCards = section.querySelectorAll(".story-card:not([hidden])").length;
      section.hidden = visibleCards === 0;
    });

    searchStatus.textContent = `Ditemukan ${matches} kartu untuk “${rawQuery.trim()}”`;
    document.querySelector("#stories-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
  });

  searchInput?.addEventListener("search", () => runSearch(searchInput.value));

  feedbackForm?.addEventListener("submit", handleFeedbackSubmit);

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navigation?.classList.toggle("is-open", !open);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });


  requireSession();
})();
