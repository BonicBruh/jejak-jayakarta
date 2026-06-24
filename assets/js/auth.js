(() => {
  "use strict";

  const client = window.jejakSupabase;
  const setupWarning = document.querySelector("#setup-warning");
  const status = document.querySelector("#auth-status");
  const signInForm = document.querySelector("#signin-form");
  const signUpForm = document.querySelector("#signup-form");
  const tabButtons = [...document.querySelectorAll("[data-auth-tab]")];
  const panels = {
    signin: document.querySelector("#signin-panel"),
    signup: document.querySelector("#signup-panel")
  };

  function setStatus(message = "", type = "") {
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    if (type) status.classList.add(`is-${type}`);
  }

  function setFormBusy(form, busy) {
    const controls = [...form.querySelectorAll("input, button")];
    controls.forEach((control) => {
      control.disabled = busy;
    });

    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.dataset.originalText ||= submit.querySelector("span")?.textContent || "Submit";
      const label = submit.querySelector("span");
      if (label) label.textContent = busy ? "Please wait…" : submit.dataset.originalText;
    }
  }

  function switchTab(tabName, updateHash = true) {
    const safeTab = tabName === "signup" ? "signup" : "signin";

    tabButtons.forEach((button) => {
      const active = button.dataset.authTab === safeTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    Object.entries(panels).forEach(([name, panel]) => {
      panel.hidden = name !== safeTab;
    });

    setStatus();

    if (updateHash) {
      history.replaceState(null, "", safeTab === "signup" ? "#signup" : "#signin");
    }

    const firstInput = panels[safeTab]?.querySelector("input");
    window.setTimeout(() => firstInput?.focus(), 0);
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.authTab));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      switchTab(button.dataset.authTab === "signin" ? "signup" : "signin");
    });
  });

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      button.textContent = shouldShow ? "Hide" : "Show";
      button.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
    });
  });

  function redirectIfSignedIn() {
    if (!client) return;

    let subscription = null;

    const { data } = client.auth.onAuthStateChange((event, session) => {
      if (event !== "INITIAL_SESSION") return;

      subscription?.unsubscribe();

      if (session) {
        window.location.replace(
          new URL("./home.html", window.location.href).href
        );
      }
    });

    subscription = data.subscription;
  }

  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus();

    if (!client) {
      setStatus("Supabase is not configured yet. Complete the setup before signing in.", "error");
      return;
    }

    if (!signInForm.reportValidity()) return;

    const formData = new FormData(signInForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setFormBusy(signInForm, true);

    try {
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;

      setStatus("Signed in successfully. Opening your journey…", "success");
      window.location.replace(new URL("./home.html", window.location.href).href);
    } catch (error) {
      setStatus(error?.message || "Sign in failed. Check your details and try again.", "error");
    } finally {
      setFormBusy(signInForm, false);
    }
  });

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus();

    if (!client) {
      setStatus("Supabase is not configured yet. Complete the setup before creating an account.", "error");
      return;
    }

    if (!signUpForm.reportValidity()) return;

    const formData = new FormData(signUpForm);
    const displayName = String(formData.get("displayName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    const acceptedTerms = formData.get("terms") === "on";

    if (displayName.length < 2) {
      setStatus("Please enter a display name with at least two characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("The password and confirmation do not match.", "error");
      return;
    }

    if (!acceptedTerms) {
      setStatus("You need to accept the project terms before creating an account.", "error");
      return;
    }

    setFormBusy(signUpForm, true);

    try {
      const emailRedirectTo = new URL("./home.html", window.location.href).href;
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: {
            display_name: displayName
          }
        }
      });

      if (error) throw error;

      if (data.session) {
        setStatus("Account created. Opening your journey…", "success");
        window.location.replace(emailRedirectTo);
        return;
      }

      signUpForm.reset();
      setStatus("Account created. Check your email and confirm the address before signing in.", "success");
    } catch (error) {
      setStatus(error?.message || "Account creation failed. Please try again.", "error");
    } finally {
      setFormBusy(signUpForm, false);
    }
  });

  if (!window.JEJAK_SUPABASE_READY) {
    setupWarning.hidden = false;
  }

  const initialTab = window.location.hash.toLowerCase() === "#signup" ? "signup" : "signin";
  switchTab(initialTab, false);
  redirectIfSignedIn();
})();
