import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SDK Zīle ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('sdk_zile_competitions');
      localStorage.removeItem('sdk_zile_competitions_v2');
      localStorage.removeItem('sdk_zile_competitions_v3');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070D18] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0F172A] border border-amber-500/30 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="font-serif font-bold text-2xl text-white mb-2">
              Kaut kas nogāja greizi
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Pārlūkā radās īslaicīga kļūda datu ielādē vai kešatmiņā. Noklikšķiniet zemāk, lai atjaunotu lapu un notīrītu vecos keša datus.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 to-brand-gold hover:brightness-110 active:scale-95 shadow-lg shadow-brand-gold/20 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Notīrīt kešu un atjaunot lapu</span>
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Doties uz sākumlapu</span>
              </button>
            </div>

            {this.state.error && (
              <div className="mt-6 pt-6 border-t border-slate-800 text-left">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Kļūdas detaļas:
                </div>
                <div className="text-[11px] font-mono text-red-400 bg-black/50 p-2.5 rounded-lg overflow-x-auto max-h-32">
                  {this.state.error.toString()}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
