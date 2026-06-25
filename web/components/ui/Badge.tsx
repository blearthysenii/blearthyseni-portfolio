type BadgeProps = {
  children: React.ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300">
      {children}
    </span>
  );
}