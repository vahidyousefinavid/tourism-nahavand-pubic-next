import borderPattern from '/public/images/pattern-border.png'; // تصویر الگو

export default function BorderDecoration() {
  return (
    <div
      className="absolute right-0 top-0 h-full w-3 rounded-r-2xl"
      style={{
        backgroundImage: `url(${borderPattern.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}