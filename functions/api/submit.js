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
  const generatedOptions = Array.isArray(payload.generatedOptions) ? payload.generatedOptions : []

  const payloadJson = JSON.stringify(payload)
  const layersJson = JSON.stringify(layers)
  const generatedOptionsJson = JSON.stringify(generatedOptions)

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
          override_er,
          tolerance,
          top_layer_min,
          bottom_layer_min,
          width_in,
          height_in,
          mattress_thickness_in,
          selected_option_key,
          selected_option_label,
          target_er,
          actual_er,
          delta_er,
          total_thickness,
          er_depth,
          estimated_price,
          status_text,
          calc_version,
          app_version,
          generated_options_json,
          layers_json,
          payload_json,
          user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        createdAt,
        inputs.weight?.value ?? null,
        inputs.weight?.label ?? null,
        inputs.back?.value ?? null,
        inputs.firmness?.value ?? null,
        inputs.overrideEr ?? null,
        inputs.tolerance ?? null,
        inputs.topLayerMin ?? null,
        inputs.bottomLayerMin ?? null,
        inputs.widthIn ?? null,
        inputs.lengthIn ?? inputs.heightIn ?? null,
        inputs.mattressThicknessIn ?? null,
        meta.selectedOptionKey ?? null,
        meta.selectedOptionLabel ?? null,
        computed.targetEr ?? null,
        computed.actualEr ?? null,
        computed.deltaEr ?? null,
        computed.totalThickness ?? null,
        computed.erDepth ?? null,
        computed.estimatedPrice ?? null,
        meta.status ?? null,
        meta.calcVersion ?? null,
        meta.appVersion ?? null,
        generatedOptionsJson,
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
