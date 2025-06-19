import axios from "axios";
import { UnsplashImage } from "./types";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

axios.defaults.baseURL = "https://api.unsplash.com";

interface UnsplashApiResponse {
  results: UnsplashImage[];
  total_pages: number;
}

export default async function searchRequest(
  topic: string,
  page: number
): Promise<{ results: UnsplashImage[]; totalPages: number }> {
  const response = await axios.get<UnsplashApiResponse>("/search/photos", {
    params: {
      query: topic,
      client_id: ACCESS_KEY,
      per_page: 15,
      page,
      orientation: "landscape",
    },
  });

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}
