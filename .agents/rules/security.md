# Rule: Industry Security Standards & OWASP Hardening

1. **Strict XSS Defense**:
   - Every piece of dynamic text originating from user input or external configs must be escaped using HTML entity encoding before rendering.
   - Disallow direct assignment of unescaped text to `innerHTML`.
2. **Security Headers & Directives**:
   - Declare Content-Security-Policy (CSP) meta directives restricting script/style sources.
   - Enforce `<meta http-equiv="X-Content-Type-Options" content="nosniff">`.
   - Enforce `<meta name="referrer" content="strict-origin-when-cross-origin">`.
   - External links must strictly declare `rel="noopener noreferrer"` or `rel="noopener sponsored"`.
3. **Data Protection by Design**:
   - Zero-storage architecture: Scanned user messages, tokens, and credentials remain in memory only and are never transmitted to analytics or external APIs.
