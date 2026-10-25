# Portfolio UX and Accessibility Audit

Date: 2026-09-18

## Audit scope

Combined UX, visual-design, responsive, and screenshot-based accessibility review of the portfolio's core journey: arrival, personal credibility, project discovery, gallery exploration, and contact. Desktop was reviewed at 1440 × 1000 and mobile at 390 × 844. The production build also completed successfully.

## Overall verdict

The site has a distinctive, memorable visual identity and a credible responsive presentation. Its biggest problem is not polish; it is conversion. A hiring manager must pass a long biography-and-capabilities sequence before reaching the work, and every project CTA leads to the same Behance profile. The portfolio shows breadth, but it does not yet make project-specific reasoning, outcomes, or evidence easy to verify.

## Flow steps

1. **Arrival — Good visual impact, mixed clarity.** The portrait and oversized name establish identity immediately. The only above-the-fold action is “Scroll to explore,” while Work, Resume, and Contact remain hidden until the visitor leaves the hero.
2. **About and credibility — Good.** The portrait, positioning statement, metrics, education, and availability create trust. Small gray supporting text and dense uppercase typography reduce readability.
3. **Selected work — Needs improvement.** Filtering is clear and imagery is strong. Project cards contain useful title/type/year context, but all “View project” links point to the same generic Behance profile and no outcomes or individual case-study destinations are exposed.
4. **Gallery exploration — Needs improvement.** The section is visually consistent, but the heading viewport contains a large empty field before the work appears, creating a false empty/loading state and extending an already long page.
5. **Contact — Good.** Availability, email, and the oversized close are clear. The only primary conversion method is email; no short context prompt or alternate professional channel appears in this section.
6. **Mobile arrival — Good.** The composition adapts successfully and keeps the designer's identity intact. The first useful project evidence is still far below the fold.
7. **Mobile menu — Mixed.** Controls are large and the menu is easy to scan. It opens over the About content rather than as a fully isolated modal/navigation state, and focus trapping/return were not demonstrated.
8. **Mobile selected work — Good presentation, weak destination.** The card hierarchy works well and the filter row remains usable. The small uppercase metadata/filter text is hard to read, and the project link still lacks a unique destination.

## Strengths

- Strong and coherent art direction: black, off-white, and green are used consistently.
- Excellent identity recall from the hero portrait, name treatment, and display typography.
- Clear section numbering and strong visual hierarchy at headline level.
- Responsive layouts avoid obvious clipping in the audited desktop and mobile viewports.
- Meaningful image alt text is present for major projects, visible buttons have accessible names, and focus-visible styling exists for the floating navigation.
- Reduced-motion CSS is present, and the project compiles successfully.

## Highest-impact issues

### P0 — Give each project a real case-study destination

All eight project CTAs and the featured case-study CTA point to the same Behance profile. This breaks the promise of “View project” and forces visitors to search again. Link each card to a specific case study (internal or direct external URL) and make the whole card or a clearly sized CTA actionable.

### P0 — Move proof of work much closer to the top

The Work section is numbered 09 and appears after About, Methods, Skills, Experience, Achievements, Certifications, and Background. For recruiters and clients, the primary task is evaluating work. Add a persistent Work/Resume/Contact header in the hero or place a compact featured-work preview directly after the hero.

### P1 — Add decision-making evidence, not only thumbnails

The cards describe intent but not contribution or results. For each case study, surface role, team, duration, problem, key design decision, usability/research evidence, and outcome. Where metrics are unavailable, use concrete qualitative evidence rather than invented numbers.

### P1 — Reduce dead space and overall page length

The gallery capture presents almost an entire viewport of empty space below its intro before content. Similar large transitions make the portfolio feel longer than its information warrants. Tighten section minimum heights/padding and ensure the first gallery row enters the same viewport as the section introduction.

### P1 — Improve low-contrast and tiny supporting text

Eyebrows, metadata, filter labels, and muted body copy appear very small and faint against near-black surfaces, especially on mobile. Verify contrast programmatically and raise the smallest text to a comfortable mobile size (generally at least 12–14 px depending on typeface/weight), with less letter spacing for body-like information.

### P1 — Make carousel and motion behavior fully accessible

The featured carousel auto-advances every 6.5 seconds, but no pause control is visible. Add pause/play, pause on hover/focus, and stop automatic advancement when reduced motion is requested. Ensure tab semantics include keyboard arrow behavior or use simpler button semantics. The hero frame sequence should also honor reduced motion in JavaScript, not only shortened CSS animations.

### P2 — Strengthen mobile menu behavior

When open, treat the menu as a complete navigation state: prevent background scrolling, move focus into the menu, trap focus, close on Escape, and return focus to the trigger. Add an explicit opaque backdrop or full-height panel so underlying content does not compete visually.

### P2 — Clarify new-tab behavior

External case studies and social links open new tabs without warning. Include accessible text such as “opens in a new tab,” or keep navigation in the same tab when a new tab is not essential.

### P2 — Improve contact conversion

Keep email, but add LinkedIn in the contact section and a one-line expectation such as typical reply time or what information to include. That reduces uncertainty without requiring a form.

## Accessibility evidence limits

This is not a WCAG compliance certification. Screenshots and DOM inspection can reveal likely contrast, hierarchy, labeling, and responsive risks, but not screen-reader announcements, complete reading order, browser zoom/reflow at 200–400%, actual color contrast ratios, touch behavior across devices, or a full keyboard-only journey. These need dedicated manual and automated testing.

## Recommended order

1. Unique project destinations and compact case-study proof.
2. Earlier access to Work, Resume, and Contact.
3. Text contrast/size and carousel motion controls.
4. Section-height cleanup and mobile-menu focus behavior.
5. Contact reassurance and new-tab messaging.

