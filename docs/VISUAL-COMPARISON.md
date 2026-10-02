# Reference comparison log

Primary comparison viewport: 1536px; public/admin approximate 16:9, member 3:2. References are 1672x941 (public/admin) and 1536x1024 (member). Source images were opened before edits.

## Repository inspection
React 19 + TypeScript, Vite 8, Tailwind 4, Lucide, Recharts. Custom history-based router in src/App.tsx. Existing public, member and admin views retained outside the three primary screens. Mock records: src/data/seedData.ts. There were no standalone heritage, portrait or map source assets beyond the four supplied reference files and a copied logo. The other website directory is a separate Next.js starter and was not modified. No Git repository was present in the target directory.

## Public — ten largest first-pass discrepancies
1. Verification card exceeded hero height; reduced logo, type gaps and inner padding.
2. Songket presentation crop enlarged its pattern excessively; switched to bounded fill with lower opacity.
3. Air Kuning building appeared too large; reduced image scale.
4. Air Kuning source crop contained caption pixels; cropped below baked caption.
5. Headline tracking was too tight; widened tracking and retained exact four-line WARISAN copy.
6. Body copy measure and font were too small; adjusted to 14px and 465px at desktop.
7. Outline buttons had a second Tailwind outline; explicitly removed resting outline and kept keyboard focus outline.
8. Footer identity wrapped across too many lines; condensed footer brand typography.
9. Verification microcopy claimed government verification without supplied evidence; replaced with reference-content attribution.
10. Heritage/module text density differed; adjusted scale while preserving section heights and four module columns.

## Member — ten largest first-pass discrepancies
1. Reused heritage composite was too large and bright behind member identity; resized and deepened left vignette.
2. Profile metadata was too small; increased scale and retuned gaps.
3. Member card portrait sat too low; raised portrait/QR column.
4. Member card heritage header was too bright; strengthened dark overlay.
5. Belt captions were too small; increased font scale and weight hierarchy.
6. Active belt had a duplicate outer outline; replaced with inset accent.
7. Program titles and descriptions were too small; increased text scale and adjusted image width.
8. Announcement titles were too small; increased text size.
9. Activity panel stretched too far below reference; removed flex growth and reduced row padding.
10. Sidebar fabric was excessively magnified; reduced opacity and bounded its sizing.

## Admin — ten largest first-pass discrepancies
1. Hero composite had a hard left seam; enlarged crop slightly and widened vignette.
2. Sidebar fabric was too large and bright; bounded sizing and reduced opacity.
3. Headline width was too narrow; relaxed tracking.
4. Approval rows were too tall because icon button line-height expanded cells; fixed action height and row density.
5. Branch table row density differed; constrained row heights.
6. Table fonts were too small; increased text and status labels.
7. Chart legend was too small; increased font and retuned line spacing.
8. Map backdrop was too bright; increased dark overlay.
9. Quick-action labels were too small; increased font scale.
10. Program/activity text was too small; increased font scale.

## Known intentional differences
- The supplied logo differs from the emblem in the screenshot; supplied asset is authoritative and byte-identical.
- WARISAN replaces PUSAKA in the public headline, per explicit instruction.
- QR is an explicitly labelled demo placeholder, not a verification service.
- Some data and dates differ to keep synthetic identity and 2026 demo context consistent.
- Exact hidden background pixels cannot be recovered from flat screenshots; presentation-only crops, gradients and separate real components approximate those regions.
- Belt graphics are authored SVG geometry; certificate thumbnails are decorative miniatures.

## Evidence
First-pass captures: .impeccable/review/*-pass1.jpg.
Corrected captures: .impeccable/review/*-desktop.jpg and *-mobile.jpg.
Breakpoint and interaction evidence is recorded during final browser validation.
