/**
 * Formats an ISO timestamp string (e.g. "2023-01-25T12:00:00Z")
 * into a human-readable date (e.g. "25 Jan 2023").
 */
function formatISODate(isoString) {
  if (!isoString) return "N/A";

  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}