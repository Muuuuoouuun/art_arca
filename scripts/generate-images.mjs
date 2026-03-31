/**
 * Art Hub 4.0: Iconic Masterpiece Edition — Image Generation Script
 * Infusing the UI with iconic 3D artworks and musical instruments.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

const MODEL_ID = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp-image-generation";

const EXHIBITION_IMAGES = [
  {
    id: "afrofuturism-disco",
    thumbPrompt: "A high-fidelity 3D glass sculpture of a person with a massive golden afro, translucent chrome textures, dancing in a dark void with neon purple glows, cinematic macro shot, Octane render, 8k, photorealistic.",
    heroPrompt: "A cinematic 3D hero scene of a futuristic disco club in deep space, dance floor made of floating glass tiles, high-fidelity 3D metallic assets, cinematic lighting, deep black background with subtle background glows, 21:9 panoramic, masterpiece.",
    objectPrompt: "Macro shot of a high-fidelity 3D Chrome Afrofuturist Mask, liquid metal texture reflecting cosmic nebulae, iridescent oil-slick sheen, volumetric lighting, on a pure solid black background, Octane render, Unreal Engine 5 style."
  },
  {
    id: "ukiyo-e-grunge",
    thumbPrompt: "A 3D art object: a samurai bust made of cracked porcelain and denim textures, traditional Japanese patterns meeting gritty grunge aesthetics, Octane render, deep black background, sharp lighting.",
    heroPrompt: "A sprawling Edo-period cityscape reimagined as a high-fidelity 3D scene, floating neon Kanji signs, rain-slicked glass streets, cinematic fog, octane render, 21:9 panoramic, highly detailed.",
    objectPrompt: "A high-fidelity 3D Shattered Porcelain Electric Guitar, intricate blue and white traditional patterns, visible glitch artifacts made of floating shards, macro texture shot of cracked ceramic, Unreal Engine 5 render, cinematic lighting, on a pure solid black background."
  },
  {
    id: "nature-bio-art",
    thumbPrompt: "High-fidelity 3D asset of a translucent bioluminescent flower, glowing internal fiber optics, macro shot, deep black background, cinematic lighting, 4k render.",
    heroPrompt: "A cinematic immersive art gallery with massive 3D bioluminescent organic structures, floating DNA helices made of glowing moss and liquid glass, octane render, 21:9 panoramic, atmospheric lighting.",
    objectPrompt: "A high-fidelity 3D Bioluminescent Glass Cello, translucent frosted glass body filled with pulsing neon microorganisms and organic veins, macro shot of vibrant wood grain-like light patterns, Octane render, ethereal glow, on a pure solid black background."
  },
  {
    id: "architecture-hiphop",
    thumbPrompt: "3D render of a brutalist concrete pillar with a levitating golden 'crown', sharp geometric shadows, cinematic lighting, deep black background, architectural masterpiece.",
    heroPrompt: "A cinematic 3D hero scene of a futuristic urban plaza, massive raw concrete monoliths, wide-angle shot, golden light flares, floating 3D subwoofers, octane render, 21:9 panoramic.",
    objectPrompt: "A high-fidelity 3D Brutalist Concrete Boombox, heavy raw concrete texture with sharp edges, polished brass control knobs, macro shot of the porous stone texture, volumetric lighting, Octane render, cinematic shadows, on a pure solid black background."
  },
  {
    id: "cyberpunk-hanbok",
    thumbPrompt: "High-fidelity 3D fashion asset: a transparent tech-wear Hanbok with glowing fiber optic threads, floating in a dark space, cinematic neon lighting, octane render.",
    heroPrompt: "A futuristic 3D scene of a Korean palace, traditional eaves with holographic projections, cinematic lighting, floating 3D lanterns, octane render, 21:9 panoramic, deep black background.",
    objectPrompt: "A high-fidelity 3D Fiber-Optic Jade Norigae, traditional jade pendant texture with internal data streams and glowing circuits, macro shot of polished jade and neon light, Unreal Engine 5 style, cinematic, on a pure solid black background."
  },
  {
    id: "surreal-ambient",
    thumbPrompt: "A high-fidelity 3D glass piano floating in deep blue liquid with clouds inside the glass, cinematic macro shot, octane render, dreamlike atmosphere.",
    heroPrompt: "A cinematic 3D surreal landscape, giant floating melting clock faces made of liquid chrome, infinite horizon, soft pastel glows, octane render, 21:9 panoramic.",
    objectPrompt: "A high-fidelity 3D Floating Melting Vinyl record, warping like a liquid clock, iridescent chrome surface, macro shot of liquid metal ripples, Octane render, surreal volumetric lighting, on a pure solid black background."
  },
  {
    id: "vaporwave-renaissance",
    thumbPrompt: "A high-fidelity 3D glass sculpture of a David head with neon wires inside, macro shot, octane render, deep black background, iridescent textures.",
    heroPrompt: "A 3D virtual paradise of Greek columns and neon palm trees, wireframe mountains, statues glitching into 3D voxels, cinematic lighting, octane render, 21:9 panoramic.",
    objectPrompt: "A high-fidelity 3D Abstract Marble David Head, classical white marble texture with golden 'Kintsugi' cracks and neon wireframe glitches, macro shot of marble grain, Unreal Engine 5 render, cinematic lighting, on a pure solid black background."
  },
  {
    id: "techno-minimalism",
    thumbPrompt: "A single sharp red laser beam hitting a high-fidelity 3D polished chrome cube, minimal composition, cinematic lighting, deep black void, 4k render.",
    heroPrompt: "A cinematic dark industrial hall with a grid of 3D light pillars, smoke and liquid glass reflections, octane render, 21:9 panoramic, stark minimalism.",
    objectPrompt: "A high-fidelity 3D Monolithic Slate Turntable, razor-sharp obsidian texture, glowing red laser stylus, macro shot of polished dark stone, minimal composition, cinematic volumetric lighting, on a pure solid black background, Octane render."
  },
  {
    id: "opera-streetart",
    thumbPrompt: "3D art object: a gold-framed opera stage with 3D spray-painted textures, floating graffiti elements, cinematic lighting, deep black background.",
    heroPrompt: "A cinematic 3D hero scene of a grand opera house, classical architecture merged with high-fidelity 3D graffiti assets, octane render, 21:9 panoramic, grand and chaotic.",
    objectPrompt: "A high-fidelity 3D Gilded Spray-Painted Harp, ornate gold textures dripping with vibrant neon street-art spray paint, macro shot of metallic gold vs matte paint, Octane render, cinematic high-contrast lighting, on a pure solid black background."
  },
  {
    id: "folk-indie-popart",
    thumbPrompt: "High-fidelity 3D sculpt of a traditional Korean shamanic mask with candy-colored glass textures, cinematic macro shot, octane render, deep black background.",
    heroPrompt: "A cinematic 3D garden with oversized wildflower sculptures, traditional Korean 'Dancheong' patterns on 3D objects, octane render, 21:9 panoramic, joyful and high-impact.",
    objectPrompt: "A high-fidelity 3D Holographic Mudang Fan, traditional bamboo frame with iridescent holographic paper shimmering in pop-art colors, macro shot of light diffraction, Unreal Engine 5 render, cinematic lighting, on a pure solid black background."
  }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateImage(genAI, prompt, outputPath, label) {
  console.log(`  🎨 생성 중: ${label}`);
  const model = genAI.getGenerativeModel({ model: MODEL_ID });

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const parts = result.response?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart?.inlineData) {
      console.warn(`  ⚠️  이미지 데이터 없음: ${label}`);
      return false;
    }

    const { data } = imagePart.inlineData;
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, Buffer.from(data, "base64"));
    console.log(`  ✅ 저장: ${path.relative(ROOT, outputPath)}`);
    return true;
  } catch (err) {
    const msg = err?.message ?? String(err);
    if (msg.includes("429") || msg.includes("quota")) {
      console.warn(`  ⏳ Rate limit — 60초 대기 후 재시도...`);
      await sleep(60_000);
      return generateImage(genAI, prompt, outputPath, label);
    }
    console.error(`  ❌ 실패 (${label}): ${msg}`);
    return false;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY 환경변수가 필요합니다.");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  console.log(`\n🖼  Art Hub 4.0 — Image Generator (Iconic Masterpiece Edition)`);

  for (const ex of EXHIBITION_IMAGES) {
    console.log(`\n[${ex.id}]`);
    
    // 1. Thumbnail (SKIPPED in 4.1)
    // const thumbPath = path.join(IMAGES_DIR, "exhibitions", `${ex.id}-thumb.jpg`);
    // await generateImage(genAI, ex.thumbPrompt, thumbPath, "thumbnail");
    // await sleep(2000);

    // 2. Hero (SKIPPED in 4.1)
    // const heroPath = path.join(IMAGES_DIR, "exhibitions", `${ex.id}-hero.jpg`);
    // await generateImage(genAI, ex.heroPrompt, heroPath, "hero");
    // await sleep(2000);

    // 3. Iconic Object (NEW for 4.0, UPDATED for 4.1 pure black)
    const objName = ex.objectPrompt.match(/3D (.*?),/)?.[1]?.toLowerCase().replace(/\s+/g, "-") || ex.id;
    // Actually using a simpler mapping for object paths to match data.ts
    const objectMap = {
      "afrofuturism-disco": "chrome-mask",
      "ukiyo-e-grunge": "porcelain-guitar",
      "nature-bio-art": "bio-cello",
      "architecture-hiphop": "concrete-boombox",
      "cyberpunk-hanbok": "neon-norigae",
      "surreal-ambient": "melting-vinyl",
      "vaporwave-renaissance": "marble-david",
      "techno-minimalism": "slate-turntable",
      "opera-streetart": "neon-harp",
      "folk-indie-popart": "holographic-fan"
    };
    
    const objFileName = objectMap[ex.id] || ex.id;
    const objPath = path.join(IMAGES_DIR, "objects", `${objFileName}.webp`);
    await generateImage(genAI, ex.objectPrompt, objPath, "iconic-object");
    await sleep(2000);
  }
}

main().catch(console.error);
