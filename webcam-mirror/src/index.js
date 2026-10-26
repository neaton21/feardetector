const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#101311">
  <title>Mirror</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #101311; color: #f1f3ef; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 28px; }
    main { width: min(100%, 900px); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
    h1 { margin: 0; font-size: 1.1rem; font-weight: 600; letter-spacing: .02em; }
    #status { color: #9ca59d; font-size: .85rem; }
    .stage { position: relative; overflow: hidden; aspect-ratio: 4 / 3; min-height: 240px; border: 1px solid #343a35; border-radius: 14px; background: radial-gradient(ellipse at center, #202622, #151916 70%); }
    video { display: block; width: 100%; height: 100%; object-fit: cover; }
    video.mirrored { transform: scaleX(-1); }
    .empty { position: absolute; inset: 0; display: grid; place-content: center; gap: 8px; text-align: center; color: #9ca59d; pointer-events: none; }
    .empty strong { color: #e4e9e3; font-size: .98rem; font-weight: 500; }
    .empty span { font-size: .85rem; }
    .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding-top: 16px; }
    button { border: 1px solid #424a43; border-radius: 9px; padding: 10px 15px; background: #202621; color: inherit; font: inherit; cursor: pointer; }
    button:hover { background: #29332b; }
    button.primary { color: #102014; border-color: #c9efb3; background: #c9efb3; font-weight: 600; }
    button.primary:hover { background: #daf5ca; }
    button:focus-visible, input:focus-visible + span { outline: 2px solid #c9efb3; outline-offset: 3px; }
    label { display: inline-flex; align-items: center; gap: 9px; margin-left: auto; color: #c3cbc3; font-size: .9rem; cursor: pointer; }
    input { accent-color: #c9efb3; width: 16px; height: 16px; }
    @media (max-width: 520px) { body { padding: 18px; } .stage { aspect-ratio: 3 / 4; } label { margin-left: 0; } }
  </style>
</head>
<body>
  <main>
    <header><h1>Mirror</h1><span id="status" role="status" aria-live="polite">Camera is off</span></header>
    <section class="stage" aria-label="Webcam preview">
      <video id="video" autoplay playsinline muted hidden></video>
      <div class="empty" id="empty"><strong>Your mirror is ready</strong><span>Start the camera to see yourself</span></div>
    </section>
    <div class="controls">
      <button class="primary" id="toggle" type="button">Start camera</button>
      <label><input id="mirror" type="checkbox" checked><span>Mirror image</span></label>
    </div>
  </main>
  <script>
    const video = document.querySelector('#video');
    const empty = document.querySelector('#empty');
    const status = document.querySelector('#status');
    const toggle = document.querySelector('#toggle');
    const mirror = document.querySelector('#mirror');
    let stream;

    video.classList.add('mirrored');
    mirror.addEventListener('change', () => video.classList.toggle('mirrored', mirror.checked));

    function stopCamera() {
      if (stream) stream.getTracks().forEach(track => track.stop());
      stream = undefined;
      video.srcObject = null;
      video.hidden = true;
      empty.hidden = false;
      toggle.textContent = 'Start camera';
      toggle.classList.add('primary');
      status.textContent = 'Camera is off';
    }

    toggle.addEventListener('click', async () => {
      if (stream) { stopCamera(); return; }
      if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent = 'Camera access is unavailable in this browser';
        return;
      }
      toggle.disabled = true;
      status.textContent = 'Waiting for camera permission…';
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        video.srcObject = stream;
        video.hidden = false;
        empty.hidden = true;
        toggle.textContent = 'Stop camera';
        toggle.classList.remove('primary');
        status.textContent = 'Camera is on';
      } catch (error) {
        status.textContent = error.name === 'NotAllowedError' ? 'Allow camera access in your browser to continue' : 'Could not start the camera';
      } finally {
        toggle.disabled = false;
      }
    });

    window.addEventListener('pagehide', stopCamera);
  </script>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(page, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'no-referrer'
      }
    });
  }
};

