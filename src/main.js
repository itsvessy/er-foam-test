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
      <p>Build a layered stack, see the ER number update, and test budget-strict grade preselection.</p>
    </div>
  </header>

  <section class="layout">
    <div class="column">
      <form class="panel" id="input-form">
        <div class="panel-header">
          <h2>Inputs</h2>
          <button type="button" class="ghost compact" id="toggle-inputs" aria-expanded="true">Hide Inputs</button>
        </div>
        <div class="collapsible-body" id="inputs-body">
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
        <div class="field-divider" role="presentation"></div>
        <div class="field">
          <label for="override-input">Manual ER Override</label>
          <input id="override-input" type="number" min="1" step="1" placeholder="e.g., 32" />
          <small>If filled, this overrides the calculated ER.</small>
        </div>
          <div class="field">
            <label for="tolerance-input">Tolerance (+/-)</label>
            <input id="tolerance-input" type="number" min="0" step="1" value="5" />
          </div>
        </div>
      </form>

      <div class="panel computed-panel">
        <div class="computed-head">
          <h2>Computed</h2>
          <div class="status-pill" id="status-text">Waiting for input</div>
        </div>
        <div class="computed-grid">
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Target ER</span>
              <span class="info-icon" data-tooltip="Weight + back condition + firmness, or manual override.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="target-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Actual ER</span>
              <span class="info-icon" data-tooltip="Weighted ER of the top 6 in of selected layers.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="actual-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Delta</span>
              <span class="info-icon" data-tooltip="Actual ER minus Target ER.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="delta-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Source</span>
              <span class="info-icon" data-tooltip="Whether Target ER is calculated or overridden.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="target-source">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Preferred Side</span>
              <span class="info-icon" data-tooltip="Tie-breaker for suggestions: softer or firmer.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="preferred-side">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Total Thickness</span>
              <span class="info-icon" data-tooltip="Sum of all layer thicknesses.">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="total-thickness">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">ER Depth</span>
              <span class="info-icon" data-tooltip="Depth used to compute ER (max 6 in).">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="er-depth">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Total Price</span>
              <span class="info-icon" data-tooltip="Estimated price per square foot (price/bf * thickness).">
                <span class="material-symbols-rounded" aria-hidden="true">info</span>
              </span>
            </div>
            <strong id="total-price">—</strong>
          </div>
        </div>
        <div class="computed-budget">
          <div class="computed-budget-title">Budget Thresholds (CAD / bf)</div>
          <div class="budget-table" id="budget-table"></div>
        </div>
      </div>
    </div>

    <div class="panel layers-panel">
      <div class="layers-header">
        <h2>Layers</h2>
        <button type="button" class="ghost" id="add-layer">Add Layer</button>
      </div>
      <div id="layers-container"></div>
    </div>
  </section>
`

const weightSelect = document.querySelector('#weight-select')
const backSelect = document.querySelector('#back-select')
const firmnessSelect = document.querySelector('#firmness-select')
const overrideInput = document.querySelector('#override-input')
const toleranceInput = document.querySelector('#tolerance-input')
const inputForm = document.querySelector('#input-form')
const toggleInputsButton = document.querySelector('#toggle-inputs')
const statusText = document.querySelector('#status-text')
const targetErText = document.querySelector('#target-er')
const actualErText = document.querySelector('#actual-er')
const deltaErText = document.querySelector('#delta-er')
const targetSourceText = document.querySelector('#target-source')
const preferredSideText = document.querySelector('#preferred-side')
const totalThicknessText = document.querySelector('#total-thickness')
const erDepthText = document.querySelector('#er-depth')
const totalPriceText = document.querySelector('#total-price')
const budgetTable = document.querySelector('#budget-table')
const layersContainer = document.querySelector('#layers-container')
const addLayerButton = document.querySelector('#add-layer')

const state = {
  grades: [],
  gradeGroups: [],
  gradeByCode: new Map(),
  budget: {
    p33: null,
    p66: null,
    min: null,
    max: null,
  },
  layers: [],
  nextId: 1,
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
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

function createLayer({ thickness = 4, gradeCode = '', auto = true } = {}) {
  return {
    id: state.nextId++,
    thickness,
    gradeCode,
    auto,
  }
}

function ordinal(n) {
  const v = n % 100
  const suffix = ['th', 'st', 'nd', 'rd'][v % 10] || ['th', 'st', 'nd', 'rd'][v] || 'th'
  return `${n}${suffix}`
}

function layerTitle(index, total) {
  if (total === 1) return 'Foam Layer'
  if (index === 0) return 'Top Layer'
  if (index === total - 1) return 'Bottom Layer'
  return `${ordinal(index + 1)} Layer`
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

function computeContributions(layers) {
  let remaining = 6
  const contributions = layers.map((layer) => {
    const thickness = Number(layer.thickness) || 0
    if (remaining <= 0) return 0
    const contribution = Math.max(0, Math.min(thickness, remaining))
    remaining -= contribution
    return contribution
  })
  const totalThickness = layers.reduce((sum, layer) => sum + (Number(layer.thickness) || 0), 0)
  const erDepth = Math.min(6, totalThickness)
  return { contributions, totalThickness, erDepth }
}

function computeActualEr(layers, contributions, erDepth) {
  if (erDepth === 0) return null
  let sum = 0
  for (let i = 0; i < layers.length; i += 1) {
    const contribution = contributions[i]
    if (contribution <= 0) continue
    const code = layers[i].gradeCode
    if (!code) return null
    const er = deriveEr(code)
    if (!Number.isFinite(er)) return null
    sum += er * contribution
  }
  return sum / erDepth
}

function computeTotalPrice(layers) {
  let sum = 0
  let hasThickness = false
  for (let i = 0; i < layers.length; i += 1) {
    const thickness = Number(layers[i].thickness) || 0
    if (thickness <= 0) continue
    hasThickness = true
    const code = layers[i].gradeCode
    if (!code) return null
    const grade = state.gradeByCode.get(code)
    if (!grade || !Number.isFinite(grade.price)) return null
    sum += grade.price * thickness
  }
  if (!hasThickness) return null
  return sum
}

function pickClosest(candidates, desired, preferredSide, tolerance) {
  if (!candidates.length) return null
  const filtered = candidates.filter((g) => Number.isFinite(g.derivedEr))
  if (!filtered.length) return null
  const withinTol = filtered.filter((g) => Math.abs(g.derivedEr - desired) <= tolerance)
  const pool = withinTol.length ? withinTol : filtered
  const minDiff = Math.min(...pool.map((g) => Math.abs(g.derivedEr - desired)))
  let best = pool.filter((g) => Math.abs(g.derivedEr - desired) === minDiff)

  if (best.length > 1 && preferredSide) {
    if (preferredSide === 'softer') {
      const minEr = Math.min(...best.map((g) => g.derivedEr))
      best = best.filter((g) => g.derivedEr === minEr)
    } else {
      const maxEr = Math.max(...best.map((g) => g.derivedEr))
      best = best.filter((g) => g.derivedEr === maxEr)
    }
  }

  best.sort((a, b) => a.code.localeCompare(b.code))
  return best[0]?.code || null
}

function suggestGradeForLayer(index, context) {
  const { targetEr, preferredSide, budget, tolerance } = context
  if (targetEr === null || !budget) return null

  const budgetGrades = state.grades.filter((grade) => grade.bucket === budget)
  const candidates = budgetGrades.length ? budgetGrades : state.grades
  if (!candidates.length) return null

  const { contributions, totalThickness, erDepth } = computeContributions(state.layers)
  const tNew = contributions[index]

  if (tNew <= 0) {
    const prev = index > 0 ? state.layers[index - 1].gradeCode : null
    if (prev) return prev
    return pickClosest(candidates, targetEr, preferredSide, tolerance)
  }

  let sum = 0
  let missing = false
  contributions.forEach((contribution, idx) => {
    if (idx === index || contribution <= 0) return
    const code = state.layers[idx].gradeCode
    if (!code) {
      missing = true
      return
    }
    const er = deriveEr(code)
    if (!Number.isFinite(er)) {
      missing = true
      return
    }
    sum += er * contribution
  })

  let desired = targetEr
  if (!missing && erDepth > 0) {
    desired = (targetEr * erDepth - sum) / tNew
  } else {
    desired = targetEr
  }

  return pickClosest(candidates, desired, preferredSide, tolerance)
}

function applyAutoSelections(context) {
  let changed = false
  for (let i = 0; i < state.layers.length; i += 1) {
    const layer = state.layers[i]
    if (!layer.auto) continue
    const suggestion = suggestGradeForLayer(i, context)
    if (suggestion && layer.gradeCode !== suggestion) {
      layer.gradeCode = suggestion
      changed = true
    }
  }
  return changed
}

function buildGradeOptions(selectedCode) {
  let html = `<option value="">Select Foam Grade</option>`
  state.gradeGroups.forEach((group) => {
    html += `<optgroup label="${escapeHtml(group.label)}">`
    group.options.forEach((grade) => {
      const selected = grade.code === selectedCode ? 'selected' : ''
      const label = `${grade.code} — ${grade.label_feature} (${formatPrice(grade.price)} / bf) ${grade.bucket}`
      html += `<option value="${escapeHtml(grade.code)}" ${selected}>${escapeHtml(label)}</option>`
    })
    html += `</optgroup>`
  })
  return html
}

function renderLayers(contributions, erDepth) {
  const total = state.layers.length
  layersContainer.innerHTML = state.layers
    .map((layer, index) => {
      const title = layerTitle(index, total)
      const contribution = contributions[index]
      const grade = layer.gradeCode ? state.gradeByCode.get(layer.gradeCode) : null
      const erValue = grade?.derivedEr
      const impactText = contribution > 0
        ? `ER impact: ${contribution.toFixed(2)}" of ${erDepth.toFixed(2)}"`
        : 'Below the first 6"'
      const meta = []
      if (grade) {
        meta.push(`Grade ER: ${Number.isFinite(erValue) ? erValue : '—'}`)
        meta.push(`Price: ${formatPrice(grade.price)}`)
        meta.push(`Bucket: ${grade.bucket}`)
        meta.push(`Firmness: ${grade.firmness || '—'}`)
        meta.push(`Quality: ${grade.foam_quality || '—'}`)
        meta.push(`Line: ${grade.groupLabel || '—'}`)
      }
      meta.push(impactText)

      return `
        <div class="layer-card" data-index="${index}">
          <div class="layer-header">
            <div>
              <div class="layer-title">${title}</div>
              <div class="layer-sub">${impactText}</div>
            </div>
            <div class="layer-actions">
              <button type="button" class="icon-btn" data-action="move-up" data-index="${index}" ${index === 0 ? 'disabled' : ''} aria-label="Move layer up" data-tooltip="Move up">
                <span class="material-symbols-rounded" aria-hidden="true">arrow_upward</span>
              </button>
              <button type="button" class="icon-btn" data-action="move-down" data-index="${index}" ${index === total - 1 ? 'disabled' : ''} aria-label="Move layer down" data-tooltip="Move down">
                <span class="material-symbols-rounded" aria-hidden="true">arrow_downward</span>
              </button>
              <button type="button" class="icon-btn" data-action="duplicate" data-index="${index}" aria-label="Duplicate layer" data-tooltip="Duplicate">
                <span class="material-symbols-rounded" aria-hidden="true">content_copy</span>
              </button>
              <button type="button" class="icon-btn" data-action="add-below" data-index="${index}" aria-label="Add layer below" data-tooltip="Add below">
                <span class="material-symbols-rounded" aria-hidden="true">add</span>
              </button>
              <button type="button" class="icon-btn danger" data-action="remove" data-index="${index}" ${total === 1 ? 'disabled' : ''} aria-label="Remove layer" data-tooltip="Remove">
                <span class="material-symbols-rounded" aria-hidden="true">delete</span>
              </button>
            </div>
          </div>
          <div class="layer-body">
            <div class="field">
              <label>Thickness (in)</label>
              <input type="number" min="0" step="0.25" data-field="thickness" data-index="${index}" value="${layer.thickness}" />
            </div>
            <div class="field">
              <label>Foam Grade</label>
              <select data-field="grade" data-index="${index}">
                ${buildGradeOptions(layer.gradeCode)}
              </select>
            </div>
          </div>
          <div class="layer-meta">
            ${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
      `
    })
    .join('')
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

function updateSummary({ target, preferredSide, actualEr, totalThickness, erDepth, totalPrice }) {
  targetErText.textContent = target ? target.value : '—'
  actualErText.textContent = Number.isFinite(actualEr) ? actualEr.toFixed(1) : '—'
  deltaErText.textContent = target && Number.isFinite(actualEr) ? (actualEr - target.value).toFixed(1) : '—'
  targetSourceText.textContent = target ? target.source : '—'
  preferredSideText.textContent = preferredSide || '—'
  totalThicknessText.textContent = Number.isFinite(totalThickness) ? `${totalThickness.toFixed(2)}"` : '—'
  erDepthText.textContent = Number.isFinite(erDepth) ? `${erDepth.toFixed(2)}"` : '—'
  totalPriceText.textContent = Number.isFinite(totalPrice) ? `${formatPrice(totalPrice)} / sqft` : '—'
}

function updateStatus({ target, budget, preferredSide, actualEr, contributions }) {
  if (!target || !budget || !preferredSide) {
    statusText.textContent = 'Waiting for Inputs'
    return
  }
  const missingGrade = contributions.some((contribution, idx) => contribution > 0 && !state.layers[idx].gradeCode)
  if (missingGrade) {
    statusText.textContent = 'Select foam grades for layers within the first 6".'
    return
  }
  if (!Number.isFinite(actualEr)) {
    statusText.textContent = 'Waiting for valid grades to compute ER.'
    return
  }
  statusText.textContent = 'Ready'
}

function updateAll() {
  const budget = getBudgetSelection()
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()
  const tolerance = Number(toleranceInput.value) || 0

  const { contributions, totalThickness, erDepth } = computeContributions(state.layers)

  const context = {
    targetEr: target ? target.value : null,
    preferredSide,
    budget,
    tolerance,
  }

  applyAutoSelections(context)

  const actualEr = computeActualEr(state.layers, contributions, erDepth)
  const totalPrice = computeTotalPrice(state.layers)

  updateSummary({ target, preferredSide, actualEr, totalThickness, erDepth, totalPrice })
  updateStatus({ target, budget, preferredSide, actualEr, contributions })
  renderLayers(contributions, erDepth)
}

function addLayerAt(index) {
  const layer = createLayer()
  state.layers.splice(index, 0, layer)
  updateAll()
}

function duplicateLayer(index) {
  const source = state.layers[index]
  const layer = createLayer({ thickness: source.thickness, gradeCode: source.gradeCode, auto: false })
  state.layers.splice(index + 1, 0, layer)
  updateAll()
}

function moveLayer(from, to) {
  if (to < 0 || to >= state.layers.length) return
  const [layer] = state.layers.splice(from, 1)
  state.layers.splice(to, 0, layer)
  updateAll()
}

function removeLayer(index) {
  if (state.layers.length <= 1) return
  state.layers.splice(index, 1)
  updateAll()
}

layersContainer.addEventListener('click', (event) => {
  const actionButton = event.target.closest('button[data-action]')
  if (!actionButton) return
  const index = Number(actionButton.dataset.index)
  const action = actionButton.dataset.action
  if (!Number.isFinite(index)) return

  switch (action) {
    case 'move-up':
      moveLayer(index, index - 1)
      break
    case 'move-down':
      moveLayer(index, index + 1)
      break
    case 'duplicate':
      duplicateLayer(index)
      break
    case 'add-below':
      addLayerAt(index + 1)
      break
    case 'remove':
      removeLayer(index)
      break
    default:
      break
  }
})

layersContainer.addEventListener('input', (event) => {
  const input = event.target
  if (!(input instanceof HTMLInputElement)) return
  if (input.dataset.field !== 'thickness') return
  const index = Number(input.dataset.index)
  if (!Number.isFinite(index)) return
  state.layers[index].thickness = input.value === '' ? '' : Number(input.value)
  updateAll()
})

layersContainer.addEventListener('change', (event) => {
  const select = event.target
  if (!(select instanceof HTMLSelectElement)) return
  if (select.dataset.field !== 'grade') return
  const index = Number(select.dataset.index)
  if (!Number.isFinite(index)) return
  const value = select.value
  state.layers[index].gradeCode = value
  state.layers[index].auto = value === ''
  updateAll()
})

addLayerButton.addEventListener('click', () => {
  addLayerAt(state.layers.length)
})

toggleInputsButton.addEventListener('click', () => {
  const collapsed = inputForm.classList.toggle('is-collapsed')
  toggleInputsButton.textContent = collapsed ? 'Show Inputs' : 'Hide Inputs'
  toggleInputsButton.setAttribute('aria-expanded', String(!collapsed))
})

document.querySelector('#input-form').addEventListener('submit', (event) => {
  event.preventDefault()
})

document.querySelectorAll('select, input').forEach((el) => {
  el.addEventListener('change', updateAll)
  el.addEventListener('input', updateAll)
})

async function init() {
  buildSelect(weightSelect, WEIGHT_GROUPS, 'Select Your Weight')
  buildSelect(backSelect, BACK_GROUPS, 'Your Back Condition')
  buildSelect(firmnessSelect, FIRMNESS_GROUPS, 'Your Preferred Firmness')

  const response = await fetch('/foam_grades_custom_shape.json')
  const data = await response.json()
  const grades = (data.grades || [])
    .map((grade) => {
      const priceValue = grade.price_retail_shapes !== '' ? Number(grade.price_retail_shapes) : null
      const price = Number.isFinite(priceValue) ? priceValue : null
      return {
        ...grade,
        price,
        derivedEr: deriveEr(grade.code),
      }
    })
    .filter((grade) => grade.price !== null)

  const prices = grades.map((g) => g.price).sort((a, b) => a - b)
  state.budget.min = prices[0] ?? null
  state.budget.max = prices[prices.length - 1] ?? null
  state.budget.p33 = quantile(prices, 0.3333)
  state.budget.p66 = quantile(prices, 0.6667)

  state.grades = grades.map((g) => ({
    ...g,
    bucket: bucketForPrice(g.price),
  }))

  state.gradeByCode = new Map(state.grades.map((g) => [g.code, g]))

  const groupMap = new Map()
  state.grades.forEach((grade) => {
    const label = grade.groupLabel || 'Other'
    if (!groupMap.has(label)) groupMap.set(label, [])
    groupMap.get(label).push(grade)
  })
  state.gradeGroups = Array.from(groupMap.entries()).map(([label, options]) => ({
    label,
    options,
  }))

  state.layers = [createLayer()]

  updateBudgetTable()
  updateAll()
}

init()
