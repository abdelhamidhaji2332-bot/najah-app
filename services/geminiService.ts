
// Use the correct import according to guidelines
import {GoogleGenAI} from "@google/genai";

export const askAITutor = async (question: string, subject?: string) => {
  // Always create a new instance right before the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-pro-preview for complex reasoning tasks like Moroccan BAC tutoring
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are NAJAH AI, a specialized tutor for the Moroccan BAC (Baccalaureate).
    Your goal is to help students understand concepts in ${subject || 'all subjects'}.
    Provide clear, structured explanations in French (or Arabic if requested).
    Stay encouraging and focus on the Moroccan national curriculum.
    If the user asks for a solution to a math or physics problem, explain the steps clearly.
  `;

  try {
    // Call generateContent with both model name and prompt/config
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: question }] }],
      config: {
        systemInstruction: systemInstruction.trim(),
        temperature: 0.7,
      }
    });
    
    // Use the .text property directly (not a method) as per guidelines
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant IA.";
  }
};
