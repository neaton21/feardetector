# Webcam Mirror

A small Cloudflare Worker that serves a browser-only webcam mirror. Press **Start camera** and grant camera permission; use **Mirror image** to switch the horizontal flip. The camera stream stays in the browser and is stopped when you stop the camera or leave the page.

## Deploy

This Worker is deployed as `webcam-mirror` in Cloudflare. To deploy later with Wrangler, run `npx wrangler deploy` from this directory after authenticating Wrangler with the same Cloudflare account.

