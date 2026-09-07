const RESPONSE_RECIPIENT = 'contact@spathiswellbeing.com';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function pathwayName(key) {
  return {
    grounded: 'Grounded Support',
    unfolding: 'The Unfolding',
    wayforward: 'The Way Forward'
  }[key] || 'Unknown';
}

function answerRows(answers = [], prefix) {
  return answers.map((answer, index) =>
    `<tr><td style="padding:4px 10px;border-bottom:1px solid #eee;">${prefix} ${index + 1}</td><td style="padding:4px 10px;border-bottom:1px solid #eee;">${escapeHtml(answer)}</td></tr>`
  ).join('');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const {
    name = '', email = '', phone = '', consent,
    pathway, supportMapScore, identityMapScore,
    part1Answers = [], part2Answers = []
  } = req.body || {};

  if (consent !== 'yes') {
    return res.status(400).json({ error: 'Consent is required to send a response' });
  }

  if (!['grounded', 'unfolding', 'wayforward'].includes(pathway)) {
    return res.status(400).json({ error: 'Invalid pathway recommendation' });
  }

  const safeName = escapeHtml(name || 'Not provided');
  const safeEmail = escapeHtml(email || 'Not provided');
  const safePhone = escapeHtml(phone || 'Not provided');
  const pathwayRecommendation = pathwayName(pathway);

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1B1B1A;line-height:1.5;max-width:720px;margin:auto;">
      <h2 style="font-weight:500;">New Via Method Mapping response</h2>
      <p><strong>Recommended pathway:</strong> ${escapeHtml(pathwayRecommendation)}</p>
      <p><strong>Support Map score:</strong> ${escapeHtml(supportMapScore)}<br>
      <strong>Identity Map score:</strong> ${escapeHtml(identityMapScore)}</p>

      <h3>Contact details</h3>
      <p><strong>Name:</strong> ${safeName}<br>
      <strong>Email:</strong> ${safeEmail}<br>
      <strong>Phone:</strong> ${safePhone}</p>

      <h3>Responses</h3>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        <thead><tr><th style="text-align:left;padding:6px 10px;border-bottom:2px solid #ddd;">Question</th><th style="text-align:left;padding:6px 10px;border-bottom:2px solid #ddd;">Response</th></tr></thead>
        <tbody>
          ${answerRows(part1Answers, 'Support Map')}
          ${answerRows(part2Answers, 'Identity Map')}
        </tbody>
      </table>
    </div>`;

  const fromAddress = process.env.EMAIL_FROM || 'Via Method <onboarding@resend.dev>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [RESPONSE_RECIPIENT],
        reply_to: email || RESPONSE_RECIPIENT,
        subject: `Via Method response — ${pathwayRecommendation}${name ? ` — ${name}` : ''}`,
        html
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(502).json({ error: 'Email provider rejected the request' });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Unable to send response email' });
  }
}
