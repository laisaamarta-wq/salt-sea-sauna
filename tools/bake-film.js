/* Bake a multi-shot film into ONE mp4, in the browser (Chrome), with no server.
   Why: playing several <video> layers and crossfading them on the page causes double images,
   jitter and sync problems. The page should play one finished file.
   How to use: open any page whose origin can read the clips (CORS), paste this into the console,
   then: const r = await bakeFilm({W:1920,H:1080,bitrate:5200000}); // desktop
         const p = await bakeFilm({W:608,H:1080,bitrate:2100000,portrait:true}); // phone crop
   r.blob is the mp4. Budgets used for SALT: desktop <= 12 MB, phone <= 5 MB.
   Edit rules learned on SALT: straight cuts on movement (no dissolves: even 3 frames shows two people),
   every shot moving in one direction, fade in from the section colour, hold the last frame. */
async function bakeFilm(opts){
  const {Muxer, ArrayBufferTarget} = await import('https://cdn.jsdelivr.net/npm/mp4-muxer@5.1.3/+esm');
  const base = 'https://d8j0ntlcm91z4.cloudfront.net/user_3C15E03naKYn0k12cqxNShlIybX/';
  // [file, in (s), out (s), phone crop centre 0..1]
  const shots = [
    ['hf_20261102_074152_cb5b84d2-5580-4c8c-9ec2-0ee093040118.mp4', 0.2, 3.6, 0.50],   // leaves the sauna
    ['hf_20261101_140144_2765e979-2b94-4197-9fcf-9b2b52622539.mp4', 0.5, 3.7, 0.50],   // boardwalk
    ['hf_20261101_140750_1557e343-be18-467b-a8dc-e4f19eb6b72b.mp4', 5.0, 8.8, 0.50],   // sand to the water
    ['hf_20261102_073537_996243aa-6fcc-4a89-9ddf-2a8a9c9fa68b.mp4', 0.4, 3.5833, 0.44],// wading in
    ['hf_20261102_125448_2f17987b-d47c-4efc-9b0c-0fd9b5fadf7b.mp4', 0.0, 5.02, 0.44]]; // the reset (starts on the last frame above)
  const {W, H, bitrate, portrait} = opts, FPS = 24;
  let T = 0; const segs = shots.map(s => { const start = T; T += s[2] - s[1]; return {f:s[0], a:s[1], cx:s[3], start, end:T}; });
  const N = Math.round(T * FPS);
  const vids = await Promise.all(segs.map(sg => new Promise((ok, no) => { const v = document.createElement('video');
    v.crossOrigin = 'anonymous'; v.muted = true; v.preload = 'auto'; v.src = base + sg.f;
    v.addEventListener('loadeddata', () => ok(v), {once:true}); v.addEventListener('error', () => no('load ' + sg.f), {once:true}); })));
  const target = new ArrayBufferTarget();
  const muxer = new Muxer({target, video:{codec:'avc', width:W, height:H, frameRate:FPS}, fastStart:'in-memory'});
  let err = null; const enc = new VideoEncoder({output:(c, m) => muxer.addVideoChunk(c, m), error:e => { err = String(e); }});
  enc.configure({codec:'avc1.640028', width:W, height:H, bitrate, framerate:FPS});
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  const seek = (v, t) => new Promise(r => { if (Math.abs(v.currentTime - t) < 1e-4) return r(); v.addEventListener('seeked', r, {once:true}); v.currentTime = t; });
  const sm = t => { t = Math.min(Math.max(t, 0), 1); return t * t * (3 - 2 * t); };
  for (let n = 0; n < N; n++){
    const t = (n + 0.5) / FPS; let i = segs.findIndex(s => t >= s.start && t < s.end); if (i < 0) i = segs.length - 1;
    const sg = segs[i], v = vids[i];
    await seek(v, Math.min(sg.a + (t - sg.start), v.duration - 0.02));
    const sw = v.videoWidth, sh = v.videoHeight; let sx = 0, cw = sw;
    if (portrait){ cw = Math.round(sh * W / H); sx = Math.round(Math.min(Math.max(sg.cx * sw - cw / 2, 0), sw - cw)); }
    x.filter = 'contrast(1.03) saturate(0.9)'; x.drawImage(v, sx, 0, cw, sh, 0, 0, W, H); x.filter = 'none';
    if (t < 0.6){ x.fillStyle = 'rgba(31,40,38,' + (1 - sm(t / 0.6)).toFixed(3) + ')'; x.fillRect(0, 0, W, H); } // open from the page colour
    const fr = new VideoFrame(c, {timestamp:Math.round(n * 1e6 / FPS), duration:Math.round(1e6 / FPS)});
    enc.encode(fr, {keyFrame:n % 24 === 0}); fr.close();
    if (enc.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 15));
  }
  await enc.flush(); muxer.finalize(); if (err) throw err;
  return {blob:new Blob([target.buffer], {type:'video/mp4'}), total:T, segs:segs.map(s => [s.start, s.end])};
}
