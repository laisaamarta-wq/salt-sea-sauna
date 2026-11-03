# SALT → lessons for the Idea → Live builder

SALT: concept site for a sea sauna in Jurmala. Live: https://salt-sea-sauna.vercel.app
These are lessons, not builder features. Nothing here exists in the builder until we build it.

## 1. Scroll-triggered film (one scroll in → pin → auto-play → release)
- **Bake the film into ONE video file.** Never crossfade two `<video>` layers on the page: it gives double images, jitter and bad sync. In-browser baking with WebCodecs + mp4-muxer needs no server (`tools/bake-film.js`).
- **Use straight cuts on movement, like a real film edit.** With a person in the shot, any dissolve shows two people for a moment, even a 3-frame one. A blur or "mist" transition looked smeared, and Marta rejected it.
- **Keep one direction of movement across all shots** (here: always from behind, walking away towards the sea). A side-tracking shot broke the story.
- **Seamless continuation:** generate the next shot with `start_image` = the last frame of the previous shot. The cut becomes invisible.
- **Avoid tight close-ups as the final full-screen frame.** On a full-bleed video they read as "under a magnifying glass". Medium or wide framing works better. Phone versions crop a vertical strip and zoom in more, so check them separately.
- **Budgets:** desktop 1920×1080 at about 5 Mbps is about 12 MB for 18 s; phone 608×1080 at about 2 Mbps is about 5 MB.
- **Interaction details that mattered:**
  - Lock wheel, touch and keys while the film plays; scroll up, Skip and Esc exit.
  - A "navigating" guard, so menu links passing through the section don't trigger it.
  - A stall watchdog, so a dead network never keeps the page held.
  - `lenis.stop()` cancels `scrollTo`, so settle the section with a small tween of our own.
- **Performance:** pause off-screen videos, switch off any fixed full-screen grain or blend overlay while video plays, and load the film only when the section is about 1.5 screens away.

## 2. Captions over video
- **Give every shot its own short line.** It arrives just after the cut and leaves just before the next one.
- **Never show two texts at once.** For example, with a Sauna 85 °C → Sea 8 °C readout, the old text fades out first, then the new one fades in.
- **Long final text on phones:** extend the dark gradient higher, because the text sits on a pale sky.
- **Wellness copy:** sensory and confident, but no medical promises (no "boosts immunity").

## 3. Assets and delivery
- **Host pictures and films on a CDN** (Higgsfield upload) and reference them by URL. Convert PNG to JPG first: 1600–2400 px wide, about 120–700 KB. The repo then needs no `images` folder.
- **Beginners often open an old copy of index.html.** Check which file they actually open.

## 4. GitHub + Vercel
- Claude cannot create a new GitHub repo or Vercel project through the connectors. The user does two clicks:
  1. Create an empty repo on github.com/new.
  2. Click Deploy on `vercel.com/new/import?s=https://github.com/<owner>/<repo>&teamSlug=<team>`.
- After that, every push to `main` deploys automatically.

## 5. Higgsfield costs (Nov 2026)
- Kling 3.0 Pro is no longer offered.
- Kling 3.0 Turbo 1080p, 5 s: 10 credits.
- Kling 4.0 1080p, 5 s: 16.25 credits.
- Preflight with `get_cost` and show the price first.
