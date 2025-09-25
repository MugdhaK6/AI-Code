import React from 'react';
import { ENVIRONMENTS } from '../constants';
import type { Environment } from '../types';
import { Card } from './ui/Card';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  issueTitle: string;
  setIssueTitle: (value: string) => void;
  ticketId: string;
  setTicketId: (value: string) => void;
  issueDescription: string;
  setIssueDescription: (value: string) => void;
  relevantData: string;
  setRelevantData: (value: string) => void;
  testData: string;
  setTestData: (value: string) => void;
  targetEnvironment: Environment;
  setTargetEnvironment: (env: Environment) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  issueTitle,
  setIssueTitle,
  ticketId,
  setTicketId,
  issueDescription,
  setIssueDescription,
  relevantData,
  setRelevantData,
  testData,
  setTestData,
  targetEnvironment,
  setTargetEnvironment,
  onSubmit,
  isLoading,
}) => {
  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEnv = ENVIRONMENTS.find(env => env.id === e.target.value);
    if (selectedEnv) {
      setTargetEnvironment(selectedEnv);
    }
  };

  const isSubmitDisabled = isLoading || !issueTitle.trim() || !issueDescription.trim();

  return (
    <Card>
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Describe the Issue</h2>
        <div className="space-y-6">
          
          <div>
            <label htmlFor="issue-title" className="block text-sm font-medium text-slate-300 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              id="issue-title"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 placeholder-slate-500"
              placeholder="e.g., Incorrect Bill_no format generated"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="ticket-id" className="block text-sm font-medium text-slate-300 mb-2">
              Ticket / Reference ID (Optional)
            </label>
            <input
              type="text"
              id="ticket-id"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 placeholder-slate-500"
              placeholder="e.g., INC1234567"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="issue-description" className="block text-sm font-medium text-slate-300 mb-2">
              Detailed Description
            </label>
            <textarea
              id="issue-description"
              rows={8}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 placeholder-slate-500"
              placeholder="Copy-paste the customer ticket details, log snippets, or a detailed description of the bug..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="relevant-data" className="block text-sm font-medium text-slate-300 mb-2">
              Relevant Data (e.g., IDs, Usernames)
            </label>
            <textarea
              id="relevant-data"
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 placeholder-slate-500"
              placeholder="e.g., Bill_no: E-9876, UserID: customer@example.com"
              value={relevantData}
              onChange={(e) => setRelevantData(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="test-data" className="block text-sm font-medium text-slate-300 mb-2">
              Test Data (Optional)
            </label>
            <textarea
              id="test-data"
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200 placeholder-slate-500"
              placeholder="e.g., JSON payloads, specific user credentials for testing"
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="target-environment" className="block text-sm font-medium text-slate-300 mb-2">
              Target Environment
            </label>
            <select
              id="target-environment"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200"
              value={targetEnvironment.id}
              onChange={handleEnvironmentChange}
              disabled={isLoading}
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env.id} value={env.id} className="bg-slate-800">
                  {env.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-brand-secondary/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 disabled:shadow-none disabled:transform-none focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-primary"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon />
                  Generate Scenario
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};