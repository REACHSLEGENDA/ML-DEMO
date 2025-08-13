import { showError } from "@/utils/toast";

export interface Product {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
}

export interface SearchResults {
  results: Product[];
}

const API_BASE_URL = "https://api.mercadolibre.com";
const SITE_ID = "MLA"; // Using Argentina (MLA) as an example. You can change it to MLM for Mexico, etc.

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sites/${SITE_ID}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: SearchResults = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching products:", error);
    showError("Hubo un error al buscar productos. Intenta de nuevo.");
    return [];
  }
};