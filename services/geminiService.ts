import { GoogleGenAI } from "@google/genai";

// FIX: Refactored to use process.env.API_KEY directly in the GoogleGenAI constructor
// to align with the coding guidelines.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ScenarioDetails {
  issueTitle: string;
  ticketId?: string;
  issueDescription: string;
  relevantData?: string;
  testData?: string;
  targetEnvironment: string;
}

export async function generateReplicationScenario(
  details: ScenarioDetails
): Promise<string> {
  const { issueTitle, ticketId, issueDescription, relevantData, testData, targetEnvironment } = details;
  
  const prompt = `
    You are an expert Senior Software Engineer specializing in debugging and issue replication.
    A user has reported an issue from a bug tracking system like ServiceNow. Here are the details:
    
    - **Ticket ID:** ${ticketId || 'N/A'}
    - **Title:** ${issueTitle}
    - **Environment to Replicate In:** "${targetEnvironment}"
    
    **Full Description:**
    ---
    ${issueDescription}
    ---
    
    **Relevant Data Provided:**
    ---
    ${relevantData || 'None'}
    ---

    **Test Data Provided (e.g., Payloads, Credentials):**
    ---
    ${testData || 'None'}
    ---

    Your task is to generate a detailed, step-by-step scenario to replicate this issue in the "${targetEnvironment}" environment.
    The scenario must be clear, concise, and actionable for a developer or QA engineer.

    Structure your response in Markdown format with the following sections:
    
    ### 🎯 Objective
    A brief, one-sentence summary of the goal based on the issue title.

    ### ⚙️ Prerequisites
    - Any data setup required (e.g., specific user accounts, product states, database entries). Use the 'Relevant Data Provided' and 'Test Data Provided' as hints.
    - Necessary tools or access permissions.
    - Specific configurations to be set in the ${targetEnvironment} environment.

    ### 📋 Replication Steps
    A numbered list of precise actions to perform. Be explicit and unambiguous.
    1. Action one...
    2. Action two...
    3. ...

    ### 🧐 Expected vs. Actual Behavior
    - **Expected:** Describe the correct system behavior.
    - **Actual:** Describe the erroneous behavior that should be observed if the issue is successfully replicated.

    ### ✅ Verification
    Explain how to confirm that the issue has been successfully replicated (e.g., check logs, database values, UI elements).
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
}