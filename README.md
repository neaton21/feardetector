# Feardetector

An original browser-based scream challenge and computer-vision demo. The production page is served from the repository root and deployed to Cloudflare Workers at [feardetector.neaton2.workers.dev](https://feardetector.neaton2.workers.dev).

## Current experience

- Five-second microphone challenge with a playful relative scream score.
- Live microphone-level meter.
- Optional webcam preview and on-device MediaPipe facial landmarks.
- Microphone-only fallback when camera access is unavailable.
- No audio/video recording or upload in the MVP; the score is not a calibrated decibel measurement.

## Development

The repository root HTML page is the deployed app. The webcam-mirror folder remains a separate Cloudflare Worker prototype. Pushing changes to main triggers the connected Cloudflare Workers Builds configuration.

See ROADMAP.md for product milestones, architecture, and privacy defaults.
