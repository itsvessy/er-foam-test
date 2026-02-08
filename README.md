# ER Foam Test Harness

Internal prototype for testing Foamite's ER number selection and foam grade recommendations.

## Features
- ER calculation from inputs (weight/back/firmness, with manual override)
- Mattress-size presets sourced from Foamite defaults, with editable dimensions
- Dimension-aware mattress estimates (width, length, thickness in inches)
- Configurable build constraints (tolerance, top-layer minimum, bottom-layer minimum)
- One-click generation of `Value`, `Performance`, `Long-Life`, and `Foamite Custom Spec` options
- Option selection followed by full layer customization (add/reorder/duplicate/remove)
- Submit generated options plus final customized build to Cloudflare D1

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Cloudflare Pages + D1
1. Create a D1 database in Cloudflare.
2. Bind it to the Pages project as `DB`.
3. Run the schema in the D1 Console using `schema.sql`.

### D1 Schema
See `schema.sql`. It drops and recreates the `submissions` table.

### Submit Endpoint
`POST /api/submit` is handled by `functions/api/submit.js`.

### Environment
Optional: set `VITE_APP_VERSION` during build to tag submissions.

## Data Stored
Each submission includes:
- Raw inputs (weight/back/firmness, mattress size preset, override, dimensions, tolerance, top/bottom minimums)
- Computed metrics (target/actual ER, delta, total thickness, ER depth, estimated price)
- Generated option snapshots (`Value` / `Performance` / `Long-Life` / `Foamite Custom Spec`)
- Selected option key/label
- Final customized layer details and recommendations
- Meta (status, calc version, app version)

## Notes
- Estimated price uses foam `$ / board foot` and full dimensions:
  `layer_price = price_per_bf * (width_in * length_in * layer_thickness_in / 144)`
- Only the top 6 in of layers contribute to ER calculations.
