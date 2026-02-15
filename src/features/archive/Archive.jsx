import React, { useMemo } from "react";
import { useInsights } from "../../context/InsightContext";
import InsightCard from "../insights/InsightCard";
import { Archive as ArchiveIcon, Calendar, Filter } from "lucide-react";
import { format } from "date-fns";

const Archive = () => {
  const { insights } = useInsights();

  // Filter for internalized status
  const archivedInsights = useMemo(() => {
    return insights.filter((item) => item.status === "internalized");
  }, [insights]);

  // Group by Month/Year
  const groupedInsights = useMemo(() => {
    const groups = {};
    archivedInsights.forEach((insight) => {
      const date = new Date(insight.date);
      const key = format(date, "MMMM yyyy"); // e.g., "February 2025"
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(insight);
    });
    return groups;
  }, [archivedInsights]);

  return (
    <div className="lg:col-span-9 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-border shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 bg-accent-nonfiction/10 rounded-2xl flex items-center justify-center text-accent-nonfiction">
            <ArchiveIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-main dark:text-white">
              Archive
            </h2>
            <p className="text-text-sub font-medium dark:text-gray-400">
              Your internalized wisdom timeline.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12 dark:border-gray-700">
        {Object.keys(groupedInsights).length === 0 ? (
          <div className="pl-8 py-4">
            <p className="text-text-muted italic">
              No archived insights yet. Log and internalize some insights from
              the Dashboard!
            </p>
          </div>
        ) : (
          Object.keys(groupedInsights).map((month) => (
            <div key={month} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 size-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 shadow-sm"></div>

              {/* Month Header */}
              <h3 className="text-lg font-black text-text-main mb-6 flex items-center gap-2 dark:text-white">
                <Calendar className="w-4 h-4 text-text-muted" />
                {month}
              </h3>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedInsights[month].map((item) => (
                  <InsightCard
                    key={item.id}
                    data={item}
                    // Read-only view for archive usually, or minimal actions
                    onEdit={() => {}} // Disable edit for now or enable if needed
                    onDelete={() => {}}
                    onLog={() => {}}
                    onArchive={() => {}}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Archive;
