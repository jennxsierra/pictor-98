import { Request, Response } from "express";
import { getApodAndGreeting } from "../services/apodService.js";

const FALLBACK_IMAGE_URL = "images/hubble-ultra-deep-field.jpeg";

export const fetchApodData = async (_req: Request, res: Response) => {
  try {
    const { apod, greeting } = await getApodAndGreeting();
    res.render("index", {
      apodUrl: apod.url,
      greeting,
    });
  } catch (error: any) {
    console.error("NASA API failed after retries:", error);
    // Use the fallback image only if the NASA API does not respond
    // Greeting will still be fetched from the local JSON within the service
    res.render("index", {
      apodUrl: FALLBACK_IMAGE_URL,
      greeting: "Unable to fetch NASA image. " + "Enjoy this fallback view!",
    });
  }
};
