import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

export const fetchApodData = async (_req: Request, res: Response) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    // Use the "count" parameter of NASA's APOD API to fetch a random image from the archive.
    const nasaRes = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1",
      { signal: controller.signal }
    );
    if (!nasaRes.ok) throw new Error("NASA API request failed");
    const nasaArray = await nasaRes.json();
    const nasaData = nasaArray[0];

    // Use an absolute path to load greetings from the JSON file
    const greetingsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "greetings.json"
    );
    const greetingsData = await readFile(greetingsPath, "utf8");
    const greetings: string[] = JSON.parse(greetingsData);
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Render the 'index' view with the random NASA image and a greeting.
    res.render("index", {
      apodUrl: nasaData.url,
      greeting,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).render("error", {
      message: "Failed to fetch NASA APOD.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
