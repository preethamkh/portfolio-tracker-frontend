import { ReactNode } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

interface RoadmapItem {
  week: string;
  date: string;
  title: string;
  description: string;
  icon: ReactNode;
  status: "upcoming" | "in-progress" | "done";
}

interface RoadmapTimelineProps {
  weekDates: string[];
  condensed?: boolean;
}

const roadmap: (weekDates: string[]) => RoadmapItem[] = (weekDates) => [
  {
    week: "Week 1",
    date: weekDates[0],
    title: "Interactive Features",
    description:
      "External API Integration, Transaction management, security search, live price integration, expandable history.",
    icon: <ClockIcon className="w-6 h-6 text-blue-400" />,
    status: "in-progress",
  },
  {
    week: "Week 2",
    date: weekDates[1],
    title: "Polish & Testing",
    description:
      "Edit/delete transactions, advanced validation, component unit/integration tests, performance.",
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    status: "upcoming",
  },
  {
    week: "Week 3",
    date: weekDates[2],
    title: "Updated Docs",
    description:
      "Railway/Vercel deployment, environment config to switch between stacks, documentation, architecture diagrams.",
    icon: <RocketLaunchIcon className="w-6 h-6 text-indigo-500" />,
    status: "upcoming",
  },
  {
    week: "Week 4+",
    date: weekDates[3] + "+",
    title: "Enhancements",
    description:
      "Analytics, multi-portfolio, dividends, snapshots, export, dark mode, E2E tests.",
    icon: <ChartBarIcon className="w-6 h-6 text-purple-500" />,
    status: "upcoming",
  },
];

export function RoadmapTimeline({
  weekDates,
  condensed,
}: RoadmapTimelineProps) {
  const items = roadmap(weekDates);
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        🚀 What's Coming Next
      </h2>
      <ul className="relative border-l-2 border-indigo-200 pl-4 space-y-6">
        {items.map((item) => (
          <li key={item.week} className="flex items-start gap-4 group">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white border-2 border-indigo-200 rounded-full shadow group-hover:scale-105 transition-transform">
              {item.icon}
            </span>
            <div className="ml-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-indigo-600 text-base">
                  {item.week}
                </span>
                <span className="text-xs text-slate-400">({item.date})</span>
                {item.status === "in-progress" && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                    In Progress
                  </span>
                )}
                {item.status === "done" && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">
                    Complete
                  </span>
                )}
              </div>
              <div className="font-semibold text-slate-800">{item.title}</div>
              {!condensed && (
                <div className="text-slate-600 text-sm mt-1">
                  {item.description}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
