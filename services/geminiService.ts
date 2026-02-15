
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
    Provide clear, helpful explanations in French (or Arabic if requested).
    Stay encouraging and focus on the Moroccan national curriculum.
    If the user asks for a solution to a problem, explain the steps clearly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: question,
      config: {
        systemInstruction: systemInstruction.trim(),
        temperature: 0.7,
      }
    });
    
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant IA.";
  }
};

/**
 * Generates a concise summary for a specific chapter/topic.
 */
export const generateSummary = async (topicTitle: string, description: string, keyConcepts: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Flash is great for quick, concise summaries
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    Tu es un expert pédagogique du BAC Marocain. 
    Ta mission est de générer un résumé ultra-concis, structuré et efficace pour un chapitre spécifique.
    Utilise des points (bullet points), des termes clés en gras, et assure-toi que le ton est motivant.
    Langue: Français.
    Format: Markdown léger.
  `;

  const prompt = `Génère un résumé pour le chapitre suivant du BAC Marocain:
  Titre: ${topicTitle}
  Description: ${description}
  Concepts clés: ${keyConcepts.join(', ')}
  
  Le résumé doit inclure:
  1. L'Essentiel à retenir (3-4 points)
  2. Formule/Concept clé (si applicable)
  3. Conseil pour le jour de l'examen.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction.trim(),
        temperature: 0.4, // Lower temperature for more factual summaries
      }
    });
    
    return response.text || "Erreur lors de la génération du résumé.";
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Impossible de générer le résumé pour le moment.";
  }
};
