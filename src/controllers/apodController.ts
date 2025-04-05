import { Request, Response } from "express";
import { readFile } from "fs/promises";
import { NASA_API_KEY } from "../config/apodConfig.js";
import path from "path";

export const fetchApodData = async (_req: Request, res: Response) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const nasaRes = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`,
      { signal: controller.signal }
    );
    if (!nasaRes.ok) {
      throw new Error(`NASA API request failed with status ${nasaRes.status}`);
    }
    const nasaArray = await nasaRes.json();
    const nasaData = nasaArray[0];

    const greetingsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "greetings.json"
    );
    const greetingsData = await readFile(greetingsPath, "utf8");
    const greetingsObject = JSON.parse(greetingsData);
    const greetings: string[] = greetingsObject.greetings;
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    res.render("index", {
      apodUrl: nasaData.url,
      greeting,
    });
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("NASA API request timed out:", error);
    } else {
      console.error("Error fetching data:", error);
    }
    // You could implement a retry mechanism here if desired

    res.status(500).render("error", {
      message:
        error.name === "AbortError"
          ? "The request timed out. Please try again later."
          : "Failed to fetch NASA APOD. Please try again later.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
