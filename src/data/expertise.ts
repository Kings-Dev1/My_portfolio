export interface ExpertiseArea {
id: string;
number: string;
title: string;
description: string;
technologies?: string[];
}

export const expertiseAreas: ExpertiseArea[] = [
{
id: "medicine",
number: "01",
title: "Medicine",
description:
"Medical training, evidence-based practice, clinical reasoning, and an interest in improving healthcare delivery.",
},
{
id: "software-development",
number: "02",
title: "Software Development",
description:
"Developing responsive web applications with JavaScript, TypeScript, React, Next.js, and modern frontend technologies.",
technologies: ["React", "Next.js", "TypeScript", "JavaScript"],
},
{
id: "artificial-intelligence",
number: "03",
title: "AI & Machine Learning",
description:
"Learning data science and machine learning through Python, statistical analysis, data visualization, and predictive modelling.",
technologies: [
"Python",
"NumPy",
"Pandas",
"Matplotlib",
"scikit-learn",
"Seaborn",
],
},
{
id: "entrepreneurship",
number: "04",
title: "Entrepreneurship",
description:
"Co-founding a business, evaluating opportunities, and exploring how technology can create sustainable value.",
},
];
