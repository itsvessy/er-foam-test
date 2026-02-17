import { normalizeStyleMode } from './styleTextureResolver.js'

export const PREVIEW_STYLE_OPTIONS = [
  { mode: 'classic_default', label: 'Classic' },
  { mode: 'rounded_soft', label: 'Rounded' },
  { mode: 'textured', label: 'Textured' },
  { mode: 'photo_realistic', label: 'Photo' },
  { mode: 'technical_cad', label: 'CAD' },
]

export const STYLE_CONTROL_DEFS = {
  classic_default: [],
  rounded_soft: [
    { key: 'cornerRadiusPx', label: 'Corner Radius', min: 0, max: 40, step: 1 },
    { key: 'shadowOpacity', label: 'Shadow Opacity', min: 0, max: 0.45, step: 0.01 },
    { key: 'topLighten', label: 'Top Lighten', min: 0, max: 0.45, step: 0.01 },
    { key: 'sideDarken', label: 'Side Darken', min: 0, max: 0.3, step: 0.01 },
    { key: 'strokeWidthScale', label: 'Stroke Scale', min: 0.7, max: 1.5, step: 0.01 },
  ],
  textured: [
    { key: 'patternOpacityFront', label: 'Pattern Front Opacity', min: 0, max: 0.7, step: 0.01 },
    { key: 'patternOpacitySide', label: 'Pattern Side Opacity', min: 0, max: 0.7, step: 0.01 },
    { key: 'patternSpacingScale', label: 'Pattern Spacing', min: 0.5, max: 2, step: 0.05 },
    { key: 'patternStrokeScale', label: 'Pattern Stroke', min: 0.5, max: 2, step: 0.05 },
    { key: 'patternAngleOffset', label: 'Pattern Angle', min: -90, max: 90, step: 1 },
  ],
  photo_realistic: [
    { key: 'grainOpacity', label: 'Grain Opacity', min: 0, max: 0.25, step: 0.01 },
    { key: 'grainFrequency', label: 'Grain Frequency', min: 0.2, max: 2, step: 0.05 },
    { key: 'shadowOpacity', label: 'Shadow Opacity', min: 0, max: 0.4, step: 0.01 },
    { key: 'highlightStrength', label: 'Highlight Strength', min: 0.5, max: 1.8, step: 0.05 },
    { key: 'seamContrast', label: 'Seam Contrast', min: 0.4, max: 2, step: 0.05 },
  ],
  technical_cad: [
    { key: 'hatchOpacityFront', label: 'Hatch Front Opacity', min: 0, max: 0.8, step: 0.01 },
    { key: 'hatchOpacitySide', label: 'Hatch Side Opacity', min: 0, max: 0.8, step: 0.01 },
    { key: 'hatchSpacingScale', label: 'Hatch Spacing', min: 0.5, max: 2, step: 0.05 },
    { key: 'hatchAngleOffset', label: 'Hatch Angle', min: -90, max: 90, step: 1 },
    { key: 'strokeWidthScale', label: 'Stroke Scale', min: 0.7, max: 1.5, step: 0.01 },
  ],
}

function roundForStep(value, step) {
  const safeStep = Number(step)
  if (!Number.isFinite(safeStep) || safeStep <= 0) return value
  const precision = String(safeStep).includes('.')
    ? String(safeStep).split('.')[1].length
    : 0
  return Number((Math.round(value / safeStep) * safeStep).toFixed(precision))
}

export function getStyleControlDefs(mode) {
  const normalized = normalizeStyleMode(mode)
  return STYLE_CONTROL_DEFS[normalized] || []
}

export function clampStyleControlValue(def, value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return null
  const min = Number(def?.min)
  const max = Number(def?.max)
  const step = Number(def?.step || 0.01)

  const bounded = Math.min(
    Number.isFinite(max) ? max : number,
    Math.max(Number.isFinite(min) ? min : number, number),
  )

  return roundForStep(bounded, step)
}

export function sanitizeStyleOverrides(raw) {
  const output = {}
  if (!raw || typeof raw !== 'object') return output

  const modes = Object.keys(STYLE_CONTROL_DEFS)
  for (let i = 0; i < modes.length; i += 1) {
    const mode = modes[i]
    const defs = STYLE_CONTROL_DEFS[mode] || []
    if (!defs.length) continue

    const source = raw[mode]
    if (!source || typeof source !== 'object') continue

    const modeOutput = {}
    for (let j = 0; j < defs.length; j += 1) {
      const def = defs[j]
      const value = clampStyleControlValue(def, source[def.key])
      if (value === null) continue
      modeOutput[def.key] = value
    }

    if (Object.keys(modeOutput).length) {
      output[mode] = modeOutput
    }
  }

  return output
}
