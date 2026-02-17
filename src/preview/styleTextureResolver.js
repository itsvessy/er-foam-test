const PREVIEW_STYLE_MODES = [
  'classic_default',
  'rounded_soft',
  'textured',
  'photo_realistic',
  'technical_cad',
]

const TEXTURED_MOTIFS = ['diag', 'cross', 'dots', 'grid', 'wave', 'dash']
const CAD_MOTIFS = ['diag', 'cross', 'grid', 'dash']

function normalizeCode(code) {
  return String(code || '').trim().toUpperCase()
}

function toNumber(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function roundTo(value, precision = 2) {
  const scale = 10 ** precision
  return Math.round(value * scale) / scale
}

function fnv1aHash(input) {
  let hash = 0x811c9dc5
  const text = String(input || '')
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function normalizeStyleMode(mode, fallback = 'classic_default') {
  const normalized = String(mode || '').trim()
  if (PREVIEW_STYLE_MODES.includes(normalized)) return normalized
  return PREVIEW_STYLE_MODES.includes(fallback) ? fallback : 'classic_default'
}

function buildProceduralTextureSpec(code, normalizedMode) {
  const hash = fnv1aHash(`${normalizedMode}:${code}`)
  const motifSet = normalizedMode === 'technical_cad' ? CAD_MOTIFS : TEXTURED_MOTIFS

  return {
    key: `${normalizedMode}-${code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    code,
    mode: normalizedMode,
    motif: motifSet[hash % motifSet.length],
    spacing: normalizedMode === 'technical_cad'
      ? 5 + (hash % 4)
      : 6 + (hash % 7),
    angle: normalizedMode === 'technical_cad'
      ? ((hash >>> 3) % 6) * 15
      : ((hash >>> 3) % 12) * 15,
    strokeWidth: normalizedMode === 'technical_cad'
      ? 0.7 + ((hash >>> 5) % 3) * 0.2
      : 0.6 + ((hash >>> 5) % 4) * 0.15,
    opacity: normalizedMode === 'technical_cad'
      ? 0.24 + ((hash >>> 7) % 3) * 0.07
      : 0.17 + ((hash >>> 7) % 4) * 0.05,
  }
}

function normalizeExplicitTextureSpec(code, mode, explicitSpec) {
  if (!explicitSpec || typeof explicitSpec !== 'object') return null

  const defaultSpec = buildProceduralTextureSpec(code, mode)
  const motifSet = mode === 'technical_cad' ? CAD_MOTIFS : TEXTURED_MOTIFS
  const motif = motifSet.includes(explicitSpec.motif) ? explicitSpec.motif : defaultSpec.motif

  return {
    key: `${mode}-${code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    code,
    mode,
    motif,
    spacing: Math.max(4, toNumber(explicitSpec.spacing, defaultSpec.spacing)),
    angle: toNumber(explicitSpec.angle, defaultSpec.angle),
    strokeWidth: Math.max(0.5, toNumber(explicitSpec.strokeWidth, defaultSpec.strokeWidth)),
    opacity: Math.max(0.08, Math.min(0.7, toNumber(explicitSpec.opacity, defaultSpec.opacity))),
  }
}

export function getDeterministicTextureSpec({ gradeCode, mode = 'textured', explicitTextureByCode = {} } = {}) {
  const normalizedMode = mode === 'technical_cad' ? 'technical_cad' : 'textured'
  const code = normalizeCode(gradeCode) || 'UNASSIGNED'
  const explicitSpec = explicitTextureByCode?.[code]
  return normalizeExplicitTextureSpec(code, normalizedMode, explicitSpec)
    || buildProceduralTextureSpec(code, normalizedMode)
}

export function buildDeterministicTextureMap(codes = [], mode = 'textured') {
  const normalizedMode = mode === 'technical_cad' ? 'technical_cad' : 'textured'
  const result = {}
  for (let i = 0; i < codes.length; i += 1) {
    const code = normalizeCode(codes[i])
    if (!code) continue
    const spec = buildProceduralTextureSpec(code, normalizedMode)
    result[code] = {
      motif: spec.motif,
      spacing: roundTo(spec.spacing, 2),
      angle: roundTo(spec.angle, 2),
      strokeWidth: roundTo(spec.strokeWidth, 2),
      opacity: roundTo(spec.opacity, 2),
    }
  }
  return result
}

export { PREVIEW_STYLE_MODES, normalizeCode }
