import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
}

type ButtonAsLinkProps = BaseButtonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsActionProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
    external?: never;
  };

type ButtonProps = ButtonAsLinkProps | ButtonAsActionProps;

const baseStyles =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",

  secondary: "bg-surface text-foreground hover:bg-border",

  outline:
    "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
};

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return typeof (props as ButtonAsLinkProps).href === "string";
}

function ArrowIcon({ external }: { external: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={
        external
          ? "shrink-0 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          : "shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
      }
    >
      {external ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const {
      href,
      external = false,
      children,
      variant = "primary",
      className = "",
      arrow = false,
    } = props;

    const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          {children}
          {arrow && <ArrowIcon external />}
        </a>
      );
    }

    return (
      <Link href={href} className={styles}>
        {children}
        {arrow && <ArrowIcon external={false} />}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    className = "",
    arrow = false,
    ...buttonProps
  } = props;

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button {...buttonProps} className={styles}>
      {children}
      {arrow && <ArrowIcon external={false} />}
    </button>
  );
}