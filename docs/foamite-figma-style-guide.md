# Foamite Main Body Style Guide (Designer Handoff)

This version is intentionally scoped to the **main content area** only (`<main>`). It excludes global header/footer branding bars and navigation chrome.

## 1. Scope + Source Priority

Use this order when applying styles:
1. **Live Foamite component styles** (highest priority)
2. **Live Foamite theme tokens** (Blocksy + Foamite plugin + MUI app theme)
3. **Provided screenshots** (`/Users/vessy/foamite/er-foam-test/screens/*.png`) for components not found live

If a component only exists in screenshots and not on public pages, it is called out in Section 7.

## 2. Foundations (Main Body)

### 2.1 Color tokens
Use these in Figma Variables first.

- `main.bg.canvas`: `#F8FAFC` (screenshot flow background)
- `main.bg.surface`: `#FFFFFF`
- `main.text.primary`: `#111518` (theme palette 4)
- `main.text.secondary`: `#757575` (theme palette 3)
- `main.text.form`: `#2E313F` (live configurator helper/select text)
- `main.text.headingGreen`: `#00703C` (live configurator field labels/step titles)
- `main.text.placeholder`: `main.text.primary` at `60%` opacity
- `main.link.primary`: `#145AE2` (theme palette 1)
- `main.brand.blue`: `#3F57B2` (tabs/active states in live + screenshots)
- `main.brand.green`: `#3FB549` (live primary commerce CTA)
- `main.border.default`: `#E5E7EB`
- `main.border.soft`: `#EAECF0`
- `main.state.success.bg`: `#ECF8ED`
- `main.state.success.border`: `#80CE86`
- `main.state.success.text`: `#3FB549`

### 2.2 Typography tokens
Foamite uses two text systems in main body depending on component source.

#### A) Configurator/app typography (MUI theme in live bundle)
Use for custom mattress configurator UIs and MUI-based category grids.

- `app.type.h1`: 30 / 36, 700
- `app.type.h2`: 28 / 34, 700
- `app.type.h3`: 24 / 30, 400-700
- `app.type.h4`: 22 / 28, 700
- `app.type.h5`: 20 / 26, 600-700
- `app.type.h6`: 19 / 24, 600-700
- `app.type.body1`: 16 / 24, 400
- `app.type.body2`: 20 / 30, 400
- `app.type.button`: 15 / 26, 400 (`text-transform: none`)
- `app.font.family`: `Arial, Nunito, Roboto, Helvetica Neue, sans-serif, Aref Ruqaa Ink`

#### B) CMS/content typography (Elementor/Blocksy)
Use for rich content blocks and long-form info sections.

- `cms.type.page-h1`: 40 / 40, 500-700
- `cms.type.section-h2`: typically 35-40, 700-800 (page-specific)
- `cms.type.body`: 15-16 / 22.5-24, 400
- `cms.font.family.headings`: `Nunito` / `Ubuntu` / `Lato` depending section template
- `cms.font.family.body`: `Roboto` or `Lato` depending widget

Designer rule: For this mock-up flow, default to **App typography** unless you are reproducing an Elementor content block.

### 2.3 Radius + border + shadow tokens

- `radius.0`: `0`
- `radius.sm`: `4` (MUI paper defaults)
- `radius.control`: `5` (live buttons/inputs/select wrappers)
- `radius.card`: `10` (live MUI cards)
- `radius.pill`: `24` (live content tabs)
- `radius.pill.lg`: `26` (alternate live tab set)

- `border.default`: `1px solid #E5E7EB`
- `border.soft`: `1px solid #EAECF0`
- `border.brand`: `2px solid #3F57B2`

- `shadow.none`: `none`
- `shadow.cta.live`: `0 12px 15px 0 rgba(140,152,164,0.1)` (live Add to Cart)

### 2.4 Spacing tokens (main body)
Use an 8-based system plus Foamite-specific control values.

- Base: `0, 8, 16, 24, 32`
- Live control values used repeatedly: `5, 14, 18, 20, 25`

Practical mapping:
- `space.control-y = 5`
- `space.control-x = 25`
- `space.input-x-tight = 14`
- `space.input-x-regular = 18`
- `space.card-padding = 16`
- `space.section-gap = 16-24`

## 3. Main Body Component Specs (Designer-Ready)

## 3.1 Page title in main content
Use for page title rows inside main content (not top header bars).

- Typography: `app.type.h1` or `cms.type.page-h1` based on template
- Color:
  - white when over blue hero band
  - `#111518` when on white surface
- Typical spacing: bottom margin ~8-12

## 3.2 Category tabs (MUI list pages)
Seen on `/order-mattress/` and `/order-foam/`.

- Default tab:
  - text: 16 / 20, 400, app family
  - color: `#6C6B6C`
  - bg: transparent
  - radius: `4`
  - padding: horizontal ~`9.6px`
- Selected tab:
  - text: 16 / 20, 700
  - color: `#FFFFFF`
  - bg: `#3F57B2`
  - radius: `4`

## 3.3 Content tabs (pill tabs)
Seen on custom mattress detail pages (Foam Grades / Cover Options / etc).

- text: 16 / 24, 400, `Roboto`
- border: `2px solid #3F57B2`
- radius: `24-26`
- padding: `5px 20px`
- selected: bg `#3F57B2`, text `#FFFFFF`
- unselected: bg `#FFFFFF`, text `#3F57B2`

## 3.4 Tile links/cards
Seen in category grids.

- title text: 16 / 28, 700 (app family)
- link text: 16 / 24, 400, color `#2E313F`
- surface: white
- border: soft (`#EAECF0` / `#E5E7EB`)
- radius: typically `10` for card wrappers

## 3.5 Text input field (MUI)
Seen in custom mattress pages.

- font: 16 / 23, app family, 400
- text color: `#111518`
- border: `1px solid #E5E7EB`
- radius: `5`
- horizontal padding: `18`
- container bg: white

## 3.6 Select field (MUI)
Seen in custom mattress pages.

- font: 16 / 23, app family
- text color: `#2E313F`
- radius: `5`
- padding: `9.6px 32px 9.6px 14px` (compact) or `16.5px 32px 16.5px 14px` (taller)
- border shell: use `border.default`
- bg: white

## 3.6A Form Text Anatomy (Exact Field Text Rules)
Use this section when styling labels, helper text, inputs, placeholders, and selected values.

Token mapping rule:
- Use token aliases below first, not hardcoded hex.
- Hex values are shown only to match the current live implementation.

Why this differs from base `main.text.secondary`:
- Foamite’s live configurator uses component-level overrides in the MUI bundle (labels in green, helper/select text in darker neutral), so form text is not using a single global body token.

### A) Configurator forms (custom mattress MUI pages)
This is the closest live system to your screenshot flow.

- `form.label.step` (example: `Pick a Size`, `Select Foam Grade`)
  - 16 / 24, 700
  - family: `Arial, Nunito, Roboto, Helvetica Neue, sans-serif, Aref Ruqaa Ink`
  - color: `main.text.headingGreen` (`#00703C`)
- `form.label.field` (example: `Width (side to side)`, `Length (head to foot)`)
  - 16 / 24, 700
  - family: app family
  - color: `main.text.headingGreen` (`#00703C`)
- `form.helper`
  - 16 / 24, 400
  - family: `Roboto, Helvetica, Arial, sans-serif`
  - color: `main.text.form` (`#2E313F`)
  - examples: `If custom size is chosen...`, `Please provide answers above...`
- `form.input.value` (typed value in text/number fields)
  - 16 / 23, 400
  - family: app family
  - color: `main.text.primary` (`#111518`)
- `form.input.placeholder` (text/number fields)
  - same size/family as value
  - color: `main.text.placeholder` (`main.text.primary` at `60%`)
- `form.select.placeholder` (unselected select state)
  - 16 / 23, 400
  - color: `main.text.form` (`#2E313F`)
  - rendered italic in live site (placeholder uses `<em>`)
- `form.select.value` (selected option)
  - 16 / 23, 400
  - color: `main.text.form` (`#2E313F`)
  - normal (non-italic)
- `form.suffix.unit` (example: `INCHES`)
  - 12 / 18, 400
  - family: `Roboto, Helvetica, Arial, sans-serif`
  - text: white
  - bg: `#3F57B2`
  - padding: `8 16`

Field box behavior (Configurator):
- Number/text field size: ~`35px` high visual input (`33px` content height in live)
- Number/text field padding: `0 18`
- Number/text field border: `1px #E5E7EB`
- Number/text field radius:
  - `0` when attached to right suffix chip (`INCHES`) in live
  - otherwise use `radius.control` (`5`)
- Select compact size: ~`42px` high, padding `9.6px 32px 9.6px 14px`
- Select tall size: ~`56px` high, padding `16.5px 32px 16.5px 14px`

Focus state (Configurator):
- Select focus: `2px solid #3F57B2`, radius `5`
- Number/text focus: `2px solid #3F57B2` on outline shell; content text remains `#111518`

Spacing around field text:
- label to field: `8`
- field to helper text: `8`
- helper top offset: `3-4` (MUI helper default behavior)

### B) Elementor contact form fields (secondary system)
Use only when reproducing Contact-style pages, not the mattress configurator flow.

- text input and entered value:
  - 16 / 24, 400, `Lato`
  - color: `#828282`
- placeholder:
  - 16 / 24, 400, `Lato`
  - color: `#828282` at `60%` opacity
- input border/radius:
  - `1px solid #E0E0E0`
  - radius `0`
  - min-height `40` (rendered ~55 in current layout)
- textarea:
  - 15 / 21, 400, `Lato`
  - border `1px #E0E0E0`, radius `3`
  - padding `5 14`
- upload helper/label pseudo-text:
  - `Upload Files`: 14 / 21, 700, `#333333`, `Lato`
  - `Pdf and Images only`: 14 / 21, 400, `#333333`, `Lato`

Note for screenshot-only components:
- If a screenshot component has no live public equivalent, keep the text hierarchy above but tag that component `Screenshot-Derived` in Figma.

## 3.7 Buttons

### A) Primary commerce CTA (live)
- text: 15 / 26.25, 400, app family
- text color: `#FFFFFF`
- bg: `#3FB549`
- radius: `5`
- padding: `5px 25px`
- shadow: `shadow.cta.live`

### B) Secondary action (live)
- text: 14 / 24.5, 400, app family
- text color: `#2E313F`
- bg: `#EAECF0`
- border: `1px solid #E0E0E0`
- radius: `5`
- padding: `5px 25px`

### C) Text action (live)
- text: 13 / 22.75, 400
- color: `#3F57B2`
- bg: transparent
- radius: `5`
- padding: `4px 8px`

## 3.8 Info/utility cards
Seen in custom mattress detail content blocks.

- card bg: white or light-tint (`#F5FAFF` in info card)
- border: `1px solid #EAECF0`
- radius: `10`
- content padding: `16`
- shadow: none

## 3.9 Contact form fields (Elementor)
Use only when reproducing contact-style pages.

- input font: 16 / 24, `Lato`, 400
- placeholder text color: `#828282`
- input border: `1px solid #E0E0E0`
- input radius: `0` (textarea often `3`)
- input min-height: `40`
- input padding: `0 18`
- submit button:
  - 16 / 16, 700, `Lato`
  - text `#F2F5F7`
  - bg `#3FB549`
  - radius `5`
  - min-height `40`
  - padding `0 24`

## 4. Layout Rules (Main Body)

- Use the website container system; do not invent a separate container width system.
- For screenshot-based mock-ups, 1440 artboards are acceptable for comp work.
- Keep two-column wizard compositions aligned to screenshot proportions when needed:
  - left work area visually dominant
  - right summary area narrower
- Use white surfaces on `#F8FAFC` canvas for compositional hierarchy.

## 5. Figma Setup Order (Fast)

1. Build `Color/Main` variables from Section 2.1.
2. Build `Type/App` and `Type/CMS` styles from Section 2.2.
3. Build `Radius`, `Border`, and `Spacing` variables from Sections 2.3 and 2.4.
4. Build components in this order:
   - tabs,
   - fields/selects,
   - buttons,
   - cards,
   - tile lists.
5. Build templates after component lock.

## 6. Accessibility (AA)

Apply WCAG AA checks for:
- body text on white and `#F8FAFC`,
- blue text (`#3F57B2` / `#145AE2`) on white,
- white text on blue/green fills.

Do not change brand colors unless a specific pairing fails AA.

## 7. Components Not Found on Live Public Pages (Callout)

The following appear in your screenshots but were not found as matching production components on the sampled live pages:

1. Wizard right-side **summary rail** matching screenshot structure
2. ER questionnaire **chip/segmented options** (`No Pain`, `Mild`, etc.)
3. Three-up **build option cards** (`Value`, `Comfort`, `Longer-Life`)
4. Layer editor block with stacked **Top/Bottom layer rows** as shown
5. Add-on list with trailing **plus-row accordion** exactly matching screenshot

For these, use screenshot references with the main-body tokens above, and mark as `Screenshot-Derived` in Figma until product confirms live parity.

## 8. Source Pages Reviewed

- `https://foamite.com/order-mattress/custom-shape-mattress/`
- `https://foamite.com/order-mattress/custom/custom-solid-core-mattress/`
- `https://foamite.com/order-mattress/`
- `https://foamite.com/order-foam/`
- `https://foamite.com/contact-us/`
- `https://foamite.com/wp-content/uploads/blocksy/css/global.css?ver=93172`
- `https://foamite.com/wp-content/plugins/foamite-api-plugin//assets/css/foamite.css?ver=b12234ae0ccd144d6657af3d24803acd`
- `https://foamite.com/wp-content/plugins/foamite-api-plugin/build/single-product-page.bundle.js?ver=0.3.59`
