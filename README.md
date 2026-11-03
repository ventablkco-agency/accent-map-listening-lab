# The Accent Lab — Project 03

Static mobile-first listening site with ten accent pages and two audio samples per accent (20 MP3 files total). No backend, database, login or API required.

## Standard scripts
1. I think the water is rather warm, but the bath feels much better.
2. Yesterday, I travelled by car to the market and bought a large bottle of water.

The exact same two sentences must be used for all ten accents. See `ELEVENLABS-20-RECORDING-GUIDE.md` for voice-design prompts, settings, file names and QC.

## Audio files
Place all 20 MP3s in `audio/` using the exact names in the guide, e.g. `british-01.mp3`, `british-02.mp3`, through `indian-english-02.mp3`. The site does not contain fabricated audio; missing files show a helpful message.

## Local test
Run `python -m http.server 8000` from this folder, then open `http://localhost:8000`.

## Deploy
Deploy this folder as a static site to Cloudflare Pages, Netlify or another HTTPS static host. No build command is required; output directory is the project root.

## QR codes
After deployment, run:
`python -m pip install "qrcode[pil]"`
`python qr/generate_qr.py https://YOUR-SITE.pages.dev`

The generator creates ten individual QR codes and an A4 print sheet. Generate QR codes only after the final HTTPS URL is known.
