# PSSGM Perak frontend rebuild — implementation evidence

Validated 2 October 2026. Frontend demo only. All authored identity, membership, event and statistical records are `DEMO_SYNTHETIC`. No backend or production verification service is connected.

## 1. Existing code inspected

- Existing React 19, TypeScript, Vite 8, Tailwind 4, Lucide and Recharts project, including its custom history router, public/member/admin layouts, views, seed records and package configuration.
- Opened all four supplied visual files before implementation: `ui website.jpg`, `ui user.jpg`, `ui admin.jpg`, `logo pssgm.png` in the parent folder.
- Retained existing secondary views and integrated new shared components. The separate `website` Next.js starter was not modified. There is no Git repository in the target directory, so no commit or PR was created.

## 2. Files modified or added

| Area | Files |
|---|---|
| App, styles, build | `src/App.tsx`, `src/index.css`, `src/reference.css`, `src/responsive.css`, `vite.config.ts`, `package.json`, `package-lock.json` |
| Identity and layouts | `src/components/common/Logo.tsx`; `src/components/layout/{EcosystemBar,PublicNavbar,PublicFooter,DashboardShell,MemberLayout,AdminLayout}.tsx` |
| Shared UI | `src/components/ui/DemoUI.tsx`, `src/components/charts/DashboardCharts.tsx` |
| Member components | `src/components/member/{BeltJourney,DigitalMemberCard,ProgramList}.tsx`, `src/components/member/downloadMemberCard.ts` |
| Primary screens | `src/views/public/HomeView.tsx`, `src/views/member/MemberDashboardView.tsx`, `src/views/admin/AdminDashboardView.tsx` |
| Supporting flows | `src/views/member/{MemberCardView,MemberSettingsView}.tsx`, `src/views/admin/AdminProgrammesView.tsx` |
| Demo data/provenance | `src/data/{dashboardData,seedData}.ts`, `src/views/public/{BengkongView,HistoryView}.tsx`, `src/views/admin/AuditTrailView.tsx` |
| Assets and evidence | `public/logo-pssgm.png`, `public/images/reference/*`, `scripts/extract-reference-assets.ps1`, `PRODUCT.md`, `docs/*`, `.impeccable/review/*` |

## 3. Assets used

- The supplied logo is used directly. Source and copied asset SHA-256 match: `90A9267DBB8A18FF021ED38391834CD7C8E17838983E8DA1A5641729AD4FA196`.
- Reference crops supply hero architecture/silat, Air Kuning imagery, fabric, portrait, programme thumbnails and map illustration.
- Belts are individual authored SVG graphics. Charts are real Recharts SVG charts; tables, forms, navigation and cards are real React/HTML/CSS. No full-page screenshot is used as a page background.

## 4. Assets extracted from references

Ten cropped PNGs are recorded with exact source coordinates in [ASSETS.md](ASSETS.md). The extraction script reproduces them. Crops are presentation assets, not historical or geographic evidence.

## 5. Public visual parity status

Implemented utility bar, supplied-logo navigation, four-line headline using **WARISAN SILAT SENI**, hero composite, verification card, Air Kuning section, two feature cards, four ecosystem modules and footer. Desktop section order and composition follow the reference. Mobile stacks the same content and provides an operable menu.

Evidence: [desktop](../.impeccable/review/public-desktop.jpg), [mobile](../.impeccable/review/public-mobile.jpg).

## 6. Member visual parity status

Implemented sidebar/topbar, portrait and profile metadata, four summary cards, six-step belt journey, programmes, announcements, white digital member card and recent activity. Member details and the downloadable card use synthetic identity consistently.

Evidence: [desktop](../.impeccable/review/member-desktop.jpg), [mobile](../.impeccable/review/member-mobile.jpg).

## 7. Admin visual parity status

Implemented command-centre hero, six statistics, trend chart, branch donut, Perak map presentation, approvals table, branch table, quick actions, programmes and activity. Filtering and approval actions change local state.

Evidence: [desktop](../.impeccable/review/admin-desktop.jpg), [mobile](../.impeccable/review/admin-mobile.jpg).

## 8. Interactions tested in the browser

| Interaction | Observed result |
|---|---|
| CMS → Portal and Portal → CMS | Account dropdown navigates to the corresponding dashboard |
| Mobile public navigation | Menu opens; Cari Gelanggang navigates to the directory |
| Mobile member sidebar | Drawer opens; Profil Saya navigates to the profile |
| Global dashboard search | Search for `kad` finds Kad Ahli Digital and opens its route |
| Public membership verification | Default demo record is visible; `DEMO-TIADA-REKOD` produces Tiada Rekod Ditemui |
| Digital card | QR demo modal opens and closes with Escape; SVG downloads successfully with embedded portrait and logo |
| Belt journey | Pelangi Hijau opens its detail/date dialog |
| Programme registration | Registering Latihan Intensif records the registration in local state and shows confirmation |
| Programme tabs | Daftar Acara Baharu replaces registered programmes with available events |
| Admin approval | Ahmad Faris application changes to Diluluskan with a confirmation notice |
| Branch filters | Kinta donut shows 310 members; map summary shows 1 branch, 4 gelanggang, 310 members |
| Trend period | Native selector changes to 6 Bulan Terkini |
| Admin programme creation | `Latihan Demo QA`, `Gelanggang Demo Tapah`, `2026-11-20` added successfully and found using search |
| Report export | CSV file downloaded successfully |

Download files were verified on disk: member-card SVG (190,255 bytes) and branch CSV (219 bytes). No real registration, payment, approval or verification takes place. Session changes may reset when their component unmounts or the page reloads.

## 9. Responsive tests

- Three primary screens visually inspected at 1536px desktop and 390px mobile, with first-pass and corrected captures retained.
- Measured each primary route at **1440, 1280, 1024, 768, 430 and 390px**: all 18 checks report **0 horizontal overflow and 0 broken images**. [Raw results](../.impeccable/review/responsive-checks.json).
- Mobile cards and columns stack; dense tables have their own scroll containers rather than overflowing the page.
- Ten first-pass discrepancies per screen and their fixes are recorded in [VISUAL-COMPARISON.md](VISUAL-COMPARISON.md).

## 10. Install, typecheck and build result

- `npm install`: passed, 221 packages, 0 vulnerabilities at installation time. Resolved Vite's esbuild peer mismatch by updating the direct esbuild development dependency.
- `npm run lint`: passed (`tsc --noEmit`; this script is a TypeScript check, not a separate ESLint suite).
- `npm run build`: passed; 2,281 modules transformed. Latest output: CSS 103.48 kB / gzip 20.64 kB; JavaScript 836.94 kB / gzip 229.65 kB.
- Vite reports a non-blocking chunk-size warning above 500 kB. Route/chart code splitting remains an optimisation opportunity.
- No browser console warnings or errors were observed during the interaction validation.

## 11. Remaining differences and limits

- This is a close reference reconstruction, not a measured claim of exact pixel parity.
- Supplied logo differs from the screenshot emblem; explicit logo instruction takes precedence. WARISAN intentionally replaces PUSAKA.
- Flat screenshots do not contain unobscured original imagery. Cropped heritage composites, fabric scale/blending and the Air Kuning crop edge differ from the references.
- Member hero reuses available heritage imagery; SVG belts and certificate miniatures do not reproduce all raster detail.
- Some font metrics, small spacing and page heights differ. Member/admin full-page content extends slightly beyond the reference proportions.
- The QR graphic is an explicitly identified demo placeholder, not a scannable membership credential. The map is a presentation illustration, not a geospatial service.
- Existing secondary routes retain their prior design except shared-shell, routing and demo-provenance integration. They were not each rebuilt to an unavailable screenshot reference.
- No database, real authentication, payment integration, deployment or persistent cross-route data layer was added.

Local preview: `/`, `/portal`, `/admin` on `http://127.0.0.1:3000`.
