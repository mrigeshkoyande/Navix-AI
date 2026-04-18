// FlowSphere AI — Input Sanitization Utilities
// Pure functions for securing user input — no external dependencies.

const SCRIPT_CONTENT_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_CONTENT_RE = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
const HTML_TAG_RE = /<[^>]+>/g;
const SCRIPT_URI_RE = /javascript\s*:/gi;
const EVENT_HANDLER_RE = /\bon\w+\s*=/gi;

/**
 * Strips HTML tags (including script/style with their content),
 * script URIs, and event handlers from user input.
 * Also enforces a maximum length to prevent abuse.
 */
export function sanitizeInput(raw: string, maxLength = 500): string {
  if (!raw || typeof raw !== 'string') return '';

  let clean = raw
    .replace(SCRIPT_CONTENT_RE, '')   // Remove <script>...</script> with content
    .replace(STYLE_CONTENT_RE, '')    // Remove <style>...</style> with content
    .replace(HTML_TAG_RE, '')         // Strip remaining HTML tags
    .replace(SCRIPT_URI_RE, '')       // Remove javascript: URIs
    .replace(EVENT_HANDLER_RE, '')    // Remove inline event handlers
    .trim();

  // Enforce max length
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Escapes HTML special characters (for any edge-case rendering).
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (c) => map[c] || c);
}

/**
 * Validates that a string is a safe text input (non-empty after sanitization).
 */
export function isValidInput(raw: string): boolean {
  const cleaned = sanitizeInput(raw);
  return cleaned.length > 0 && cleaned.length <= 500;
}
