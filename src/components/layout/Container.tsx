import type { ReactNode } from "react";

interface ContainerProps {
children: ReactNode;
className?: string;
}

export default function Container({
children,
className = "",
}: ContainerProps) {
return (
<div
className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}
>
{children} </div>
);
}
