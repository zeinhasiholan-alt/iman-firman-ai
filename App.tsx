
import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import VoiceLive from './components/VoiceLive';
import MediaTools from './components/MediaTools';
import CaseStudies from './components/CaseStudies';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Updated to a reliable high-quality dark anime male avatar
  const animeMaleAvatar = "https://cdn.pixabay.com/photo/2023/12/07/11/11/anime-8435340_1280.png";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CHAT:
        return <ChatInterface />;
      case AppTab.VOICE:
        return <VoiceLive />;
      case AppTab.IMAGE:
      case AppTab.VIDEO:
      case AppTab.ANALYSIS:
        return <MediaTools />;
      case AppTab.EXPLORE:
        return <CaseStudies onNavigate={(tab) => setActiveTab(tab)} />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        avatarUrl={animeMaleAvatar}
      />

      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{activeTab}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-1 px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase">System Ready</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 dark:border-slate-700 shadow-md overflow-hidden flex items-center justify-center bg-slate-200 dark:bg-slate-800">
              <img 
                src={animeMaleAvatar} 
                alt="Profile" 
                className="w-full h-full object-cover block"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Firman+AI&background=0D8ABC&color=fff";
                }}
              />
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 dark:from-blue-950/10 to-transparent pointer-events-none" />
          <div className="h-full relative z-10">
            {renderContent()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
