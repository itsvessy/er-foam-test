# Screen Update Instructions (Match Main Body Guide)

Use this with:
- `/Users/vessy/foamite/er-foam-test/docs/foamite-figma-style-guide.md`

Target files:
- `/Users/vessy/foamite/er-foam-test/screens/Frame 65.png`
- `/Users/vessy/foamite/er-foam-test/screens/Frame 145.png`
- `/Users/vessy/foamite/er-foam-test/screens/Frame 147.png`
- `/Users/vessy/foamite/er-foam-test/screens/Frame 148.png`
- `/Users/vessy/foamite/er-foam-test/screens/Frame 158.png`

## 1. One-Time Setup (Do First)

1. Create Figma variables from the guide:
   - colors in `Color/Main`
   - typography in `Type/App` and `Type/CMS`
   - radius/border/spacing from Sections 2.3 and 2.4
2. Build reusable components before screen edits:
   - `Tab/Category`
   - `Tab/Pill`
   - `Field/Input`
   - `Field/Select`
   - `Button/PrimaryLive` (green)
   - `Button/SecondaryLive` (gray)
   - `Card/Base`
   - `Card/Info`
3. Set all working frames to 1440 px wide to match screenshot composition.
4. For all screens, keep main body canvas at `main.bg.canvas` (`#F8FAFC`) and white surfaces at `main.bg.surface`.

## 1A. Global Field Text Rules (Apply Across All Frames)

Use `/Users/vessy/foamite/er-foam-test/docs/foamite-figma-style-guide.md` Section `3.6A` for exact values.

1. Labels above/next to fields:
   - Configurator live style: 16 / 24, 700, `main.text.headingGreen`, app font family.
2. Helper text under fields:
   - 16 / 24, 400, `main.text.form`.
3. Typed input values:
   - 16 / 23, 400, `main.text.primary`.
4. Input placeholders:
   - same size as value, `main.text.placeholder` (`main.text.primary` at 60% opacity).
5. Select text:
   - placeholder (unselected): 16 / 23, 400, `main.text.form`, italic.
   - selected value: 16 / 23, 400, `main.text.form`, non-italic.
6. Focus state:
   - 2px `#3F57B2` outline.
7. Unit suffix chips (e.g., `INCHES`):
   - 12 / 18, 400, white on `#3F57B2`, padding `8 16`.

If a screenshot component conflicts with these live values and has no live public equivalent, keep the screenshot visual and tag the component `Screenshot-Derived`.

## 2. Frame 65 Update Steps

Source: `/Users/vessy/foamite/er-foam-test/screens/Frame 65.png`

1. Rebuild the main white content panel using `Card/Base` style:
   - `border.soft`
   - `radius.card`
   - no shadow
   - internal padding uses `space.card-padding`
2. Apply typography tokens:
   - card title "Build Your Own Custom Mattress" -> `app.type.h3`
   - paragraph text under title -> `app.type.body1`
   - field labels -> app family, 14-16 px, stronger weight for label line
3. Rebuild left shape options as selectable cards:
   - default: white + `border.soft`
   - selected: white + `border.brand` (`2px #3F57B2`)
   - corner radius: `radius.card`
4. Rebuild right-side form controls with guide tokens:
   - selects and text inputs use `Field/Select` and `Field/Input`
   - input/select radius `radius.control` (5)
   - borders `border.default`
   - text color `main.text.primary`
5. Apply field text anatomy exactly:
   - labels -> Section `3.6A` label styles
   - helper copy -> Section `3.6A` helper style
   - placeholders and entered values -> Section `3.6A` rules
   - select placeholder italic vs selected value normal
6. Run AA check on all text/background pairs.

### Missing Styles for Frame 65

1. `ShapeOptionCard` with thumbnail + radio + subtitle is not defined on sampled live pages.
2. `YesNoSegmentedToggle` under "Custom Mattress Sides?" is not defined on sampled live pages.
3. Blue wizard CTA style (`Continue With Standard Shape`) is not defined as a live tokenized button in guide sections.

## 3. Frame 145 Update Steps

Source: `/Users/vessy/foamite/er-foam-test/screens/Frame 145.png`

1. Build two-column main body layout:
   - left: primary question card
   - right: summary rail card
2. Left card:
   - use `Card/Base`
   - heading "Ergo Number Calculator" -> `app.type.h4`
   - supporting text -> `app.type.body1`
3. Rebuild each option row (Back Pain, Preferred Firmness, Sleep Position, Temperature, Lifespan):
   - each choice rendered as chip/button row with consistent control height
   - selected choice uses brand-blue selected treatment
   - unselected uses white surface + soft border
4. Action row at bottom:
   - left secondary action uses outlined style
   - right primary action uses filled style
   - keep both using app typography and control spacing
5. Summary rail:
   - white card surface with soft border
   - labels in smaller secondary style
   - values in primary style
   - Ergo badge uses success tokens (`main.state.success.*`)
6. Run AA check for chips and button text.

### Missing Styles for Frame 145

1. `SummaryRail` component (exact screenshot structure) is not defined on sampled live pages.
2. `ChoiceChipGroup` used for ER questionnaire is not defined on sampled live pages.
3. Blue wizard action button style (`Next: Mattress Build`) is not explicitly defined in live button set from guide.

## 4. Frame 147 Update Steps

Source: `/Users/vessy/foamite/er-foam-test/screens/Frame 147.png`

1. Keep same two-column shell as Frame 145.
2. Left panel:
   - use `Card/Base`
   - heading "Foamite Builds Based on Your Preferences" -> `app.type.h4`
3. Rebuild three option cards (Value / Comfort / Longer-Life):
   - equal-width cards in one row
   - default cards: white + soft border
   - selected card: white + `border.brand`
   - include radio marker at top-left
   - price and layer lines use body hierarchy from guide
4. Bottom actions:
   - left = secondary outline
   - right = primary fill (wizard progression)
5. Right summary rail:
   - reuse same `SummaryRail` pattern from Frame 145
   - include Ergo badge + key/value lines
6. AA check on selected card borders and button text.

### Missing Styles for Frame 147

1. `BuildOptionCard` (3-up recommendation card) is not defined on sampled live pages.
2. `SummaryRail` is not defined on sampled live pages.
3. Blue wizard progression button style is not explicitly defined in live button set from guide.

## 5. Frame 148 Update Steps

Source: `/Users/vessy/foamite/er-foam-test/screens/Frame 148.png`

1. Keep same two-column shell as Frames 145/147.
2. Left panel title:
   - "Customize Your Mattress Layers" -> `app.type.h4`
3. Build layer editor block:
   - outer container with `border.brand`, rounded corners, white background
   - internal sections for Top Layer and Bottom Layer separated by rules
   - each row includes thickness input + foam grade select
   - metadata row under each layer uses smaller type and muted text
4. Add "+ Add a Layer Below" row as full-width sub-control with soft border.
5. Bottom-right action button:
   - keep as primary progression button
6. Right panel:
   - reuse `SummaryRail` with populated selected build details and price.
7. AA check on table/meta text and control borders.

### Missing Styles for Frame 148

1. `LayerEditorBlock` component is not defined on sampled live pages.
2. `SummaryRail` is not defined on sampled live pages.
3. Blue wizard progression button style is not explicitly defined in live button set from guide.

## 6. Frame 158 Update Steps

Source: `/Users/vessy/foamite/er-foam-test/screens/Frame 158.png`

1. Keep same two-column shell as Frames 145/147/148.
2. Left panel title:
   - "Review Your Mattress" -> `app.type.h4`
3. Rebuild review summary block at top:
   - header details row (shape/size/thickness)
   - bordered layer summary table using soft borders and primary text hierarchy
4. Rebuild "Mattress cover" option list:
   - radio rows with default and selected states
   - selected row uses brand-blue active treatment
5. Rebuild add-on list below:
   - each row with title/subtitle on left
   - plus icon action on right
   - row separators with soft borders
6. Bottom action:
   - progression button aligned bottom-right of left panel
7. Right panel:
   - reuse `SummaryRail` and price area
8. AA check on low-contrast helper/subtitle text.

### Missing Styles for Frame 158

1. `SummaryRail` is not defined on sampled live pages.
2. `CoverOptionRadioRow` as shown is not defined on sampled live pages.
3. `AddonAccordionRow` with trailing plus icon is not defined on sampled live pages.
4. Blue wizard progression button style is not explicitly defined in live button set from guide.

## 7. Final QA Pass (All Screens)

1. Typography audit:
   - every heading/body/control text uses guide tokens, not ad-hoc sizes.
2. Radius audit:
   - controls use `radius.control`
   - cards use `radius.card`
   - pill tabs use `radius.pill`/`radius.pill.lg`
3. Border audit:
   - default borders = `border.default` or `border.soft`
   - selected states = `border.brand`
4. Color audit:
   - primary text uses `main.text.primary`
   - secondary/helper text uses `main.text.secondary`
5. Accessibility audit:
   - WCAG AA pass for text and controls.
6. Missing-style audit:
   - any component listed in Sections 2-6 as missing is tagged `Screenshot-Derived` in Figma.
