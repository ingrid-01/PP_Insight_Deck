import React from "react";
import { useAuth } from "../../context/AuthContext";
import { PlayCircle } from "lucide-react";

const Login = () => {
  const { login, loginAsGuest } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center dark:bg-gray-800 border border-border dark:border-gray-700">
        <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 hover:rotate-6 transition-transform">
          <span className="material-symbols-outlined text-white text-4xl">
            style
          </span>
        </div>

        <h1 className="text-3xl font-black text-text-main mb-2 dark:text-white">
          Insight Deck
        </h1>
        <p className="text-text-sub font-medium mb-8 dark:text-gray-400">
          Your personal space for capturing, curating, and internalizing wisdom.
        </p>

        <div className="space-y-4">
          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-6 py-3 text-text-main font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          <button
            onClick={loginAsGuest}
            className="w-full flex items-center justify-center gap-2 text-text-sub text-sm font-bold hover:text-primary transition-colors mt-4"
          >
            Continue as Guest (Local Only)
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-text-muted">
            v1.0.0 • Built with React & Firebase
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
