export function MapAttribution({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-md bg-card/90 px-2 py-0.5 text-[0.875rem] leading-snug text-ink-2 ${className}`}>
      ©{" "}
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="link">
        OpenStreetMap-Mitwirkende
      </a>
    </p>
  );
}
