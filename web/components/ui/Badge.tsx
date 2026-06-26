type BadgeProps = {
  children: React.ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-neutral-300">
      {children}
    </span>
  );
}
