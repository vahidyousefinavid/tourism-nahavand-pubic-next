export default function BorderDecoration() {
  return (
    <div
      className="absolute right-0 top-0 h-full w-3 rounded-r-2xl"
      style={{
        backgroundImage: `url(/images/pattern-border.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
