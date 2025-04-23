import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Address } from "../models/responseModels";

const BASE_URL = new URL("https://nominatim.openstreetmap.org/search");

export const useNominatimSearch = (query: string) => {
  const fetchAddress = useCallback(async (): Promise<Address[]> => {
    const url = BASE_URL;
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");

    const response = await fetch(url);

    if (response.status < 200 || response.status > 299) {
      throw new Error("Failed to fetch location search response");
    }

    const json = await response.json();

    return json.map((x: any) => ({
      displayText: x.display_name,
      latitude: x.lat,
      longitude: x.lon
    }))

  }, [query]);

  return useQuery({queryKey: ["locations"], queryFn: fetchAddress, enabled: false });
};