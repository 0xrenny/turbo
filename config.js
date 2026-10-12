// ===== ALL BRANDING + THE GIMMICK LIVE HERE. Edit this file to reskin. =====
window.TOKEN = {
  name: "TURBO",
  ticker: "$TURBO",
  image: "assets/mascot.png",
  colors: { bg: "#0b0a08", ink: "#f3eee2", accent: "#ffcf2e", hose: "#c9c2b2", flame: "#ff7a1a", dim: "#8d877a" },
  contract: "TBA",
  links: { x: "https://x.com/", telegram: "https://t.me/", dex: "https://dexscreener.com/" },
  tagline: "A frog whose turbo hose is the market cap. Live. Unfortunately.",

  // ---- Market cap feed ----
  marketcap: {
    start: 42000,            // placeholder mcap (USD) until a real feed exists
    drift: 0.004,            // simulated random walk per tick (0 = off)
    pump: 1.18,              // multiplier per PUMP press
    dump: 0.8,               // multiplier per DUMP press
    // Free DexScreener feed: set address (and keep contract in sync) and it goes live, polled every 30s.
    dexscreener: { chain: "robinhood", address: "TBA" }
  },

  // ---- The growth object ----
  growth: {
    object: "turbo hose",
    unit: "cm",
    cmPerSqrtDollar: 0.5,    // length = sqrt(mcap) * this  ->  $42k ≈ 1 m, $1M ≈ 5 m, $1B ≈ 158 m
    scrollBonusCm: 0.6,      // extra length per scrolled px ("assisted growth")
    milestones: [
      [10,   "decorative"],
      [50,   "functional, technically"],
      [100,  "average (we checked)"],
      [250,  "above average"],
      [500,  "pls stop measuring"],
      [1000, "compensating for something"],
      [3000, "visible from the parking lot"],
      [10000,"needs its own zip code"],
      [100000,"noticed by NASA"],
      [1000000,"orbital hazard"]
    ],
    comments: [
      [0,    "It's cold in space, okay?"],
      [30,   "Size isn't everything. Says the chart."],
      [80,   "Respectable. Mom would be proud. Mom doesn't know."],
      [150,  "Turbo is now walking differently."],
      [300,  "HR has been notified."],
      [600,  "The hose has its own Telegram now."],
      [1500, "Frog requests a bigger helmet. Denied."],
      [5000, "Air traffic control is asking questions."],
      [20000,"Scientists: 'that's not aerodynamic'. Turbo: 'it is now'."],
      [200000,"It has achieved escape velocity. The frog has not."]
    ],
    shrinkComments: ["Shrinkage. It's the vacuum of space.", "Paper hands did this.", "It's a grower, not a show-er."]
  },

  sections: {
    lore: "Turbo was strapped to a rocket and given exactly one feature: a hose that grows when people believe in him. There is no fuel. There is only market cap.",
    facts: [
      ["Supply", "1,000,000,000", "a big number for a big boy"],
      ["Tax", "0%", "we tax dignity instead"],
      ["LP", "Burned", "it was getting too long anyway"],
      ["Team", "0%", "frog works for length, not money"]
    ],
    buy: ["Get a wallet. Hide the seed phrase from your ex.", "Get ETH on Robinhood Chain.", "Paste the CA on a DEX. Triple-check it.", "Swap. Watch it grow. Tell no one."],
    roadmap: [["1 m", "Launch. Measure. Brag."], ["10 m", "CEX listing (Cousin's Exchange)."], ["100 m", "Hose crosses the Kármán line."], ["∞", "Turbo finally leaves the launchpad. Hose stays."]]
  }
};
