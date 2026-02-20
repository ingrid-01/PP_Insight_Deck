import React, { useMemo } from "react";
import { Filter, PieChart } from "lucide-react";
import { useInsights } from "../../context/InsightContext";
import { useProfile } from "../../context/ProfileContext";
import { translations } from "../../lib/translations";

const Sidebar = () => {
  const { insights, filter, setFilter } = useInsights();
  const { lang } = useProfile();
  const t = translations[lang]?.sidebar || translations.en.sidebar;

  // Calculate Stats dynamically
  const stats = useMemo(() => {
    const total = insights.length;
    if (total === 0)
      return {
        nonfiction: 0,
        news: 0,
        movie: 0,
        media: 0,
        art: 0,
        fiction: 0,
        others: 0,
      };

    const counts = insights.reduce((acc, item) => {
      const cat = item.category || "others";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    // Convert to percentages
    const percentages = {};
    Object.keys(counts).forEach((key) => {
      percentages[key] = Math.round((counts[key] / total) * 100);
    });

    return { counts, percentages };
  }, [insights]);

  const categories = [
    {
      id: "nonfiction",
      label: t.labels.nonfiction,
      color: "bg-accent-nonfiction",
      text: "text-accent-nonfiction",
    },
    {
      id: "news",
      label: t.labels.news,
      color: "bg-accent-news",
      text: "text-accent-news",
    },
    {
      id: "movie",
      label: t.labels.movie,
      color: "bg-accent-movie",
      text: "text-accent-movie",
    },
    {
      id: "media",
      label: t.labels.media,
      color: "bg-accent-media",
      text: "text-accent-media",
    },
    {
      id: "art",
      label: t.labels.art,
      color: "bg-accent-art",
      text: "text-accent-art",
    },
    {
      id: "fiction",
      label: t.labels.fiction,
      color: "bg-accent-fiction",
      text: "text-text-muted",
    },
    {
      id: "others",
      label: t.labels.others,
      color: "bg-text-muted",
      text: "text-text-muted",
    },
  ];

  // Helper to safely get stats
  const getCount = (id) => stats.counts?.[id] || 0;
  const getPct = (id) => stats.percentages?.[id] || 0;

  // Calculate monthly stats
  const currentMonthCount = useMemo(() => {
    const now = new Date();
    return insights.filter((i) => {
      const d = new Date(i.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [insights]);

  return (
    <aside className="lg:col-span-3 space-y-8">
      {/* Knowledge Map Section */}
      <section className="bg-white rounded-3xl p-6 border border-border shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-lg dark:text-white">{t.myMap}</h2>
          <PieChart className="text-text-muted w-5 h-5 cursor-pointer hover:text-primary" />
        </div>

        {/* Progress Bar */}
        <div className="h-4 w-full rounded-full bg-background-section overflow-hidden flex mb-4 dark:bg-gray-700">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`h-full ${cat.color} transition-all duration-1000`}
              style={{ width: `${getPct(cat.id)}%` }}
            />
          ))}
        </div>

        {/* Legend / Stats Grid */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-center mb-6">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`size-2 rounded-full ${cat.color}`}></span>
                <span className="text-[10px] font-bold text-text-sub uppercase dark:text-gray-400">
                  {cat.label.slice(0, 7)}
                </span>
              </div>
              <span className={`text-xs font-black ${cat.text}`}>
                {getCount(cat.id)}
              </span>
            </div>
          ))}
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-5 dark:border-gray-700">
          <div className="text-center">
            <span className="block font-black text-2xl text-primary leading-tight dark:text-primary-light">
              {currentMonthCount}
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider dark:text-gray-500">
              {t.thisMonth}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-black text-2xl text-accent-dialogue leading-tight">
              0
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider dark:text-gray-500">
              {t.hub}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-black text-2xl text-text-main leading-tight dark:text-white">
              {insights.length}
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider dark:text-gray-500">
              {t.total}
            </span>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section>
        <h3 className="font-bold text-sm text-text-sub mb-4 flex items-center gap-2 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          Filter
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-white border border-border text-text-sub hover:text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:text-primary-light"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all ${
                filter === cat.id
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-sub hover:text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:text-primary-light"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
