/**
 * IrisandMe's People & Purpose initiatives.
 *
 * Deliberately empty. Only add an initiative once the program is genuinely
 * established, and give it its own page at `href` (for example
 * `/people-and-purpose/<slug>`) setting out:
 *
 *   - the partner — who IrisandMe is working with, and why;
 *   - the contribution — exactly what IrisandMe funds or does, and for how long;
 *   - the aims — what the work sets out to change;
 *   - the outcomes — what has changed, as reported by the partner;
 *   - updates — dated notes as the work continues.
 *
 * While the list is empty, the People & Purpose page shows a quiet placeholder
 * instead of a grid.
 */
export type Initiative = {
  slug: string;
  title: string;
  /** One or two sentences: who, what IrisandMe does, and to what end. */
  summary: string;
  href: string;
};

export const initiatives: Initiative[] = [];
