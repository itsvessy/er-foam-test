function round2(value) {
  return Math.round(value * 100) / 100
}

function formatNumber(value) {
  const rounded = round2(value)
  return Number.isInteger(rounded) ? String(rounded) : String(rounded.toFixed(2)).replace(/0+$/, '').replace(/\.$/, '')
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function clamp01(value) {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(1, value))
}

function hexToRgb(hex) {
  const normalized = String(hex || '').replace('#', '').trim()
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)))
    return clamped.toString(16).padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixColor(hex, targetRgb, amount) {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#d8dde3'
  const mix = clamp01(amount)
  return rgbToHex({
    r: rgb.r + (targetRgb.r - rgb.r) * mix,
    g: rgb.g + (targetRgb.g - rgb.g) * mix,
    b: rgb.b + (targetRgb.b - rgb.b) * mix,
  })
}

function lighten(hex, amount) {
  return mixColor(hex, { r: 255, g: 255, b: 255 }, amount)
}

function darken(hex, amount) {
  return mixColor(hex, { r: 0, g: 0, b: 0 }, amount)
}

function luminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 1
  return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
}

function polygonPoints(points) {
  return points.map((point) => `${formatNumber(point.x)},${formatNumber(point.y)}`).join(' ')
}

function labelText(slice) {
  const gradeCode = slice.gradeCode || 'UNASSIGNED'
  return `${gradeCode} • ${formatNumber(slice.thicknessIn)} in`
}

export function buildMattressSvg({ projected, slices, colors = {}, label = {} } = {}) {
  const fontSizePx = Number(label.fontSizePx) > 0 ? Number(label.fontSizePx) : 12
  const minSliceHeightPx = Number(label.minSliceHeightPx) > 0 ? Number(label.minSliceHeightPx) : 14

  const sideDarken = Number(colors.sideDarken)
  const topLighten = Number(colors.topLighten)
  const sideDarkenAmount = Number.isFinite(sideDarken) ? sideDarken : 0.12
  const topLightenAmount = Number.isFinite(topLighten) ? topLighten : 0.14

  const stroke = '#5f6876'

  const rightFaces = []
  const frontFaces = []
  const texts = []
  const sliceDiagnostics = []

  for (let i = 0; i < slices.length; i += 1) {
    const slice = slices[i]
    const frontColor = slice.baseColor
    const sideColor = darken(frontColor, sideDarkenAmount)
    const showLabel = slice.heightPx >= minSliceHeightPx

    rightFaces.push(
      `<polygon points="${polygonPoints(slice.rightPoints)}" fill="${escapeXml(sideColor)}" stroke="${stroke}" stroke-width="${formatNumber(projected.projection.strokeWidth)}" />`,
    )

    frontFaces.push(
      `<polygon points="${polygonPoints(slice.frontPoints)}" fill="${escapeXml(frontColor)}" stroke="${stroke}" stroke-width="${formatNumber(projected.projection.strokeWidth)}" />`,
    )

    if (showLabel) {
      const textColor = luminance(frontColor) < 0.55 ? '#ffffff' : '#1a2530'
      texts.push(
        `<text x="${formatNumber(projected.projection.frontX + 10)}" y="${formatNumber(slice.center.y)}" font-size="${formatNumber(fontSizePx)}" font-family="Arial, sans-serif" dominant-baseline="middle" text-anchor="start" fill="${textColor}">${escapeXml(labelText(slice))}</text>`,
      )
    }

    sliceDiagnostics.push({
      index: slice.index,
      gradeCode: slice.gradeCode,
      colorFamily: slice.colorFamily,
      heightPx: round2(slice.heightPx),
      labelShown: showLabel,
    })
  }

  const topSlice = slices[0]
  const topColor = topSlice ? lighten(topSlice.baseColor, topLightenAmount) : '#d8dde3'
  const topFace = projected.topFace.length
    ? `<polygon points="${polygonPoints(projected.topFace)}" fill="${escapeXml(topColor)}" stroke="${stroke}" stroke-width="${formatNumber(projected.projection.strokeWidth)}" />`
    : ''

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${formatNumber(projected.viewBox.width)} ${formatNumber(projected.viewBox.height)}" role="img" aria-label="Mattress layer preview">`,
    '<rect width="100%" height="100%" fill="transparent" />',
    ...rightFaces,
    ...frontFaces,
    topFace,
    ...texts,
    '</svg>',
  ].join('')

  return {
    svg,
    sliceDiagnostics,
  }
}
