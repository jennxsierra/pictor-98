import { readFile } from "fs/promises";
import path from "path";
import { Apod } from "../models/Apod.js";
import { NASA_API_KEY } from "../config/apodConfig.js";

const MAX_RETRIES = 3;

export const getApodFromNASA = async (retries = MAX_RETRIES): Promise<Apod> => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`,
        { signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error(`NASA API failed with status ${response.status}`);
      }
      const data = await response.json();
      clearTimeout(timeout);
      return data[0] as Apod;
    } catch (error: unknown) {
      clearTimeout(timeout);
      lastError = error;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.warn(`Attempt ${attempt} failed: ${errorMessage}`);
    }
  }
  throw lastError;
};

export const getRandomGreeting = async (): Promise<string> => {
  const greetingsPath = path.join(
    process.cwd(),
    "src",
    "data",
    "greetings.json"
  );
  const greetingsData = await readFile(greetingsPath, "utf8");
  const greetingsObject = JSON.parse(greetingsData);
  const greetings: string[] = greetingsObject.greetings;
  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const getApodAndGreeting = async (): Promise<{
  apod: Apod;
  greeting: string;
}> => {
  try {
    const [apod, greeting] = await Promise.all([
      getApodFromNASA(),
      getRandomGreeting(),
    ]);
    return { apod, greeting };
  } catch (error) {
    // Rethrow error to let the controller handle the fallback logic.
    throw error;
  }
};
