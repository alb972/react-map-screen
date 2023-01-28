import { APIResult } from "src/model/APIResult";
import { RestaurantDTO } from "src/model/RestaurantDTO";
import Papa from "papaparse";
import { RestaurantFilter } from "src/model/RestaurantFilter";
import * as Utils from "src/utils/methods";

/**
 * Returns csv text
 * @returns Promise<string>
 */
const getCSVText = async (): Promise<string> => {
  const response = await fetch("TOP_PDV_Fyre_FR_Extract_100.csv");
  return response.text();
};

/**
 * Returns available Restaurants informations
 * @returns Promise<APIResult<Array<RestaurantDTO>>>
 */
const getRestaurants = (filter: RestaurantFilter): Promise<APIResult<Array<RestaurantDTO>>> => {
  return new Promise((resolve) => {
    try {
      getCSVText().then((text) => {
        if (text != null) {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const restaurants: Array<RestaurantDTO> = Utils.getRestaurantsList(results);
              const filtered = Utils.getFilteredRestaurants(restaurants, filter);
              resolve({ type: "success", value: filtered });
            },
          });
        } else {
          throw new Error("Cannot parse csv file.");
        }
      });
    } catch (error) {
      resolve({ type: "error", code: "", error: JSON.stringify(error) });
    }
  });
};

/**
 * Returns available Simplified Market Segments
 * @returns Promise<APIResult<Array<string>>>
 */
const getAvailableSimplifiedMarketSegments = (): Promise<APIResult<Array<string>>> => {
  return new Promise((resolve) => {
    try {
      getCSVText().then((text) => {
        if (text != null) {
          // Starts csv parsing
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const list = Utils.getSimplifiedMarketSegmentsListString(results);
              resolve({ type: "success", value: list });
            },
          });
        } else {
          throw new Error("Cannot parse csv file.");
        }
      });
    } catch (error) {
      resolve({ type: "error", code: "", error: JSON.stringify(error) });
    }
  });
};

/**
 * Returns geojson from a Restaurants list.
 */
const getRestaurantsGeoJSON = async (restaurants: Array<RestaurantDTO>): Promise<APIResult<any>> => {
  try {
    // Generate points from restaurants positions
    const points: Array<any> = restaurants.map((item: RestaurantDTO) => {
      if (item.longitude && item.latitude) {
        const lat = parseFloat(item.latitude.replace(",", "."));
        const long = parseFloat(item.longitude.replace(",", "."));
        return {
          type: "Feature",
          geometry: { type: "Point", coordinates: [lat, long] },
        };
      }
      return null;
    });

    // Generates GeoJSON
    const geojson = {
      type: "FeatureCollection",
      features: points.filter((item: RestaurantDTO | null) => item !== null),
    };

    return { type: "success", value: geojson };
  } catch (error) {
    return { type: "error", code: "", error: JSON.stringify(error) };
  }
};

export default {
  getRestaurants,
  getRestaurantsGeoJSON,
  getAvailableSimplifiedMarketSegments,
};
