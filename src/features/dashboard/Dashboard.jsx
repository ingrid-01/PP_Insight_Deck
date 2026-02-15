import React, { useState } from "react";
import { useInsights } from "../../context/InsightContext";
import InsightCard from "../insights/InsightCard";
import { Loader2, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LogInsightModal from "../insights/LogInsightModal";

const Dashboard = () => {
  const {
    insights,
    filter,
    loading,
    removeInsight,
    openEditModal,
    editInsight,
  } = useInsights();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [loggingInsight, setLoggingInsight] = useState(null);

  // Handlers (using Context)
  const handleEdit = (item) => {
    openEditModal(item);
  };

  const handleDelete = (item) => {
    if (confirm("Delete this insight?")) {
      removeInsight(item.id);
    }
  };

  const handleLog = (item) => {
    setLoggingInsight(item);
    setIsLogModalOpen(true);
  };

  const handleSaveLog = (id, updates) => {
    editInsight(id, updates);
  };

  const handleArchive = (item) => {
    editInsight(item.id, { status: "internalized" });
  };

  if (loading) {
    return (
      <div className="lg:col-span-9 flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Filter Logic
  const filteredInsights = insights.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const readyInsights = filteredInsights.filter((i) => i.status === "ready");
  const loggedInsights = filteredInsights.filter((i) => i.status === "logged");

  return (
    <div className="lg:col-span-9 space-y-8">
      <DailyReflection insights={insights} onSaveLog={handleSaveLog} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Ready Zone */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg flex items-center gap-2 dark:text-white">
              <span className="size-2.5 rounded-full bg-accent-dialogue"></span>
              Ready
            </h3>
            <span className="text-xs font-bold text-text-muted bg-background-section px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-400">
              {readyInsights.length}
            </span>
          </div>

          <div>
            <AnimatePresence mode="popLayout">
              {readyInsights.map((item) => (
                <InsightCard
                  key={item.id}
                  data={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onLog={handleLog}
                  onArchive={handleArchive}
                />
              ))}
            </AnimatePresence>
            {readyInsights.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-text-muted text-sm italic border-2 border-dashed border-border rounded-2xl"
              >
                No insights ready.
              </motion.div>
            )}
          </div>
        </section>

        {/* Logged Zone */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg flex items-center gap-2 dark:text-white">
              <span className="size-2.5 rounded-full bg-primary"></span>
              Logged
            </h3>
            <span className="text-xs font-bold text-text-muted bg-background-section px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-400">
              {loggedInsights.length}
            </span>
          </div>

          <div>
            <AnimatePresence mode="popLayout">
              {loggedInsights.map((item) => (
                <InsightCard
                  key={item.id}
                  data={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onLog={handleLog}
                  onArchive={handleArchive}
                />
              ))}
            </AnimatePresence>
            {loggedInsights.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-text-muted text-sm italic border-2 border-dashed border-border rounded-2xl"
              >
                No logs yet.
              </motion.div>
            )}
          </div>
        </section>

        {/* Internalized / Daily Reflection Zone */}
        <section className="space-y-5">
          <div className="flex items-center justify-between opacity-50">
            <h3 className="font-black text-lg flex items-center gap-2 dark:text-white">
              <span className="size-2.5 rounded-full bg-accent-nonfiction"></span>
              Internalized
            </h3>
          </div>

          <div className="text-center py-10 text-text-muted text-sm italic border-2 border-dashed border-border rounded-2xl opacity-50">
            Insights in Archive
          </div>
        </section>
      </div>

      <LogInsightModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        insight={loggingInsight}
        onSave={handleSaveLog}
      />
    </div>
  );
};

// Daily Reflection Component
const DailyReflection = ({ insights, onSaveLog }) => {
  const [question, setQuestion] = useState("");
  const [targetInsight, setTargetInsight] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const questions = [
    "Is this thought still valid, or does it need updating?",
    "How much have you grown since you wrote this?",
    "How can you apply this insight to your life today?",
    "How does your emotion now compare to back then?",
    "What was the biggest takeaway from this record?",
    "What advice would you give to your past self?",
  ];

  // Initialize on mount
  React.useEffect(() => {
    refreshDaily();
  }, [insights]);

  const refreshDaily = () => {
    if (insights.length === 0) return;
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setTargetInsight(randomInsight);
    setQuestion(randomQuestion);
    setAnswer("");
  };

  const handleSave = () => {
    if (!answer.trim() || !targetInsight) return;
    setLoading(true);

    // Create new reflection log
    const today = new Date().toLocaleDateString();
    const newLog = `\n\n[Reflect: ${today}]\nQ: ${question}\nA: ${answer}`;

    const updatedReflect = (targetInsight.reflect || "") + newLog;

    onSaveLog(targetInsight.id, {
      reflect: updatedReflect,
      status: "logged",
    });

    setLoading(false);
    setAnswer("");
    // Optional: Refresh after save or show success
    alert("Reflection added!");
    refreshDaily();
  };

  if (insights.length === 0) return null;
  if (!targetInsight) return null;

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="font-bold mb-1 opacity-90 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
          <Lightbulb className="w-4 h-4" /> Today's Question
        </h4>
        <h3 className="text-xl font-black mb-4 leading-tight">"{question}"</h3>

        <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm text-left">
          <p className="text-xs opacity-70 mb-1">
            {targetInsight.date} • {targetInsight.title}
          </p>
          <p className="text-sm font-medium line-clamp-2 italic">
            "{targetInsight.content}"
          </p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full bg-white/20 border-none placeholder-white/50 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-white/50 mb-3 resize-none h-20"
        />

        <div className="flex justify-center gap-2">
          <button
            onClick={refreshDaily}
            className="px-4 py-2 rounded-full text-xs font-bold text-white/70 hover:bg-white/10 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={!answer.trim() || loading}
            className="bg-white text-primary px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Reflection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
