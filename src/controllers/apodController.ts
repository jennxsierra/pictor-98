import { Request, Response } from "express";
import { getApodAndGreeting } from "../services/apodService.js";

export const fetchApodData = async (_req: Request, res: Response) => {
  try {
    const { apod, greeting } = await getApodAndGreeting();
    res.render("index", {
      apodUrl: apod.url,
      greeting,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).render("error", {
      message:
        error.name === "AbortError"
          ? "The request timed out. Please try again later."
          : "Failed to fetch NASA APOD. Please try again later.",
    });
  }
};
