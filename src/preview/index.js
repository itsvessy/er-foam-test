import { buildProjectedSlices } from './projection.js'
import { buildMattressSvg } from './svgSerializer.js'
import { normalizeCode, resolveColorFamily } from './colorResolver.js'

function round2(value) {
  return Math.round(value * 100) / 100
}

function normalizeLayers(layers = []) {
  if (!Array.isArray(layers)) return []
  return layers.map((layer) => ({
    thicknessIn: Number(layer?.thicknessIn),
    gradeCode: layer?.gradeCode ? normalizeCode(layer.gradeCode) : null,
  }))
}

export function generateMattressPreviewSvg(input = {}) {
  const layers = normalizeLayers(input.layers)

  const projected = buildProjectedSlices({
    layers,
    projection: input.projection,
    minSlicePx: 4,
  })

  const families = input?.colors?.families || {}
  const neutralColor = input?.colors?.neutral || '#d8dde3'

  const explicitCodeFamilyMap = input?.colorResolution?.explicitCodeFamilyMap || {}
  const keywordRules = input?.colorResolution?.keywords || {}
  const gradeMetadataByCode = input?.gradeMetadataByCode || {}

  const unresolvedCodes = new Set()
  const enrichedSlices = projected.slices.map((slice) => {
    const metadata = slice.gradeCode ? gradeMetadataByCode[slice.gradeCode] : null
    const resolution = resolveColorFamily({
      gradeCode: slice.gradeCode,
      gradeMetadata: metadata,
      explicitCodeFamilyMap,
      keywordRules,
      familyColors: families,
      neutralFamily: 'neutral',
    })

    const colorFamily = resolution.family
    const baseColor = colorFamily === 'neutral'
      ? neutralColor
      : families[colorFamily] || neutralColor

    const fallbackUsed = Boolean(slice.gradeCode) && colorFamily === 'neutral'
    if (fallbackUsed && slice.gradeCode) unresolvedCodes.add(slice.gradeCode)

    return {
      ...slice,
      colorFamily,
      colorSource: resolution.source,
      fallbackUsed,
      baseColor,
    }
  })

  const serialized = buildMattressSvg({
    projected,
    slices: enrichedSlices,
    colors: {
      topLighten: input?.colors?.topLighten,
      sideDarken: input?.colors?.sideDarken,
    },
    label: input?.label,
  })

  const sliceAudit = enrichedSlices.map((slice, idx) => ({
    order: idx + 1,
    index: slice.index,
    gradeCode: slice.gradeCode,
    thicknessIn: round2(slice.thicknessIn),
    colorFamily: slice.colorFamily,
    colorSource: slice.colorSource,
    fallbackUsed: slice.fallbackUsed,
    heightPx: round2(slice.heightPx),
  }))

  return {
    svg: serialized.svg,
    slices: serialized.sliceDiagnostics,
    diagnostics: {
      unmappedCodes: Array.from(unresolvedCodes).sort(),
      minSlicePxApplied: projected.minSlicePxApplied,
      totalHeightPx: projected.projection.frontHeight,
      keyPoints: projected.keyPoints,
      sliceAudit,
      viewBox: projected.viewBox,
    },
  }
}
