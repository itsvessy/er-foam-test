import './style.css'

const WEIGHT_GROUPS = [
  {
    label: 'Less than 139 lbs (63 kg)',
    options: [
      { value: 'weight-100-109', label: '100 to 109 lbs (50 kg)', er: 16 },
      { value: 'weight-110-114', label: '110 to 114 lbs (52 kg)', er: 18 },
      { value: 'weight-115-119', label: '115 to 119 lbs (54 kg)', er: 19 },
      { value: 'weight-120-124', label: '120 to 124 lbs (56 kg)', er: 20 },
      { value: 'weight-125-129', label: '125 to 129 lbs (59 kg)', er: 21 },
      { value: 'weight-130-134', label: '130 to 134 lbs (61 kg)', er: 22 },
      { value: 'weight-135-139', label: '135 to 139 lbs (63 kg)', er: 23 },
    ],
  },
  {
    label: '140 to 179 lbs (81 kg)',
    options: [
      { value: 'weight-140-145', label: '140 to 145 lbs (66 kg)', er: 24 },
      { value: 'weight-146-151', label: '146 to 151 lbs (69 kg)', er: 25 },
      { value: 'weight-152-157', label: '152 to 157 lbs (71 kg)', er: 26 },
      { value: 'weight-158-163', label: '158 to 163 lbs (74 kg)', er: 27 },
      { value: 'weight-164-169', label: '164 to 169 lbs (77 kg)', er: 28 },
      { value: 'weight-170-174', label: '170 to 174 lbs (79 kg)', er: 29 },
      { value: 'weight-175-179', label: '175 to 179 lbs (81 kg)', er: 30 },
    ],
  },
  {
    label: '180 to 219 lbs (100 kg)',
    options: [
      { value: 'weight-180-185', label: '180 to 185 lbs (84 kg)', er: 31 },
      { value: 'weight-186-191', label: '186 to 191 lbs (87 kg)', er: 32 },
      { value: 'weight-192-197', label: '192 to 197 lbs (90 kg)', er: 33 },
      { value: 'weight-198-203', label: '198 to 203 lbs (92 kg)', er: 34 },
      { value: 'weight-204-209', label: '204 to 209 lbs (95 kg)', er: 35 },
      { value: 'weight-210-214', label: '210 to 214 lbs (97 kg)', er: 36 },
      { value: 'weight-215-219', label: '215 to 219 lbs (100 kg)', er: 37 },
    ],
  },
  {
    label: '220 to 259 lbs (118 kg)',
    options: [
      { value: 'weight-220-224', label: '220 to 224 lbs (102 kg)', er: 38 },
      { value: 'weight-225-229', label: '225 to 229 lbs (104 kg)', er: 39 },
      { value: 'weight-230-234', label: '230 to 234 lbs (106 kg)', er: 40 },
      { value: 'weight-235-239', label: '235 to 239 lbs (109 kg)', er: 41 },
      { value: 'weight-240-244', label: '240 to 244 lbs (111 kg)', er: 42 },
      { value: 'weight-245-249', label: '245 to 249 lbs (113 kg)', er: 43 },
      { value: 'weight-250-254', label: '250 to 254 lbs (115 kg)', er: 44 },
      { value: 'weight-255-259', label: '255 to 259 lbs (118 kg)', er: 45 },
    ],
  },
  {
    label: '260 to 299 lbs (136 kg)',
    options: [
      { value: 'weight-260-264', label: '260 to 264 lbs (120 kg)', er: 46 },
      { value: 'weight-265-269', label: '265 to 269 lbs (122 kg)', er: 47 },
      { value: 'weight-270-274', label: '270 to 274 lbs (125 kg)', er: 48 },
      { value: 'weight-275-279', label: '275 to 279 lbs (127 kg)', er: 49 },
      { value: 'weight-280-284', label: '280 to 284 lbs (129 kg)', er: 50 },
      { value: 'weight-285-289', label: '285 to 289 lbs (131 kg)', er: 51 },
      { value: 'weight-290-294', label: '290 to 294 lbs (134 kg)', er: 52 },
      { value: 'weight-295-299', label: '295 to 299 lbs (136kg)', er: 53 },
    ],
  },
  {
    label: 'More Than 300 lbs (136 kg)',
    options: [
      { value: 'weight-300-309', label: '300 to 309 lbs (140 kg)', er: 55 },
      { value: 'weight-310-319', label: '310 to 319 lbs (145 kg)', er: 56 },
      { value: 'weight-320-329', label: '320 to 329 lbs (150 kg)', er: 57 },
      { value: 'weight-330-339', label: '330 to 339 lbs (154 kg)', er: 58 },
      { value: 'weight-340-349', label: '340 to 349 lbs (159 kg)', er: 59 },
      { value: 'weight-350-359', label: '350 to 359 lbs (163 kg)', er: 60 },
      { value: 'weight-360-369', label: '360 to 369 lbs (168 kg)', er: 65 },
      { value: 'weight-370-plus', label: 'More Than 370 lbs', er: 70 },
    ],
  },
]

const BACK_GROUPS = [
  {
    label: 'Do you have lower back pain?',
    options: [
      { value: 'no-back-pain', label: 'No Back Pain', er: 0 },
      { value: 'mild-back-pain', label: 'Mild Back Pain', er: 1 },
      { value: 'moderate-back-pain', label: 'Moderate Back Pain', er: 2 },
      { value: 'severe-back-pain', label: 'Severe Back Pain', er: 3 },
    ],
  },
]

const FIRMNESS_GROUPS = [
  {
    label: 'Do you like a softer or a firmer mattress?',
    options: [
      { value: 'super-soft', label: 'Super Soft Preference', er: -3 },
      { value: 'soft', label: 'Soft Preference', er: -1 },
      { value: 'medium-soft', label: 'Medium Soft Preference', er: -2 },
      { value: 'medium', label: 'Medium Preference', er: 0 },
      { value: 'medium-firm', label: 'Medium Firm Preference', er: 1 },
      { value: 'firm', label: 'Firm Preference', er: 2 },
      { value: 'extra-firm', label: 'Extra Firm Preference', er: 3 },
      { value: 'super-firm', label: 'Super Firm Preference', er: 3 },
    ],
  },
]

const SOFT_MED_KEYS = new Set(['super-soft', 'soft', 'medium-soft', 'medium'])

const app = document.querySelector('#app')
app.innerHTML = `
  <header class="hero">
    <div>
      <div class="eyebrow">Foamite • ER Selector Test</div>
      <h1>ER # Foam Grade Selector</h1>
      <p>Test harness to recommend a single 6&quot; layer that matches the target ER number and budget.</p>
    </div>
    <div class="badge">6&quot; Single Layer</div>
  </header>

  <section class="layout">
    <form class="panel" id="input-form">
      <h2>Inputs</h2>
      <div class="field">
        <label for="weight-select">Weight</label>
        <select id="weight-select" required></select>
      </div>
      <div class="field">
        <label for="back-select">Back Condition</label>
        <select id="back-select" required></select>
      </div>
      <div class="field">
        <label for="firmness-select">Preferred Firmness</label>
        <select id="firmness-select" required></select>
      </div>
      <div class="field">
        <label>Budget</label>
        <div class="radio-group" role="radiogroup" aria-label="Budget selection">
          <label class="radio-card"><input type="radio" name="budget" value="$" required> $</label>
          <label class="radio-card"><input type="radio" name="budget" value="$$" required> $$</label>
          <label class="radio-card"><input type="radio" name="budget" value="$$$" required> $$$</label>
        </div>
      </div>
      <div class="field">
        <label for="override-input">Manual ER Override</label>
        <input id="override-input" type="number" min="1" step="1" placeholder="e.g., 32" />
        <small>If filled, this overrides the calculated ER.</small>
      </div>
      <div class="field">
        <label for="tolerance-input">Tolerance (+/-)</label>
        <input id="tolerance-input" type="number" min="0" step="1" value="5" />
      </div>
      <div class="computed-block">
        <h3>Computed</h3>
        <div class="summary-grid">
          <div class="summary">
            <div><strong>Target ER:</strong> <span id="target-er">—</span></div>
            <div><strong>Source:</strong> <span id="target-source">—</span></div>
            <div><strong>Preferred Side:</strong> <span id="preferred-side">—</span></div>
          </div>
          <div class="summary">
            <div><strong>Budget Thresholds (CAD / bf)</strong></div>
            <div class="budget-table" id="budget-table"></div>
          </div>
          <div class="summary">
            <div><strong>Status:</strong> <span id="status-text">Waiting for input</span></div>
          </div>
        </div>
      </div>
    </form>

    <div class="right-column">
      <section class="results">
        <div class="section-title">Recommendations</div>
        <div class="results-grid">
          <div class="panel">
            <h3>Budget-Strict</h3>
            <div class="result-block">
              <h4>Primary (Preferred Side)</h4>
              <div class="cards" id="strict-preferred"></div>
            </div>
            <div class="result-block">
              <h4>Primary (Closest Overall)</h4>
              <div class="cards" id="strict-overall"></div>
            </div>
            <div class="result-block">
              <h4>Alternates (Within Tolerance)</h4>
              <div class="cards" id="strict-alternates"></div>
            </div>
          </div>
          <div class="panel">
            <h3>Budget-Flexible</h3>
            <div class="result-block">
              <h4>Primary (Preferred Side)</h4>
              <div class="cards" id="flex-preferred"></div>
            </div>
            <div class="result-block">
              <h4>Primary (Closest Overall)</h4>
              <div class="cards" id="flex-overall"></div>
            </div>
            <div class="result-block">
              <h4>Alternates (Within Tolerance)</h4>
              <div class="cards" id="flex-alternates"></div>
            </div>
          </div>
        </div>

        <div class="section-title">Price Unknown</div>
        <div class="panel">
          <div class="cards" id="unknown-price"></div>
        </div>
        <div class="footer-note">Primary picks show the closest ER match on the preferred side. Ties are flagged.</div>
      </section>
    </div>
  </section>
`

const weightSelect = document.querySelector('#weight-select')
const backSelect = document.querySelector('#back-select')
const firmnessSelect = document.querySelector('#firmness-select')
const overrideInput = document.querySelector('#override-input')
const toleranceInput = document.querySelector('#tolerance-input')
const statusText = document.querySelector('#status-text')
const targetErText = document.querySelector('#target-er')
const targetSourceText = document.querySelector('#target-source')
const preferredSideText = document.querySelector('#preferred-side')
const budgetTable = document.querySelector('#budget-table')

const strictPreferred = document.querySelector('#strict-preferred')
const strictOverall = document.querySelector('#strict-overall')
const strictAlternates = document.querySelector('#strict-alternates')
const flexPreferred = document.querySelector('#flex-preferred')
const flexOverall = document.querySelector('#flex-overall')
const flexAlternates = document.querySelector('#flex-alternates')
const unknownPrice = document.querySelector('#unknown-price')

const state = {
  grades: [],
  budget: {
    p33: null,
    p66: null,
    min: null,
    max: null,
  },
}

function buildSelect(selectEl, groups, placeholder) {
  const defaultOpt = document.createElement('option')
  defaultOpt.value = ''
  defaultOpt.textContent = placeholder
  defaultOpt.disabled = true
  defaultOpt.selected = true
  selectEl.appendChild(defaultOpt)

  groups.forEach((group) => {
    const optgroup = document.createElement('optgroup')
    optgroup.label = group.label
    group.options.forEach((option) => {
      const opt = document.createElement('option')
      opt.value = option.value
      opt.textContent = option.label
      opt.dataset.er = option.er
      optgroup.appendChild(opt)
    })
    selectEl.appendChild(optgroup)
  })
}

function deriveEr(code) {
  const digits = code.match(/\d+/g)
  if (!digits) return null
  const joined = digits.join('')
  if (joined.length >= 2) {
    return Number(joined.slice(-2))
  }
  return Number(joined)
}

function quantile(sorted, q) {
  if (!sorted.length) return null
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  }
  return sorted[base]
}

function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'Price Unknown'
  return `$${Number(value).toFixed(2)}`
}

function bucketForPrice(price) {
  const { p33, p66 } = state.budget
  if (price === null || price === undefined || Number.isNaN(price)) return 'unknown'
  if (price <= p33) return '$'
  if (price <= p66) return '$$'
  return '$$$'
}

function bucketRank(bucket) {
  if (bucket === '$') return 1
  if (bucket === '$$') return 2
  if (bucket === '$$$') return 3
  return 0
}

function buildCards(container, cards, options = {}) {
  const { primaryCodes = new Set(), tieCodes = new Set(), overBudgetCodes = new Set() } = options
  if (!cards.length) {
    container.innerHTML = '<div class="empty">No matches in this set.</div>'
    return
  }

  container.innerHTML = cards
    .map((grade) => {
      const tags = []
      if (primaryCodes.has(grade.code)) tags.push({ label: 'Primary', className: 'alert' })
      if (tieCodes.has(grade.code)) tags.push({ label: 'Tie', className: 'tie' })
      if (overBudgetCodes.has(grade.code)) tags.push({ label: 'Over Budget', className: 'alert' })
      if (grade.bucket === 'unknown') tags.push({ label: 'Price Unknown', className: 'alert' })

      return `
        <div class="result-card ${primaryCodes.has(grade.code) ? 'primary' : ''}">
          <div class="card-head">
            <div class="code">${grade.code}</div>
            <div class="er-pill">ER ${grade.derivedEr ?? '—'}</div>
          </div>
          <div class="meta">
            <div>Price: ${formatPrice(grade.price)}</div>
            <div>Bucket: ${grade.bucket}</div>
            <div>Firmness: ${grade.firmness || '—'}</div>
            <div>Density: ${grade.density || '—'}</div>
            <div>Quality: ${grade.foam_quality || '—'}</div>
            <div>Line: ${grade.groupLabel || '—'}</div>
          </div>
          ${tags.length ? `<div class="tags">${tags.map((t) => `<span class="tag ${t.className}">${t.label}</span>`).join('')}</div>` : ''}
        </div>
      `
    })
    .join('')
}

function getSelectedEr(selectEl) {
  const selected = selectEl.selectedOptions[0]
  if (!selected) return null
  const er = Number(selected.dataset.er)
  return Number.isFinite(er) ? er : null
}

function getPreferredSide() {
  const selected = firmnessSelect.value
  if (!selected) return null
  return SOFT_MED_KEYS.has(selected) ? 'softer' : 'firmer'
}

function getBudgetSelection() {
  const radio = document.querySelector('input[name="budget"]:checked')
  return radio ? radio.value : null
}

function computeTargetEr() {
  const overrideValue = Number(overrideInput.value)
  if (Number.isFinite(overrideValue) && overrideInput.value !== '') {
    return { value: overrideValue, source: 'Manual override' }
  }

  const weightEr = getSelectedEr(weightSelect)
  const backEr = getSelectedEr(backSelect)
  const firmEr = getSelectedEr(firmnessSelect)

  if (weightEr === null || backEr === null || firmEr === null) return null
  return { value: weightEr + backEr + firmEr, source: 'Calculated' }
}

function pickClosest(candidates, target, side) {
  let pool = candidates
  if (side === 'softer') {
    pool = candidates.filter((c) => c.derivedEr <= target)
  } else if (side === 'firmer') {
    pool = candidates.filter((c) => c.derivedEr >= target)
  }
  if (!pool.length) return []
  const minDiff = Math.min(...pool.map((c) => Math.abs(c.derivedEr - target)))
  return pool.filter((c) => Math.abs(c.derivedEr - target) === minDiff)
}

function sortByDiff(list, target) {
  return [...list].sort((a, b) => {
    const diffA = Math.abs(a.derivedEr - target)
    const diffB = Math.abs(b.derivedEr - target)
    if (diffA !== diffB) return diffA - diffB
    if (a.price !== null && b.price !== null) return a.price - b.price
    return a.code.localeCompare(b.code)
  })
}

function updateBudgetTable() {
  const { min, max, p33, p66 } = state.budget
  if (min === null || max === null) {
    budgetTable.innerHTML = '<div class="empty">Budget ranges unavailable.</div>'
    return
  }
  budgetTable.innerHTML = `
    <div class="budget-row"><span>$</span><span>${formatPrice(min)} - ${formatPrice(p33)}</span></div>
    <div class="budget-row"><span>$$</span><span>${formatPrice(p33)} - ${formatPrice(p66)}</span></div>
    <div class="budget-row"><span>$$$</span><span>${formatPrice(p66)} - ${formatPrice(max)}</span></div>
  `
}

function updateRecommendations() {
  const budget = getBudgetSelection()
  const tolerance = Number(toleranceInput.value) || 0
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()

  targetErText.textContent = target ? target.value : '—'
  targetSourceText.textContent = target ? target.source : '—'
  preferredSideText.textContent = preferredSide || '—'

  if (!target || !budget || !preferredSide) {
    statusText.textContent = 'Complete all required inputs to see recommendations.'
    buildCards(strictPreferred, [])
    buildCards(strictOverall, [])
    buildCards(strictAlternates, [])
    buildCards(flexPreferred, [])
    buildCards(flexOverall, [])
    buildCards(flexAlternates, [])
    buildCards(unknownPrice, [])
    return
  }

  statusText.textContent = 'Ready'

  const budgetRank = bucketRank(budget)
  const withinTolerance = (g) => Math.abs(g.derivedEr - target.value) <= tolerance

  const pricedGrades = state.grades.filter((g) => g.price !== null)
  const unknownGrades = state.grades.filter((g) => g.price === null)

  const strictCandidates = pricedGrades.filter((g) => g.bucket === budget && withinTolerance(g))
  const flexCandidates = pricedGrades.filter((g) => withinTolerance(g))
  const unknownCandidates = unknownGrades.filter((g) => withinTolerance(g))

  const strictPreferredPrimary = pickClosest(strictCandidates, target.value, preferredSide)
  const strictOverallPrimary = pickClosest(strictCandidates, target.value, null)
  const flexPreferredPrimary = pickClosest(flexCandidates, target.value, preferredSide)
  const flexOverallPrimary = pickClosest(flexCandidates, target.value, null)

  const strictAlternatesList = sortByDiff(strictCandidates, target.value)
  const flexAlternatesList = sortByDiff(flexCandidates, target.value)
  const unknownList = sortByDiff(unknownCandidates, target.value)

  const strictPrimaryCodes = new Set([...strictPreferredPrimary, ...strictOverallPrimary].map((g) => g.code))
  const flexPrimaryCodes = new Set([...flexPreferredPrimary, ...flexOverallPrimary].map((g) => g.code))

  const strictTieCodes = new Set()
  if (strictPreferredPrimary.length > 1) strictPreferredPrimary.forEach((g) => strictTieCodes.add(g.code))
  if (strictOverallPrimary.length > 1) strictOverallPrimary.forEach((g) => strictTieCodes.add(g.code))

  const flexTieCodes = new Set()
  if (flexPreferredPrimary.length > 1) flexPreferredPrimary.forEach((g) => flexTieCodes.add(g.code))
  if (flexOverallPrimary.length > 1) flexOverallPrimary.forEach((g) => flexTieCodes.add(g.code))

  const flexOverBudgetCodes = new Set(
    flexCandidates.filter((g) => bucketRank(g.bucket) > budgetRank).map((g) => g.code)
  )

  buildCards(strictPreferred, strictPreferredPrimary, { primaryCodes: new Set(strictPreferredPrimary.map((g) => g.code)), tieCodes: strictTieCodes })
  buildCards(strictOverall, strictOverallPrimary, { primaryCodes: new Set(strictOverallPrimary.map((g) => g.code)), tieCodes: strictTieCodes })
  buildCards(strictAlternates, strictAlternatesList, { primaryCodes: strictPrimaryCodes, tieCodes: strictTieCodes })

  buildCards(flexPreferred, flexPreferredPrimary, { primaryCodes: new Set(flexPreferredPrimary.map((g) => g.code)), tieCodes: flexTieCodes, overBudgetCodes: flexOverBudgetCodes })
  buildCards(flexOverall, flexOverallPrimary, { primaryCodes: new Set(flexOverallPrimary.map((g) => g.code)), tieCodes: flexTieCodes, overBudgetCodes: flexOverBudgetCodes })
  buildCards(flexAlternates, flexAlternatesList, { primaryCodes: flexPrimaryCodes, tieCodes: flexTieCodes, overBudgetCodes: flexOverBudgetCodes })

  buildCards(unknownPrice, unknownList)
}

async function init() {
  buildSelect(weightSelect, WEIGHT_GROUPS, 'Select Your Weight')
  buildSelect(backSelect, BACK_GROUPS, 'Your Back Condition')
  buildSelect(firmnessSelect, FIRMNESS_GROUPS, 'Your Preferred Firmness')

  const response = await fetch('/foam_grades_custom_shape.json')
  const data = await response.json()
  const grades = (data.grades || []).map((grade) => {
    const price = grade.price_retail_shapes !== '' ? Number(grade.price_retail_shapes) : null
    return {
      ...grade,
      price: Number.isFinite(price) ? price : null,
      derivedEr: deriveEr(grade.code),
    }
  })

  const prices = grades.map((g) => g.price).filter((p) => p !== null).sort((a, b) => a - b)
  state.budget.min = prices[0] ?? null
  state.budget.max = prices[prices.length - 1] ?? null
  state.budget.p33 = quantile(prices, 0.3333)
  state.budget.p66 = quantile(prices, 0.6667)

  state.grades = grades.map((g) => ({
    ...g,
    bucket: bucketForPrice(g.price),
  }))

  updateBudgetTable()
  updateRecommendations()
}

document.querySelectorAll('select, input').forEach((el) => {
  el.addEventListener('change', updateRecommendations)
  el.addEventListener('input', updateRecommendations)
})

init()
