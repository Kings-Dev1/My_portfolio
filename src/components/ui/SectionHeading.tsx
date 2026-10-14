interface SectionHeadingProps {
eyebrow?: string;
title: string;
description?: string;
className?: string;
}

export default function SectionHeading({
eyebrow,
title,
description,
className = "",
}: SectionHeadingProps) {
return (
<div className={`max-w-2xl ${className}`}>
{eyebrow && ( <p className="text-base font-semibold uppercase tracking-[0.22em] text-blue-500 sm:text-lg">
{eyebrow} </p>
)}


  <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
    {title}
  </h2>

  {description && (
    <p className="mt-6 text-sm leading-7 text-muted sm:text-base sm:leading-8">
      {description}
    </p>
  )}
</div>


);
}
