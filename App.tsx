import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ScenarioDisplay } from './components/ScenarioDisplay';
import { generateReplicationScenario } from './services/geminiService';
import { Environment } from './types';
import { ENVIRONMENTS } from './constants';

const App: React.FC = () => {
  const [issueTitle, setIssueTitle] = useState<string>('');
  const [ticketId, setTicketId] = useState<string>('');
  const [issueDescription, setIssueDescription] = useState<string>('');
  const [relevantData, setRelevantData] = useState<string>('');
  const [testData, setTestData] = useState<string>('');
  const [targetEnvironment, setTargetEnvironment] = useState<Environment>(ENVIRONMENTS[0]);
  const [generatedScenario, setGeneratedScenario] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!issueTitle.trim() || !issueDescription.trim()) {
      setError('Please provide at least an issue title and description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedScenario('');

    try {
      const scenario = await generateReplicationScenario({
        issueTitle,
        ticketId,
        issueDescription,
        relevantData,
        testData,
        targetEnvironment: targetEnvironment.name,
      });
      setGeneratedScenario(scenario);
    } catch (err) {
      console.error(err);
      setError('Failed to generate scenario. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [issueTitle, ticketId, issueDescription, relevantData, testData, targetEnvironment]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.3),rgba(255,255,255,0))]">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <InputForm
            issueTitle={issueTitle}
            setIssueTitle={setIssueTitle}
            ticketId={ticketId}
            setTicketId={setTicketId}
            issueDescription={issueDescription}
            setIssueDescription={setIssueDescription}
            relevantData={relevantData}
            setRelevantData={setRelevantData}
            testData={testData}
            setTestData={setTestData}
            targetEnvironment={targetEnvironment}
            setTargetEnvironment={setTargetEnvironment}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ScenarioDisplay
            scenario={generatedScenario}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center p-4 mt-12 text-slate-500 text-sm">
        <p>Powered by Google Gemini. For development and testing purposes only.</p>
      </footer>
    </div>
  );
};

export default App;