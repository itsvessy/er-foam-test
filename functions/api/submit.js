export async function onRequestPost(context) {
  let payload
  try {
    payload = await context.request.json()
  } catch (error) {
    return new Response('Invalid JSON payload', { status: 400 })
  }

  const db = context.env.DB
  if (!db) {
    return new Response('DB binding not configured', { status: 500 })
  }

  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  const meta = payload.meta || {}
  const inputs = payload.inputs || {}
  const computed = payload.computed || {}
  const layers = Array.isArray(payload.layers) ? payload.layers : []
  const budgetThresholds = meta.budgetThresholds || {}

  const payloadJson = JSON.stringify(payload)
  const layersJson = JSON.stringify(layers)

  try {
    await db
      .prepare(
        `INSERT INTO submissions (
          id,
          created_at,
          weight_value,
          weight_label,
          back_condition,
          firmness,
          budget,
          override_er,
          tolerance,
          target_er,
          actual_er,
          delta_er,
          total_thickness,
          er_depth,
          total_price,
          status_text,
          calc_version,
          app_version,
          budget_min,
          budget_p33,
          budget_p66,
          budget_max,
          layers_json,
          payload_json,
          user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        createdAt,
        inputs.weight?.value ?? null,
        inputs.weight?.label ?? null,
        inputs.back?.value ?? null,
        inputs.firmness?.value ?? null,
        inputs.budget ?? null,
        inputs.overrideEr ?? null,
        inputs.tolerance ?? null,
        computed.targetEr ?? null,
        computed.actualEr ?? null,
        computed.deltaEr ?? null,
        computed.totalThickness ?? null,
        computed.erDepth ?? null,
        computed.totalPrice ?? null,
        meta.status ?? null,
        meta.calcVersion ?? null,
        meta.appVersion ?? null,
        budgetThresholds.min ?? null,
        budgetThresholds.p33 ?? null,
        budgetThresholds.p66 ?? null,
        budgetThresholds.max ?? null,
        layersJson,
        payloadJson,
        context.request.headers.get('User-Agent')
      )
      .run()
  } catch (error) {
    console.error('D1 insert failed', error)
    return new Response(
      JSON.stringify({
        ok: false,
        error: error?.message || String(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
