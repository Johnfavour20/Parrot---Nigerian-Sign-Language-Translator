import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateNslTranslation = async (base64ImageData: string): Promise<{ rawGloss: string; refinedText: string; }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64ImageData,
            },
          },
          { text: "You are an expert in Nigerian Sign Language (NSL). Describe the sign being made in this image as a raw sign gloss (in all caps), and then provide a refined, natural English translation of what it means. Format your response as a single, clean JSON object with two keys: 'rawGloss' and 'refinedText'." },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rawGloss: { type: Type.STRING },
            refinedText: { type: Type.STRING },
          },
          required: ['rawGloss', 'refinedText'],
        },
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error generating NSL translation:", error);
    return { rawGloss: 'Error', refinedText: 'Could not translate the sign. Please try again.' };
  }
};

export const quickNslDetection = async (base64ImageData: string): Promise<{ word: string; confidence: number; }> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64ImageData,
              },
            },
            { text: "You are an expert in Nigerian Sign Language (NSL). Identify the single sign being made in this image. Respond with a JSON object containing 'word' (the identified sign) and 'confidence' (your confidence level as a number from 0 to 100)." },
          ],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              confidence: { type: Type.INTEGER },
            },
            required: ['word', 'confidence'],
          },
        },
      });
      
      const jsonText = response.text.trim();
      const result = JSON.parse(jsonText);
      return result;

    } catch (error) {
        console.error("Error with quick NSL detection:", error);
        return { word: 'Error', confidence: 0 };
    }
}


export const askNslAssistant = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: { parts: [{ text: query }] },
      config: {
        systemInstruction: "You are an expert assistant specializing in Nigerian Sign Language (NSL). Answer questions clearly, concisely, and accurately. Provide helpful explanations about NSL grammar, culture, and vocabulary.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error asking NSL assistant:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};
