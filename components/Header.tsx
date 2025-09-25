import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-transparent backdrop-blur-lg sticky top-0 z-10 py-4 border-b border-slate-800/50">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">
          BugEcho
        </h1>
        <p className="text-slate-400 mt-1 text-base">
          AI-powered scenario generation for issue replication.
        </p>
      </div>
    </header>
  );
};