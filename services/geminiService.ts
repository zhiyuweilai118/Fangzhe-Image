
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Service to handle image editing requests to Gemini
 */
export const geminiImageService = {
  /**
   * Sends an image and a text prompt to Gemini 2.5 Flash Image to generate an edited version.
   */
  async editImage(base64Image: string, prompt: string): Promise<string> {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing. Please ensure the environment is configured correctly.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Extract mime type and clean base64 data
    const match = base64Image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid image format. Please upload a valid image file.");
    }

    const mimeType = match[1];
    const data = match[2];

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: data,
                mimeType: mimeType,
              },
            },
            {
              text: `Modify this image based on the following instruction: "${prompt}". 
                     Return only the edited image. 
                     Maintain the style and quality of the original where possible.`,
            },
          ],
        },
      });

      // Find the image part in the response
      let editedImageBase64: string | null = null;
      
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            editedImageBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!editedImageBase64) {
        // Fallback: If no image part found, maybe there's a textual error/refusal
        const textResponse = response.text;
        throw new Error(textResponse || "The AI could not process the edit request. Please try a different prompt.");
      }

      return editedImageBase64;
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error(error.message || "An error occurred while communicating with the Gemini API.");
    }
  }
};
