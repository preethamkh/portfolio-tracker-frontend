import {
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export interface RoadmapItem {
  date: string;
  title: string;
  description: string;
  icon?: JSX.Element;
  status?: "done" | "in-progress" | "upcoming";
}

export const ROADMAP: RoadmapItem[] = [
  {
    date: "January 15, 2026",
    title: "Backend, Auth, Login, Registration, UI Setup",
    description: "Project structure, authentication, initial UI.",
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    status: "done",
  },
  {
    date: "January 26, 2026",
    title: "Portfolio Dashboard & Holdings Table",
    description: "Holdings table, portfolio overview.",
    // icon: <ChartBarIcon className="w-6 h-6 text-purple-500" />,
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    status: "done",
  },
  {
    date: "February 1, 2026",
    title: "Transactions & Analytics Features",
    description: "Transaction history, analytics.",
    icon: <ClockIcon className="w-6 h-6 text-blue-400" />,
    status: "upcoming",
  },
  {
    date: "February 8, 2026",
    title: "UI Polish, Bug Fixes, Documentation",
    description: "UI polish, bug fixes, tests, docs.",
    icon: <RocketLaunchIcon className="w-6 h-6 text-indigo-500" />,
    status: "upcoming",
  },
];
