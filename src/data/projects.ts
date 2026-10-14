import type { Project } from "@/types/project";

export const projects: Project[] = [
{
id: "clinical-voice-emr",
slug: "clinical-voice-to-emr",
title: "Clinical Voice-to-EMR Companion",
description:
"A voice-to-text companion designed to help clinicians transfer dictated clinical information into existing electronic medical record systems.",
category: "healthcare-ai",
technologies: ["React", "TypeScript", "Node.js", "Electron"],
status: "in-progress",
featured: true,
},
{
id: "machine-learning-lab",
slug: "machine-learning-experiments",
title: "Machine Learning Experiments",
description:
"A collection of practical experiments exploring data preprocessing, classification models, model evaluation, and predictive analytics with Python.",
category: "machine-learning",
technologies: ["Python", "Pandas", "NumPy", "scikit-learn"],
status: "in-progress",
featured: true,
},
];
