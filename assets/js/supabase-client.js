(() => {
  "use strict";

  const config = window.SUPABASE_CONFIG || {};
  const hasSdk = Boolean(window.supabase && typeof window.supabase.createClient === "function");
  const hasUrl = typeof config.url === "string" && /^https:\/\/.+\.supabase\.co\/?$/.test(config.url.trim());
  const hasKey = typeof config.publishableKey === "string"
    && config.publishableKey.trim().length > 20
    && !config.publishableKey.includes("YOUR_");

  window.JEJAK_SUPABASE_READY = hasSdk && hasUrl && hasKey;

  if (!window.JEJAK_SUPABASE_READY) {
    window.jejakSupabase = null;
    return;
  }

  window.jejakSupabase = window.supabase.createClient(
    config.url.trim().replace(/\/$/, ""),
    config.publishableKey.trim(),
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
})();
