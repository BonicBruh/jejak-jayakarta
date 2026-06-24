# Jejak Jayakarta

A responsive, semantic, static website starter for a four-day educational journey through Jakarta:

1. **Museum MACAN** — 4 hours
2. **Museum Kota Tua** — 4.5 hours
3. **Tzu Chi: Sort Plastic** — 3.5 hours
4. **SAAJA: Teach Kids** — 5 hours

Total planned activity time: **17 hours across four separate days**.

## What is included

- `index.html` — sign-in and sign-up page
- `home.html` — authenticated homepage
- `assets/css/styles.css` — responsive design system
- `assets/js/auth.js` — Supabase email/password authentication
- `assets/js/home.js` — session guard, profile greeting, sign-out, search, and mobile navigation
- `assets/js/config.js` — Supabase project URL and publishable key
- `assets/images/jejak-jayakarta-logo.svg` — original SVG logo
- `supabase/schema.sql` — profile table, Row Level Security policies, and signup trigger
- `.nojekyll` — tells GitHub Pages to serve the static files directly
- `404.html` — project-styled not-found page

## Design direction

### Topic

The site is framed as a **cultural and social-impact field journey through Jakarta**. The four destinations form a deliberate progression:

- contemporary art and interpretation;
- historical memory and urban heritage;
- environmental responsibility;
- community learning and service.

### Color palette

| Token | Hex | Purpose |
|---|---:|---|
| Batavia Brick | `#A23A32` | Indonesian red, old brick, calls to action |
| Heritage Ivory | `#F7F1E7` | archival paper, museum walls, calm backgrounds |
| Maritime Teal | `#1F6F68` | Jakarta's port identity, civic action, navigation |
| Brass Gold | `#C88A2A` | museum details, route markers, highlights |
| City Ink | `#17232A` | readable text, night-city contrast, main footer/hero |

The palette avoids using bright red and white alone. It still references Indonesia, but adds historical, maritime, and museum-inspired tones that better fit all four destinations.

## Why the image placeholders are not `<img>` elements

An `<img>` element cannot contain visible fallback text in its middle. The website therefore uses semantic `<figure>` elements with labeled placeholder blocks. Each one states the intended photo and recommended crop size. When the real image is ready, replace the placeholder with:

```html
<figure>
  <img src="./assets/images/your-photo.jpg" alt="Accurate description of the photo">
  <figcaption>Optional caption.</figcaption>
</figure>
```

This is more accessible than putting instructional text into a fake image.

## Supabase setup

### 1. Create a free Supabase project

Create a project in the Supabase dashboard.

### 2. Create the profile database table

Open **SQL Editor**, paste everything from `supabase/schema.sql`, and run it.

This creates a `profiles` table. Supabase Auth stores and protects the login credentials. The trigger copies only the user's ID and display name into `public.profiles`.

**Do not create your own password column.**

### 3. Copy the browser-safe project credentials

Open your project's **Connect** dialog or **Project Settings → API Keys** and copy:

- Project URL
- Publishable key beginning with `sb_publishable_`

Edit `assets/js/config.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT.supabase.co",
  publishableKey: "sb_publishable_YOUR_KEY"
};
```

Never place a secret key or `service_role` key in a public GitHub repository.

### 4. Configure authentication URLs

In **Authentication → URL Configuration**, set the Site URL and redirect URLs.

For local testing, add:

```text
http://localhost:5500/home.html
```

For a GitHub Pages project site, add:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/home.html
```

Set the Site URL to the deployed project root:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

If email confirmation is enabled, new users receive an email before they can sign in. If it is disabled, a session is created immediately after signup.

## Run locally

Opening the files directly with a `file://` URL is not recommended. Start a small local web server from the project folder.

### Python

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/
```

### Visual Studio Code Live Server

You can also install the free **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. Use the exact localhost port shown by the extension in your Supabase redirect settings.

## Publish with GitHub Pages

1. Create a public GitHub repository, for example `jejak-jayakarta`.
2. Put the contents of this folder at the repository root. `index.html` must remain at the root.
3. Commit and push:

```bash
git init
git add .
git commit -m "Create Jejak Jayakarta authentication and homepage"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jejak-jayakarta.git
git push -u origin main
```

4. Open the repository on GitHub.
5. Go to **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select `main`, choose `/ (root)`, and save.
8. Wait for GitHub Pages to finish publishing.
9. Open:

```text
https://YOUR-USERNAME.github.io/jejak-jayakarta/
```

10. Add the deployed `home.html` URL to Supabase's allowed redirect URLs.

## Security notes

- The publishable Supabase key is intended for browser code, but database access must still be protected with Row Level Security.
- Never expose a Supabase secret key or `service_role` key.
- Passwords are handled by Supabase Auth, not stored in the `profiles` table.
- The homepage is protected by a client-side session check. This is appropriate for controlling the interface, while actual data protection must always come from database RLS policies.
- Client-side redirects do not make HTML source private. Do not put confidential content directly inside `home.html`.

## Free components

- HTML, CSS, and JavaScript: open web standards
- Logo: original SVG included in the project
- Supabase: free plan available, subject to its current quotas and inactivity rules
- GitHub Pages: available for public repositories on GitHub Free
- Supabase JavaScript client: loaded from the free jsDelivr CDN

No paid font, stock image, UI kit, or proprietary framework is required.
