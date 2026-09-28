/**
 * Press coverage for IrisandMe, by kind. Every list is empty until coverage
 * is published: while all four are empty the Press page shows a single note,
 * and each section appears on its own as soon as its list has an entry.
 */

/** "As Seen In": a publication's name, optionally with its masthead. */
export type Publication = {
  name: string;
  /** Masthead image in /public, e.g. "/press/publication.svg". The name is used as its alt text. */
  logo?: string;
  /** Link to the coverage, if there is one to share. */
  href?: string;
};

/** A written feature, review or mention. */
export type PressFeature = {
  publication: string;
  title: string;
  /** ISO date of publication, e.g. "2026-11-04". */
  date: string;
  href: string;
};

/** A shoot in which IrisandMe pieces were styled by a publication. */
export type EditorialShoot = {
  publication: string;
  title: string;
  image: string;
  imageAlt: string;
  /** e.g. "Photography: … Styling: …" — exactly as credited by the publication. */
  credits: string;
  href?: string;
};

/** A notable person photographed wearing IrisandMe, shared with their permission. */
export type Placement = {
  name: string;
  /** The piece worn, e.g. "Iris Wrap Dress". */
  piece: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

export const asSeenIn: Publication[] = [];

export const pressFeatures: PressFeature[] = [];

export const editorialShoots: EditorialShoot[] = [];

export const placements: Placement[] = [];
