export function Paper({ children, scale = 1, className = "" }: { children: React.ReactNode; scale?: number; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-white shadow-[0_18px_50px_-12px_rgba(76,29,149,.35)] ${className}`} style={{ width: 595 * scale, height: 842 * scale }}>
      <div style={{ width: 595, height: 842, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}
