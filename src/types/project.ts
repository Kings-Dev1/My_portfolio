export type ProjectCategory =
| "web-development"
| "machine-learning"
| "healthcare-ai"
| "data-science";

export type ProjectStatus =
| "completed"
| "in-progress"
| "planned";

export interface Project {
id: string;
slug: string;
title: string;
description: string;
category: ProjectCategory;
technologies: string[];
status: ProjectStatus;
featured: boolean;
image?: string;
liveUrl?: string;
sourceUrl?: string;
}
