# TURBO: the frog whose turbo hose is the market cap

Static, free, GitHub Pages. Live: https://0xrenny.github.io/turbo/

**The gimmick:** a ribbed exhaust hose comes out from behind the mascot and stretches with market cap (length = √mcap × `cmPerSqrtDollar`). Scrolling makes it longer too ("assisted growth"). The camera zooms out as it grows. There's a measuring tape with sarcastic milestones, a RECORD marker (saved in localStorage), comments that change with length, and PUMP/DUMP buttons.

## Market cap feed
`config.js → marketcap`: `start` is the placeholder, `drift` is a simulated random walk, `pump`/`dump` set the button multipliers.
To go live for free, set `marketcap.dexscreener.address` (and `chain`). The site polls `api.dexscreener.com/latest/dex/tokens/<address>` every 30s, uses the most liquid pair, and the badge flips from SIMULATED to LIVE.

## Reskin in 2 minutes
Everything lives in **`config.js`**: name, ticker, image, colors, contract (`"TBA"`), links, the `growth` object (name, scale, milestones, comments) and the section copy.
```bash
python3 tools/reskin.py --name PEPE --ticker '$PEPE' --image ~/pepe.png --accent '#33ff99' --ca 0x...
git commit -am reskin && git push
```
Then rewrite `growth.milestones`, `growth.comments` and `sections` so the jokes fit the new mascot. The hose can become any growing object just by changing its colors and copy.

Local preview: open `index.html` in a browser.
New site per token: `gh repo create 0xrenny/NAME --public`, copy this folder, reskin, push, then Settings → Pages → main / root.
