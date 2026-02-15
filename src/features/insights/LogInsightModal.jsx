import React, { useState } from "react";
import {
  MessageSquare,
  Zap,
  MessageCircle,
  Quote,
  X,
  ArrowLeft,
  Check,
} from "lucide-react";

const LOG_TYPES = {
  reflect: {
    id: "reflect",
    label: "Self-Reflection",
    icon: MessageSquare,
    color: "text-accent-dialogue",
    bg: "bg-accent-dialogue/10",
    placeholder:
      "How does this relate to your current situation or experience?",
    ko: "자기 투영",
  },
  action: {
    id: "action",
    label: "Action Item",
    icon: Zap,
    color: "text-accent-action",
    bg: "bg-accent-action/10", // Note: Define text-accent-action color if missing or use generic
    placeholder: "What immediate action can you take?",
    ko: "실천 과제",
  },
  dialogue: {
    id: "dialogue",
    label: "Dialogue Log",
    icon: MessageCircle,
    color: "text-primary",
    bg: "bg-primary/10",
    placeholder: "Record key points from conversations.",
    ko: "대화 로그",
  },
  topic: {
    id: "discussionTopic", // Mapping to data field name 'discussionTopic'
    label: "Discussion Topic",
    icon: Quote,
    color: "text-accent-news",
    bg: "bg-accent-news/10",
    placeholder: "Pose a question to discuss.",
    ko: "토론 주제",
  },
};

const LogInsightModal = ({ isOpen, onClose, insight, onSave }) => {
  const [step, setStep] = useState("select"); // 'select' or 'input'
  const [selectedType, setSelectedType] = useState(null);
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSelect = (typeId) => {
    setSelectedType(LOG_TYPES[typeId]);
    // Pre-fill if data exists
    const fieldName = LOG_TYPES[typeId].id;
    setContent(insight[fieldName] || "");
    setStep("input");
  };

  const handleSave = () => {
    onSave(insight.id, {
      [selectedType.id]: content,
      status: "logged", // Automatically move to logged
    });
    handleClose();
  };

  const handleClose = () => {
    setStep("select");
    setSelectedType(null);
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            {step === "input" && (
              <button
                onClick={() => setStep("select")}
                className="mr-2 hover:bg-gray-200 p-1 rounded-full transition-colors dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <h2 className="font-black text-xl text-gray-800 dark:text-white">
              {step === "select" ? "Add Log" : selectedType.label}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === "select" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(LOG_TYPES).map((key) => {
                const type = LOG_TYPES[key];
                const Icon = type.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 hover:border-primary/50 hover:bg-gray-50 transition-all group dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <div
                      className={`p-4 rounded-full ${type.bg} mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-8 h-8 ${type.color}`} />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`flex items-start gap-4 p-4 rounded-2xl ${selectedType.bg}`}
              >
                <selectedType.icon
                  className={`w-6 h-6 ${selectedType.color} mt-1`}
                />
                <div>
                  <h4
                    className={`font-bold text-sm ${selectedType.color} mb-1`}
                  >
                    {selectedType.label}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 opacity-80">
                    {selectedType.placeholder}
                  </p>
                </div>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your reflection here..."
                className="w-full h-40 p-4 rounded-xl border-gray-200 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                autoFocus
              ></textarea>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "input" && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" /> Save Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInsightModal;
