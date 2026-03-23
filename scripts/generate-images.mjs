/**
 * Art Arca — Gemini Nano Banana Image Generation Script
 *
 * 사용법:
 *   GEMINI_API_KEY=your_key node scripts/generate-images.mjs
 *
 * 또는 .env.local 파일 설정 후:
 *   node --env-file=.env.local scripts/generate-images.mjs
 *
 * 옵션:
 *   --only=<id>       특정 전시 ID만 생성 (예: --only=jazz-visions)
 *   --type=thumbs     썸네일만 생성
 *   --type=heroes     히어로 이미지만 생성
 *   --type=icons      카테고리 아이콘만 생성
 *   --type=backgrounds 배경 이미지만 생성
 *   --type=all        전체 생성 (기본값)
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

// ── 모델 설정 ───────────────────────────────────────────────
// Nano Banana 모델: gemini-2.0-flash-exp-image-generation (기본)
// 환경변수로 오버라이드 가능: GEMINI_MODEL=gemini-3.1-flash-image-preview
const MODEL_ID =
  process.env.GEMINI_MODEL || "gemini-2.0-flash-exp-image-generation";

// ── CLI 옵션 파싱 ────────────────────────────────────────────
const args = process.argv.slice(2);
const onlyId = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const typeArg = args.find((a) => a.startsWith("--type="))?.split("=")[1] ?? "all";

// ── 이미지 생성 데이터 ────────────────────────────────────────

/** @type {Array<{id: string, thumbPrompt: string, heroPrompt: string}>} */
const EXHIBITION_IMAGES = [
  {
    id: "silence-and-form",
    thumbPrompt:
      "Korean minimalist abstract painting on white gallery wall, Dansaekhwa movement style, subtle ink washes and geometric negative space, warm gallery lighting, 3:4 portrait format, professional art photography, soft beige and grey tones, gallery card thumbnail",
    heroPrompt:
      "Wide view Korean minimalist painting exhibition, multiple large canvases with ink wash and geometric forms on white walls, quiet contemplative gallery atmosphere, Dansaekhwa aesthetic, natural warm ambient lighting, 16:9 panoramic gallery photograph",
  },
  {
    id: "urban-fragments",
    thumbPrompt:
      "Black and white documentary street photography print framed in gallery, Seoul urban textures showing wall cracks and dramatic light shadows, archival photography aesthetic, 3:4 portrait format, fine art print quality",
    heroPrompt:
      "Photography exhibition installation, series of black and white city photographs arranged on white gallery walls, Seoul urban fragments documentary series, gallery corridor perspective, 16:9 wide exhibition view",
  },
  {
    id: "material-memory",
    thumbPrompt:
      "Industrial sculpture installation, rusted iron and weathered concrete art object on white gallery floor, time and decay aesthetic, dramatic directional lighting, 3:4 portrait format, contemporary Korean sculpture exhibition",
    heroPrompt:
      "Large scale industrial materials installation art in spacious gallery, multiple weathered metal sculptures and concrete forms, environmental art exhibition, wide panoramic gallery view 16:9, contemporary Korean sculpture show",
  },
  {
    id: "threshold",
    thumbPrompt:
      "Three-channel video art installation in darkened gallery space, three glowing screens showing abstract border and identity imagery, atmospheric blue and amber light, 3:4 portrait format, immersive media art",
    heroPrompt:
      "Immersive multi-channel video installation in dark gallery, three large projection screens with overlapping identity narratives, visitors silhouetted against glowing screens, 16:9 wide atmospheric gallery view",
  },
  {
    id: "spring-dialogue",
    thumbPrompt:
      "Contemporary Korean group art exhibition, colorful diverse paintings and mixed media works on white gallery walls, vibrant spring atmosphere, 3:4 portrait format, multiple artworks visible, Spring art show",
    heroPrompt:
      "Bright spacious gallery hall with spring group exhibition, diverse contemporary artworks by multiple Korean artists, paintings sculptures and installations, natural spring light flooding gallery windows, 16:9 panoramic exhibition view",
  },
  {
    id: "echo-chamber",
    thumbPrompt:
      "Sound art installation in white gallery, geometric speaker array and acoustic architecture, abstract audio waveform visualization projected on walls, 3:4 portrait format, contemporary interactive sound installation",
    heroPrompt:
      "Architectural sound installation gallery space, precision speaker system forming geometric patterns, ambient sound waves visualized as light patterns on gallery walls, visitors experiencing immersive audio environment, 16:9 wide gallery photograph",
  },
  {
    id: "jazz-visions",
    thumbPrompt:
      "1940s jazz club atmospheric painting, saxophone player bathed in blue and amber spotlight, Art Deco style expressionist brushwork, deep shadows and warm stage light, music art print in gallery frame, 3:4 portrait format, jazz era atmosphere",
    heroPrompt:
      "Jazz era music art exhibition gallery, large expressive paintings of jazz musicians on white walls, trumpet piano saxophone depicted in bold colors and gestural brushstrokes, 1920s-1950s American music culture art, 16:9 wide gallery photograph",
  },
  {
    id: "renaissance-echoes",
    thumbPrompt:
      "Italian Renaissance style painting reproduction in museum frame, classical architectural perspective with warm golden Florentine light, Raphael-inspired figurative composition, rich oil paint textures, 3:4 portrait format, museum quality classical painting",
    heroPrompt:
      "Renaissance art exhibition gallery with classical paintings in ornate gilded frames, warm gallery spotlights on 15th-16th century Italian master reproductions, architectural arches and classical sculpture, 16:9 wide museum exhibition view",
  },
  {
    id: "minhwa-now",
    thumbPrompt:
      "Korean traditional Minhwa folk painting, vibrant tiger and peony composition on hanji paper, Joseon dynasty colors in jade green vermilion indigo and gold, flat decorative bold outlines, 3:4 portrait format, traditional Korean folk art gallery card",
    heroPrompt:
      "Korean Minhwa folk painting contemporary exhibition, multiple colorful traditional artworks on gallery walls showing tigers deer mountain spirits and floral motifs, traditional Korean colors meeting white gallery space, 16:9 wide exhibition view",
  },
  {
    id: "impressionist-moments",
    thumbPrompt:
      "Impressionist landscape oil painting of Korean scenery, loose painterly brushstrokes capturing dappled afternoon light through forest, warm Monet-influenced color palette, visible impasto texture, 3:4 portrait format, impressionist art gallery",
    heroPrompt:
      "Impressionist painting exhibition with Korean landscapes, multiple large oil paintings showing mountains forest and water scenes with loose painterly technique, natural gallery lighting echoing the painted sunlight, 16:9 panoramic exhibition photograph",
  },
  {
    id: "baroque-shadows",
    thumbPrompt:
      "Baroque dramatic chiaroscuro oil painting, Caravaggio-style portrait with luminous face emerging from deep shadows, rich jewel tones and dark background, tenebrism lighting technique, 3:4 portrait format, museum quality Baroque painting reproduction",
    heroPrompt:
      "Baroque art exhibition in dramatic gallery space, dark oil paintings with powerful chiaroscuro lighting in ornate frames, theatrical gallery lighting enhancing Rembrandt and Caravaggio-inspired works, 16:9 wide atmospheric exhibition view",
  },
  {
    id: "electronic-fields",
    thumbPrompt:
      "Electronic music visualization art, flowing colorful audio waveform patterns and synthesizer circuit aesthetics, neon cyan magenta and electric blue on deep black background, generative digital art print, 3:4 portrait format, contemporary music technology art",
    heroPrompt:
      "Electronic and experimental music art gallery, large digital visualizations of sound waves and electronic music structures displayed on screens and printed panels, contemporary digital art meets music technology, 16:9 wide futuristic gallery view",
  },
  {
    id: "abstract-expressions",
    thumbPrompt:
      "Abstract Expressionist large canvas, bold gestural black brushstrokes with deep cobalt and raw sienna, Franz Kline and Motherwell inspired action painting, energetic mark-making, 3:4 portrait format, New York School style painting in gallery",
    heroPrompt:
      "Abstract Expressionism gallery exhibition, multiple large scale paintings with dramatic gestural marks and color fields, action painting aesthetic, high white gallery walls with bold works, 1950s-1960s New York School influence, 16:9 wide gallery view",
  },
  {
    id: "korean-classical-music",
    thumbPrompt:
      "Korean traditional gayageum zither instrument, close-up artistic photography, warm maple wood and silk strings detail, traditional Korean craft and musical heritage, 3:4 portrait format, cultural artifact photography, museum quality",
    heroPrompt:
      "Korean traditional music exhibition, Joseon era instruments including gayageum geomungo haegeum and janggu arranged with cultural artifacts and calligraphy, warm wood tones against white gallery walls, 16:9 wide museum exhibition photograph",
  },
];

/** @type {Array<{name: string, slug: string, prompt: string}>} */
const CATEGORY_ICONS = [
  {
    name: "회화 / Painting",
    slug: "painting",
    prompt:
      "Minimal flat icon of artist palette and fine brush, stone grey and warm beige color scheme, clean geometric design, art gallery icon style, white background, square format, simple elegant symbol",
  },
  {
    name: "사진 / Photography",
    slug: "photography",
    prompt:
      "Minimal flat icon of camera lens aperture, stone grey outline on white background, clean geometric circle design, photography art gallery icon, square format, simple elegant symbol",
  },
  {
    name: "조각 / Sculpture",
    slug: "sculpture",
    prompt:
      "Minimal flat icon of abstract three-dimensional sculptural form, stone grey geometric shape, clean minimalist design, art gallery icon style, white background, square format",
  },
  {
    name: "영상 / Video Art",
    slug: "video-art",
    prompt:
      "Minimal flat icon of play button inside film frame, stone grey on white background, clean geometric design, video art gallery icon, square format, simple elegant symbol",
  },
  {
    name: "단체전 / Group Show",
    slug: "group-show",
    prompt:
      "Minimal flat icon of three overlapping geometric shapes representing multiple artists, stone grey tones, clean minimal design, group exhibition icon, white background, square format",
  },
  {
    name: "사운드아트 / Sound Art",
    slug: "sound-art",
    prompt:
      "Minimal flat icon of audio waveform lines, stone grey on white background, clean geometric sound wave design, sound art gallery icon, square format, simple elegant symbol",
  },
  {
    name: "음악 / Music Art",
    slug: "music",
    prompt:
      "Minimal flat icon of musical note with artistic flourish, stone grey and warm beige, clean geometric design, music art gallery icon, white background, square format, simple elegant symbol",
  },
  {
    name: "회화 / Classical Painting",
    slug: "classical-painting",
    prompt:
      "Minimal flat icon of ornate picture frame, stone grey outline, clean geometric classical art design, art gallery icon style, white background, square format",
  },
  {
    name: "회화 / Folk Painting",
    slug: "folk-painting",
    prompt:
      "Minimal flat icon of traditional Korean folk art motif, simplified tiger or peony, warm terracotta and stone tones, clean minimalist design, white background, square format",
  },
];

/** @type {Array<{name: string, slug: string, prompt: string}>} */
const BACKGROUNDS = [
  {
    name: "Homepage Hero",
    slug: "hero",
    prompt:
      "Elegant empty art gallery interior, high white ceilings with skylights, white walls and polished concrete floor, warm soft natural light, architectural photography, minimalist gallery atmosphere, 16:9 wide format, no people, quiet contemplative space",
  },
  {
    name: "About Page",
    slug: "about",
    prompt:
      "Fine art paper texture close-up, warm cream and beige handmade paper with subtle fiber patterns, soft diffused light, neutral art material background, high resolution texture, minimal and elegant",
  },
  {
    name: "Exhibitions Header",
    slug: "exhibitions",
    prompt:
      "Abstract warm beige linen canvas texture, subtle woven pattern, neutral art material background, soft even lighting, elegant minimal texture for gallery website, wide format",
  },
];

// ── 유틸리티 ────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function alreadyExists(filePath) {
  return fs.existsSync(filePath);
}

// ── Gemini 이미지 생성 ────────────────────────────────────────

async function generateImage(genAI, prompt, outputPath, label) {
  if (alreadyExists(outputPath)) {
    console.log(`  ⏭  이미 존재: ${path.basename(outputPath)}`);
    return true;
  }

  console.log(`  🎨 생성 중: ${label}`);

  const model = genAI.getGenerativeModel({ model: MODEL_ID });

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const parts = result.response?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart?.inlineData) {
      console.warn(`  ⚠️  이미지 데이터 없음: ${label}`);
      return false;
    }

    const { data, mimeType } = imagePart.inlineData;
    const ext = mimeType === "image/png" ? "png" : "jpg";
    const finalPath = outputPath.replace(/\.(jpg|png)$/, `.${ext}`);

    ensureDir(path.dirname(finalPath));
    fs.writeFileSync(finalPath, Buffer.from(data, "base64"));
    console.log(`  ✅ 저장: ${path.relative(ROOT, finalPath)}`);
    return true;
  } catch (err) {
    const msg = err?.message ?? String(err);
    // API rate limit 처리
    if (msg.includes("429") || msg.includes("quota")) {
      console.warn(`  ⏳ Rate limit — 60초 대기 후 재시도...`);
      await sleep(60_000);
      return generateImage(genAI, prompt, outputPath, label);
    }
    console.error(`  ❌ 실패 (${label}): ${msg}`);
    return false;
  }
}

// ── 메인 ────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY 환경변수가 필요합니다.");
    console.error(
      "   GEMINI_API_KEY=your_key node scripts/generate-images.mjs"
    );
    console.error(
      "   또는 .env.local 파일에 GEMINI_API_KEY=your_key 설정 후"
    );
    console.error(
      "   node --env-file=.env.local scripts/generate-images.mjs"
    );
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  console.log(`\n🖼  Art Arca — Gemini Image Generator`);
  console.log(`   모델: ${MODEL_ID}`);
  console.log(`   타입: ${typeArg}${onlyId ? ` | 전시: ${onlyId}` : ""}\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  const count = (ok) => (ok ? generated++ : failed++);

  // 1. 전시 썸네일 & 히어로 이미지
  if (typeArg === "all" || typeArg === "thumbs" || typeArg === "heroes") {
    console.log("━━━ 전시 이미지 생성 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    const items = onlyId
      ? EXHIBITION_IMAGES.filter((e) => e.id === onlyId)
      : EXHIBITION_IMAGES;

    for (const ex of items) {
      console.log(`\n[${ex.id}]`);

      if (typeArg === "all" || typeArg === "thumbs") {
        const thumbPath = path.join(
          IMAGES_DIR,
          "exhibitions",
          `${ex.id}-thumb.jpg`
        );
        count(await generateImage(genAI, ex.thumbPrompt, thumbPath, "thumbnail"));
        await sleep(2_000); // API 속도 제한 방지
      }

      if (typeArg === "all" || typeArg === "heroes") {
        const heroPath = path.join(
          IMAGES_DIR,
          "exhibitions",
          `${ex.id}-hero.jpg`
        );
        count(await generateImage(genAI, ex.heroPrompt, heroPath, "hero"));
        await sleep(2_000);
      }
    }
  }

  // 2. 카테고리 아이콘
  if (typeArg === "all" || typeArg === "icons") {
    console.log("\n━━━ 카테고리 아이콘 생성 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (const icon of CATEGORY_ICONS) {
      const iconPath = path.join(IMAGES_DIR, "icons", `${icon.slug}.png`);
      count(
        await generateImage(genAI, icon.prompt, iconPath, `아이콘: ${icon.name}`)
      );
      await sleep(2_000);
    }
  }

  // 3. 배경 이미지
  if (typeArg === "all" || typeArg === "backgrounds") {
    console.log("\n━━━ 배경 이미지 생성 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (const bg of BACKGROUNDS) {
      const bgPath = path.join(IMAGES_DIR, "backgrounds", `${bg.slug}.jpg`);
      count(await generateImage(genAI, bg.prompt, bgPath, `배경: ${bg.name}`));
      await sleep(2_000);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`완료: ✅ ${generated}개 생성 | ⏭ ${skipped}개 스킵 | ❌ ${failed}개 실패`);
  if (generated > 0) {
    console.log(`\n다음 단계: npm run build\n`);
  }
}

main().catch((err) => {
  console.error("스크립트 오류:", err);
  process.exit(1);
});
