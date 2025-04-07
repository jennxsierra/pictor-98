import { readFile } from "fs/promises";
import path from "path";
import { Apod } from "../models/Apod.js";
import { NASA_API_KEY } from "../config/apodConfig.js";

const MAX_RETRIES = 3;

export const getApodFromNASA = (retries = MAX_RETRIES): Promise<Apod> => {
  let attempt = 1;

  const tryFetch = (): Promise<Apod> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    return fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`,
      { signal: controller.signal }
    )
      .then((response) => {
        clearTimeout(timeout);
        if (!response.ok) {
          throw new Error(`NASA API failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data[0] as Apod)
      .catch((error) => {
        clearTimeout(timeout);
        if (attempt < retries) {
          attempt++;
          console.warn(`Attempt ${attempt} failed: ${error.message}`);
          return tryFetch();
        }
        throw error;
      });
  };

  return tryFetch();
};

export const getRandomGreeting = (): Promise<string> => {
  const greetingsPath = path.join(
    process.cwd(),
    "src",
    "data",
    "greetings.json"
  );

  return readFile(greetingsPath, "utf8").then((greetingsData) => {
    const greetingsObject = JSON.parse(greetingsData);
    const greetings: string[] = greetingsObject.greetings;
    return greetings[Math.floor(Math.random() * greetings.length)];
  });
};

export const getApodAndGreeting = (): Promise<{
  apod: Apod;
  greeting: string;
}> => {
  return Promise.all([getApodFromNASA(), getRandomGreeting()])
    .then(([apod, greeting]) => {
      return { apod, greeting };
    })
    .catch((error) => {
      // Rethrow error to let the controller handle the fallback logic.
      throw error;
    });
};
