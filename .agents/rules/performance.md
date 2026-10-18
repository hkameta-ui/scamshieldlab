# Rule: Web Performance Standards

1. **Sub-second Loading**: The web platform must achieve a Google Lighthouse Performance Score >= 95.
2. **Asset Constraints**:
   - Critical fonts must load with `font-display: swap`.
   - All `<img>` tags must include explicit `width`, `height`, `loading="lazy"` (except above-the-fold hero), and `decoding="async"`.
3. **Execution Efficiency**:
   - Zero synchronous render-blocking scripts in `<head>`.
   - Keep scripts modular and event-driven.
   - Do not perform expensive synchronous computations on the main thread without microtask deferrals.
