import React, { useMemo } from "react";
import { useInsights } from "../../context/InsightContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { BarChart as BarChartIcon, Activity } from "lucide-react";
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const Statistics = () => {
  const { insights } = useInsights();

  // --- Category Stats (Pie Chart) ---
  const categoryData = useMemo(() => {
    const counts = {};
    const categories = [
      "nonfiction",
      "fiction",
      "news",
      "movie",
      "art",
      "media",
      "others",
    ];

    categories.forEach((cat) => (counts[cat] = 0));
    insights.forEach((item) => {
      const cat = item.category || "others";
      if (counts[cat] !== undefined) counts[cat]++;
      else counts["others"]++; // Fallback
    });

    return {
      labels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
      datasets: [
        {
          data: categories.map((c) => counts[c]),
          backgroundColor: [
            "#8B5CF6", // nonfiction (purple)
            "#EC4899", // fiction (pink)
            "#3B82F6", // news (blue)
            "#F59E0B", // movie (amber)
            "#10B981", // art (emerald)
            "#6366F1", // media (indigo)
            "#9CA3AF", // others (gray)
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [insights]);

  // --- Monthly Activity (Bar Chart) ---
  const activityData = useMemo(() => {
    // Group by last 6 months
    const labels = [];
    const data = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = format(d, "MMM yyyy");
      labels.push(monthKey);

      const count = insights.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === d.getMonth() &&
          itemDate.getFullYear() === d.getFullYear()
        );
      }).length;
      data.push(count);
    }

    return {
      labels,
      datasets: [
        {
          label: "Insights Added",
          data,
          backgroundColor: "#F97316", // Orange
          borderRadius: 6,
        },
      ],
    };
  }, [insights]);

  // --- Heatmap Data (Last 365 days) ---
  const heatmapData = useMemo(() => {
    const today = new Date();
    const startDate = subDays(today, 364); // Approx 1 year
    const days = eachDayOfInterval({ start: startDate, end: today });

    return days.map((day) => {
      const count = insights.filter((item) =>
        isSameDay(new Date(item.date), day),
      ).length;
      let level = "bg-gray-100 dark:bg-gray-800"; // 0
      if (count >= 1) level = "bg-orange-200 dark:bg-orange-900/30";
      if (count >= 3) level = "bg-orange-400 dark:bg-orange-700/50";
      if (count >= 5) level = "bg-orange-600 dark:bg-orange-600";

      return { date: day, level, count };
    });
  }, [insights]);

  return (
    <div className="lg:col-span-9 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-border shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <BarChartIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-main dark:text-white">
              Statistics
            </h2>
            <p className="text-text-sub font-medium dark:text-gray-400">
              Visualize your intellectual diet.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Category Breakdown */}
          <div className="p-4 border border-border rounded-2xl dark:border-gray-700 flex flex-col items-center">
            <h3 className="text-sm font-bold text-text-muted uppercase mb-4">
              By Category
            </h3>
            <div className="w-48 h-48">
              <Pie
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="p-4 border border-border rounded-2xl dark:border-gray-700">
            <h3 className="text-sm font-bold text-text-muted uppercase mb-4">
              Monthly Activity
            </h3>
            <div className="h-48">
              <Bar
                data={activityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-3xl p-8 border border-border shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-accent-dialogue" />
          <h3 className="font-black text-lg text-text-main dark:text-white">
            Yearly Activity
          </h3>
        </div>

        <div className="flex flex-wrap gap-1">
          {heatmapData.map((day, i) => (
            <div
              key={i}
              className={`size-3 rounded-sm ${day.level}`}
              title={`${format(day.date, "MMM d")}: ${day.count} insights`}
            ></div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-text-muted font-bold uppercase">
          <span>Less</span>
          <div className="size-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
          <div className="size-3 bg-orange-200 dark:bg-orange-900/30 rounded-sm"></div>
          <div className="size-3 bg-orange-400 dark:bg-orange-700/50 rounded-sm"></div>
          <div className="size-3 bg-orange-600 dark:bg-orange-600 rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
