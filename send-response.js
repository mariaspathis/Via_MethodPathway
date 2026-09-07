const nodemailer = require('nodemailer');

const RESPONSE_RECIPIENT = 'contact@spathiswellbeing.com';

const pathwayNames = {
  grounded: 'Grounded Support',
  unfolding: 'The Unfolding',
  wayforward: 'The Way Forward'
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validAnswers(values) {
  return Array.isArray(values) &&
    values.length === 24 &&
    values.every((value) => Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 3);
}

function total(values) {
  return values.reduce((sum, value) => sum + Number(value), 0);
}

function determinePathway(supportMapScore, identityMapScore) {
  if (supportMapScore >= 36) return 'grounded';
  if (identityMapScore >= 36) return 'unfolding';
  return 'wayforward';
}

function answerRows(title, answers) {
  const rows = answers
    .map((answer, index) => `<tr><td style="padding:5px 10px;border-bottom:1px solid #eee;">${index + 1}</td><td style="padding:5px 10px;border-bottom:1px solid #eee;">${escapeHtml(answer)}</td></tr>`)
    .join('');

  return `
    <h3 style="margin:24px 0 8px;">${escapeHtml(title)}</h3>
    <table style="border-collapse:collapse;width:100%;max-width:520px;">
      <thead><tr><th style="text-align:left;padding:5px 10px;border-bottom:1px solid #ccc;">Question</th><th style="text-align:left;padding:5px 10px;border-bottom:1px solid #ccc;">Response</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable.');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const body = req.body || {};

    if (body.consent !== 'yes') {
      return res.status(400).json({ error: 'Consent is required before a response can be emailed.' });
    }

    if (!validAnswers(body.part1Answers) || !validAnswers(body.part2Answers)) {
      return res.status(400).json({ error: 'The submitted response is incomplete or invalid.' });
    }

    // Recalculate everything on the server so the emailed pathway cannot be altered in the browser.
    const supportMapScore = total(body.part1Answers);
    const identityMapScore = total(body.part2Answers);
    const pathway = determinePathway(supportMapScore, identityMapScore);
    const pathwayName = pathwayNames[pathway];

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    });

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#222;">
        <h2>Via Method response</h2>
        <p><strong>Suggested pathway:</strong> ${escapeHtml(pathwayName)}</p>
        <p><strong>Support Map response:</strong> ${supportMapScore}</p>
        <p><strong>Identity Map response:</strong> ${identityMapScore}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
        <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        ${answerRows('Support Map responses', body.part1Answers)}
        ${answerRows('Identity Map responses', body.part2Answers)}
      </div>`;

    const mailOptions = {
      from: `Via Method <${gmailUser}>`,
      to: RESPONSE_RECIPIENT,
      subject: `Via Method response — ${pathwayName}${name ? ` — ${name}` : ''}`,
      html
    };

    // If the client supplied an email, Reply in Gmail will go back to them.
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mailOptions.replyTo = email;
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Gmail send-response error:', error);
    return res.status(500).json({ error: 'The response could not be emailed.' });
  }
};
