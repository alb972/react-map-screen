import { RestaurantDTO } from "src/model/RestaurantDTO";

// TODO: Add tests
/**
 * Returns a list of all Restaurants
 * retrieve from csv
 * @param results csv parser result
 * @returns Array<RestaurantDTO>
 */
export const getRestaurantsList = (results: any): Array<RestaurantDTO> => {
  return results.data.map((item: any) => {
    return {
      longitude: item.Latitude ? `${item.Latitude}` : null,
      latitude: item.Longitude ? `${item.Longitude}` : null,
    };
  });
};

// TODO: Add tests
/**
 * Returns a list of all Simplified Market Segments (GFC2)
 * retrieve from csv
 * @param results csv parser result
 * @returns Array<string>
 */
export const getSimplifiedMarketSegmentsListString = (results: any): Array<string> => {
  return getListUnique(
    results.data
      .map((item: any) => {
        return item["Simplified Market Segment (GFC2)"] ? `${item["Simplified Market Segment (GFC2)"]}` : "";
      })
      .filter((item: string) => item.length > 0)
  );
};

// TODO: Add tests
/**
 * Removes duplicate if exist
 * @param {*} array
 * @returns Array<string>
 */
export const getListUnique = (array: Array<string>): Array<string> => {
  return Array.from(new Set(array));
};
