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

  const inputs = payload.inputs || {}
  const computed = payload.computed || {}
  const layers = Array.isArray(payload.layers) ? payload.layers : []

  const payloadJson = JSON.stringify(payload)
  const layersJson = JSON.stringify(layers)

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
        layers_json,
        payload_json,
        user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
      layersJson,
      payloadJson,
      context.request.headers.get('User-Agent')
    )
    .run()

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
