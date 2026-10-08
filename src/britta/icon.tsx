import { cn } from "@/lib/utils";

export type MdIconName = string;
export type MdIconStyle = "outlined" | "rounded" | "sharp";
export type MdIconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

const STYLE_CLASS: Record<MdIconStyle, string> = {
  outlined: "material-symbols-outlined",
  rounded: "material-symbols-rounded",
  sharp: "material-symbols-sharp",
};

type MdIconProps = {
  name: MdIconName;
  filled?: boolean;
  size?: number;
  weight?: MdIconWeight;
  grade?: number;
  style?: MdIconStyle;
  className?: string;
  title?: string;
};

export function MdIcon({
  name,
  filled = false,
  size = 24,
  weight = 400,
  grade = 0,
  style = "outlined",
  className,
  title,
}: MdIconProps) {
  return (
    <span
      className={cn(
        STYLE_CLASS[style],
        "inline-flex shrink-0 select-none items-center justify-center leading-none",
        className,
      )}
      style={{
        fontSize: size,
        width: size,
        height: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${Math.min(48, Math.max(20, size))}`,
      }}
      aria-hidden={title ? undefined : true}
      title={title}
      role={title ? "img" : undefined}
    >
      {name}
    </span>
  );
}

export function composeIconName(name: string, style: MdIconStyle = "outlined") {
  const pascal = name
    .split("_")
    .map((p) => (p ? p[0]!.toUpperCase() + p.slice(1) : p))
    .join("");
  const ns =
    style === "rounded" ? "Rounded" : style === "sharp" ? "Sharp" : "Outlined";
  return `Icons.${ns}.${pascal}`;
}
