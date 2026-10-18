# Rule: Universal Availability & WCAG 2.1 AA Accessibility

1. **Accessibility Standards (WCAG 2.1 AA)**:
   - Provide a functional "Skip to main content" link at the top of the DOM.
   - All interactive controls (buttons, links, inputs, cards) must be 100% operable via keyboard alone with visible `:focus-visible` focus rings.
   - Color contrast between foreground text and background must meet or exceed 4.5:1 for standard text.
   - Screen reader updates: Dynamic elements (threat scanner, quiz results, emergency checklist counters) must feature `role="status"` or `aria-live="polite"`.
2. **Universal Availability**:
   - The site must be responsive and accessible across all screen sizes (mobile 320px to 4K desktop).
   - Clean semantic HTML structure (`header`, `main`, `section`, `article`, `footer`, `nav`, `aside`).
   - Graceful resilience across all modern web browsers (Chrome, Edge, Firefox, Safari).
