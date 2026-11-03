# SALT · decisions

What we've agreed for this site and why. Claude: read this before any change. Never reverse a decision silently: if a request conflicts with one, say which and ask me. When we decide something new, add a row at the end with the date and give me the updated file.

| # | Decision | Why / note | Date |
|---|---|---|---|
| 1 | Purpose: a website for SALT, a sea sauna and cold-water club on the beach in Jurmala, Latvia (invented brand) | For: people from Riga who want a ritual of heat, cold sea and quiet: curious first-timers who are nervous about cold water, and regulars who book every week | 2026-11-01 |
| 2 | The one action for visitors: book a sauna and sea session | Every section leads here | 2026-11-01 |
| 3 | Central idea: SALT walks nervous first-timers into the shallow Baltic step by step, opening on today's real sea temperature in Jurmala and letting a waterline rise up a body as you scroll, with each depth saying honestly what you'll feel. | Feeling: cinematic, calm, raw | 2026-11-01 |
| 4 | Sections in order: first screen (today's sea temperature + Book) → the ritual: heat, cold, quiet (rising waterline) → sessions → prices → book a session → FAQ → how to get there | From my idea work | 2026-11-01 |
| 5 | Signature moment: As the visitor scrolls, the misted sauna glass clears once and a waterline rises up a real person in the grey Baltic, stopping at ankles, knees, waist and shoulders, each depth saying honestly what you will feel, until the water is calm and the Book button appears. | Motion pattern: Pinned section that transforms | 2026-11-01 |
| 6 | Route: simple, one index.html plus an images folder | Opens with a double-click, no build step | 2026-11-01 |
| 7 | Pictures: Generated with Higgsfield through the Claude connector | One MASTER sets the look | 2026-11-01 |
| 8 | Texts: Claude writes them from the brief; facts to confirm marked [CHECK] |  | 2026-11-01 |
| 9 | Kind of site: Restaurant, café or hotel | Rules in design-system.md, section 7 | 2026-11-01 |
| 10 | The pin uses the browser's own sticky positioning, no GSAP, no Lenis, no scroll snapping | Native scroll, so the page never feels hijacked; heights in svh so phones don't jump when the address bar moves | 2026-11-01 |
| 11 | The ritual is split: "Heat first" (sauna photo, 85 °C) sits just before the pin; "quiet" closes the pin and opens Sessions | Heat, cold, quiet stay in order without adding a second big device | 2026-11-01 |
| 12 | Sea temperature is one example value (8.0 °C) set in one place in the script and labelled as an example everywhere it appears | Ready to swap for a live source later | 2026-11-01 |
| 13 | Book is a fixed top-bar button on tablet and laptop, and a bottom dock with "Hours & address" + Book on phones | Thumb reach on phones; hours and booking one tap away from every screen | 2026-11-01 |
| 14 | Sessions open with a to-scale bar of one round (heat 15 min, sea 90 s, quiet 10 min) | Shows a nervous first-timer that the cold is the shortest part | 2026-11-01 |
| 15 | Example sessions and prices: first time with a host €32, open sauna €25, sunrise €20, ten visits €220, private sauna €160 per group; example hours Mon–Fri 7–22, Sat–Sun 8–23; place: Majori beach | All marked [CHECK] on the page; to confirm or replace | 2026-11-01 |
| 16 | Fonts: Schibsted Grotesk (headings), Instrument Sans (text), IBM Plex Mono only for small temperature and time labels | The brief asks for mono labels; it never appears in headings or body | 2026-11-01 |
| 17 | Ember orange is used only on Book buttons, the 85 °C label and the heat segment; [CHECK] markers are muted grey | Keeps ember meaning "heat" and "book" | 2026-11-01 |
| 18 | Reduced motion: the pin becomes one screen showing the shoulders photo under full water with all four depth lines and Book; the hero video is hidden | Final state without animation, nothing lost | 2026-11-01 |

## Rejected or to avoid
- Borrow: one real fact (today's sea temperature) owns the first screen, set huge and plain.
- Borrow: a physical threshold used once: the sauna glass mists at the heat stage and clears as you enter the sea.
- Borrow: the real place, unretouched; the interface stays quiet; booking is always one click away.
- Avoid: permanent steam or fog overlays, hero athletes, menu pills, electric blue, luxury gold, summer colours, three competing hero devices.
- Motion failure modes: It feels as if the page has taken over the scroll; A jump on phones when the address bar appears or hides; Too many states: the visitor gets stuck
| 19 | E0 approved: concept "From 85° to 8°", eight-scene Visual Story, signature = continuous scroll-scrubbed walk from the sauna door into the sea | Approved by Marta, proof of concept for Idea → Live | 2026-11-01 |
| 20 | Removed the rules "animate only transform and opacity" and "supporting effects calmer than the signature"; replaced by a motion budget | They blocked canvas, masks and directed transitions | 2026-11-01 |
| 21 | Allowed libraries: GSAP 3.15 + ScrollTrigger + SplitText, Lenis (pinned CDN). Still one index.html + images folder, no build step | Reliable pinning and scrubbing without a build | 2026-11-01 |
| 22 | Higgsfield for E0: two stills (GPT Image 2.5, 5.5 credits) + one 10 s MiniMax H3 Max 768p test clip (25 credits); no further spending without Marta's approval of the exact cost | Budget test before any 1080p version | 2026-11-01 |
| 23 | The clip source is saved by Marta in SALT/source/; frames are made with FFmpeg after a contact-sheet review | Claude's workspace cannot download from the Higgsfield server | 2026-11-01 |
| 24 | Build order: signature scene first, shown to Marta, then the remaining scenes | Validate the core experience before the rest | 2026-11-01 |
| 25 | The 2-image interpolation and single continuous take were rejected; the walk-in is a 4-shot directed film (door · boardwalk side track · entering the sea · quiet close-up), Kling 3.0 Pro from GPT Image 2.5 keyframes | Marta's direction 2026-11-01: real cinematic progression, different angles | 2026-11-02 |
| 26 | Final cut v2, 10.9 s: feet close-up removed, boardwalk shot shortened to 2 s | Marta's edit notes | 2026-11-02 |
| 27 | Scene 3 scrubs the film by scroll (native sticky, no library): images/salt-walk.mp4 (16:9, 11 MB) and images/salt-walk-phone.mp4 (9:16 crop, 3.9 MB), web copies as fallback; 5 captions, sauna→sea readout, seconds counter, Book in the final hold | Replaces the waterline + depth photos | 2026-11-02 |
| 28 | Full redesign "From 85° to 8°": the page colour follows the ritual (deep sea → sand → cedar heat → sea → mist quiet → sand → linen → cedar booking → deep finale); Instrument Serif replaces Schibsted Grotesk for display, Instrument Sans + IBM Plex Mono stay; film grain overlay | Marta's redesign brief 2026-11-02: warm, editorial, cinematic, storytelling | 2026-11-02 |
| 29 | New scenes: loader 85→8, cinematic hero, word-lit manifesto, heat chapter with masked photos, the scrolled film, quiet iris reveal + round to scale, sideways sessions rail, editorial prices, booking (logic unchanged), FAQ, boardwalk + giant SALT finale; glass header that hides on scroll down; full-screen phone menu; Lenis smooth scroll (CDN, page works without it) | Same brief; replaces decisions 10, 11, 16 | 2026-11-02 |
| 30 | New photo names (keyframes from the film): images/still-door.jpg, still-boardwalk.jpg, still-feet.jpg, still-wading.jpg, still-in-water.jpg; until saved locally the page uses the web copies | Rich photography from our own footage, no stock | 2026-11-02 |
| 31 | The walk-in film now plays by itself: one scroll into the section pins it, the film plays at real speed with soft dissolves at each cut (two video layers), captions follow the film; scrolling up, Skip or Esc leaves; after the film the page scrolls normally; Watch again replays without holding the page | Marta's note 2026-11-02; replaces scroll-scrubbing (decision 27) | 2026-11-02 |
| 32 | The banya gets its own chapter: full-screen room with rising steam and "The banya.", three details cut from the real sauna pictures with one sensory line each, then the doorway opening onto the sea; no new sauna pictures generated | Marta: show the real space more beautifully, do not invent it | 2026-11-02 |
| 33 | "How to get there" removed (train, car, bike, hours, address card); the site ends on the sea video, "See you in the sea.", Book and the SALT wordmark; nav/dock links to it replaced with Book and "First time?" | Marta's note 2026-11-02 | 2026-11-02 |
| 34 | Banya text explains the ritual ("Warmth that starts within."): circulation, softened muscles, slowing down; health benefits stated carefully (studies link regular sauna with heart health; small studies suggest help in the cold months; "a ritual, not a treatment") | Marta's note 2026-11-02 | 2026-11-02 |
| 35 | The doorway still is removed; the film is the first picture after the banya. Dissolves are now real cross-dissolves (next shot starts 0.6 s early, 1.4 s fade); captions fade out, then in after 0.6 s | Marta: no duplicate frame, softer transitions | 2026-11-02 |
| 36 | Quiet scene picture: images/quiet-blanket.jpg, the same photo with a soft cream wool blanket (GPT Image 2.5 edit, 5.5 credits for 2 options) | Marta: warmer, softer styling | 2026-11-02 |
| 37 | Sunrise removed everywhere (prices, sessions, booking); "Three ways in." | Marta: no paid Sunrise option | 2026-11-02 |

| 38 | The film is now one finished video file (images/salt-film.mp4, phone: salt-film-phone.mp4) played by one video element. The page no longer layers two videos, seeks or pauses shots mid-play. Replaces rows 25–27 and 35 | Marta's audit: layered, jumpy, double images | 2026-11-02 |
| 39 | Edit, 14.7 s, every shot from behind, moving away towards the sea: sauna door 0–4.0 · boardwalk · sand to the foam · wading in · quiet head turn. The side-tracking shot is out (it broke the direction) | Marta's audit: one continuous story | 2026-11-02 |
| 40 | Straight cuts on her movement, like a film edit; no dissolves, no blur, no mist. A cross-dissolve (even 3 frames) shows two women at once; the mist version felt smeared. Film 17.4 s: door 0–3.4 · boardwalk 3.4–6.6 · sand to the water 6.6–10.4 · wading 10.4–13.6 · quiet 13.6–17.4 | Marta: transitions too smeared, keep them simple like cinema | 2026-11-02 |
| 41 | Every shot has its own line: Leave the heat. / Walk, don't hurry. / Meet the water. / Walk in slowly. / Feel the reset. Each arrives just after its cut and leaves just before the next. No stops list, no counter, no play hint | Marta: every stage must be described | 2026-11-02 |
| 42 | Grain layer is switched off while the film plays; the opening sea video pauses when it is off screen; the film file loads only when the section is 1.5 screens away | Audit: causes of jitter | 2026-11-02 |
| 43 | Last film line is now "Feel the reset." with Marta's text about the contrast of heat and cold (awakening, circulation responds, renewed, more resilient). No immunity claims. The section after the film keeps "Then, quiet." | Marta: the cold moment is about contrast and renewal, not quiet | 2026-11-02 |
| 44 | The water-level close-up is out (it read as "under a magnifying glass"). New last shot, Kling 3.0 Turbo 1080p 5 s (10 credits; Kling 3.0 Pro is no longer offered), starting from the last frame of the wading shot: same distance, she lowers to her shoulders and turns her head. Film 18.6 s | Marta: last scene too close | 2026-11-02 |
