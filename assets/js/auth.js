(() => {
  "use strict";

  const client = window.jejakSupabase;
  const status = document.querySelector("#auth-status");
  const signInForm = document.querySelector("#signin-form");
  const signUpForm = document.querySelector("#signup-form");
  const tabButtons = [...document.querySelectorAll("[data-auth-tab]")];
  const panels = {
    signin: document.querySelector("#signin-panel"),
    signup: document.querySelector("#signup-panel")
  };

  function setStatus(message = "", type = "") {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    if (type) status.classList.add(`is-${type}`);
  }

  function setFormBusy(form, busy) {
    if (!form) return;
    const controls = [...form.querySelectorAll("input, button")];
    controls.forEach((control) => { control.disabled = busy; });

    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.dataset.originalText ||= submit.querySelector("span")?.textContent || "Kirim";
      const label = submit.querySelector("span");
      if (label) label.textContent = busy ? "Sebentar…" : submit.dataset.originalText;
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
      if (panel) panel.hidden = name !== safeTab;
    });

    setStatus();

    if (updateHash) {
      history.replaceState(null, "", safeTab === "signup" ? "#signup" : "#signin");
    }

    const firstInput = panels[safeTab]?.querySelector("input");
    window.setTimeout(() => firstInput?.focus(), 0);
  }

  function homeUrl() {
    return new URL("./home.html", window.location.href).href;
  }

  async function redirectIfSignedIn() {
    if (!client) return;
    const { data } = await client.auth.getSession();
    if (data?.session) window.location.replace(homeUrl());
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
      button.textContent = shouldShow ? "Sembunyikan" : "Lihat";
      button.setAttribute("aria-label", shouldShow ? "Sembunyikan password" : "Lihat password");
    });
  });

  signInForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus();

    if (!client) {
      setStatus("Koneksi ke Supabase belum siap. Periksa config.js, koneksi internet, dan pengaturan Supabase.", "error");
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

      setStatus("Berhasil masuk. Membuka jurnal perjalanan…", "success");
      window.location.replace(homeUrl());
    } catch (error) {
      setStatus(error?.message || "Gagal masuk. Periksa email dan password, lalu coba lagi.", "error");
    } finally {
      setFormBusy(signInForm, false);
    }
  });

  signUpForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus();

    if (!client) {
      setStatus("Koneksi ke Supabase belum siap. Periksa config.js, koneksi internet, dan pengaturan Supabase.", "error");
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
      setStatus("Masukkan nama tampilan minimal dua karakter.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Password dan konfirmasi password tidak sama.", "error");
      return;
    }

    if (!acceptedTerms) {
      setStatus("Pembaca perlu menyetujui ketentuan proyek sebelum membuat akun.", "error");
      return;
    }

    setFormBusy(signUpForm, true);

    try {
      const emailRedirectTo = homeUrl();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: { display_name: displayName }
        }
      });

      if (error) throw error;

      if (data.session) {
        setStatus("Akun berhasil dibuat. Membuka jurnal perjalanan…", "success");
        window.location.replace(emailRedirectTo);
        return;
      }

      signUpForm.reset();
      setStatus("Akun berhasil dibuat. Jika konfirmasi email aktif, buka email untuk mengaktifkan akun sebelum masuk.", "success");
    } catch (error) {
      setStatus(error?.message || "Pembuatan akun gagal. Silakan coba lagi.", "error");
    } finally {
      setFormBusy(signUpForm, false);
    }
  });

  const initialTab = window.location.hash.toLowerCase() === "#signup" ? "signup" : "signin";
  switchTab(initialTab, false);
  redirectIfSignedIn();
})();
