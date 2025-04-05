import { Request, Response } from "express";
import { getApodAndGreeting } from "../services/apodService.js";

const FALLBACK_IMAGE_URL = "images/hubble-ultra-deep-field.jpeg";

export const fetchApodData = async (_req: Request, res: Response) => {
  try {
    const { apod, greeting } = await getApodAndGreeting();
    res.render("index", {
      mediaType: apod.media_type,
      apodUrl: apod.url,
      title: apod.title,
      copyright: apod.copyright || "Public Domain",
      greeting,
    });
  } catch (error: any) {
    console.error("NASA API failed after retries:", error);
    res.render("index", {
      mediaType: "image",
      apodUrl: FALLBACK_IMAGE_URL,
      title: "Hubble Ultra Deep Field", // Fallback title
      copyright: "NASA/ESA", // Fallback copyright
      greeting: "Unable to fetch NASA image. " + "Enjoy this fallback view!",
    });
  }
};
