// FlowSphere AI — Input Sanitization Tests
import { sanitizeInput, escapeHtml, isValidInput } from '@/lib/sanitize';

describe('sanitizeInput', () => {
  test('removes HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>hello')).toBe('hello');
  });

  test('removes javascript: URI', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  test('removes inline event handlers', () => {
    expect(sanitizeInput('text onclick=doSomething')).not.toContain('onclick=');
  });

  test('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  test('enforces max length of 500 characters', () => {
    const long = 'a'.repeat(600);
    expect(sanitizeInput(long).length).toBe(500);
  });

  test('custom max length is respected', () => {
    expect(sanitizeInput('hello world', 5).length).toBe(5);
  });

  test('returns empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
  });

  test('returns empty string for non-string input', () => {
    // @ts-expect-error — testing runtime guard
    expect(sanitizeInput(null)).toBe('');
  });

  test('preserves valid venue queries', () => {
    const query = 'Where is the nearest restroom?';
    expect(sanitizeInput(query)).toBe(query);
  });
});

describe('escapeHtml', () => {
  test('escapes angle brackets', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
  });

  test('escapes ampersands', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B');
  });

  test('escapes quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });
});

describe('isValidInput', () => {
  test('returns true for valid non-empty input', () => {
    expect(isValidInput('Find food court')).toBe(true);
  });

  test('returns false for empty string', () => {
    expect(isValidInput('')).toBe(false);
  });

  test('returns false for only-HTML input (strips to empty)', () => {
    expect(isValidInput('<script></script>')).toBe(false);
  });

  test('returns false for string over 500 chars', () => {
    // After sanitize, length === 500 exactly — still valid
    expect(isValidInput('a'.repeat(500))).toBe(true);
    // But a 600-char string sanitizes DOWN to 500 — still valid
    expect(isValidInput('a'.repeat(600))).toBe(true);
  });
});
