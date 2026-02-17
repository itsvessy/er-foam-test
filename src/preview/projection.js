function round2(value) {
  return Math.round(value * 100) / 100
}

function toPositiveNumber(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) return fallback
  return number
}

function toPoint(x, y) {
  return { x: round2(x), y: round2(y) }
}

function distributeHeights(rawHeights, totalHeight) {
  if (!rawHeights.length) return []

  const rounded = rawHeights.map((value) => round2(value))
  let residual = round2(totalHeight - rounded.reduce((sum, value) => sum + value, 0))
  rounded[rounded.length - 1] = round2(rounded[rounded.length - 1] + residual)

  if (rounded[rounded.length - 1] < 0) {
    let deficit = round2(-rounded[rounded.length - 1])
    rounded[rounded.length - 1] = 0

    for (let i = rounded.length - 2; i >= 0 && deficit > 0; i -= 1) {
      const removable = Math.min(rounded[i], deficit)
      rounded[i] = round2(rounded[i] - removable)
      deficit = round2(deficit - removable)
    }
  }

  residual = round2(totalHeight - rounded.reduce((sum, value) => sum + value, 0))
  rounded[rounded.length - 1] = round2(rounded[rounded.length - 1] + residual)

  return rounded
}

export function buildProjectedSlices({ layers = [], projection = {}, minSlicePx = 4 } = {}) {
  const frontWidth = toPositiveNumber(projection.frontWidth, 320)
  const frontHeight = toPositiveNumber(projection.frontHeight, 180)
  const depthDx = toPositiveNumber(projection.depthDx, 90)
  const depthDy = toPositiveNumber(projection.depthDy, 44)
  const strokeWidth = toPositiveNumber(projection.strokeWidth, 2)
  const padding = toPositiveNumber(projection.padding, 24)

  const frontX = padding
  const frontY = padding + depthDy

  const viewWidth = round2(padding * 2 + frontWidth + depthDx)
  const viewHeight = round2(padding * 2 + frontHeight + depthDy)

  const keyPoints = {
    frontTopLeft: toPoint(frontX, frontY),
    frontTopRight: toPoint(frontX + frontWidth, frontY),
    frontBottomRight: toPoint(frontX + frontWidth, frontY + frontHeight),
    frontBottomLeft: toPoint(frontX, frontY + frontHeight),
    backTopLeft: toPoint(frontX + depthDx, frontY - depthDy),
    backTopRight: toPoint(frontX + frontWidth + depthDx, frontY - depthDy),
    backBottomRight: toPoint(frontX + frontWidth + depthDx, frontY + frontHeight - depthDy),
    backBottomLeft: toPoint(frontX + depthDx, frontY + frontHeight - depthDy),
  }

  const nonZeroLayers = []
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i]
    const thicknessIn = Number(layer?.thicknessIn)
    if (!Number.isFinite(thicknessIn) || thicknessIn <= 0) continue
    nonZeroLayers.push({
      index: i,
      gradeCode: layer?.gradeCode || null,
      thicknessIn,
    })
  }

  if (!nonZeroLayers.length) {
    return {
      slices: [],
      topFace: [],
      keyPoints,
      viewBox: {
        width: viewWidth,
        height: viewHeight,
      },
      projection: {
        frontX,
        frontY,
        frontWidth,
        frontHeight,
        depthDx,
        depthDy,
        strokeWidth,
        padding,
      },
      minSlicePxApplied: 0,
      totalThicknessIn: 0,
    }
  }

  const totalThicknessIn = nonZeroLayers.reduce((sum, layer) => sum + layer.thicknessIn, 0)
  const minSlicePxApplied = round2(Math.min(minSlicePx, frontHeight / nonZeroLayers.length))
  const proportionalHeight = round2(frontHeight - minSlicePxApplied * nonZeroLayers.length)

  const rawHeights = nonZeroLayers.map((layer) => {
    const ratio = layer.thicknessIn / totalThicknessIn
    return minSlicePxApplied + ratio * proportionalHeight
  })

  const heights = distributeHeights(rawHeights, frontHeight)

  const slices = []
  let cursorY = frontY
  for (let i = 0; i < nonZeroLayers.length; i += 1) {
    const layer = nonZeroLayers[i]
    const yTop = round2(cursorY)
    const yBottom = i === nonZeroLayers.length - 1
      ? round2(frontY + frontHeight)
      : round2(cursorY + heights[i])

    const frontPoints = [
      toPoint(frontX, yTop),
      toPoint(frontX + frontWidth, yTop),
      toPoint(frontX + frontWidth, yBottom),
      toPoint(frontX, yBottom),
    ]

    const rightPoints = [
      toPoint(frontX + frontWidth, yTop),
      toPoint(frontX + frontWidth + depthDx, yTop - depthDy),
      toPoint(frontX + frontWidth + depthDx, yBottom - depthDy),
      toPoint(frontX + frontWidth, yBottom),
    ]

    slices.push({
      index: layer.index,
      order: i,
      gradeCode: layer.gradeCode,
      thicknessIn: layer.thicknessIn,
      yTop,
      yBottom,
      heightPx: round2(yBottom - yTop),
      center: toPoint(frontX + frontWidth / 2, yTop + (yBottom - yTop) / 2),
      frontPoints,
      rightPoints,
    })

    cursorY = yBottom
  }

  const topFace = [
    toPoint(frontX, frontY),
    toPoint(frontX + frontWidth, frontY),
    toPoint(frontX + frontWidth + depthDx, frontY - depthDy),
    toPoint(frontX + depthDx, frontY - depthDy),
  ]

  return {
    slices,
    topFace,
    keyPoints,
    viewBox: {
      width: viewWidth,
      height: viewHeight,
    },
    projection: {
      frontX,
      frontY,
      frontWidth,
      frontHeight,
      depthDx,
      depthDy,
      strokeWidth,
      padding,
    },
    minSlicePxApplied,
    totalThicknessIn: round2(totalThicknessIn),
  }
}
