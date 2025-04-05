import { readFile } from "fs/promises";
import path from "path";
import { Apod } from "../models/Apod.js";
import { NASA_API_KEY } from "../config/apodConfig.js";

export const getApodFromNASA = async (): Promise<Apod> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`,
      { signal: controller.signal }
    );
    if (!response.ok) {
      throw new Error(`NASA API request failed with status ${response.status}`);
    }
    const data = await response.json();
    const apodData: Apod = data[0];
    return apodData;
  } finally {
    clearTimeout(timeout);
  }
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
  const [apod, greeting] = await Promise.all([
    getApodFromNASA(),
    getRandomGreeting(),
  ]);
  return { apod, greeting };
};
