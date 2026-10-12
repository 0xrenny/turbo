# TURBO — sarcastic meme-token site template

Static, client-side only, zero cost. Hosted on GitHub Pages. Live: https://0xrenny.github.io/turbo/

Sections: hero (animated mascot, copy-contract button), lore, tokenomics, how to buy, sarcastic roadmap, the Turbo Button (useless clicker toy), memes, disclaimer footer.

## Reskin in 2 minutes
All branding is in **`config.js`**: name, ticker, image, colors, tagline, contract (`"TBA"` until launch), X/Telegram/DEX links, and every joke.

Quick way:
```bash
python3 tools/reskin.py --name PEPE --ticker '$PEPE' --image ~/pepe.png --accent '#33ff99' --ca 0xABC...
git add -A && git commit -m "reskin" && git push
```
Then open `config.js` and tweak the jokes/lore so they fit the new mascot (they mention "frog"). Square or round images work best (it's shown as a circle).

Preview locally: `python3 -m http.server` then open http://localhost:8000.

New token, new site: `gh repo create 0xrenny/NEWNAME --public` → copy this folder → reskin → push → enable Pages (Settings → Pages → main / root).
