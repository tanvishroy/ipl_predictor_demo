import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TeamSelector } from './components/TeamSelector';
import { PredictionResultCard } from './components/PredictionResultCard';
import { ErrorAlert } from './components/ErrorAlert';
import { BackendGuideModal } from './components/BackendGuideModal';
import { TeamComparison } from './components/TeamComparison';
import { RecentPredictions } from './components/RecentPredictions';
import { getTeamByCode } from './data/teams';
import { predictMatchWinner, pingBackend } from './services/api';
import { PredictionHistoryItem } from './types/ipl';
import { Trophy, Loader2, AlertCircle, Sparkles, Flame, ShieldAlert } from 'lucide-react';

export function App() {
  // Team selections
  const [team1Code, setTeam1Code] = useState<string>('CSK');
  const [team2Code, setTeam2Code] = useState<string>('MI');

  // Application state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [winnerResult, setWinnerResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Backend status check
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Local storage history
  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ipl_predictions_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Check backend server status on mount
  const checkServerStatus = useCallback(async () => {
    const isAlive = await pingBackend();
    setIsBackendConnected(isAlive);
  }, []);

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 10000);
    return () => clearInterval(interval);
  }, [checkServerStatus]);

  // Handle Team 1 selection
  const handleSelectTeam1 = (code: string) => {
    setTeam1Code(code);
    setValidationError(null);
    setErrorMessage(null);
  };

  // Handle Team 2 selection
  const handleSelectTeam2 = (code: string) => {
    setTeam2Code(code);
    setValidationError(null);
    setErrorMessage(null);
  };

  // Swap teams
  const handleSwapTeams = () => {
    setTeam1Code(team2Code);
    setTeam2Code(team1Code);
    setValidationError(null);
    setErrorMessage(null);
  };

  // Form submit prediction handler
  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Reset previous errors and results
    setValidationError(null);
    setErrorMessage(null);
    setIsNetworkError(false);
    setWinnerResult(null);

    // 2. Validate selection
    if (!team1Code) {
      setValidationError('Please select Team 1 before predicting.');
      return;
    }

    if (!team2Code) {
      setValidationError('Please select Team 2 before predicting.');
      return;
    }

    if (team1Code.toUpperCase() === team2Code.toUpperCase()) {
      setValidationError('Please select two different teams. Team 1 and Team 2 cannot be the same team.');
      return;
    }

    // 3. Trigger loading state
    setIsLoading(true);

    try {
      // 4. Send request to Flask API (http://127.0.0.1:5000/predict)
      const res = await predictMatchWinner(team1Code, team2Code);

      if (res.success) {
        setWinnerResult(res.winner);
        setIsBackendConnected(true);

        // Save to history log
        const t1Obj = getTeamByCode(team1Code);
        const t2Obj = getTeamByCode(team2Code);
        const wObj = getTeamByCode(res.winner);

        const newHistoryItem: PredictionHistoryItem = {
          id: Date.now().toString(),
          team1Code: team1Code as any,
          team2Code: team2Code as any,
          winnerCode: res.winner,
          winnerName: wObj ? wObj.name : res.winner,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setHistory((prev) => {
          const updated = [newHistoryItem, ...prev.slice(0, 5)];
          try {
            localStorage.setItem('ipl_predictions_history', JSON.stringify(updated));
          } catch (err) {
            console.error('Failed to save prediction to history', err);
          }
          return updated;
        });

      } else {
        setErrorMessage(res.error);
        setIsNetworkError(!!res.isNetworkError);
        if (res.isNetworkError) {
          setIsBackendConnected(false);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during prediction.');
      setIsNetworkError(true);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const team1Obj = getTeamByCode(team1Code);
  const team2Obj = getTeamByCode(team2Code);

  return (
    <div className="min-h-screen stadium-bg stadium-grid text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-300">
      
      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 flex-1 flex flex-col items-center">
        
        {/* HEADER SECTION */}
        <Header 
          isBackendConnected={isBackendConnected} 
          onOpenGuide={() => setIsGuideOpen(true)} 
        />

        {/* PREDICTION FORM & SELECTORS */}
        <form onSubmit={handlePredict} className="w-full max-w-4xl mt-2 space-y-6">
          
          {/* Team Selectors Component */}
          <TeamSelector
            team1Code={team1Code}
            team2Code={team2Code}
            onSelectTeam1={handleSelectTeam1}
            onSelectTeam2={handleSelectTeam2}
            onSwapTeams={handleSwapTeams}
            isLoading={isLoading}
          />

          {/* INLINE VALIDATION WARNING */}
          {validationError && (
            <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-sm font-medium flex items-center gap-3 shadow-lg animate-shake">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* PREDICT BUTTON */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="relative group w-full sm:w-80 py-4 px-8 rounded-2xl font-heading text-2xl font-bold uppercase tracking-wider text-slate-950 transition-all duration-300 shadow-2xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: isLoading 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                  : 'linear-gradient(135deg, #fbbf24, #f59e0b, #ea580c)',
                boxShadow: '0 10px 35px -5px rgba(245, 158, 11, 0.4)'
              }}
            >
              {/* Button Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
                    <span>Predicting...</span>
                  </>
                ) : (
                  <>
                    <Trophy className="w-6 h-6 text-slate-950 fill-slate-950 group-hover:scale-110 transition-transform" />
                    <span>Predict Winner</span>
                    <Sparkles className="w-5 h-5 text-slate-950 opacity-80" />
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        {/* ERROR DISPLAY SECTION */}
        {errorMessage && (
          <ErrorAlert
            error={errorMessage}
            isNetworkError={isNetworkError}
            onRetry={() => handlePredict({ preventDefault: () => {} } as React.FormEvent)}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {/* PROMINENT PREDICTION RESULT CARD */}
        {winnerResult && (
          <PredictionResultCard
            winnerCodeOrName={winnerResult}
            team1={team1Obj}
            team2={team2Obj}
            onReset={() => {
              setWinnerResult(null);
              setErrorMessage(null);
            }}
          />
        )}

        {/* TEAM HEAD-TO-HEAD COMPARISON */}
        {team1Obj && team2Obj && team1Code !== team2Code && (
          <TeamComparison team1={team1Obj} team2={team2Obj} />
        )}

        {/* RECENT PREDICTIONS HISTORY */}
        <RecentPredictions
          history={history}
          onClearHistory={() => {
            setHistory([]);
            localStorage.removeItem('ipl_predictions_history');
          }}
          onSelectPair={(t1, t2) => {
            setTeam1Code(t1);
            setTeam2Code(t2);
            setWinnerResult(null);
            setErrorMessage(null);
          }}
        />

      </main>

      {/* FOOTER */}
      <footer className="w-full mt-12 py-6 border-t border-slate-800/80 bg-slate-950/80 text-center text-xs text-slate-400 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="font-heading text-base font-bold text-white uppercase tracking-wider">
              IPL Match Winner Predictor
            </span>
          </div>

          <p className="text-slate-400">
            Communicating directly with existing Flask ML API at <code className="text-emerald-400 font-mono">http://127.0.0.1:5000/predict</code>
          </p>

          <button
            onClick={() => setIsGuideOpen(true)}
            className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
          >
            Setup Guide
          </button>
        </div>
      </footer>

      {/* BACKEND SETUP GUIDE MODAL */}
      <BackendGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

export default App;
