import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { InsightProvider, useInsights } from "./context/InsightContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import WriteInsightModal from "./features/insights/WriteInsightModal";
import Login from "./features/auth/Login";
import { Loader2 } from "lucide-react";
import Archive from "./features/archive/Archive";
import { Toaster } from "react-hot-toast";

// Placeholder components for other routes

import Statistics from "./features/stats/Statistics";

// Component to handle Modal visibility and Main Layout
const AppContent = () => {
  const { isWriteModalOpen, closeWriteModal, editingInsight } = useInsights();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/20 selection:text-primary dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Work in Progress Banner */}
      <div className="w-full bg-gray-900 text-white/90 text-[10px] md:text-xs font-bold text-center py-1.5 z-[60] relative">
        🚧 v2.0 (Phase 2: Alpha) &nbsp;|&nbsp; 🚀 Connected to Cloud
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content Area */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Sidebar (Right side on desktop, stacked on mobile) */}
          <Sidebar />
        </div>
      </main>

      {/* Global Modals */}
      <WriteInsightModal
        isOpen={isWriteModalOpen}
        onClose={closeWriteModal}
        editingInsight={editingInsight}
      />
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <InsightProvider>
        <Router>
          <AppContent />
        </Router>
      </InsightProvider>
    </AuthProvider>
  );
}

export default App;
