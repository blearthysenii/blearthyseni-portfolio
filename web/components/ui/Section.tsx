type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
};

export function Section({
  children,
  className = "",
  id,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${noPadding ? "" : "py-24 md:py-32"} ${className}`}
    >
      {children}
    </section>
  );
}
