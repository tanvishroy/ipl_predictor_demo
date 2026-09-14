import React from 'react';
import { AlertTriangle, ServerOff, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  isNetworkError?: boolean;
  onRetry?: () => void;
  onOpenGuide?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  isNetworkError = false,
  onRetry,
  onOpenGuide
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <div className={`rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all shadow-xl ${
        isNetworkError 
          ? 'bg-rose-950/70 border-rose-500/40 text-rose-200' 
          : 'bg-amber-950/70 border-amber-500/40 text-amber-200'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isNetworkError ? 'bg-rose-900/60 text-rose-400' : 'bg-amber-900/60 text-amber-400'}`}>
            {isNetworkError ? <ServerOff className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              {isNetworkError ? 'Backend Server Connection Error' : 'Prediction Error'}
            </h3>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-200 font-normal">
              {error}
            </p>

            {isNetworkError && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Quick Server Check:
                </div>
                <div className="text-slate-400 mb-2">
                  Make sure your Flask server is listening at: <code className="text-emerald-400 font-bold">http://127.0.0.1:5000/predict</code>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Flask app running
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> flask-cors enabled
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Model loaded
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry Request
                </button>
              )}

              {onOpenGuide && (
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all border border-slate-700"
                >
                  View Backend Setup Instructions
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
