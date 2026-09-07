const pathwayNames = {
  grounded: 'Grounded Support',
  unfolding: 'The Unfolding',
  wayforward: 'The Way Forward'
};

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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const body = req.body || {};

    if (body.consent !== 'yes') {
      return res.status(400).json({ error: 'Consent is required before a response can be saved.' });
    }

    if (!validAnswers(body.part1Answers) || !validAnswers(body.part2Answers)) {
      return res.status(400).json({ error: 'The submitted response is incomplete or invalid.' });
    }

    const supportMapScore = total(body.part1Answers);
    const identityMapScore = total(body.part2Answers);
    const pathway = determinePathway(supportMapScore, identityMapScore);

    const submission = {
      type: 'VIA_RESPONSE',
      submittedAt: new Date().toISOString(),
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      pathway,
      pathwayName: pathwayNames[pathway],
      supportMapScore,
      identityMapScore,
      supportMapResponses: body.part1Answers.map(Number),
      identityMapResponses: body.part2Answers.map(Number)
    };

    // This is intentionally recorded in Vercel Runtime Logs.
    // Search for VIA_RESPONSE in your project's Logs tab to find submissions.
    console.log('VIA_RESPONSE', JSON.stringify(submission));

    return res.status(200).json({
      ok: true,
      pathway,
      pathwayName: pathwayNames[pathway],
      supportMapScore,
      identityMapScore
    });
  } catch (error) {
    console.error('VIA_RESPONSE_SAVE_ERROR', error);
    return res.status(500).json({ error: 'The response could not be saved.' });
  }
};
