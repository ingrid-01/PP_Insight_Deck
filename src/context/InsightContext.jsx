import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getInsights,
  addInsight,
  updateInsight,
  deleteInsight,
} from "../services/insightService";
import { useAuth } from "./AuthContext";

import { toast } from "react-hot-toast";

const InsightContext = createContext();

export const useInsights = () => useContext(InsightContext);

export const InsightProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [insights, setInsights] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);

  // Load insights when user changes
  useEffect(() => {
    const loadJava = async () => {
      setLoading(true);
      // If user is null, getInsights acts as local storage fallback (first arg uid is null)
      // If user is present, it fetches from Cloud
      const uid = user ? user.uid : null;
      const data = await getInsights(uid);
      setInsights(data);
      setLoading(false);
    };
    loadJava();
  }, [user]);

  const createInsight = async (newInsight) => {
    try {
      const uid = user ? user.uid : null;
      const saved = await addInsight(newInsight, uid);
      setInsights((prev) => [saved, ...prev]);
      toast.success("Insight captured!");
      return saved;
    } catch (error) {
      toast.error("Failed to save insight.");
      console.error(error);
    }
  };

  const editInsight = async (id, updates) => {
    try {
      const uid = user ? user.uid : null;
      await updateInsight(id, updates, uid);
      setInsights((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
      toast.success("Insight updated.");
    } catch (error) {
      toast.error("Failed to update insight.");
      console.error(error);
    }
  };

  const removeInsight = async (id) => {
    try {
      const uid = user ? user.uid : null;
      await deleteInsight(id, uid);
      setInsights((prev) => prev.filter((item) => item.id !== id));
      toast.success("Insight deleted.");
    } catch (error) {
      toast.error("Failed to delete insight.");
      console.error(error);
    }
  };

  const openCreateModal = () => {
    setEditingInsight(null);
    setIsWriteModalOpen(true);
  };

  const openEditModal = (insight) => {
    setEditingInsight(insight);
    setIsWriteModalOpen(true);
  };

  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
    setEditingInsight(null);
  };

  return (
    <InsightContext.Provider
      value={{
        insights,
        filter,
        setFilter,
        loading,
        createInsight,
        editInsight,
        removeInsight,
        isWriteModalOpen,
        openCreateModal,
        openEditModal,
        closeWriteModal,
        editingInsight,
      }}
    >
      {children}
    </InsightContext.Provider>
  );
};
