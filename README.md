# Feardetector

An original browser-based scream challenge and computer-vision demo. The production page is served from the repository root and deployed to Cloudflare Workers at [feardetector.neaton2.workers.dev](https://feardetector.neaton2.workers.dev).

## Current experience

- Five-second microphone challenge with a playful relative scream score.
- Live microphone-level meter.
- Optional webcam preview and on-device MediaPipe facial landmarks with mouth-opening, brow-lowering, and eye-widening cues.
- When a face is tracked during the challenge, the playful final score combines sound level (55%) and facial expression cues (45%); otherwise it uses sound alone.
- Microphone-only fallback when camera access is unavailable.
- No audio/video recording or upload in the MVP. The score is an entertainment estimate, not a calibrated decibel measurement.
- Facial cues cannot reliably detect whether teeth are visible or determine emotions such as anger.

## Development

The repository root HTML page is the deployed app. The webcam-mirror folder remains a separate Cloudflare Worker prototype. Pushing changes to main triggers the connected Cloudflare Workers Builds configuration.

See ROADMAP.md for product milestones, architecture, and privacy defaults.
