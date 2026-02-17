import { getDeterministicTextureSpec, normalizeStyleMode } from './styleTextureResolver.js'

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

function toNumber(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
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

function pointToPath(point) {
  return `${formatNumber(point.x)} ${formatNumber(point.y)}`
}

function distance(a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.hypot(dx, dy)
}

function normalizeVector(from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy)
  if (!len) return { x: 0, y: 0 }
  return { x: dx / len, y: dy / len }
}

function buildRoundedPolygonPath(points, radiusPx) {
  if (!Array.isArray(points) || points.length < 3) return ''
  const radius = Math.max(0, toNumber(radiusPx, 0))

  if (radius <= 0) {
    const raw = points.map(pointToPath)
    return `M ${raw.join(' L ')} Z`
  }

  const corners = points.map((curr, index) => {
    const prev = points[(index - 1 + points.length) % points.length]
    const next = points[(index + 1) % points.length]
    const lenIn = distance(curr, prev)
    const lenOut = distance(curr, next)
    const localRadius = Math.min(radius, lenIn / 2, lenOut / 2)

    const toPrev = normalizeVector(curr, prev)
    const toNext = normalizeVector(curr, next)

    return {
      curr,
      start: {
        x: curr.x + toPrev.x * localRadius,
        y: curr.y + toPrev.y * localRadius,
      },
      end: {
        x: curr.x + toNext.x * localRadius,
        y: curr.y + toNext.y * localRadius,
      },
    }
  })

  let d = `M ${pointToPath(corners[0].end)}`
  for (let i = 1; i < corners.length; i += 1) {
    const corner = corners[i]
    d += ` L ${pointToPath(corner.start)} Q ${pointToPath(corner.curr)} ${pointToPath(corner.end)}`
  }
  d += ` L ${pointToPath(corners[0].start)} Q ${pointToPath(corners[0].curr)} ${pointToPath(corners[0].end)} Z`
  return d
}

function labelText(slice) {
  const gradeCode = slice.gradeCode || 'UNASSIGNED'
  return `${gradeCode} • ${formatNumber(slice.thicknessIn)} in`
}

function buildTexturePatternDef({ patternId, spec, strokeColor, mode }) {
  const spacing = Math.max(4, toNumber(spec.spacing, 8))
  const strokeWidth = Math.max(0.5, toNumber(spec.strokeWidth, 0.9))
  const angle = toNumber(spec.angle, 0)
  const motif = spec.motif || 'diag'

  const lines = []

  if (motif === 'diag') {
    lines.push(`<line x1="0" y1="0" x2="0" y2="${formatNumber(spacing)}" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
  } else if (motif === 'cross') {
    lines.push(`<line x1="0" y1="0" x2="0" y2="${formatNumber(spacing)}" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
    lines.push(`<line x1="0" y1="0" x2="${formatNumber(spacing)}" y2="0" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
  } else if (motif === 'dots') {
    const radius = mode === 'technical_cad' ? 0.8 : 1.2
    lines.push(`<circle cx="${formatNumber(spacing / 2)}" cy="${formatNumber(spacing / 2)}" r="${formatNumber(radius)}" fill="${escapeXml(strokeColor)}" />`)
  } else if (motif === 'grid') {
    lines.push(`<line x1="0" y1="0" x2="0" y2="${formatNumber(spacing)}" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
    lines.push(`<line x1="0" y1="0" x2="${formatNumber(spacing)}" y2="0" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
  } else if (motif === 'wave') {
    const half = spacing / 2
    lines.push(`<path d="M 0 ${formatNumber(half)} Q ${formatNumber(half)} 0 ${formatNumber(spacing)} ${formatNumber(half)}" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" fill="none" />`)
  } else {
    lines.push(`<line x1="0" y1="${formatNumber(spacing / 2)}" x2="${formatNumber(spacing)}" y2="${formatNumber(spacing / 2)}" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" />`)
  }

  return [
    `<pattern id="${escapeXml(patternId)}" width="${formatNumber(spacing)}" height="${formatNumber(spacing)}" patternUnits="userSpaceOnUse" patternTransform="rotate(${formatNumber(angle)})">`,
    '<rect width="100%" height="100%" fill="transparent" />',
    ...lines,
    '</pattern>',
  ].join('')
}

function adjustTextureSpec(spec, { spacingScale = 1, strokeScale = 1, angleOffset = 0 } = {}) {
  return {
    ...spec,
    spacing: Math.max(4, spec.spacing * Math.max(0.2, toNumber(spacingScale, 1))),
    strokeWidth: Math.max(0.5, spec.strokeWidth * Math.max(0.2, toNumber(strokeScale, 1))),
    angle: spec.angle + toNumber(angleOffset, 0),
  }
}

function buildClassicDefaultSvg({ projected, slices, colors = {}, label = {} } = {}) {
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
    patternCount: 0,
    filterCount: 0,
  }
}

function buildStyledSvg({ projected, slices, colors = {}, label = {}, styleMode, styles = {} } = {}) {
  const fontSizePx = Number(label.fontSizePx) > 0 ? Number(label.fontSizePx) : 12
  const minSliceHeightPx = Number(label.minSliceHeightPx) > 0 ? Number(label.minSliceHeightPx) : 14

  const styleTokens = styles?.[styleMode] || {}
  const textureMaps = styles?.textureMaps || {}
  const texturedByCode = textureMaps?.texturedByCode || {}
  const technicalCadByCode = textureMaps?.technicalCadByCode || {}
  const defaultStrokeByMode = {
    rounded_soft: '#78879b',
    textured: '#5f6876',
    photo_realistic: '#4d5869',
    technical_cad: '#2f3d4c',
  }

  const sideDarkenBase = Number.isFinite(Number(colors.sideDarken)) ? Number(colors.sideDarken) : 0.12
  const topLightenBase = Number.isFinite(Number(colors.topLighten)) ? Number(colors.topLighten) : 0.14
  const sideDarkenAmount = Number.isFinite(Number(styleTokens.sideDarken)) ? Number(styleTokens.sideDarken) : sideDarkenBase
  const topLightenAmount = Number.isFinite(Number(styleTokens.topLighten)) ? Number(styleTokens.topLighten) : topLightenBase

  const strokeColor = styleTokens.stroke || defaultStrokeByMode[styleMode] || '#5f6876'
  const strokeWidthScale = Number.isFinite(Number(styleTokens.strokeWidthScale)) ? Number(styleTokens.strokeWidthScale) : 1
  const strokeWidth = projected.projection.strokeWidth * strokeWidthScale
  const strokeAttr = `stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}"`
  const roundedStrokeAttr = styleMode === 'rounded_soft' ? ' stroke-linejoin="round" stroke-linecap="round"' : ''

  const defs = []
  const defKeys = new Set()
  let patternCount = 0
  let filterCount = 0

  const rightFaces = []
  const rightOverlays = []
  const frontFaces = []
  const frontOverlays = []
  const separatorLines = []
  const texts = []
  const sliceDiagnostics = []
  let topFace = ''
  let topOverlay = ''
  let roundedClipPathId = ''
  let roundedOutlinePath = ''

  const addDef = (key, markup, kind) => {
    if (defKeys.has(key)) return false
    defKeys.add(key)
    defs.push(markup)
    if (kind === 'pattern') patternCount += 1
    if (kind === 'filter') filterCount += 1
    return true
  }

  if (styleMode === 'rounded_soft') {
    const shadowOpacity = Number.isFinite(Number(styleTokens.shadowOpacity)) ? Number(styleTokens.shadowOpacity) : 0.22
    const cornerRadiusPx = Number.isFinite(Number(styleTokens.cornerRadiusPx)) ? Number(styleTokens.cornerRadiusPx) : 12
    const outlinePoints = [
      projected.keyPoints.frontTopLeft,
      projected.keyPoints.backTopLeft,
      projected.keyPoints.backTopRight,
      projected.keyPoints.backBottomRight,
      projected.keyPoints.frontBottomRight,
      projected.keyPoints.frontBottomLeft,
    ]
    const roundedPath = buildRoundedPolygonPath(outlinePoints, cornerRadiusPx)

    roundedClipPathId = 'rounded-soft-clip'
    addDef(
      roundedClipPathId,
      `<clipPath id="${roundedClipPathId}"><path d="${escapeXml(roundedPath)}" /></clipPath>`,
    )

    addDef(
      'filter-rounded-soft-shadow',
      [
        '<filter id="rounded-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">',
        `<feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#16293f" flood-opacity="${formatNumber(shadowOpacity)}" />`,
        '</filter>',
      ].join(''),
      'filter',
    )

    roundedOutlinePath = `<path d="${escapeXml(roundedPath)}" fill="none" stroke="${escapeXml(strokeColor)}" stroke-width="${formatNumber(strokeWidth)}" stroke-linejoin="round" stroke-linecap="round" />`
  }

  if (styleMode === 'photo_realistic') {
    const grainFrequency = Number.isFinite(Number(styleTokens.grainFrequency)) ? Number(styleTokens.grainFrequency) : 0.85
    const grainOpacity = Number.isFinite(Number(styleTokens.grainOpacity)) ? Number(styleTokens.grainOpacity) : 0.08
    const shadowOpacity = Number.isFinite(Number(styleTokens.shadowOpacity)) ? Number(styleTokens.shadowOpacity) : 0.17

    addDef(
      'filter-photo-foam-grain',
      [
        '<filter id="photo-foam-grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">',
        `<feTurbulence type="fractalNoise" baseFrequency="${formatNumber(grainFrequency)}" numOctaves="2" seed="11" stitchTiles="stitch" result="noise" />`,
        `<feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${formatNumber(grainOpacity)} 0" result="grain" />`,
        '<feComposite in="grain" in2="SourceAlpha" operator="in" result="grainMasked" />',
        '<feBlend in="SourceGraphic" in2="grainMasked" mode="multiply" />',
        '</filter>',
      ].join(''),
      'filter',
    )

    addDef(
      'filter-photo-shadow',
      [
        '<filter id="photo-soft-shadow" x="-15%" y="-15%" width="130%" height="145%">',
        `<feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#1d2532" flood-opacity="${formatNumber(shadowOpacity)}" />`,
        '</filter>',
      ].join(''),
      'filter',
    )
  }

  for (let i = 0; i < slices.length; i += 1) {
    const slice = slices[i]
    const frontBaseColor = slice.baseColor
    const sideBaseColor = darken(frontBaseColor, sideDarkenAmount)
    const showLabel = slice.heightPx >= minSliceHeightPx

    let frontFill = frontBaseColor
    let sideFill = sideBaseColor
    let frontExtraAttr = ''
    let sideExtraAttr = ''

    if (styleMode === 'rounded_soft') {
      frontFill = lighten(frontBaseColor, 0.08)
      sideFill = lighten(sideBaseColor, 0.08)
      frontExtraAttr = ' filter="url(#rounded-soft-shadow)"'
    }

    if (styleMode === 'photo_realistic') {
      const highlightStrength = Math.max(0.4, toNumber(styleTokens.highlightStrength, 1))
      const seamContrast = Math.max(0.3, toNumber(styleTokens.seamContrast, 1))
      const frontGradientId = `photo-front-${slice.index}`
      const sideGradientId = `photo-side-${slice.index}`
      const frontStop1 = lighten(frontBaseColor, 0.26 * highlightStrength)
      const frontStop2 = frontBaseColor
      const frontStop3 = darken(frontBaseColor, 0.12 * seamContrast)
      const sideStop1 = lighten(sideBaseColor, 0.08)
      const sideStop2 = darken(sideBaseColor, 0.18 * seamContrast)

      addDef(
        `gradient-${frontGradientId}`,
        [
          `<linearGradient id="${frontGradientId}" x1="0" y1="0" x2="0" y2="1">`,
          `<stop offset="0%" stop-color="${escapeXml(frontStop1)}" />`,
          `<stop offset="58%" stop-color="${escapeXml(frontStop2)}" />`,
          `<stop offset="100%" stop-color="${escapeXml(frontStop3)}" />`,
          '</linearGradient>',
        ].join(''),
      )

      addDef(
        `gradient-${sideGradientId}`,
        [
          `<linearGradient id="${sideGradientId}" x1="0" y1="0" x2="1" y2="1">`,
          `<stop offset="0%" stop-color="${escapeXml(sideStop1)}" />`,
          `<stop offset="100%" stop-color="${escapeXml(sideStop2)}" />`,
          '</linearGradient>',
        ].join(''),
      )

      frontFill = `url(#${frontGradientId})`
      sideFill = `url(#${sideGradientId})`
      frontExtraAttr = ' filter="url(#photo-foam-grain)"'
      sideExtraAttr = ' filter="url(#photo-foam-grain)"'

      if (i > 0) {
        const seamOpacity = Math.max(0.08, Math.min(0.75, 0.28 * seamContrast))
        separatorLines.push(
          `<line x1="${formatNumber(projected.projection.frontX)}" y1="${formatNumber(slice.yTop)}" x2="${formatNumber(projected.projection.frontX + projected.projection.frontWidth)}" y2="${formatNumber(slice.yTop)}" stroke="#ffffff" stroke-opacity="${formatNumber(seamOpacity)}" stroke-width="${formatNumber(Math.max(0.8, strokeWidth * 0.5))}" />`,
        )
      }
    }

    if (styleMode === 'technical_cad') {
      frontFill = lighten(frontBaseColor, 0.62)
      sideFill = lighten(sideBaseColor, 0.48)
    }

    rightFaces.push(
      `<polygon points="${polygonPoints(slice.rightPoints)}" fill="${escapeXml(sideFill)}" ${strokeAttr}${roundedStrokeAttr}${sideExtraAttr} />`,
    )

    frontFaces.push(
      `<polygon points="${polygonPoints(slice.frontPoints)}" fill="${escapeXml(frontFill)}" ${strokeAttr}${roundedStrokeAttr}${frontExtraAttr} />`,
    )

    if (styleMode === 'textured' || styleMode === 'technical_cad') {
      const textureMode = styleMode === 'technical_cad' ? 'technical_cad' : 'textured'
      const explicitTextureByCode = textureMode === 'technical_cad' ? technicalCadByCode : texturedByCode
      const baseSpec = getDeterministicTextureSpec({
        gradeCode: slice.gradeCode,
        mode: textureMode,
        explicitTextureByCode,
      })
      const spec = textureMode === 'technical_cad'
        ? adjustTextureSpec(baseSpec, {
          spacingScale: styleTokens.hatchSpacingScale,
          strokeScale: 1,
          angleOffset: styleTokens.hatchAngleOffset,
        })
        : adjustTextureSpec(baseSpec, {
          spacingScale: styleTokens.patternSpacingScale,
          strokeScale: styleTokens.patternStrokeScale,
          angleOffset: styleTokens.patternAngleOffset,
        })
      const patternId = `pattern-${spec.key}`
      const patternColor = styleMode === 'technical_cad'
        ? darken(frontBaseColor, 0.68)
        : darken(frontBaseColor, 0.38)

      addDef(
        `pattern-${patternId}`,
        buildTexturePatternDef({
          patternId,
          spec,
          strokeColor: patternColor,
          mode: textureMode,
        }),
        'pattern',
      )

      const frontOpacityToken = styleMode === 'technical_cad' ? styleTokens.hatchOpacityFront : styleTokens.patternOpacityFront
      const sideOpacityToken = styleMode === 'technical_cad' ? styleTokens.hatchOpacitySide : styleTokens.patternOpacitySide
      const frontOpacity = Number.isFinite(Number(frontOpacityToken)) ? Number(frontOpacityToken) : spec.opacity
      const sideOpacity = Number.isFinite(Number(sideOpacityToken)) ? Number(sideOpacityToken) : spec.opacity * 0.75

      frontOverlays.push(
        `<polygon points="${polygonPoints(slice.frontPoints)}" fill="url(#${escapeXml(patternId)})" opacity="${formatNumber(frontOpacity)}" />`,
      )
      rightOverlays.push(
        `<polygon points="${polygonPoints(slice.rightPoints)}" fill="url(#${escapeXml(patternId)})" opacity="${formatNumber(sideOpacity)}" />`,
      )
    }

    if (showLabel) {
      const labelBase = styleMode === 'technical_cad' ? lighten(frontBaseColor, 0.72) : frontBaseColor
      const textColor = styleMode === 'technical_cad'
        ? '#1f2a36'
        : luminance(labelBase) < 0.55
          ? '#ffffff'
          : '#1a2530'

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
  const topBaseColor = topSlice ? lighten(topSlice.baseColor, topLightenAmount) : '#d8dde3'
  let topFill = topBaseColor
  let topExtraAttr = ''

  if (styleMode === 'rounded_soft') {
    topFill = lighten(topBaseColor, 0.08)
    topExtraAttr = ' filter="url(#rounded-soft-shadow)"'
  }

  if (styleMode === 'photo_realistic' && projected.topFace.length) {
    const highlightStrength = Math.max(0.4, toNumber(styleTokens.highlightStrength, 1))
    const seamContrast = Math.max(0.3, toNumber(styleTokens.seamContrast, 1))
    const topGradientId = 'photo-top-face'
    addDef(
      `gradient-${topGradientId}`,
      [
        `<linearGradient id="${topGradientId}" x1="0" y1="0" x2="1" y2="1">`,
        `<stop offset="0%" stop-color="${escapeXml(lighten(topBaseColor, 0.16 * highlightStrength))}" />`,
        `<stop offset="55%" stop-color="${escapeXml(topBaseColor)}" />`,
        `<stop offset="100%" stop-color="${escapeXml(darken(topBaseColor, 0.2 * seamContrast))}" />`,
        '</linearGradient>',
      ].join(''),
    )

    topFill = `url(#${topGradientId})`
    topExtraAttr = ' filter="url(#photo-soft-shadow)"'
  }

  if (styleMode === 'technical_cad') {
    topFill = lighten(topBaseColor, 0.58)
  }

  if (projected.topFace.length) {
    topFace = `<polygon points="${polygonPoints(projected.topFace)}" fill="${escapeXml(topFill)}" ${strokeAttr}${roundedStrokeAttr}${topExtraAttr} />`
  }

  if ((styleMode === 'textured' || styleMode === 'technical_cad') && projected.topFace.length && topSlice) {
    const textureMode = styleMode === 'technical_cad' ? 'technical_cad' : 'textured'
    const explicitTextureByCode = textureMode === 'technical_cad' ? technicalCadByCode : texturedByCode
    const baseSpec = getDeterministicTextureSpec({
      gradeCode: topSlice.gradeCode,
      mode: textureMode,
      explicitTextureByCode,
    })
    const spec = textureMode === 'technical_cad'
      ? adjustTextureSpec(baseSpec, {
        spacingScale: styleTokens.hatchSpacingScale,
        strokeScale: 1,
        angleOffset: styleTokens.hatchAngleOffset,
      })
      : adjustTextureSpec(baseSpec, {
        spacingScale: styleTokens.patternSpacingScale,
        strokeScale: styleTokens.patternStrokeScale,
        angleOffset: styleTokens.patternAngleOffset,
      })
    const patternId = `pattern-${spec.key}`
    const patternColor = styleMode === 'technical_cad'
      ? darken(topSlice.baseColor, 0.7)
      : darken(topSlice.baseColor, 0.45)

    addDef(
      `pattern-${patternId}`,
      buildTexturePatternDef({
        patternId,
        spec,
        strokeColor: patternColor,
        mode: textureMode,
      }),
      'pattern',
    )

    const topOpacityToken = styleMode === 'technical_cad' ? styleTokens.hatchOpacityFront : styleTokens.patternOpacityFront
    const topOpacity = Number.isFinite(Number(topOpacityToken)) ? Number(topOpacityToken) : spec.opacity * 0.85
    topOverlay = `<polygon points="${polygonPoints(projected.topFace)}" fill="url(#${escapeXml(patternId)})" opacity="${formatNumber(topOpacity)}" />`
  }

  const layerContent = [
    ...rightFaces,
    ...rightOverlays,
    ...frontFaces,
    ...frontOverlays,
    topFace,
    topOverlay,
    ...separatorLines,
    ...texts,
  ].filter(Boolean)

  const clippedLayerContent = roundedClipPathId
    ? [`<g clip-path="url(#${roundedClipPathId})">`, ...layerContent, '</g>']
    : layerContent

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${formatNumber(projected.viewBox.width)} ${formatNumber(projected.viewBox.height)}" role="img" aria-label="Mattress layer preview">`,
    '<rect width="100%" height="100%" fill="transparent" />',
    defs.length ? `<defs>${defs.join('')}</defs>` : '',
    ...clippedLayerContent,
    roundedOutlinePath,
    '</svg>',
  ].filter(Boolean).join('')

  return {
    svg,
    sliceDiagnostics,
    patternCount,
    filterCount,
  }
}

export function buildMattressSvg({ projected, slices, colors = {}, label = {}, style = {}, styles = {} } = {}) {
  const styleMode = normalizeStyleMode(style?.mode, styles?.defaultMode || 'classic_default')

  if (styleMode === 'classic_default') {
    return buildClassicDefaultSvg({ projected, slices, colors, label })
  }

  return buildStyledSvg({ projected, slices, colors, label, styleMode, styles })
}
