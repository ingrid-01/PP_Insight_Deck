import React, { memo } from "react";
import {
  Edit,
  Trash2,
  Archive,
  Book,
  BookOpen,
  Newspaper,
  Film,
  Palette,
  PlayCircle,
  Sparkles,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const InsightCard = memo(({ data, onEdit, onDelete, onLog, onArchive }) => {
  const categoryConfig = {
    nonfiction: {
      icon: Book,
      badgeBg: "bg-accent-nonfiction/10",
      badgeText: "text-accent-nonfiction",
    },
    fiction: {
      icon: BookOpen,
      badgeBg: "bg-accent-fiction/10",
      badgeText: "text-accent-fiction",
    },
    news: {
      icon: Newspaper,
      badgeBg: "bg-accent-news/10",
      badgeText: "text-accent-news",
    },
    movie: {
      icon: Film,
      badgeBg: "bg-accent-movie/10",
      badgeText: "text-accent-movie",
    },
    art: {
      icon: Palette,
      badgeBg: "bg-accent-art/10",
      badgeText: "text-accent-art",
    },
    media: {
      icon: PlayCircle,
      badgeBg: "bg-accent-media/10",
      badgeText: "text-accent-media",
    },
    others: {
      icon: Sparkles,
      badgeBg: "bg-text-muted/10",
      badgeText: "text-text-muted",
    },
  };

  const config = categoryConfig[data.category] || categoryConfig.others;
  const Icon = config.icon;

  // Format date safely
  const formattedDate = data.date
    ? format(new Date(data.date), "MMM d, yyyy")
    : "";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow group mb-5 dark:bg-gray-800 dark:border-gray-700 relative flex flex-col h-full"
    >
      {/* Card Content */}
      <div onClick={() => onEdit(data)} className="cursor-pointer flex-1">
        {/* Header: Category & Date */}
        <div className="flex justify-between items-start mb-3">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.badgeBg} ${config.badgeText} text-[10px] font-black uppercase tracking-wider`}
          >
            <Icon className="w-3.5 h-3.5" />
            {data.subCategory?.en || data.category}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-text-muted mt-0.5 dark:text-gray-400">
              {formattedDate}
            </span>
            {/* Action Buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(data);
                }}
                className="text-gray-300 hover:text-primary transition-colors p-1"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(data);
                }}
                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-bold text-lg leading-snug mb-2 serif group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-primary-light">
          {data.title}
        </h4>

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-text-sub dark:bg-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content Preview */}
        <p className="text-sm text-text-sub font-medium leading-relaxed mb-4 line-clamp-3 dark:text-gray-300">
          "{data.content}"
        </p>

        {/* Reflection Preview */}
        {data.reflect && (
          <div className="bg-accent-dialogue/10 p-3 rounded-xl mb-2 dark:bg-gray-700">
            <p className="text-xs text-text-main line-clamp-2 dark:text-gray-200">
              <span className="font-bold text-accent-dialogue mr-1">
                REFLECT:
              </span>
              {data.reflect}
            </p>
          </div>
        )}
        {data.action && (
          <div className="bg-accent-action/10 p-3 rounded-xl mb-2 dark:bg-gray-700">
            <p className="text-xs text-text-main line-clamp-2 dark:text-gray-200">
              <span className="font-bold text-green-700 mr-1">ACTION:</span>
              {data.action}
            </p>
          </div>
        )}
        {data.dialogue && (
          <div className="bg-primary/10 p-3 rounded-xl mb-2 dark:bg-gray-700">
            <p className="text-xs text-text-main line-clamp-2 dark:text-gray-200">
              <span className="font-bold text-primary mr-1">DIALOGUE:</span>
              {data.dialogue}
            </p>
          </div>
        )}
        {data.discussionTopic && (
          <div className="bg-accent-news/10 p-3 rounded-xl mb-2 dark:bg-gray-700">
            <p className="text-xs text-text-main line-clamp-2 dark:text-gray-200">
              <span className="font-bold text-accent-news mr-1">TOPIC:</span>
              {data.discussionTopic}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-3 pt-3 border-t border-border border-dashed dark:border-gray-700">
        <div
          className={`grid ${data.status === "logged" ? "grid-cols-2" : "grid-cols-1"} gap-2`}
        >
          <button
            onClick={() => onLog(data)}
            className="py-2 rounded-xl border border-dashed border-border text-text-sub text-xs font-bold flex items-center justify-center gap-2 hover:bg-background-hover hover:border-primary-light hover:text-primary transition-all dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-light"
          >
            <PlusCircle className="w-4 h-4" /> Log
          </button>

          {data.status === "logged" && (
            <button
              onClick={() => onArchive(data)}
              className="w-full py-2 rounded-xl bg-accent-nonfiction/10 text-accent-nonfiction text-xs font-bold hover:bg-accent-nonfiction hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Archive className="w-4 h-4" /> Archive
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
});

export default InsightCard;
