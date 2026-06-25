import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  href,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition";

  const variants = {
    primary:
      "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
    secondary:
      "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900",
  };

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]}`}>
        {children}
      </Link>
    );
  }

  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}