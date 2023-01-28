import * as React from "react";
import * as Utils from "../src/utils/methods";
import { RestaurantDTO } from "../src/model/RestaurantDTO";

describe("Filters", () => {
  describe("getRestaurantsFilteredByName", function () {
    it("should return an empty list", () => {
      const restaurants: Array<RestaurantDTO> = [
        {
          businessName: "Pizzeria",
          latitude: null,
          longitude: null,
          simplifiedMarketSegment: null,
        },
      ];
      const result = Utils.getRestaurantsFilteredByName(restaurants, "le chill");
      expect(result.length).toEqual(0);
    });

    it("should return a match when complete name passed", () => {
      const restaurants: Array<RestaurantDTO> = [
        {
          businessName: "LE CHILL CLUB",
          latitude: null,
          longitude: null,
          simplifiedMarketSegment: null,
        },
      ];
      const result = Utils.getRestaurantsFilteredByName(restaurants, "le chill club");
      expect(result.length).toEqual(1);
    });

    it("should return a match when complete name passed (uppercase)", () => {
      const restaurants: Array<RestaurantDTO> = [
        {
          businessName: "LE CHILL CLUB",
          latitude: null,
          longitude: null,
          simplifiedMarketSegment: null,
        },
      ];
      const result = Utils.getRestaurantsFilteredByName(restaurants, "LE CHILL CLUB");
      expect(result.length).toEqual(1);
    });
  });
});
