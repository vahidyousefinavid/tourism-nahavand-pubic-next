import clsx from "clsx";

export default function BorderDecoration({ dir, isRTL }: any) {
  return (
    <div
      className={clsx(
        "absolute  top-0 h-full w-3 ",
        isRTL ? "right-0 rounded-r-2xl" : "left-0 rounded-l-2xl"
      )}
      style={{
        backgroundImage: `url(/images/pattern-border.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
