import React from 'react';
import { X, Terminal, Code, CheckCircle, Copy, ExternalLink, Zap } from 'lucide-react';

interface BackendGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendGuideModal: React.FC<BackendGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const sampleBackendCode = `from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for local React dev (http://localhost:5173)

# Load your existing trained ML model
# model = joblib.load('ipl_winner_model.pkl')

VALID_TEAMS = {'CSK', 'RCB', 'MI', 'RR', 'KKR', 'PBKS', 'SRH', 'DC', 'LSG', 'GT'}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json() or {}
    team1 = str(data.get('team1', '')).upper()
    team2 = str(data.get('team2', '')).upper()
    
    if not team1 or not team2:
        return jsonify({'error': 'Both team1 and team2 are required.'}), 400
        
    if team1 not in VALID_TEAMS or team2 not in VALID_TEAMS:
        return jsonify({'error': 'Invalid team code.'}), 400
        
    if team1 == team2:
        return jsonify({'error': 'Team 1 and Team 2 must be different.'}), 400
        
    # Use ML model to predict winner...
    # winner = model.predict([[team1, team2]])[0]
    winner = team1  # Example return code

    return jsonify({'winner': winner})

if __name__ == '__main__':
    app.run(port=5000, debug=True)`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleBackendCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading tracking-wide uppercase">
                Backend Integration Guide
              </h2>
              <p className="text-xs text-slate-400">
                Running Flask & React locally on <code className="text-emerald-400">http://127.0.0.1:5000</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 text-sm text-slate-300">
          {/* Step 1: Start Flask */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">1</span>
              Start your Python Flask Backend
            </h3>
            <p className="text-xs text-slate-400 pl-8">
              Run your existing Flask app in your python environment:
            </p>
            <div className="pl-8">
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                python app.py
              </pre>
            </div>
          </div>

          {/* Step 2: Verification */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">2</span>
              Verify Endpoint & CORS Configuration
            </h3>
            <p className="text-xs text-slate-400 pl-8">
              Ensure Flask CORS is enabled (<code className="text-amber-300">from flask_cors import CORS; CORS(app)</code>) so the React web application can make cross-origin requests from Vite.
            </p>

            <div className="pl-8 relative">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-xl border border-slate-800 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono"><Code className="w-3.5 h-3.5 text-amber-400" /> Flask API Endpoint Spec</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Flask Code'}
                </button>
              </div>
              <pre className="p-4 rounded-b-xl bg-slate-950 border-x border-b border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                {sampleBackendCode}
              </pre>
            </div>
          </div>

          {/* Step 3: Run React */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">3</span>
              Start the React Vite Frontend
            </h3>
            <p className="text-xs text-slate-400 pl-8">
              In this React project directory, run:
            </p>
            <div className="pl-8">
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                npm run dev
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
