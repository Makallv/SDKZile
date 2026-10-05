/**
 * Decodes HTML entities and cleans up malformed symbols or broken strings
 * ensuring all competition titles, descriptions, and results render cleanly in Latvian.
 */
export function cleanText(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str
    // Numeric quotation and dash entities
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;?/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8230;/g, '…')
    .replace(/&#187;/g, '»')
    .replace(/&#171;/g, '«')
    .replace(/&#160;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&#34;/g, '"')
    // Named entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&bull;/g, '•')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Clean broken truncations like &#8221... or &...
    .replace(/&#8221\.\.\./g, '”...')
    .replace(/&#8220\.\.\./g, '“...')
    .replace(/&#8211\.\.\./g, '–...')
    .replace(/&\.\.\./g, '...')
    // Generic decimal and hex entities
    .replace(/&#([0-9]+);?/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Normalize unicode non-breaking spaces to standard space
    .replace(/[\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, ' ')
    // Collapse duplicate horizontal spaces
    .replace(/[ \t]{2,}/g, ' ');
}
