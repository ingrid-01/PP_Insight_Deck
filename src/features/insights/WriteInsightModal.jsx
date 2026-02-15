import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  MessageSquare,
  Zap,
  MessageCircle,
  Quote,
} from "lucide-react";
import { useInsights } from "../../context/InsightContext";

const WriteInsightModal = ({ isOpen, onClose, editingInsight = null }) => {
  const { createInsight, editInsight } = useInsights();
  const [formData, setFormData] = useState({
    title: "",
    category: "nonfiction",
    date: new Date().toISOString().split("T")[0],
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (editingInsight) {
      setFormData({
        title: editingInsight.title || "",
        category: editingInsight.category || "nonfiction",
        date: editingInsight.date || new Date().toISOString().split("T")[0],
        content: editingInsight.content || "",
        tags: editingInsight.tags ? editingInsight.tags.join(", ") : "",
      });
    } else {
      // Reset form
      setFormData({
        title: "",
        category: "nonfiction",
        date: new Date().toISOString().split("T")[0],
        content: "",
        tags: "",
      });
    }
  }, [editingInsight, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const insightData = {
      ...formData,
      tags: tagsArray,
      status: editingInsight ? editingInsight.status : "ready", // Default new to 'ready'
      subCategory: { en: formData.category, ko: "기타" }, // Simple mock for subcategory
    };

    if (editingInsight) {
      await editInsight(editingInsight.id, insightData);
    } else {
      await createInsight(insightData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 dark:bg-gray-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between dark:border-gray-700">
          <h3 className="font-black text-lg text-text-main dark:text-white">
            {editingInsight ? "Edit Insight" : "New Insight"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-text-muted hover:text-text-main hover:bg-background-hover rounded-full transition-all dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          id="insight-form"
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider dark:text-gray-400">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background-section border border-transparent rounded-xl text-sm font-bold text-text-main focus:outline-none focus:bg-white focus:border-primary transition-all dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600"
              >
                <option value="nonfiction">Non-Fiction</option>
                <option value="fiction">Fiction</option>
                <option value="news">News</option>
                <option value="movie">Movie</option>
                <option value="art">Art</option>
                <option value="media">Media</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider dark:text-gray-400">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background-section border border-transparent rounded-xl text-sm font-bold text-text-main focus:outline-none focus:bg-white focus:border-primary transition-all dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-sub uppercase tracking-wider dark:text-gray-400">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter insight title..."
              required
              className="w-full px-4 py-3 bg-background-section border border-transparent rounded-xl text-lg font-bold text-text-main placeholder:text-text-muted focus:outline-none focus:bg-white focus:border-primary transition-all dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-sub uppercase tracking-wider dark:text-gray-400">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What is your insight?"
              rows="5"
              className="w-full px-4 py-3 bg-background-section border border-transparent rounded-xl text-sm font-medium text-text-main placeholder:text-text-muted focus:outline-none focus:bg-white focus:border-primary transition-all resize-none dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600"
            ></textarea>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-sub uppercase tracking-wider dark:text-gray-400">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="productivity, psychology (comma separated)"
              className="w-full px-4 py-2.5 bg-background-section border border-transparent rounded-xl text-sm font-medium text-text-main placeholder:text-text-muted focus:outline-none focus:bg-white focus:border-primary transition-all dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-gray-50 flex items-center justify-end gap-3 dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-text-sub hover:bg-gray-200 transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md hover:bg-primary-dark transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Insight
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteInsightModal;
