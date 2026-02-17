import './preview-prototype.css'

import { buildGradeMetadataByCode } from './preview/colorResolver.js'
import { generateMattressPreviewSvg } from './preview/index.js'
import { normalizeStyleMode } from './preview/styleTextureResolver.js'
import {
  PREVIEW_STYLE_OPTIONS,
  clampStyleControlValue,
  getStyleControlDefs,
  sanitizeStyleOverrides,
} from './preview/styleControls.js'

const LOCAL_STORAGE_KEY = 'foamite.preview.prototype.state.v1'
const HASH_LENGTH_LIMIT = 1500
const SVG_WARN_BYTES = 100 * 1024

const FALLBACK_GRADES = [
  {
    code: '1517',
    label_feature: '1.5 lb Soft',
    groupLabel: 'Basic - 1.5 lb Seats & Toppers 110" Long',
    grade_description: 'Fallback sample grade for offline prototype. White foam.',
  },
  {
    code: 'MF12',
    label_feature: 'Memory Foam Soft',
    groupLabel: 'Speciality Grades',
    grade_description: 'Fallback sample grade for offline prototype. Memory foam.',
  },
  {
    code: 'EC55',
    label_feature: 'Ecocell Extra Firm',
    groupLabel: 'Better - Ecocell 102" Long',
    grade_description: 'Fallback sample grade for offline prototype. White foam.',
  },
  {
    code: 'PR35',
    label_feature: 'Preserve HR Med Firm',
    groupLabel: 'Premium - Preserve HR 88" Long',
    grade_description: 'Fallback sample grade for offline prototype. Peachy gold foam.',
  },
  {
    code: 'LX28',
    label_feature: 'Organic Latex Medium',
    groupLabel: 'Speciality Grades',
    grade_description: 'Fallback sample grade for offline prototype. Latex foam.',
  },
]

const PRESETS = {
  'single-layer': {
    label: 'Single layer (10" 1517)',
    layers: [
      { thicknessIn: 10, gradeCode: '1517' },
    ],
  },
  'two-layer': {
    label: 'Two layer (3" MF12 + 7" EC55)',
    layers: [
      { thicknessIn: 3, gradeCode: 'MF12' },
      { thicknessIn: 7, gradeCode: 'EC55' },
    ],
  },
  'multi-thin': {
    label: 'Multi-layer thin slices',
    layers: [
      { thicknessIn: 0.25, gradeCode: 'MF12' },
      { thicknessIn: 0.5, gradeCode: 'LX28' },
      { thicknessIn: 1.25, gradeCode: 'PR35' },
      { thicknessIn: 8, gradeCode: 'EC55' },
    ],
  },
  unassigned: {
    label: 'Unassigned non-zero layer',
    layers: [
      { thicknessIn: 3, gradeCode: null },
      { thicknessIn: 7, gradeCode: 'EC55' },
    ],
  },
  reordered: {
    label: 'Reordered stack',
    layers: [
      { thicknessIn: 6, gradeCode: 'EC55' },
      { thicknessIn: 2, gradeCode: 'MF12' },
      { thicknessIn: 2, gradeCode: 'PR35' },
    ],
  },
}

const runtime = {
  config: null,
  grades: [],
  gradeMetadataByCode: {},
  state: null,
  currentSvg: '',
  latestOutput: null,
  warningMessage: '',
  statusMessage: '',
  statusTone: 'muted',
}

const app = document.querySelector('#preview-app')

app.innerHTML = `
  <div class="preview-shell">
    <aside class="panel controls">
      <h1>Mattress SVG Preview Prototype</h1>
      <p>Prototype-only surface for perspective, thickness, and color-family validation.</p>
      <div class="warning-banner hidden" id="data-warning"></div>

      <fieldset>
        <legend>Preset + Layers</legend>
        <div>
          <label for="preset-select">Scenario preset</label>
          <select id="preset-select"></select>
        </div>
        <div class="row">
          <button type="button" class="small" id="apply-preset">Apply preset</button>
          <button type="button" class="small" id="add-layer">Add layer</button>
          <button type="button" class="small" id="reset-defaults">Reset defaults</button>
        </div>
        <div class="layer-list" id="layer-list"></div>
      </fieldset>

      <fieldset>
        <legend>Projection</legend>
        <div class="grid-2">
          <div>
            <label for="front-width">Front width</label>
            <input id="front-width" type="number" min="50" step="1" />
          </div>
          <div>
            <label for="front-height">Front height</label>
            <input id="front-height" type="number" min="50" step="1" />
          </div>
          <div>
            <label for="depth-dx">Depth dx</label>
            <input id="depth-dx" type="number" min="1" step="1" />
          </div>
          <div>
            <label for="depth-dy">Depth dy</label>
            <input id="depth-dy" type="number" min="1" step="1" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Style</legend>
        <div class="segmented" id="style-tabs"></div>
        <div class="style-controls" id="style-controls"></div>
        <div class="row">
          <button type="button" class="small" id="reset-style-controls">Reset active style</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Label Rules</legend>
        <div class="grid-2">
          <div>
            <label for="label-min">Label min slice px</label>
            <input id="label-min" type="number" min="1" step="1" />
          </div>
          <div>
            <label for="label-font">Label font size</label>
            <input id="label-font" type="number" min="8" step="1" />
          </div>
        </div>
      </fieldset>
    </aside>

    <section class="preview-column">
      <section class="panel preview-panel">
        <div class="preview-head">
          <h2>Generated SVG Preview</h2>
        </div>

        <div class="canvas-shell">
          <div class="generated-stage">
            <div class="generated-svg" id="generated-preview"></div>
          </div>
        </div>
      </section>

      <section class="panel diagnostics-panel">
        <h2>Diagnostics</h2>
        <div class="stats" id="stats"></div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Grade</th>
                <th>Thickness</th>
                <th>Family</th>
                <th>Source</th>
                <th>Fallback</th>
                <th>Height px</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody id="mapping-audit"></tbody>
          </table>
        </div>
      </section>

      <section class="panel raw-panel">
        <h2>Raw SVG</h2>
        <div class="raw-actions">
          <button type="button" class="primary" id="copy-svg">Copy SVG</button>
          <button type="button" id="download-svg">Download SVG</button>
          <span class="status-line" id="export-status"></span>
        </div>
        <textarea id="raw-svg" readonly></textarea>
      </section>
    </section>
  </div>
`

const dataWarning = document.querySelector('#data-warning')
const presetSelect = document.querySelector('#preset-select')
const applyPresetButton = document.querySelector('#apply-preset')
const addLayerButton = document.querySelector('#add-layer')
const resetDefaultsButton = document.querySelector('#reset-defaults')
const layerList = document.querySelector('#layer-list')

const frontWidthInput = document.querySelector('#front-width')
const frontHeightInput = document.querySelector('#front-height')
const depthDxInput = document.querySelector('#depth-dx')
const depthDyInput = document.querySelector('#depth-dy')
const labelMinInput = document.querySelector('#label-min')
const labelFontInput = document.querySelector('#label-font')
const styleTabs = document.querySelector('#style-tabs')
const styleControls = document.querySelector('#style-controls')
const resetStyleControlsButton = document.querySelector('#reset-style-controls')

const generatedPreview = document.querySelector('#generated-preview')
const statsContainer = document.querySelector('#stats')
const mappingAuditBody = document.querySelector('#mapping-audit')

const rawSvgTextarea = document.querySelector('#raw-svg')
const copySvgButton = document.querySelector('#copy-svg')
const downloadSvgButton = document.querySelector('#download-svg')
const exportStatus = document.querySelector('#export-status')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function round2(value) {
  return Math.round(value * 100) / 100
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function base64UrlEncode(text) {
  return btoa(unescape(encodeURIComponent(text)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function base64UrlDecode(text) {
  const normalized = text.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '==='.slice((normalized.length + 3) % 4)
  return decodeURIComponent(escape(atob(padded)))
}

function toNumber(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function sanitizeLayers(layers) {
  if (!Array.isArray(layers) || !layers.length) {
    return deepClone(PRESETS['two-layer'].layers)
  }

  return layers.map((layer) => {
    const thicknessIn = Math.max(0, toNumber(layer?.thicknessIn, 0))
    const rawCode = String(layer?.gradeCode || '').trim().toUpperCase()
    return {
      thicknessIn,
      gradeCode: rawCode || null,
    }
  })
}

function getDefaultState(config) {
  return {
    selectedPreset: 'two-layer',
    layers: deepClone(PRESETS['two-layer'].layers),
    projection: {
      frontWidth: config.projection.frontWidth,
      frontHeight: config.projection.frontHeight,
      depthDx: config.projection.depthDx,
      depthDy: config.projection.depthDy,
      strokeWidth: config.projection.strokeWidth,
      padding: config.projection.padding,
    },
    label: {
      minSliceHeightPx: config.label.minSliceHeightPx,
      fontSizePx: config.label.fontSizePx,
    },
    style: {
      mode: normalizeStyleMode(config?.styles?.defaultMode || 'classic_default'),
      overridesByMode: {},
    },
  }
}

function mergeState(defaultState, rawState) {
  if (!rawState || typeof rawState !== 'object') return deepClone(defaultState)

  const merged = deepClone(defaultState)
  merged.selectedPreset = rawState.selectedPreset && PRESETS[rawState.selectedPreset]
    ? rawState.selectedPreset
    : merged.selectedPreset
  merged.layers = sanitizeLayers(rawState.layers)

  merged.projection.frontWidth = Math.max(50, toNumber(rawState?.projection?.frontWidth, merged.projection.frontWidth))
  merged.projection.frontHeight = Math.max(50, toNumber(rawState?.projection?.frontHeight, merged.projection.frontHeight))
  merged.projection.depthDx = Math.max(1, toNumber(rawState?.projection?.depthDx, merged.projection.depthDx))
  merged.projection.depthDy = Math.max(1, toNumber(rawState?.projection?.depthDy, merged.projection.depthDy))
  merged.projection.strokeWidth = Math.max(1, toNumber(rawState?.projection?.strokeWidth, merged.projection.strokeWidth))
  merged.projection.padding = Math.max(1, toNumber(rawState?.projection?.padding, merged.projection.padding))

  merged.label.minSliceHeightPx = Math.max(1, toNumber(rawState?.label?.minSliceHeightPx, merged.label.minSliceHeightPx))
  merged.label.fontSizePx = Math.max(8, toNumber(rawState?.label?.fontSizePx, merged.label.fontSizePx))
  merged.style.mode = normalizeStyleMode(rawState?.style?.mode, merged.style.mode)
  merged.style.overridesByMode = sanitizeStyleOverrides(rawState?.style?.overridesByMode)

  return merged
}

function extractPersistableState() {
  return {
    selectedPreset: runtime.state.selectedPreset,
    layers: runtime.state.layers,
    projection: runtime.state.projection,
    label: runtime.state.label,
    style: {
      mode: runtime.state.style.mode,
      overridesByMode: runtime.state.style.overridesByMode,
    },
  }
}

function restoreStateFromHash(defaultState) {
  const rawHash = window.location.hash ? window.location.hash.slice(1) : ''
  if (!rawHash) return deepClone(defaultState)

  try {
    if (rawHash.startsWith('ls:')) {
      const token = rawHash.slice(3)
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!stored) return deepClone(defaultState)
      const parsed = JSON.parse(stored)
      if (!parsed || parsed.token !== token || !parsed.state) return deepClone(defaultState)
      return mergeState(defaultState, parsed.state)
    }

    const decoded = base64UrlDecode(rawHash)
    const parsed = JSON.parse(decoded)
    return mergeState(defaultState, parsed)
  } catch {
    return deepClone(defaultState)
  }
}

function persistStateToHash() {
  const persistable = extractPersistableState()
  const serialized = JSON.stringify(persistable)
  const encoded = base64UrlEncode(serialized)

  if (encoded.length <= HASH_LENGTH_LIMIT) {
    const nextHash = `#${encoded}`
    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash)
    }
    window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    return
  }

  const token = `ls-${Date.now().toString(36)}`
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    token,
    state: persistable,
    savedAt: new Date().toISOString(),
  }))

  const nextHash = `#ls:${token}`
  if (window.location.hash !== nextHash) {
    history.replaceState(null, '', nextHash)
  }
}

function formatNumber(value) {
  const rounded = round2(value)
  return Number.isInteger(rounded) ? String(rounded) : String(rounded.toFixed(2)).replace(/0+$/, '').replace(/\.$/, '')
}

function buildRendererInput() {
  const stylesConfig = deepClone(runtime.config.styles || {})
  const overrideModes = Object.keys(runtime.state.style?.overridesByMode || {})
  for (let i = 0; i < overrideModes.length; i += 1) {
    const mode = overrideModes[i]
    stylesConfig[mode] = {
      ...(stylesConfig[mode] || {}),
      ...(runtime.state.style.overridesByMode[mode] || {}),
    }
  }

  return {
    layers: runtime.state.layers,
    projection: runtime.state.projection,
    colors: {
      families: runtime.config.colors.families,
      neutral: runtime.config.colors.neutral,
      topLighten: runtime.config.colors.topLighten,
      sideDarken: runtime.config.colors.sideDarken,
    },
    label: {
      minSliceHeightPx: runtime.state.label.minSliceHeightPx,
      fontSizePx: runtime.state.label.fontSizePx,
    },
    style: runtime.state.style,
    stylesConfig,
    colorResolution: runtime.config.colorResolution,
    gradeMetadataByCode: runtime.gradeMetadataByCode,
  }
}

function renderStyleTabs() {
  styleTabs.innerHTML = PREVIEW_STYLE_OPTIONS
    .map((option) => {
      const active = runtime.state.style.mode === option.mode
      return `<button type="button" class="segmented-btn ${active ? 'active' : ''}" data-style-mode="${escapeHtml(option.mode)}">${escapeHtml(option.label)}</button>`
    })
    .join('')
}

function getStyleTokenValue(mode, key, fallback = 0) {
  const override = runtime.state.style?.overridesByMode?.[mode]?.[key]
  if (Number.isFinite(Number(override))) return Number(override)
  const configured = runtime.config?.styles?.[mode]?.[key]
  if (Number.isFinite(Number(configured))) return Number(configured)
  return fallback
}

function syncStyleControlDomValue(tokenKey, value) {
  if (!styleControls) return
  const valueText = formatNumber(value)
  const valueRaw = String(value)

  const inputs = styleControls.querySelectorAll('input[data-style-token]')
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i]
    if (input.dataset.styleToken !== tokenKey) continue
    if (input.value !== valueRaw) input.value = valueRaw
  }

  const valueSpans = styleControls.querySelectorAll('[data-style-token-value]')
  for (let i = 0; i < valueSpans.length; i += 1) {
    const valueSpan = valueSpans[i]
    if (valueSpan.dataset.styleTokenValue !== tokenKey) continue
    valueSpan.textContent = valueText
  }
}

function renderStyleControls() {
  const mode = runtime.state.style.mode
  const defs = getStyleControlDefs(mode)

  if (!defs.length) {
    styleControls.innerHTML = '<div class="style-controls-empty">Classic style is fixed baseline (no tunable controls).</div>'
    resetStyleControlsButton.disabled = true
    return
  }

  styleControls.innerHTML = defs
    .map((def) => {
      const value = getStyleTokenValue(mode, def.key, def.min)
      return `
        <div class="style-control-row" data-style-control-row="${escapeHtml(def.key)}">
          <div class="style-control-head">
            <label>${escapeHtml(def.label)}</label>
            <span data-style-token-value="${escapeHtml(def.key)}">${escapeHtml(formatNumber(value))}</span>
          </div>
          <div class="style-control-inputs">
            <input type="range" min="${escapeHtml(def.min)}" max="${escapeHtml(def.max)}" step="${escapeHtml(def.step)}" value="${escapeHtml(value)}" data-style-token="${escapeHtml(def.key)}" />
            <input type="number" min="${escapeHtml(def.min)}" max="${escapeHtml(def.max)}" step="${escapeHtml(def.step)}" value="${escapeHtml(value)}" data-style-token="${escapeHtml(def.key)}" />
          </div>
        </div>
      `
    })
    .join('')

  resetStyleControlsButton.disabled = false
}

function renderDataWarning() {
  if (!runtime.warningMessage) {
    dataWarning.textContent = ''
    dataWarning.classList.add('hidden')
    return
  }

  dataWarning.textContent = runtime.warningMessage
  dataWarning.classList.remove('hidden')
}

function renderPresetOptions() {
  presetSelect.innerHTML = Object.entries(PRESETS)
    .map(([key, preset]) => `<option value="${escapeHtml(key)}">${escapeHtml(preset.label)}</option>`)
    .join('')
  presetSelect.value = runtime.state.selectedPreset
}

function buildGradeOptions(selectedCode) {
  const options = [`<option value="">Unassigned</option>`]
  const grades = [...runtime.grades].sort((a, b) => String(a.code).localeCompare(String(b.code)))

  for (let i = 0; i < grades.length; i += 1) {
    const grade = grades[i]
    const code = String(grade.code || '').trim().toUpperCase()
    const selected = selectedCode && selectedCode === code ? 'selected' : ''
    const label = `${code} — ${grade.label_feature || 'Unknown'}`
    options.push(`<option value="${escapeHtml(code)}" ${selected}>${escapeHtml(label)}</option>`)
  }

  return options.join('')
}

function renderLayerRows() {
  if (!runtime.state.layers.length) {
    layerList.innerHTML = '<div class="layer-row">No layers. Click Add layer.</div>'
    return
  }

  layerList.innerHTML = runtime.state.layers
    .map((layer, index) => {
      const selectedCode = layer.gradeCode ? String(layer.gradeCode).trim().toUpperCase() : ''
      const thicknessId = `layer-thickness-${index}`
      const gradeId = `layer-grade-${index}`
      return `
        <div class="layer-row" data-index="${index}">
          <div class="layer-row-header">
            <strong>Layer ${index + 1}</strong>
            <div class="actions">
              <button type="button" class="small" data-action="up" data-index="${index}" ${index === 0 ? 'disabled' : ''}>Up</button>
              <button type="button" class="small" data-action="down" data-index="${index}" ${index === runtime.state.layers.length - 1 ? 'disabled' : ''}>Down</button>
              <button type="button" class="small" data-action="remove" data-index="${index}" ${runtime.state.layers.length === 1 ? 'disabled' : ''}>Remove</button>
            </div>
          </div>
          <div class="grid-2">
            <div>
              <label for="${thicknessId}">Thickness (in)</label>
              <input id="${thicknessId}" name="${thicknessId}" type="number" min="0" step="0.25" data-field="thickness" data-index="${index}" value="${formatNumber(layer.thicknessIn)}" />
            </div>
            <div>
              <label for="${gradeId}">Foam Grade</label>
              <select id="${gradeId}" name="${gradeId}" data-field="grade" data-index="${index}">
                ${buildGradeOptions(selectedCode)}
              </select>
            </div>
          </div>
        </div>
      `
    })
    .join('')
}

function renderProjectionControls() {
  frontWidthInput.value = String(runtime.state.projection.frontWidth)
  frontHeightInput.value = String(runtime.state.projection.frontHeight)
  depthDxInput.value = String(runtime.state.projection.depthDx)
  depthDyInput.value = String(runtime.state.projection.depthDy)
  labelMinInput.value = String(runtime.state.label.minSliceHeightPx)
  labelFontInput.value = String(runtime.state.label.fontSizePx)
}

function renderDiagnostics(output) {
  const unmapped = output.diagnostics.unmappedCodes
  const fallbackCount = output.diagnostics.sliceAudit.filter((slice) => slice.fallbackUsed).length
  const bytes = new TextEncoder().encode(runtime.currentSvg || '').length
  const minSliceApplied = output.diagnostics.minSlicePxApplied

  statsContainer.innerHTML = [
    `<span class="pill">Style: ${escapeHtml(output.diagnostics.styleMode || 'classic_default')}</span>`,
    `<span class="pill">Min slice applied: ${formatNumber(minSliceApplied)} px</span>`,
    `<span class="pill">Front total height: ${formatNumber(output.diagnostics.totalHeightPx)} px</span>`,
    `<span class="pill">Fallbacks: ${fallbackCount}</span>`,
    `<span class="pill">Patterns: ${output.diagnostics.patternCount || 0}</span>`,
    `<span class="pill">Filters: ${output.diagnostics.filterCount || 0}</span>`,
    `<span class="pill">Unmapped codes: ${unmapped.length ? escapeHtml(unmapped.join(', ')) : 'none'}</span>`,
    `<span class="pill ${bytes > SVG_WARN_BYTES ? 'fail' : ''}">SVG size: ${Math.round((output.diagnostics.svgBytes || bytes) / 1024)} KB</span>`,
  ].join('')

  mappingAuditBody.innerHTML = output.diagnostics.sliceAudit
    .map((slice, idx) => {
      const rendered = output.slices.find((item) => item.index === slice.index)
      const labelShown = rendered ? rendered.labelShown : false
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${escapeHtml(slice.gradeCode || 'UNASSIGNED')}</td>
          <td>${formatNumber(slice.thicknessIn)} in</td>
          <td>${escapeHtml(slice.colorFamily)}</td>
          <td>${escapeHtml(slice.colorSource)}</td>
          <td>${slice.fallbackUsed ? 'Yes' : 'No'}</td>
          <td>${formatNumber(slice.heightPx)}</td>
          <td>${labelShown ? 'Shown' : 'Hidden'}</td>
        </tr>
      `
    })
    .join('')
}

function renderSvgOutput(output) {
  runtime.currentSvg = output.svg
  runtime.latestOutput = output

  generatedPreview.innerHTML = runtime.currentSvg
  rawSvgTextarea.value = runtime.currentSvg

  const bytes = new TextEncoder().encode(runtime.currentSvg).length
  if (bytes > SVG_WARN_BYTES) {
    runtime.statusMessage = `SVG warning: ${Math.round(bytes / 1024)}KB exceeds 100KB target.`
    runtime.statusTone = 'warn'
  } else {
    runtime.statusMessage = 'Ready'
    runtime.statusTone = 'muted'
  }

  exportStatus.textContent = runtime.statusMessage
  exportStatus.className = runtime.statusTone === 'warn' ? 'status-line warn' : 'status-line'
}

function renderAll({ refreshStyleUi = true } = {}) {
  renderDataWarning()
  renderPresetOptions()
  renderLayerRows()
  renderProjectionControls()

  if (refreshStyleUi) {
    renderStyleTabs()
    renderStyleControls()
  }

  const output = generateMattressPreviewSvg(buildRendererInput())
  renderSvgOutput(output)
  renderDiagnostics(output)

  persistStateToHash()
}

function setLayers(layers) {
  runtime.state.layers = sanitizeLayers(layers)
}

function applyPreset(key) {
  if (!PRESETS[key]) return
  runtime.state.selectedPreset = key
  setLayers(PRESETS[key].layers)
  renderAll()
}

function resetToDefaults() {
  const defaultState = getDefaultState(runtime.config)
  runtime.state = mergeState(defaultState, defaultState)
  renderAll()
}

function moveLayer(index, direction) {
  const target = index + direction
  if (target < 0 || target >= runtime.state.layers.length) return
  const next = [...runtime.state.layers]
  const [item] = next.splice(index, 1)
  next.splice(target, 0, item)
  runtime.state.layers = next
  renderAll()
}

function removeLayer(index) {
  if (runtime.state.layers.length <= 1) return
  runtime.state.layers = runtime.state.layers.filter((_, idx) => idx !== index)
  renderAll()
}

function addLayer() {
  runtime.state.layers = [
    ...runtime.state.layers,
    { thicknessIn: 1, gradeCode: null },
  ]
  renderAll()
}

function handleLayerInput(field, index, value) {
  const nextLayers = [...runtime.state.layers]
  const layer = { ...nextLayers[index] }

  if (field === 'thickness') {
    layer.thicknessIn = Math.max(0, toNumber(value, layer.thicknessIn))
  }

  if (field === 'grade') {
    const normalized = String(value || '').trim().toUpperCase()
    layer.gradeCode = normalized || null
  }

  nextLayers[index] = layer
  runtime.state.layers = nextLayers
  renderAll()
}

function handleProjectionChange(field, value) {
  const projection = { ...runtime.state.projection }
  const numeric = Math.max(1, toNumber(value, projection[field]))

  if (field === 'frontWidth' || field === 'frontHeight') {
    projection[field] = Math.max(50, numeric)
  } else {
    projection[field] = numeric
  }

  runtime.state.projection = projection
  renderAll()
}

function handleLabelChange(field, value) {
  const label = { ...runtime.state.label }
  const numeric = Math.max(1, toNumber(value, label[field]))
  label[field] = field === 'fontSizePx' ? Math.max(8, numeric) : numeric
  runtime.state.label = label
  renderAll()
}

function handleStyleModeChange(mode) {
  const nextMode = normalizeStyleMode(mode, runtime.state.style.mode)
  if (nextMode === runtime.state.style.mode) return
  runtime.state.style = {
    mode: nextMode,
    overridesByMode: runtime.state.style.overridesByMode || {},
  }
  renderAll()
}

function setStyleControlValue(tokenKey, rawValue) {
  const mode = runtime.state.style.mode
  const def = getStyleControlDefs(mode).find((item) => item.key === tokenKey)
  if (!def) return

  const value = clampStyleControlValue(def, rawValue)
  if (value === null) return

  const baseValue = Number(runtime.config?.styles?.[mode]?.[def.key])
  const nextOverrides = {
    ...(runtime.state.style.overridesByMode || {}),
  }
  const nextModeOverrides = {
    ...(nextOverrides[mode] || {}),
  }

  if (Number.isFinite(baseValue) && Math.abs(baseValue - value) < 0.00001) {
    delete nextModeOverrides[def.key]
  } else {
    nextModeOverrides[def.key] = value
  }

  if (Object.keys(nextModeOverrides).length) {
    nextOverrides[mode] = nextModeOverrides
  } else {
    delete nextOverrides[mode]
  }

  runtime.state.style = {
    mode,
    overridesByMode: nextOverrides,
  }
  syncStyleControlDomValue(tokenKey, value)
  renderAll({ refreshStyleUi: false })
}

function resetActiveStyleControls() {
  const mode = runtime.state.style.mode
  const nextOverrides = {
    ...(runtime.state.style.overridesByMode || {}),
  }
  delete nextOverrides[mode]
  runtime.state.style = {
    mode,
    overridesByMode: nextOverrides,
  }
  renderAll()
}

function verifyDeterministicSvg() {
  const regenerated = generateMattressPreviewSvg(buildRendererInput())
  return regenerated.svg === runtime.currentSvg
}

async function copySvg() {
  if (!verifyDeterministicSvg()) {
    exportStatus.textContent = 'Blocked: deterministic SVG check failed.'
    exportStatus.className = 'status-line error'
    return
  }

  try {
    await navigator.clipboard.writeText(runtime.currentSvg)
    exportStatus.textContent = 'SVG copied to clipboard.'
    exportStatus.className = 'status-line'
  } catch {
    exportStatus.textContent = 'Copy failed. Browser clipboard permission required.'
    exportStatus.className = 'status-line error'
  }
}

function downloadSvg() {
  if (!verifyDeterministicSvg()) {
    exportStatus.textContent = 'Blocked: deterministic SVG check failed.'
    exportStatus.className = 'status-line error'
    return
  }

  const blob = new Blob([runtime.currentSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'mattress-preview.svg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  exportStatus.textContent = 'SVG downloaded.'
  exportStatus.className = 'status-line'
}

layerList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]')
  if (!button) return

  const action = button.dataset.action
  const index = Number(button.dataset.index)
  if (!Number.isFinite(index)) return

  if (action === 'up') moveLayer(index, -1)
  if (action === 'down') moveLayer(index, 1)
  if (action === 'remove') removeLayer(index)
})

layerList.addEventListener('input', (event) => {
  const field = event.target.dataset.field
  const index = Number(event.target.dataset.index)
  if (!field || !Number.isFinite(index)) return
  handleLayerInput(field, index, event.target.value)
})

layerList.addEventListener('change', (event) => {
  const field = event.target.dataset.field
  const index = Number(event.target.dataset.index)
  if (!field || !Number.isFinite(index)) return
  handleLayerInput(field, index, event.target.value)
})

applyPresetButton.addEventListener('click', () => {
  applyPreset(presetSelect.value)
})

presetSelect.addEventListener('change', () => {
  runtime.state.selectedPreset = presetSelect.value
  persistStateToHash()
})

addLayerButton.addEventListener('click', addLayer)
resetDefaultsButton.addEventListener('click', resetToDefaults)

frontWidthInput.addEventListener('input', (event) => handleProjectionChange('frontWidth', event.target.value))
frontHeightInput.addEventListener('input', (event) => handleProjectionChange('frontHeight', event.target.value))
depthDxInput.addEventListener('input', (event) => handleProjectionChange('depthDx', event.target.value))
depthDyInput.addEventListener('input', (event) => handleProjectionChange('depthDy', event.target.value))

labelMinInput.addEventListener('input', (event) => handleLabelChange('minSliceHeightPx', event.target.value))
labelFontInput.addEventListener('input', (event) => handleLabelChange('fontSizePx', event.target.value))

styleTabs.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-style-mode]')
  if (!button) return
  handleStyleModeChange(button.dataset.styleMode)
})

styleControls.addEventListener('input', (event) => {
  const input = event.target.closest('input[data-style-token]')
  if (!input) return
  setStyleControlValue(input.dataset.styleToken, input.value)
})

styleControls.addEventListener('change', (event) => {
  const input = event.target.closest('input[data-style-token]')
  if (!input) return
  setStyleControlValue(input.dataset.styleToken, input.value)
})

resetStyleControlsButton.addEventListener('click', resetActiveStyleControls)

copySvgButton.addEventListener('click', copySvg)
downloadSvgButton.addEventListener('click', downloadSvg)

async function loadConfig() {
  const response = await fetch('/mattress_preview_config.json')
  if (!response.ok) {
    throw new Error(`Failed to load mattress preview config (${response.status})`)
  }
  return response.json()
}

async function loadGrades() {
  const response = await fetch('/foam_grades_custom_shape.json')
  if (!response.ok) {
    throw new Error(`Failed to load foam grades (${response.status})`)
  }
  const data = await response.json()
  if (!Array.isArray(data?.grades)) {
    throw new Error('Foam grades payload missing grades array')
  }
  return data.grades
}

async function init() {
  runtime.config = await loadConfig()

  try {
    runtime.grades = await loadGrades()
    runtime.warningMessage = ''
  } catch (error) {
    runtime.grades = FALLBACK_GRADES
    runtime.warningMessage = 'Foam grade JSON failed to load. Using fallback sample grades for geometry validation.'
  }

  runtime.gradeMetadataByCode = buildGradeMetadataByCode(runtime.grades)

  const defaultState = getDefaultState(runtime.config)
  runtime.state = restoreStateFromHash(defaultState)
  runtime.state = mergeState(defaultState, runtime.state)
  renderAll()
}

init().catch((error) => {
  dataWarning.textContent = `Prototype failed to initialize: ${error.message || String(error)}`
  dataWarning.classList.remove('hidden')
})
