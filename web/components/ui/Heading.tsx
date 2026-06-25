type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
};

export function Heading({ children, as: Tag = "h2", className = "" }: HeadingProps) {
  return (
    <Tag className={`font-semibold tracking-tight ${className}`}>
      {children}
    </Tag>
  );
}
