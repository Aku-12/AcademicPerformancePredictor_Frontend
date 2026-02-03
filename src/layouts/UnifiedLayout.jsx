import { APP_CONFIG } from '../constants';

export const UnifiedLayout = ({ inputPanel, analyticsPanel, statusWidget }) => {
  return (
    <div className="h-screen bg-gray-50/50 flex flex-col overflow-hidden font-sans">
      {/* Minimized Header - Glassmorphism */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex items-center justify-between px-6 z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-indigo-200 shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight text-lg leading-tight">Academic Analytics</h1>
            <p className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">Prediction Console</p>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          {statusWidget}
        </div>
      </header>

      {/* Main Split View */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Inputs (Fixed Width & Styling) */}
        <aside className="w-[380px] bg-white border-r border-gray-200 flex flex-col z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
          <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between backdrop-blur-sm">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Configuration Profile
            </h2>
            <span className="text-xs text-slate-500 font-medium cursor-pointer hover:text-indigo-600 transition-colors px-2 py-1 rounded hover:bg-indigo-50">Reset Defaults</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {inputPanel}
          </div>
        </aside>

        {/* Right Panel: Analytics (Flexible) */}
        <section className="flex-1 bg-[#F8FAFC] overflow-y-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto space-y-8">
             {analyticsPanel}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UnifiedLayout;
