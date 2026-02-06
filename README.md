# ER Foam Test Harness

Internal prototype for testing Foamite's ER number selection and foam grade recommendations.

## Features
- ER calculation from inputs (with manual override + tolerance)
- Layered foam stack with live ER/price updates
- Suggested foam grades with alternates
- Submit builds to Cloudflare D1 for analysis

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
- Raw inputs (weight/back/firmness/budget)
- Computed metrics (target/actual ER, delta, thickness, price)
- Layer details and recommendations
- Meta (calc version, app version, budget thresholds)

## Notes
- Total price is per square foot (price/bf * thickness).
- Only the top 6 in of layers contribute to ER.
