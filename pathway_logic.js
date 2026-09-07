/**
 * The Logic Rules — pathway routing based on Support Map and Identity Map scores.
 * Replace this function (or merge its logic) into wherever your current
 * routing/scoring code lives in the repo.
 */
function getPathway(supportMapScore, identityMapScore) {
  const THRESHOLD = 36;

  // 1. GROUNDED SUPPORT
  // If Support Map score is 36 or higher, prioritized for higher need
  // for stability, grounding, and care.
  if (supportMapScore >= THRESHOLD) {
    return {
      pathway: "Grounded Support",
      reason: "Support Map score is 36 or higher — prioritized for higher need for stability, grounding, and care."
    };
  }

  // 2. THE UNFOLDING
  // Support Map score is under 36 AND Identity Map score is 36 or higher —
  // primary focus is on identity and self-understanding.
  if (identityMapScore >= THRESHOLD) {
    return {
      pathway: "The Unfolding",
      reason: "Support Map score is under 36, but Identity Map score is 36 or higher — primary focus is on identity and self-understanding."
    };
  }

  // 3. THE WAY FORWARD (fallback)
  // Both scores are under 36 — closest-fit pathway, ensures every client
  // gets a recommendation.
  return {
    pathway: "The Way Forward",
    reason: "Both scores are under 36 — fallback/closest-fit pathway, ensures every client gets a recommendation."
  };
}

module.exports = { getPathway };

// Example usage:
// getPathway(42, 20) -> { pathway: "Grounded Support", ... }
// getPathway(20, 40) -> { pathway: "The Unfolding", ... }
// getPathway(15, 10) -> { pathway: "The Way Forward", ... }
