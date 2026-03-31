const fs = require('fs');
let code = fs.readFileSync('scripts/generate-images.mjs', 'utf8');
const startIdx = code.indexOf('const EXHIBITION_IMAGES = [');
const endIdx = code.indexOf('];', startIdx) + 2;
const newArray = `const EXHIBITION_IMAGES = [
  {
    id: "renaissance-cyberpunk",
    thumbPrompt: "Digital painting of a classic Renaissance statue illuminated by vibrant neon pink and cyan lights, cyberpunk city reflections, 3:4 portrait format, high quality digital art",
    heroPrompt: "Wide exhibition gallery showcasing Renaissance art mixed with cyberpunk aesthetics, glowing neon holograms superimposed on classical sculptures, dark ambient lighting, 16:9 panoramic"
  },
  {
    id: "synthwave-abstract",
    thumbPrompt: "Abstract expressionist painting meeting 80s synthwave, bold neon grids and chaotic paint splatters over a black canvas, glowing colors, 3:4 portrait format, gallery wall",
    heroPrompt: "Immersive gallery space filled with 80s synthwave abstract art, glowing neon geometric shapes mixed with chaotic paint splashes on dark walls, 16:9 panoramic exhibition view"
  },
  {
    id: "jazz-korean-ink",
    thumbPrompt: "Korean traditional ink wash painting of a jazz saxophone player, dynamic brush strokes, black ink on white hanji paper with subtle blue hues, 3:4 portrait format",
    heroPrompt: "Exhibition hall showing a fusion of classic jazz and Korean ink art, large hanji paper scrolls with ink wash musicians, double bass and trumpet silhouettes, 16:9 panoramic"
  },
  {
    id: "baroque-glitch",
    thumbPrompt: "Baroque portrait painting with dramatic chiaroscuro lighting disrupted by digital glitch effects, pixelated distortions over a classic face, 3:4 portrait format",
    heroPrompt: "Gallery room exhibiting Baroque paintings with generative glitch art effects, dark walls with dramatic spotlights, digital distortions on canvas, 16:9 panoramic"
  }
];`;
code = code.substring(0, startIdx) + newArray + code.substring(endIdx);
fs.writeFileSync('scripts/generate-images.mjs', code);
