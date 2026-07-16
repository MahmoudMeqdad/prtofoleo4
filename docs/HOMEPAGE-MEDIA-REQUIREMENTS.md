# Homepage Media Requirements — IPLAY

Temporary placeholder assets live under `apps/web/public/media/home/`. Replace with final brand photography and licensed video before production launch.

## Utility Bar

| Property | Desktop | Mobile |
|----------|---------|--------|
| Dimensions | Full width × 28–36px | Full width × 28px (simplified copy) |
| Aspect ratio | N/A | N/A |
| Safe text area | Inline start/end aligned to container | Brand abbreviated to “IPLAY” on very small screens |
| Focal point | N/A | N/A |
| Type | Text only | Text only |
| Poster | N/A | N/A |
| Max file size | N/A | N/A |

## Hero (Full-Screen Video)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Dimensions | 1920 × 1080 minimum (cover) | 780 × 1200 minimum (cover) |
| Section height | `100svh − utility bar`, min 700px | Same |
| Aspect ratio | 16:9 preferred | 9:16 alternate crop acceptable |
| Safe text area | Center play control; lower 15% for scroll indicator | Same |
| Focal point | Center-weighted subject | Center or upper-third for faces/products |
| Type | **MP4** (H.264, muted loop) + **poster** (WebP/AVIF/JPEG) |
| Poster | Required — shown before playback and as fallback | Required |
| Max file size | Video ≤ 8 MB (loop), poster ≤ 300 KB | Video ≤ 4 MB, poster ≤ 200 KB |

**Current temp files:** `hero-loop.mp4` (optional), `hero-poster.svg`

## Editorial Introduction

| Property | Desktop | Mobile |
|----------|---------|--------|
| Dimensions | Container max ~90rem, two columns | Single column stack |
| Padding | 100–160px vertical | 80–120px vertical |
| Type | Typography only — no background media | Same |

## Collection Showcases (×6)

Each collection panel uses configuration in `apps/web/src/config/homepage.ts`.

| Property | Desktop | Mobile |
|----------|---------|--------|
| Dimensions | Full width, 68–90vh height | Full width, 65–82svh |
| Aspect ratio | ~16:9 to 3:2 cover | 9:16 or 4:5 when separate mobile asset provided |
| Safe text area | Lower 20% — title start, CTA end | Lower 25%; avoid covering primary subject |
| Focal point | Per-collection (`focalPoint` in config) | Adjust mobile asset focal point separately |
| Type | Image (WebP/AVIF) or muted loop video | Optional dedicated mobile image |
| Poster | Required for video collections | Required |
| Max file size | Image ≤ 500 KB, video ≤ 6 MB | Image ≤ 350 KB |

### Collections (temporary names)

1. **Tiny Worlds** — deep violet mood, light text  
2. **Creative Studio** — warm cream mood, dark text  
3. **Outdoor Fun** — green outdoor mood, light text  
4. **Plush Friends** — pink/plush mood, light text  
5. **Action Zone** — dark energetic mood, light text  
6. **Learning Lab** — soft blue mood, dark text  

**Current temp files:** SVG placeholders in `public/media/home/collections/` marked `IPLAY TEMP`.

## Footer

| Property | Desktop | Mobile |
|----------|---------|--------|
| Dimensions | Full width, white background | Stacked columns |
| Type | Typography, icons, links | Same |
| Certification logos | Omit until official assets exist | Same |

## Performance Notes

- Hero video: `preload="metadata"`, priority poster  
- Below-fold collection images: lazy load via Next.js `Image`  
- Collection videos: load/play only when near viewport; pause when far away  
- Prefer WebP/AVIF for stills; keep SVG placeholders dev-only  

## Asset Checklist Before Launch

- [ ] Final hero loop (licensed/original)  
- [ ] Final hero poster  
- [ ] Six collection desktop images or videos  
- [ ] Mobile crops where composition differs  
- [ ] Remove `IPLAY TEMP` watermark from all production assets  
