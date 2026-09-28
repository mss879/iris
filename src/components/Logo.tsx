import Image from "next/image";

/**
 * The IrisandMe wordmark (set as "Iris & Me"). Two pre-tinted plates rather than a CSS filter:
 * the artwork carries a gradient, and filters would flatten it.
 */
export default function Logo({
  tone = "olive",
  className = "",
  priority = false,
}: {
  tone?: "olive" | "cream";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "cream" ? "/img/logo-cream.png" : "/img/logo-olive.png"}
      alt="IrisandMe"
      width={1377}
      height={518}
      priority={priority}
      sizes="(max-width: 768px) 260px, 640px"
      className={`h-auto w-full select-none object-contain ${className}`}
    />
  );
}
