function normalizeText(value) {
  return String(value || '').toLowerCase()
}

function normalizeCode(code) {
  return String(code || '').trim().toUpperCase()
}

function findKeywordFamily(text, rules) {
  const normalized = normalizeText(text)
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i]
    const match = normalizeText(rule?.match)
    if (!match) continue
    if (normalized.includes(match)) return rule.family || null
  }
  return null
}

function getRules(keywordRules, field) {
  const rules = keywordRules?.[field]
  return Array.isArray(rules) ? rules : []
}

export function resolveColorFamily({
  gradeCode,
  gradeMetadata,
  explicitCodeFamilyMap = {},
  keywordRules = {},
  familyColors = {},
  neutralFamily = 'neutral',
} = {}) {
  const normalizedCode = normalizeCode(gradeCode)

  if (!normalizedCode) {
    return {
      family: neutralFamily,
      source: 'unassigned',
      fallbackUsed: false,
      gradeCode: null,
    }
  }

  let family = null
  let source = 'neutral-fallback'

  if (explicitCodeFamilyMap && explicitCodeFamilyMap[normalizedCode]) {
    family = explicitCodeFamilyMap[normalizedCode]
    source = 'explicit-code'
  }

  if (!family) {
    const labelFamily = findKeywordFamily(gradeMetadata?.label_feature, getRules(keywordRules, 'label'))
    if (labelFamily) {
      family = labelFamily
      source = 'label-keyword'
    }
  }

  if (!family) {
    const descriptionFamily = findKeywordFamily(gradeMetadata?.grade_description, getRules(keywordRules, 'description'))
    if (descriptionFamily) {
      family = descriptionFamily
      source = 'description-keyword'
    }
  }

  if (!family) {
    const groupFamily = findKeywordFamily(gradeMetadata?.groupLabel, getRules(keywordRules, 'group'))
    if (groupFamily) {
      family = groupFamily
      source = 'group-keyword'
    }
  }

  if (!family) {
    family = neutralFamily
    source = 'neutral-fallback'
  }

  const hasFamilyColor = family === neutralFamily || Boolean(familyColors?.[family])
  if (!hasFamilyColor) {
    return {
      family: neutralFamily,
      source: 'invalid-family-fallback',
      fallbackUsed: true,
      gradeCode: normalizedCode,
    }
  }

  const fallbackUsed = family === neutralFamily

  return {
    family,
    source,
    fallbackUsed,
    gradeCode: normalizedCode,
  }
}

export function buildGradeMetadataByCode(grades = []) {
  const byCode = {}
  for (let i = 0; i < grades.length; i += 1) {
    const grade = grades[i]
    const code = normalizeCode(grade?.code)
    if (!code) continue
    byCode[code] = {
      code,
      label_feature: grade?.label_feature || '',
      grade_description: grade?.grade_description || '',
      groupLabel: grade?.groupLabel || '',
    }
  }
  return byCode
}

export { normalizeCode }
