/**
 * Fixed film grain over the whole page. Fractal noise baked into a data URI so
 * it costs no request, and kept faint — it should read as paper texture in the
 * flat cream fields, never as visible noise.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='200' height='200' filter='url(#n)' opacity='0.5'/>
    </svg>`
  );

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.055] mix-blend-multiply"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "200px 200px" }}
    />
  );
}
