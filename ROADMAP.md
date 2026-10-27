# Feardetector roadmap

## Product direction

Build an original browser-based scream challenge inspired by the simple “scream and get scored” experience at [scaremeter.app](https://scaremeter.app/). Keep the design, code, copy, and visual identity original.

## Current MVP

- Five-second scream test with a playful 0–100 score.
- Live microphone level meter and short result labels.
- Optional local webcam preview and on-device MediaPipe facial landmarks with mouth-opening, brow-lowering, and eye-widening cues.
- When a face is tracked during the challenge, the final entertainment score combines sound level (55%) and facial expression cues (45%); otherwise it uses sound alone.
- Microphone-only mode if camera access is unavailable.
- Quiet mode that reduces interface motion; no sound effects.
- Camera and microphone access begins only after a user action.
- Audio is analyzed as a live level signal. The app does not record or upload audio or video.
- The score is an entertainment estimate affected by microphone gain, room acoustics, and expression cues, not a calibrated sound-pressure measurement. It cannot reliably identify visible teeth or determine emotions such as anger.

## Next steps

1. **Validate the MVP on real devices.** Check microphone and camera permission flows, mobile layout, browser support, and score behavior across rooms and microphones.
2. **Calibrate the scoring.** Tune the level-to-score curve and explain clearly that input gain affects results.
3. **Add user-controlled clip capture.** Offer an explicit preview/save action using browser recording APIs. Keep clips local by default and explain any sharing before it happens.
4. **Finish quiet mode and accessibility.** Review motion reduction, keyboard use, screen-reader updates, contrast, and safe volume guidance.
5. **Prepare a public launch.** Add privacy and terms pages, error reporting that contains no media, a custom domain if desired, and a final cross-browser pass.
6. **Consider optional features after the core works.** Examples include local best-score history, alternate challenge lengths, and share cards. Keep accounts, uploads, and leaderboards opt-in.

## Architecture

- The repository root page is the app deployed to the feardetector Cloudflare Worker.
- Browser camera capture, Web Audio analysis, and MediaPipe run on-device.
- Cloudflare serves the app; the MVP has no backend media processing, accounts, or media storage.
- The webcam-mirror folder remains a separate mirror Worker prototype.

## Privacy and safety defaults

- Ask for device access only after a user action.
- Do not save or transmit camera or microphone data by default.
- Do not label the score as real decibels or a psychological fear measurement.
- Show a short safety reminder before a scream test; users should avoid shouting close to another person and stop if their throat hurts.
