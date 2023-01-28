import { RestaurantDTO } from "src/model/RestaurantDTO";
import { RestaurantFilter } from "src/model/RestaurantFilter";

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
      businessName: item["Business Name"] ? `${item["Business Name"]}` : null,
      longitude: item.Latitude ? `${item.Latitude}` : null,
      latitude: item.Longitude ? `${item.Longitude}` : null,
      simplifiedMarketSegment: item["Simplified Market Segment (GFC2)"]
        ? `${item["Simplified Market Segment (GFC2)"]}`
        : null,
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
 * Returns a list of all Restaurants
 * retrieve from csv
 * @param results csv parser result
 * @returns Array<RestaurantDTO>
 */
export const getFilteredRestaurants = (
  allRestaurants: Array<RestaurantDTO>,
  filter: RestaurantFilter
): Array<RestaurantDTO> => {
  // First filter
  const restaurantFilteredByName = filter.restaurantSearch
    ? getRestaurantsFilteredByName(allRestaurants, filter.restaurantSearch)
    : allRestaurants;

  // Second filter
  const restaurantFilteredBySimplifiedMarketSegment = filter.simplifiedMarketSegmentSearch
    ? getRestaurantsFilteredBySimplifiedMarketSegment(restaurantFilteredByName, filter.simplifiedMarketSegmentSearch)
    : restaurantFilteredByName;

  return restaurantFilteredBySimplifiedMarketSegment;
};

// TODO: Add tests
/**
 * Returns a list of all Restaurants that match with search
 * @param restaurantToFilter
 * @param search
 * @returns Array<RestaurantDTO>
 */
export const getRestaurantsFilteredByName = (
  restaurantToFilter: Array<RestaurantDTO>,
  search: string
): Array<RestaurantDTO> => {
  return restaurantToFilter.filter((item: RestaurantDTO) => {
    return item.businessName === search;
  });
};

// TODO: Add tests
/**
 * Returns a list of all Restaurants that match with SimplifiedMarketSegment
 * @param restaurantToFilter
 * @param valueToCompare
 * @returns Array<RestaurantDTO>
 */
export const getRestaurantsFilteredBySimplifiedMarketSegment = (
  restaurantToFilter: Array<RestaurantDTO>,
  valueToCompare: string
): Array<RestaurantDTO> => {
  return restaurantToFilter.filter((item: RestaurantDTO) => item.simplifiedMarketSegment === valueToCompare);
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
