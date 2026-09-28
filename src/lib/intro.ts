/**
 * Whether the opening curtain has already played in this page session. It
 * lives in module scope, so it survives client-side navigation but resets on
 * a full reload — returning to the homepage from another page never replays
 * the curtain, while a fresh visit still gets it.
 */
let played = false;

export const introPlayed = () => played;
export const markIntroPlayed = () => {
  played = true;
};
