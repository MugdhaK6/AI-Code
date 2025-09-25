import React from 'react';
import { Card } from './ui/Card';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ScenarioDisplayProps {
  scenario: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-6 bg-slate-700 rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
    <div className="h-6 bg-slate-700 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
    </div>
  </div>
);

const EmptyState: React.FC = () => (
    <div className="text-center py-20 flex flex-col items-center">
        <div className="inline-block bg-slate-800 p-5 rounded-full border-2 border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v1.586M12 12.253v1.586M12 18.253v1.586M7.5 12.253h1.586M15 12.253h1.586M18.364 5.636l-1.121 1.121M5.636 18.364l-1.121 1.121M18.364 18.364l-1.121-1.121M5.636 5.636 6.757 6.757M12 12a6 6 0 11-6-6 6 6 0 016 6zM4.3 4.3l1.414 1.414a9 9 0 11-1.414-1.414z" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-white">Your Scenario Awaits</h3>
        <p className="mt-2 text-slate-400 max-w-sm">Fill out the issue details and click "Generate Scenario" to see the magic happen.</p>
    </div>
);


export const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ scenario, isLoading, error }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scenario);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="min-h-[500px]">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Generated Scenario</h2>
          {scenario && !isLoading && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <ClipboardIcon />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className="prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-li:text-slate-300">
          {error && <div className="text-red-400 bg-red-900/50 border border-red-700 rounded-lg p-4">{error}</div>}
          {isLoading && <LoadingSkeleton />}
          {!isLoading && !error && scenario && <MarkdownRenderer content={scenario} />}
          {!isLoading && !error && !scenario && <EmptyState />}
        </div>
      </div>
    </Card>
  );
};