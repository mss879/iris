import type { ReactNode } from "react";

/**
 * Reference table — size charts, delivery rates. The first cell of each row is
 * its header. Wide tables scroll sideways inside a focusable region so the
 * page itself never scrolls horizontally on a phone.
 */
export default function DataTable({
  caption,
  head,
  rows,
  note,
  hideCaption = false,
  minWidth = 560,
  className = "",
}: {
  caption: string;
  head: ReactNode[];
  rows: ReactNode[][];
  note?: ReactNode;
  hideCaption?: boolean;
  minWidth?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="relative overflow-x-auto focus-visible:outline-offset-4"
      >
        <table className="w-full border-collapse text-left" style={{ minWidth }}>
          <caption
            className={
              hideCaption
                ? "sr-only"
                : "eyebrow mb-5 text-left text-[10.5px] text-olive-700 [caption-side:top]"
            }
          >
            {caption}
          </caption>
          <thead>
            <tr className="border-y hairline">
              {head.map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="eyebrow whitespace-nowrap py-4 pr-6 text-[10px] font-normal text-olive-500"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b hairline">
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th
                      key={c}
                      scope="row"
                      className="py-4 pr-6 font-sans text-[13.5px] font-medium text-olive-800"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={c} className="py-4 pr-6 font-sans text-[13.5px] text-olive-600">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? (
        <p className="mt-4 font-sans text-[12.5px] leading-relaxed text-olive-500">{note}</p>
      ) : null}
    </div>
  );
}
