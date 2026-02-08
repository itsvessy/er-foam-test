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

const GOOD_CODES = ['1517', '1530', '1535', '1543', '1570']
const BETTER_TOP_CODES = ['MF12']
const BETTER_BASE_CODES = ['EC26', 'EC36', 'EC46', 'EC55']
const BEST_TOP_CODES = ['LX19', 'LX28', 'LX36', 'LX46']
const BEST_BASE_CODES = ['PR18', 'PR23', 'PR28', 'PR35', 'PR40', 'PR50', 'PR60']
const CUSTOM_OPTION_KEY = 'foamite-custom-spec'
const MATTRESS_SIZE_GROUPS = [
  {
    label: 'Create Your Own',
    options: [
      {
        value: 'custom',
        label: 'Custom Size',
      },
    ],
  },
  {
    label: 'Choose a Common Size',
    options: [
      { value: '28x52-crib', label: '28" x 52" Crib', width: 28, height: 52 },
      { value: '30x72-camp', label: '30" x 72" Camp', width: 30, height: 72 },
      { value: '30x80-split-queen', label: '30" x 80" Split Queen', width: 30, height: 80 },
      { value: '35x79-euro-single', label: '35" x 79" Euro Single', width: 35, height: 79 },
      { value: '36x72-camp', label: '36" x 72" Camp', width: 36, height: 72 },
      { value: '39x75-twin-or-single', label: '39" x 75" Twin or Single', width: 39, height: 75 },
      { value: '39x80-single-xl', label: '39" x 80" Single XL', width: 39, height: 80 },
      { value: '48x75-three-quarter', label: '48" x 75" Three Quarter', width: 48, height: 75 },
      { value: '52x72-double-sofa-bed', label: '52" x 72" Double Sofa Bed', width: 52, height: 72 },
      { value: '54x75-double', label: '54" x 75" Double', width: 54, height: 75 },
      { value: '54x80-double-xl', label: '54" x 80" Double XL', width: 54, height: 80 },
      { value: '59x72-queen-sofa-bed', label: '59" x 72" Queen Sofa Bed', width: 59, height: 72 },
      { value: '60x75-short-queen', label: '60" x 75" Short Queen', width: 60, height: 75 },
      { value: '60x80-queen', label: '60" x 80" Queen', width: 60, height: 80 },
      { value: '60x84-waterbed-queen', label: '60" x 84" Waterbed Queen', width: 60, height: 84 },
      { value: '63x79-euro-queen', label: '63" x 79" Euro Queen', width: 63, height: 79 },
      { value: '66x80-olympic-queen', label: '66" x 80" Olympic Queen', width: 66, height: 80 },
      { value: '71x79-euro-king', label: '71" x 79" Euro King', width: 71, height: 79 },
      { value: '72x84-california-king', label: '72" x 84" California King', width: 72, height: 84 },
      { value: '76x80-king', label: '76" x 80" King', width: 76, height: 80 },
      { value: '80x96-grand-king', label: '80" x 96" Grand King', width: 80, height: 96 },
      { value: '84x84-wyoming-king', label: '84" x 84" Wyoming King', width: 84, height: 84 },
      { value: '96x96-alberta-king', label: '96" x 96" Alberta King', width: 96, height: 96 },
      { value: '108x108-alaskan-king', label: '108" x 108" Alaskan King', width: 108, height: 108 },
    ],
  },
]

const SOFT_MED_KEYS = new Set(['super-soft', 'soft', 'medium-soft', 'medium'])
const CALC_VERSION = 'er-v2-options'
const APP_VERSION = (import.meta?.env && import.meta.env.VITE_APP_VERSION) || 'local'

const app = document.querySelector('#app')
app.innerHTML = `
  <header class="hero">
    <div>
      <div class="eyebrow">Foamite • ER Selector Test</div>
      <h1>ER # Foam Grade Selector</h1>
      <p>Build mattress options from ER inputs, then customize your selected build before submitting.</p>
    </div>
  </header>

  <details class="help-panel">
    <summary>Help / How to use</summary>
    <div class="help-body">
      <ol>
        <li><strong>Enter customer and mattress inputs.</strong> Select weight/back/firmness, choose a mattress size preset (or enter custom width and length), then confirm thickness and ER controls.</li>
        <li><strong>Build options.</strong> Click <em>Build Mattresses</em> to generate Value, Performance, Long-Life, and Foamite Custom Spec options.</li>
        <li><strong>Select one option to unlock Layers.</strong> The Layers panel stays blank until you select an option; choose Foamite Custom Spec to start from a blank build.</li>
        <li><strong>Customize and submit.</strong> Adjust layers as needed, then submit to save your generated options and final selected build.</li>
      </ol>
    </div>
  </details>

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
            <label for="mattress-size-select">Mattress Size Preset</label>
            <select id="mattress-size-select"></select>
            <small>Selecting a preset fills width/length. You can still edit both fields.</small>
          </div>

          <div class="field-grid dimensions-grid">
            <div class="field">
              <label for="width-input">Width (in)</label>
              <input id="width-input" type="number" min="1" step="0.25" placeholder="e.g., 60" required />
            </div>
            <div class="field">
              <label for="length-input">Length (in)</label>
              <input id="length-input" type="number" min="1" step="0.25" placeholder="e.g., 80" required />
            </div>
          </div>

          <div class="field">
            <label for="mattress-thickness-input">Mattress Thickness (in)</label>
            <input id="mattress-thickness-input" type="number" min="0.25" step="0.25" value="10" placeholder="e.g., 10" required />
          </div>
          <div class="field">
            <button type="button" id="build-options">Build Mattresses</button>
          </div>

          <div class="field-divider" role="presentation"></div>

          <div class="field">
            <label for="override-input">Manual ER Override</label>
            <input id="override-input" type="number" min="1" step="1" placeholder="e.g., 32" />
            <small>Sets the Target ER directly and takes priority over calculated ER.</small>
          </div>

          <div class="field-grid">
            <div class="field">
              <label for="tolerance-input">Tolerance (+/-)</label>
              <input id="tolerance-input" type="number" min="0" step="1" value="5" />
            </div>
            <div class="field">
              <label for="top-min-input">Top Layer Min (in)</label>
              <input id="top-min-input" type="number" min="0" step="0.25" value="3" />
            </div>
            <div class="field">
              <label for="bottom-min-input">Bottom Layer Min (in)</label>
              <input id="bottom-min-input" type="number" min="0" step="0.25" value="2" />
            </div>
          </div>
        </div>
      </form>

      <div class="panel computed-panel">
        <div class="computed-head">
          <h2>Computed</h2>
          <div class="status-pill" id="status-text">Waiting for Inputs</div>
        </div>
        <div class="computed-grid">
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Target ER</span>
            </div>
            <strong id="target-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Actual ER</span>
            </div>
            <strong id="actual-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Delta</span>
            </div>
            <strong id="delta-er">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Source</span>
            </div>
            <strong id="target-source">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Preferred Side</span>
            </div>
            <strong id="preferred-side">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Total Thickness</span>
            </div>
            <strong id="total-thickness">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">ER Depth</span>
            </div>
            <strong id="er-depth">—</strong>
          </div>
          <div class="computed-item">
            <div class="computed-label">
              <span class="label-text">Estimated Price</span>
            </div>
            <strong id="total-price">—</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="panel options-panel">
        <div class="panel-header">
          <h2>Build Options</h2>
          <button type="button" class="ghost compact" id="toggle-options" aria-expanded="true">Hide Options</button>
        </div>
        <div class="collapsible-body" id="options-body">
          <div class="build-status" id="options-status" data-tone="muted">No options built yet.</div>
          <div class="options-list" id="options-container"></div>
        </div>
      </div>

      <div class="panel layers-panel">
        <div class="layers-header">
          <h2>Layers</h2>
          <button type="button" class="ghost" id="add-layer">Add Layer</button>
        </div>
        <div id="layers-container"></div>
        <div class="submit-panel">
          <div class="submit-actions">
            <button type="button" class="ghost" id="reset-build">Reset</button>
            <button type="button" id="submit-build">Submit Build</button>
          </div>
          <div class="submit-status" id="submit-status" data-tone="muted">Not submitted</div>
        </div>
      </div>
    </div>
  </section>
`

const weightSelect = document.querySelector('#weight-select')
const backSelect = document.querySelector('#back-select')
const firmnessSelect = document.querySelector('#firmness-select')
const mattressSizeSelect = document.querySelector('#mattress-size-select')
const widthInput = document.querySelector('#width-input')
const lengthInput = document.querySelector('#length-input')
const mattressThicknessInput = document.querySelector('#mattress-thickness-input')
const overrideInput = document.querySelector('#override-input')
const toleranceInput = document.querySelector('#tolerance-input')
const topMinInput = document.querySelector('#top-min-input')
const bottomMinInput = document.querySelector('#bottom-min-input')
const inputForm = document.querySelector('#input-form')
const toggleInputsButton = document.querySelector('#toggle-inputs')

const buildOptionsButton = document.querySelector('#build-options')
const optionsPanel = document.querySelector('.options-panel')
const toggleOptionsButton = document.querySelector('#toggle-options')
const optionsStatus = document.querySelector('#options-status')
const optionsContainer = document.querySelector('#options-container')

const statusText = document.querySelector('#status-text')
const targetErText = document.querySelector('#target-er')
const actualErText = document.querySelector('#actual-er')
const deltaErText = document.querySelector('#delta-er')
const targetSourceText = document.querySelector('#target-source')
const preferredSideText = document.querySelector('#preferred-side')
const totalThicknessText = document.querySelector('#total-thickness')
const erDepthText = document.querySelector('#er-depth')
const totalPriceText = document.querySelector('#total-price')

const layersContainer = document.querySelector('#layers-container')
const addLayerButton = document.querySelector('#add-layer')
const resetButton = document.querySelector('#reset-build')
const submitButton = document.querySelector('#submit-build')
const submitStatus = document.querySelector('#submit-status')

const state = {
  grades: [],
  gradeGroups: [],
  gradeByCode: new Map(),
  layers: [],
  nextId: 1,
  generatedOptions: [],
  selectedOptionKey: null,
  optionsFingerprint: null,
  submitting: false,
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
      opt.dataset.er = String(option.er)
      optgroup.appendChild(opt)
    })
    selectEl.appendChild(optgroup)
  })
}

function buildMattressSizeSelect(selectEl) {
  selectEl.innerHTML = ''

  const placeholder = document.createElement('option')
  placeholder.value = ''
  placeholder.textContent = 'Custom or Common Size?'
  placeholder.selected = true
  selectEl.appendChild(placeholder)

  MATTRESS_SIZE_GROUPS.forEach((group) => {
    const optgroup = document.createElement('optgroup')
    optgroup.label = group.label
    group.options.forEach((option) => {
      const opt = document.createElement('option')
      opt.value = option.value
      opt.textContent = option.label
      if (Number.isFinite(option.width)) opt.dataset.width = String(option.width)
      if (Number.isFinite(option.height)) opt.dataset.length = String(option.height)
      optgroup.appendChild(opt)
    })
    selectEl.appendChild(optgroup)
  })
}

function deriveEr(code) {
  const digits = String(code || '').match(/\d+/g)
  if (!digits) return null
  const joined = digits.join('')
  if (joined.length >= 2) return Number(joined.slice(-2))
  return Number(joined)
}

function clampThickness(value) {
  const num = Number(value)
  if (!Number.isFinite(num)) return 0
  return Math.max(0, num)
}

function roundToQuarter(value) {
  return Math.round(value * 4) / 4
}

function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `$${Number(value).toFixed(2)}`
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

function getSelectedOptionData(selectEl) {
  const selected = selectEl.selectedOptions[0]
  if (!selected) return null
  const er = Number(selected.dataset.er)
  return {
    value: selected.value || null,
    label: selected.textContent || null,
    er: Number.isFinite(er) ? er : null,
  }
}

function getSelectedMattressSizeData() {
  const selected = mattressSizeSelect.selectedOptions[0]
  if (!selected || !selected.value) return null

  const width = Number(selected.dataset.width)
  const length = Number(selected.dataset.length ?? selected.dataset.height)

  return {
    value: selected.value,
    label: selected.textContent || null,
    widthIn: Number.isFinite(width) ? width : null,
    lengthIn: Number.isFinite(length) ? length : null,
  }
}

function areDimensionsClose(a, b, epsilon = 0.001) {
  return Math.abs(a - b) <= epsilon
}

function findMattressPresetValueByDimensions(width, length) {
  for (let i = 0; i < MATTRESS_SIZE_GROUPS.length; i += 1) {
    const group = MATTRESS_SIZE_GROUPS[i]
    for (let j = 0; j < group.options.length; j += 1) {
      const option = group.options[j]
      if (!Number.isFinite(option.width)) continue
      const optionLength = Number.isFinite(option.length) ? option.length : option.height
      if (!Number.isFinite(optionLength)) continue
      if (areDimensionsClose(width, option.width) && areDimensionsClose(length, optionLength)) {
        return option.value
      }
    }
  }
  return null
}

function syncMattressPresetFromDimensions() {
  const widthRaw = widthInput.value
  const lengthRaw = lengthInput.value

  if (widthRaw === '' && lengthRaw === '') {
    if (mattressSizeSelect.value !== '') mattressSizeSelect.value = ''
    return
  }

  const width = Number(widthRaw)
  const length = Number(lengthRaw)
  const hasValidDimensions = Number.isFinite(width) && width > 0 && Number.isFinite(length) && length > 0

  if (!hasValidDimensions) {
    if (mattressSizeSelect.value !== 'custom') mattressSizeSelect.value = 'custom'
    return
  }

  const matchedPreset = findMattressPresetValueByDimensions(width, length)
  if (matchedPreset) {
    if (mattressSizeSelect.value !== matchedPreset) mattressSizeSelect.value = matchedPreset
    return
  }

  if (mattressSizeSelect.value !== 'custom') mattressSizeSelect.value = 'custom'
}

function getPreferredSide() {
  const selected = firmnessSelect.value
  if (!selected) return null
  return SOFT_MED_KEYS.has(selected) ? 'softer' : 'firmer'
}

function getBuildConfig() {
  const tolerance = Number(toleranceInput.value)
  const topLayerMin = Number(topMinInput.value)
  const bottomLayerMin = Number(bottomMinInput.value)
  return {
    tolerance: Number.isFinite(tolerance) ? Math.max(0, tolerance) : 0,
    topLayerMin: Number.isFinite(topLayerMin) ? Math.max(0, topLayerMin) : 0,
    bottomLayerMin: Number.isFinite(bottomLayerMin) ? Math.max(0, bottomLayerMin) : 0,
  }
}

function getDimensions() {
  const width = Number(widthInput.value)
  const length = Number(lengthInput.value)
  const mattressThickness = Number(mattressThicknessInput.value)
  return {
    width: Number.isFinite(width) && width > 0 ? width : null,
    length: Number.isFinite(length) && length > 0 ? length : null,
    mattressThickness: Number.isFinite(mattressThickness) && mattressThickness > 0 ? mattressThickness : null,
  }
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
    const thickness = clampThickness(layer.thickness)
    if (remaining <= 0) return 0
    const contribution = Math.max(0, Math.min(thickness, remaining))
    remaining -= contribution
    return contribution
  })
  const totalThickness = layers.reduce((sum, layer) => sum + clampThickness(layer.thickness), 0)
  const erDepth = Math.min(6, totalThickness)
  return { contributions, totalThickness, erDepth }
}

function computeActualEr(layers, contributions, erDepth) {
  if (erDepth <= 0) return null
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

function computeEstimatedPrice(layers, width, length) {
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(length) || length <= 0) return null
  let total = 0
  let hasThickness = false
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    const thickness = clampThickness(layer.thickness)
    if (thickness <= 0) continue
    hasThickness = true
    const grade = state.gradeByCode.get(layer.gradeCode)
    if (!grade || !Number.isFinite(grade.price)) return null
    total += grade.price * (width * length * thickness / 144)
  }
  if (!hasThickness) return null
  return total
}

function hasMissingPriceGrade(layers) {
  for (let i = 0; i < layers.length; i += 1) {
    const thickness = clampThickness(layers[i].thickness)
    if (thickness <= 0) continue
    if (!layers[i].gradeCode) return true
  }
  return false
}

function uniqueCodes(codes) {
  const seen = new Set()
  const result = []
  codes.forEach((code) => {
    if (!code || seen.has(code)) return
    seen.add(code)
    result.push(code)
  })
  return result
}

function rankCandidates(candidates, desired, preferredSide, tolerance, limit = 3) {
  if (!candidates.length || !Number.isFinite(desired)) return []
  const filtered = candidates.filter((g) => Number.isFinite(g.derivedEr))
  if (!filtered.length) return []

  const withinTol = filtered.filter((g) => Math.abs(g.derivedEr - desired) <= tolerance)
  const sorter = (a, b) => {
    const diffA = Math.abs(a.derivedEr - desired)
    const diffB = Math.abs(b.derivedEr - desired)
    if (diffA !== diffB) return diffA - diffB
    if (preferredSide === 'softer' && a.derivedEr !== b.derivedEr) return a.derivedEr - b.derivedEr
    if (preferredSide === 'firmer' && a.derivedEr !== b.derivedEr) return b.derivedEr - a.derivedEr
    return a.code.localeCompare(b.code)
  }

  const sortedWithin = [...withinTol].sort(sorter)
  const sortedAll = [...filtered].sort(sorter)
  const combined = uniqueCodes([...sortedWithin.map((g) => g.code), ...sortedAll.map((g) => g.code)])
  return combined.slice(0, limit)
}

function getSuggestionListForLayer(index, context, contributions, erDepth) {
  const { targetEr, preferredSide, tolerance } = context
  if (targetEr === null) return []

  const candidates = state.grades
  if (!candidates.length) return []

  const tNew = contributions[index]
  if (tNew <= 0) {
    const ranked = rankCandidates(candidates, targetEr, preferredSide, tolerance, 3)
    const prev = index > 0 ? state.layers[index - 1].gradeCode : null
    const combined = uniqueCodes(prev ? [prev, ...ranked] : ranked)
    return combined.slice(0, 3)
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
  }

  return rankCandidates(candidates, desired, preferredSide, tolerance, 3)
}

function suggestGradeForLayer(index, context, contributions, erDepth) {
  const suggestions = getSuggestionListForLayer(index, context, contributions, erDepth)
  return suggestions[0] || null
}

function applyAutoSelections(context, contributions, erDepth) {
  let changed = false
  for (let i = 0; i < state.layers.length; i += 1) {
    const layer = state.layers[i]
    if (!layer.auto) continue
    const suggestion = suggestGradeForLayer(i, context, contributions, erDepth)
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
      const label = `${grade.code} — ${grade.label_feature} (${formatMoney(grade.price)} / bf)`
      html += `<option value="${escapeHtml(grade.code)}" ${selected}>${escapeHtml(label)}</option>`
    })
    html += '</optgroup>'
  })
  return html
}

function renderLayers(contributions, erDepth, suggestions = []) {
  if (!state.selectedOptionKey) {
    layersContainer.innerHTML = '<div class="empty">Select a build option to load layers.</div>'
    return
  }

  if (!state.layers.length) {
    layersContainer.innerHTML = '<div class="empty">No layers yet. Click Add Layer to start your custom build.</div>'
    return
  }

  const total = state.layers.length
  layersContainer.innerHTML = state.layers
    .map((layer, index) => {
      const title = layerTitle(index, total)
      const contribution = contributions[index]
      const grade = layer.gradeCode ? state.gradeByCode.get(layer.gradeCode) : null
      const erValue = grade?.derivedEr
      const impactText = contribution > 0
        ? `ER impact: ${contribution.toFixed(2)}\" of ${erDepth.toFixed(2)}\"`
        : 'Below the first 6\"'
      const meta = []
      const suggestionList = suggestions[index] || []
      const primary = suggestionList[0]
      const alternates = suggestionList.slice(1, 3)
      const selectedCode = layer.gradeCode
      if (grade) {
        meta.push(`Grade ER: ${Number.isFinite(erValue) ? erValue : '—'}`)
        meta.push(`Price: ${formatMoney(grade.price)} / bf`)
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
            <div class="field thickness-field">
              <label>Thickness (in)</label>
              <input class="thickness-input" type="number" min="0" step="0.25" data-field="thickness" data-index="${index}" value="${layer.thickness}" />
            </div>
            <div class="field">
              <label>Foam Grade</label>
              <select data-field="grade" data-index="${index}">
                ${buildGradeOptions(layer.gradeCode)}
              </select>
            </div>
          </div>
          ${primary ? `
            <div class="layer-suggestions">
              <div class="suggestions-group">
                <div class="suggestions-label">Suggested</div>
                <div class="suggestions-list">
                  <button type="button" class="suggestion-chip ${selectedCode === primary ? 'selected' : ''}" data-action="select-suggestion" data-index="${index}" data-code="${escapeHtml(primary)}">
                    ${escapeHtml(primary)}
                  </button>
                </div>
              </div>
              <div class="suggestions-group">
                <div class="suggestions-label">Other</div>
                <div class="suggestions-list">
                  ${alternates.length ? alternates.map((code) => `
                    <button type="button" class="suggestion-chip ${selectedCode === code ? 'selected' : ''}" data-action="select-suggestion" data-index="${index}" data-code="${escapeHtml(code)}">
                      ${escapeHtml(code)}
                    </button>
                  `).join('') : '<div class="suggestions-empty">No other foam grades recommended.</div>'}
                </div>
              </div>
            </div>
          ` : ''}
          <div class="layer-meta">
            ${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
      `
    })
    .join('')
}

function setOptionStatus(message, tone = 'muted') {
  optionsStatus.textContent = message
  optionsStatus.dataset.tone = tone
}

function renderOptions() {
  if (!state.generatedOptions.length) {
    optionsContainer.innerHTML = '<div class="empty">Click <strong>Build Mattresses</strong> to generate options.</div>'
    return
  }

  const target = computeTargetEr()
  const config = getBuildConfig()
  const dims = getDimensions()
  const fingerprint = buildOptionsFingerprint(target, getPreferredSide(), config, dims)
  const optionsStale = state.optionsFingerprint !== null && state.optionsFingerprint !== fingerprint

  optionsContainer.innerHTML = state.generatedOptions.map((option) => {
    const selected = state.selectedOptionKey === option.key
    const metrics = [
      `Actual ER: ${Number.isFinite(option.actualEr) ? option.actualEr.toFixed(1) : '—'}`,
      `Delta: ${Number.isFinite(option.delta) ? option.delta.toFixed(1) : '—'}`,
      `Estimated Price: ${formatMoney(option.estimatedPrice)}`,
      option.withinTolerance === null
        ? 'Tolerance: n/a'
        : option.withinTolerance
          ? 'Within tolerance'
          : 'Outside tolerance',
    ]

    const layers = option.layers.map((layer, index) => {
      const layerName = layerTitle(index, option.layers.length)
      return `<li>${escapeHtml(layerName)}: ${escapeHtml(layer.thickness.toFixed(2))}\" • ${escapeHtml(layer.gradeCode || 'Select Grade')}</li>`
    }).join('')

    return `
      <article class="option-card ${selected ? 'selected' : ''}">
        <div class="option-head">
          <div>
            <h3>${escapeHtml(option.label)}</h3>
            <div class="option-note">${escapeHtml(option.note)}</div>
          </div>
          <button type="button" data-action="select-option" data-key="${escapeHtml(option.key)}" ${selected ? 'disabled' : ''}>
            ${selected ? 'Selected' : 'Select'}
          </button>
        </div>
        <div class="option-metrics">
          ${metrics.map((metric) => `<span>${escapeHtml(metric)}</span>`).join('')}
        </div>
        <ul class="option-layers">${layers}</ul>
      </article>
    `
  }).join('')

  if (optionsStale) {
    optionsContainer.insertAdjacentHTML('afterbegin', '<div class="build-stale">Inputs changed since build. Rebuild recommended.</div>')
  }
}

function updateSummary({ target, preferredSide, actualEr, totalThickness, erDepth, estimatedPrice }) {
  targetErText.textContent = target ? target.value : '—'
  actualErText.textContent = Number.isFinite(actualEr) ? actualEr.toFixed(1) : '—'
  deltaErText.textContent = target && Number.isFinite(actualEr) ? (actualEr - target.value).toFixed(1) : '—'
  targetSourceText.textContent = target ? target.source : '—'
  preferredSideText.textContent = preferredSide || '—'
  totalThicknessText.textContent = Number.isFinite(totalThickness) ? `${totalThickness.toFixed(2)}\"` : '—'
  erDepthText.textContent = Number.isFinite(erDepth) ? `${erDepth.toFixed(2)}\"` : '—'
  totalPriceText.textContent = Number.isFinite(estimatedPrice) ? formatMoney(estimatedPrice) : '—'
}

function computeStatusText({ target, preferredSide, actualEr, contributions, layers, estimatedPrice }) {
  if (!target || !preferredSide) return 'Waiting for Inputs'
  if (!state.generatedOptions.length) return 'Build mattresses to generate options.'
  if (!state.selectedOptionKey) return 'Select a built option to continue.'

  const missingGrade = contributions.some((contribution, idx) => contribution > 0 && !layers[idx].gradeCode)
  if (missingGrade) return 'Select foam grades for layers within the first 6\".'
  if (hasMissingPriceGrade(layers)) return 'Select foam grades for all non-zero layers to estimate price.'
  if (!Number.isFinite(actualEr)) return 'Waiting for valid grades to compute ER.'
  if (!Number.isFinite(estimatedPrice)) return 'Enter valid dimensions and foam grades to estimate total price.'
  return 'Ready'
}

function updateStatus({ target, preferredSide, actualEr, contributions, estimatedPrice }) {
  statusText.textContent = computeStatusText({
    target,
    preferredSide,
    actualEr,
    contributions,
    layers: state.layers,
    estimatedPrice,
  })
}

function updateActionAvailability() {
  const hasSelection = Boolean(state.selectedOptionKey)
  addLayerButton.disabled = !hasSelection
  submitButton.disabled = state.submitting || !hasSelection
}

function updateComputedPreview() {
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()
  const dims = getDimensions()
  const { contributions, totalThickness, erDepth } = computeContributions(state.layers)
  const actualEr = computeActualEr(state.layers, contributions, erDepth)
  const estimatedPrice = computeEstimatedPrice(state.layers, dims.width, dims.length)

  updateSummary({ target, preferredSide, actualEr, totalThickness, erDepth, estimatedPrice })
  updateStatus({ target, preferredSide, actualEr, contributions, estimatedPrice })
}

function getLayerFocusInfo() {
  const active = document.activeElement
  if (!active || !(active instanceof HTMLElement)) return null
  if (!layersContainer.contains(active)) return null
  const field = active.dataset.field
  const index = active.dataset.index
  if (!field || index === undefined) return null
  const info = { field, index }
  if ('selectionStart' in active && 'selectionEnd' in active) {
    info.selectionStart = active.selectionStart
    info.selectionEnd = active.selectionEnd
  }
  return info
}

function restoreLayerFocus(info) {
  if (!info) return
  const selector = `[data-field="${info.field}"][data-index="${info.index}"]`
  const next = layersContainer.querySelector(selector)
  if (!next || !(next instanceof HTMLElement)) return
  requestAnimationFrame(() => {
    next.focus()
    if ('selectionStart' in next && 'selectionEnd' in next && Number.isFinite(info.selectionStart)) {
      next.setSelectionRange(info.selectionStart, info.selectionEnd ?? info.selectionStart)
    }
  })
}

function buildOptionsFingerprint(target, preferredSide, config, dims) {
  return JSON.stringify({
    targetEr: target ? target.value : null,
    targetSource: target ? target.source : null,
    preferredSide,
    tolerance: config.tolerance,
    topLayerMin: config.topLayerMin,
    bottomLayerMin: config.bottomLayerMin,
    width: dims.width,
    length: dims.length,
    mattressThickness: dims.mattressThickness,
  })
}

function evaluateOptionCandidate(key, label, layers, context, note) {
  const normalizedLayers = layers.map((layer) => ({
    thickness: roundToQuarter(clampThickness(layer.thickness)),
    gradeCode: layer.gradeCode,
  }))

  const { contributions, erDepth } = computeContributions(normalizedLayers)
  const actualEr = computeActualEr(normalizedLayers, contributions, erDepth)
  const delta = Number.isFinite(actualEr) ? actualEr - context.targetEr : null
  const absDelta = Number.isFinite(delta) ? Math.abs(delta) : Number.POSITIVE_INFINITY
  const withinTolerance = Number.isFinite(absDelta) && absDelta <= context.tolerance
  const estimatedPrice = computeEstimatedPrice(normalizedLayers, context.width, context.length)

  return {
    key,
    label,
    layers: normalizedLayers,
    actualEr,
    delta,
    absDelta,
    withinTolerance,
    estimatedPrice,
    note,
    signature: normalizedLayers.map((layer) => `${layer.gradeCode}:${layer.thickness.toFixed(2)}`).join('|'),
  }
}

function compareOptionCandidates(a, b, preferredSide) {
  const epsilon = 1e-9

  if (a.withinTolerance !== b.withinTolerance) return a.withinTolerance ? -1 : 1

  if (Math.abs(a.absDelta - b.absDelta) > epsilon) return a.absDelta - b.absDelta

  if (Number.isFinite(a.absDelta) && Number.isFinite(b.absDelta)) {
    if (preferredSide === 'softer' && Number.isFinite(a.actualEr) && Number.isFinite(b.actualEr) && a.actualEr !== b.actualEr) {
      return a.actualEr - b.actualEr
    }
    if (preferredSide === 'firmer' && Number.isFinite(a.actualEr) && Number.isFinite(b.actualEr) && a.actualEr !== b.actualEr) {
      return b.actualEr - a.actualEr
    }
  }

  if (Number.isFinite(a.estimatedPrice) && Number.isFinite(b.estimatedPrice) && a.estimatedPrice !== b.estimatedPrice) {
    return a.estimatedPrice - b.estimatedPrice
  }

  return a.signature.localeCompare(b.signature)
}

function pickBestCandidate(candidates, preferredSide) {
  if (!candidates.length) return null
  return [...candidates].sort((a, b) => compareOptionCandidates(a, b, preferredSide))[0]
}

function filterValidCodes(codes) {
  return codes.filter((code) => state.gradeByCode.has(code))
}

function buildGoodOption(context) {
  const codes = filterValidCodes(GOOD_CODES)
  const candidates = codes.map((code) => (
    evaluateOptionCandidate(
      'good',
      'Value',
      [{ thickness: context.mattressThickness, gradeCode: code }],
      context,
      'Single 1.5 lb Seats & Toppers layer',
    )
  ))
  return pickBestCandidate(candidates, context.preferredSide)
}

function buildCustomOption(context) {
  const thickness = roundToQuarter(clampThickness(context.mattressThickness))
  return {
    key: CUSTOM_OPTION_KEY,
    label: 'Foamite Custom Spec',
    layers: [{ thickness, gradeCode: '' }],
    actualEr: null,
    delta: null,
    absDelta: Number.POSITIVE_INFINITY,
    withinTolerance: null,
    estimatedPrice: null,
    note: 'None of these? Start clean with a blank Foamite spec.',
    signature: `custom:${thickness.toFixed(2)}`,
  }
}

function buildTwoLayerOption({ key, label, topCodes, baseCodes }, context) {
  if (!Number.isFinite(context.mattressThickness) || context.mattressThickness <= 0) return null

  const validTopCodes = filterValidCodes(topCodes)
  const validBaseCodes = filterValidCodes(baseCodes)
  if (!validTopCodes.length) return null

  const candidates = []
  const total = context.mattressThickness
  const canSplit = validBaseCodes.length > 0 && total >= context.topLayerMin + context.bottomLayerMin

  if (canSplit) {
    const startUnits = Math.ceil(context.topLayerMin * 4)
    const endUnits = Math.floor((total - context.bottomLayerMin) * 4)

    for (let topUnits = startUnits; topUnits <= endUnits; topUnits += 1) {
      const topThickness = topUnits / 4
      const bottomThickness = roundToQuarter(total - topThickness)
      if (bottomThickness < context.bottomLayerMin) continue

      validTopCodes.forEach((topCode) => {
        validBaseCodes.forEach((baseCode) => {
          const candidate = evaluateOptionCandidate(
            key,
            label,
            [
              { thickness: topThickness, gradeCode: topCode },
              { thickness: bottomThickness, gradeCode: baseCode },
            ],
            context,
            `Top ${topThickness.toFixed(2)}\" ${topCode} + Bottom ${bottomThickness.toFixed(2)}\" ${baseCode}`,
          )
          candidates.push(candidate)
        })
      })
    }
  }

  if (!candidates.length) {
    validTopCodes.forEach((topCode) => {
      candidates.push(
        evaluateOptionCandidate(
          key,
          label,
          [{ thickness: total, gradeCode: topCode }],
          context,
          `Single-layer fallback: ${topCode}`,
        ),
      )
    })
  }

  return pickBestCandidate(candidates, context.preferredSide)
}

function buildMattressOptions() {
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()
  const dims = getDimensions()
  const config = getBuildConfig()

  if (!target) {
    setOptionStatus('Complete ER inputs or provide manual ER override first.', 'error')
    return
  }
  if (!preferredSide) {
    setOptionStatus('Select firmness preference before building options.', 'error')
    return
  }
  if (!Number.isFinite(dims.width) || !Number.isFinite(dims.length) || !Number.isFinite(dims.mattressThickness)) {
    setOptionStatus('Enter valid width, length, and mattress thickness.', 'error')
    return
  }

  const context = {
    targetEr: target.value,
    preferredSide,
    tolerance: config.tolerance,
    topLayerMin: config.topLayerMin,
    bottomLayerMin: config.bottomLayerMin,
    width: dims.width,
    length: dims.length,
    mattressThickness: dims.mattressThickness,
  }

  const options = [
    buildGoodOption(context),
    buildTwoLayerOption({ key: 'better', label: 'Performance', topCodes: BETTER_TOP_CODES, baseCodes: BETTER_BASE_CODES }, context),
    buildTwoLayerOption({ key: 'best', label: 'Long-Life', topCodes: BEST_TOP_CODES, baseCodes: BEST_BASE_CODES }, context),
    buildCustomOption(context),
  ].filter(Boolean)

  if (!options.length) {
    setOptionStatus('No build options could be generated from current foam data.', 'error')
    return
  }

  state.generatedOptions = options
  state.selectedOptionKey = null
  state.optionsFingerprint = buildOptionsFingerprint(target, preferredSide, config, dims)

  state.nextId = 1
  state.layers = []

  setOptionStatus(`Built ${options.length} options. Select one to customize.`, 'success')
  setSubmitStatus('Not submitted', 'muted')
  updateAll()
}

function selectBuiltOption(key) {
  const option = state.generatedOptions.find((item) => item.key === key)
  if (!option) return

  state.selectedOptionKey = key
  state.nextId = 1
  state.layers = option.layers.map((layer) => createLayer({
    thickness: layer.thickness,
    gradeCode: layer.gradeCode,
    auto: false,
  }))
  if (!state.layers.length) state.layers = [createLayer()]

  setOptionStatus(`${option.label} selected. Customize layers before submitting.`, 'success')
  setSubmitStatus('Not submitted', 'muted')
  updateAll()
}

function applyMattressSizePreset() {
  const preset = getSelectedMattressSizeData()
  if (!preset) {
    updateAll()
    return
  }

  if (Number.isFinite(preset.widthIn)) widthInput.value = String(preset.widthIn)
  if (Number.isFinite(preset.lengthIn)) lengthInput.value = String(preset.lengthIn)
  updateAll()
}

function getSelectedOption() {
  if (!state.selectedOptionKey) return null
  return state.generatedOptions.find((option) => option.key === state.selectedOptionKey) || null
}

function buildSubmissionPayload() {
  const weight = getSelectedOptionData(weightSelect)
  const back = getSelectedOptionData(backSelect)
  const firmness = getSelectedOptionData(firmnessSelect)
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()
  const dims = getDimensions()
  const config = getBuildConfig()

  const { contributions, totalThickness, erDepth } = computeContributions(state.layers)
  const actualEr = computeActualEr(state.layers, contributions, erDepth)
  const estimatedPrice = computeEstimatedPrice(state.layers, dims.width, dims.length)
  const deltaEr = target && Number.isFinite(actualEr) ? actualEr - target.value : null

  const context = {
    targetEr: target ? target.value : null,
    preferredSide,
    tolerance: config.tolerance,
  }

  const layers = state.layers.map((layer, index) => {
    const grade = layer.gradeCode ? state.gradeByCode.get(layer.gradeCode) : null
    const suggestionList = getSuggestionListForLayer(index, context, contributions, erDepth)
    return {
      index,
      label: layerTitle(index, state.layers.length),
      thickness: clampThickness(layer.thickness),
      contribution: contributions[index] || 0,
      gradeCode: layer.gradeCode || null,
      auto: layer.auto,
      recommendations: {
        primary: suggestionList[0] || null,
        alternates: suggestionList.slice(1, 3),
        all: suggestionList,
      },
      grade: grade
        ? {
            label: grade.label_feature || null,
            pricePerBf: grade.price ?? null,
            derivedEr: grade.derivedEr ?? null,
          }
        : null,
    }
  })

  const generatedOptions = state.generatedOptions.map((option) => ({
    key: option.key,
    label: option.label,
    note: option.note,
    actualEr: Number.isFinite(option.actualEr) ? option.actualEr : null,
    deltaEr: Number.isFinite(option.delta) ? option.delta : null,
    withinTolerance: option.withinTolerance,
    estimatedPrice: Number.isFinite(option.estimatedPrice) ? option.estimatedPrice : null,
    layers: option.layers.map((layer) => ({
      thickness: layer.thickness,
      gradeCode: layer.gradeCode,
    })),
  }))

  const selectedOption = getSelectedOption()
  const statusTextValue = computeStatusText({
    target,
    preferredSide,
    actualEr,
    contributions,
    layers: state.layers,
    estimatedPrice,
  })

  return {
    createdAt: new Date().toISOString(),
    meta: {
      status: statusTextValue,
      calcVersion: CALC_VERSION,
      appVersion: APP_VERSION,
      selectedOptionKey: selectedOption?.key || null,
      selectedOptionLabel: selectedOption?.label || null,
    },
    inputs: {
      weight,
      back,
      firmness,
      mattressSizePreset: getSelectedMattressSizeData(),
      overrideEr: overrideInput.value !== '' ? Number(overrideInput.value) : null,
      tolerance: config.tolerance,
      topLayerMin: config.topLayerMin,
      bottomLayerMin: config.bottomLayerMin,
      widthIn: dims.width,
      lengthIn: dims.length,
      heightIn: dims.length,
      mattressThicknessIn: dims.mattressThickness,
      preferredSide,
    },
    computed: {
      targetEr: target ? target.value : null,
      targetSource: target ? target.source : null,
      actualEr: Number.isFinite(actualEr) ? actualEr : null,
      deltaEr: Number.isFinite(deltaEr) ? deltaEr : null,
      totalThickness,
      erDepth,
      estimatedPrice: Number.isFinite(estimatedPrice) ? estimatedPrice : null,
    },
    generatedOptions,
    layers,
  }
}

function validateSubmission(payload) {
  if (!payload.inputs.weight || !payload.inputs.back || !payload.inputs.firmness) {
    return 'Complete weight, back condition, and firmness inputs before submitting.'
  }
  if (!Number.isFinite(payload.inputs.widthIn) || !Number.isFinite(payload.inputs.lengthIn) || !Number.isFinite(payload.inputs.mattressThicknessIn)) {
    return 'Enter valid width, length, and mattress thickness.'
  }
  if (!Array.isArray(payload.generatedOptions) || payload.generatedOptions.length === 0) {
    return 'Build mattresses before submitting.'
  }
  if (!payload.meta.selectedOptionKey) {
    return 'Select one built option before submitting.'
  }
  if (!Number.isFinite(payload.computed.targetEr)) {
    return 'Target ER is missing.'
  }
  const hasThickness = payload.layers.some((layer) => layer.thickness > 0)
  if (!hasThickness) {
    return 'Add at least one layer with thickness.'
  }
  const missingGrade = payload.layers.some((layer) => layer.thickness > 0 && !layer.gradeCode)
  if (missingGrade) {
    return 'Select a foam grade for each non-zero layer.'
  }
  if (!Number.isFinite(payload.computed.estimatedPrice)) {
    return 'Estimated price is missing; confirm dimensions and layer grades.'
  }
  return null
}

function setSubmitStatus(message, tone = 'muted') {
  submitStatus.textContent = message
  submitStatus.dataset.tone = tone
}

function resetAll() {
  weightSelect.selectedIndex = 0
  backSelect.selectedIndex = 0
  firmnessSelect.selectedIndex = 0
  mattressSizeSelect.selectedIndex = 0

  widthInput.value = ''
  lengthInput.value = ''
  mattressThicknessInput.value = '10'

  overrideInput.value = ''
  toleranceInput.value = '5'
  topMinInput.value = '3'
  bottomMinInput.value = '2'

  state.nextId = 1
  state.layers = []
  state.generatedOptions = []
  state.selectedOptionKey = null
  state.optionsFingerprint = null
  state.submitting = false

  setOptionStatus('No options built yet.', 'muted')
  setSubmitStatus('Not submitted', 'muted')
  updateAll()
}

async function handleSubmit() {
  const payload = buildSubmissionPayload()
  const validationError = validateSubmission(payload)
  if (validationError) {
    setSubmitStatus(validationError, 'error')
    return
  }

  state.submitting = true
  updateActionAvailability()
  setSubmitStatus('Submitting…', 'pending')

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`Submit failed (${response.status})`)

    const data = await response.json().catch(() => ({}))
    const suffix = data && data.id ? ` (${String(data.id).slice(0, 8)})` : ''
    setSubmitStatus(`Submitted${suffix}`, 'success')
  } catch (error) {
    setSubmitStatus('Submit failed. Try again.', 'error')
  } finally {
    state.submitting = false
    updateActionAvailability()
  }
}

function updateAll() {
  const target = computeTargetEr()
  const preferredSide = getPreferredSide()
  const dims = getDimensions()
  const config = getBuildConfig()

  const { contributions, totalThickness, erDepth } = computeContributions(state.layers)

  const context = {
    targetEr: target ? target.value : null,
    preferredSide,
    tolerance: config.tolerance,
  }

  applyAutoSelections(context, contributions, erDepth)

  const actualEr = computeActualEr(state.layers, contributions, erDepth)
  const estimatedPrice = computeEstimatedPrice(state.layers, dims.width, dims.length)

  const suggestions = state.layers.map((_, index) =>
    getSuggestionListForLayer(index, context, contributions, erDepth),
  )

  const focusInfo = getLayerFocusInfo()
  updateSummary({ target, preferredSide, actualEr, totalThickness, erDepth, estimatedPrice })
  updateStatus({ target, preferredSide, actualEr, contributions, estimatedPrice })
  renderLayers(contributions, erDepth, suggestions)
  renderOptions()
  updateActionAvailability()
  restoreLayerFocus(focusInfo)
}

function addLayerAt(index) {
  if (!state.selectedOptionKey) return
  const layer = createLayer()
  state.layers.splice(index, 0, layer)
  updateAll()
}

function duplicateLayer(index) {
  if (!state.selectedOptionKey) return
  const source = state.layers[index]
  const layer = createLayer({ thickness: source.thickness, gradeCode: source.gradeCode, auto: false })
  state.layers.splice(index + 1, 0, layer)
  updateAll()
}

function moveLayer(from, to) {
  if (!state.selectedOptionKey) return
  if (to < 0 || to >= state.layers.length) return
  const [layer] = state.layers.splice(from, 1)
  state.layers.splice(to, 0, layer)
  updateAll()
}

function removeLayer(index) {
  if (!state.selectedOptionKey) return
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
    case 'select-suggestion': {
      const code = actionButton.dataset.code
      if (code) {
        state.layers[index].gradeCode = code
        state.layers[index].auto = false
        updateAll()
      }
      break
    }
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
  state.layers[index].thickness = input.value
  updateComputedPreview()
})

layersContainer.addEventListener('change', (event) => {
  const input = event.target
  if (input instanceof HTMLInputElement && input.dataset.field === 'thickness') {
    const index = Number(input.dataset.index)
    if (!Number.isFinite(index)) return
    state.layers[index].thickness = input.value
    updateAll()
    return
  }

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

optionsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="select-option"]')
  if (!button) return
  const key = button.dataset.key
  if (!key) return
  selectBuiltOption(key)
})

buildOptionsButton.addEventListener('click', () => {
  buildMattressOptions()
})

addLayerButton.addEventListener('click', () => {
  addLayerAt(state.layers.length)
})

resetButton.addEventListener('click', () => {
  resetAll()
})

submitButton.addEventListener('click', () => {
  handleSubmit()
})

toggleInputsButton.addEventListener('click', () => {
  const collapsed = inputForm.classList.toggle('is-collapsed')
  toggleInputsButton.textContent = collapsed ? 'Show Inputs' : 'Hide Inputs'
  toggleInputsButton.setAttribute('aria-expanded', String(!collapsed))
})

toggleOptionsButton.addEventListener('click', () => {
  const collapsed = optionsPanel.classList.toggle('is-collapsed')
  toggleOptionsButton.textContent = collapsed ? 'Show Options' : 'Hide Options'
  toggleOptionsButton.setAttribute('aria-expanded', String(!collapsed))
})

document.querySelector('#input-form').addEventListener('submit', (event) => {
  event.preventDefault()
})

mattressSizeSelect.addEventListener('change', () => {
  applyMattressSizePreset()
})

function handleDimensionInputChange() {
  syncMattressPresetFromDimensions()
  updateAll()
}

widthInput.addEventListener('change', handleDimensionInputChange)
widthInput.addEventListener('input', handleDimensionInputChange)
lengthInput.addEventListener('change', handleDimensionInputChange)
lengthInput.addEventListener('input', handleDimensionInputChange)

;[
  weightSelect,
  backSelect,
  firmnessSelect,
  mattressThicknessInput,
  overrideInput,
  toleranceInput,
  topMinInput,
  bottomMinInput,
].forEach((el) => {
  el.addEventListener('change', updateAll)
  el.addEventListener('input', updateAll)
})

async function init() {
  buildSelect(weightSelect, WEIGHT_GROUPS, 'Select Your Weight')
  buildSelect(backSelect, BACK_GROUPS, 'Your Back Condition')
  buildSelect(firmnessSelect, FIRMNESS_GROUPS, 'Your Preferred Firmness')
  buildMattressSizeSelect(mattressSizeSelect)

  try {
    const response = await fetch('/foam_grades_custom_shape.json')
    if (!response.ok) throw new Error(`Failed to load foam grades (${response.status})`)

    const data = await response.json()
    const grades = (data.grades || [])
      .map((grade) => {
        const priceRaw = Number(grade.price_retail_shapes)
        const price = Number.isFinite(priceRaw) ? priceRaw : null
        return {
          ...grade,
          price,
          derivedEr: deriveEr(grade.code),
        }
      })
      .filter((grade) => grade.price !== null)

    state.grades = grades
    state.gradeByCode = new Map(state.grades.map((grade) => [grade.code, grade]))

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

    state.nextId = 1
    state.layers = []

    setOptionStatus('No options built yet.', 'muted')
    setSubmitStatus('Not submitted', 'muted')
    updateAll()
  } catch (error) {
    setOptionStatus('Failed to load foam grades.', 'error')
    setSubmitStatus('Cannot submit until foam grades load.', 'error')
  }
}

init()
