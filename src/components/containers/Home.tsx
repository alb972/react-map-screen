import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import API from "src/api/api_requests";
import { APIResult } from "src/model/APIResult";
import * as Constants from "src/utils/constants";
import Map, { Source, Layer } from "react-map-gl";
import { RestaurantDTO } from "src/model/RestaurantDTO";
import { RestaurantFilter } from "src/model/RestaurantFilter";
import { HorizontalListTemplate } from "../shared/HorizontalListTemplate";
import { SpacerMedium } from "../shared/Spacers";
import { FilterCard } from "../filters/FilterCard";

export const Home = (): JSX.Element => {
  const classes = useStyles();

  const layerStyle: any = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  // TODO: Manage translations with i18n
  const TopBarPageTitle = "Restaurants";

  const initialFilterState = {
    restaurantSearch: null,
    simplifiedMarketSegmentSearch: null,
  };

  // Local state(s)
  const [totalRestaurants, setTotalRestaurants] = React.useState<number>(0);
  const [restaurantGeoData, setRestaurantGeoData] = React.useState<any>(null);
  const [allSimplifiedMarketSegments, setAllSimplifiedMarketSegments] = React.useState<Array<string>>([]);
  const [filter, setFilter] = React.useState<RestaurantFilter>(initialFilterState);

  React.useEffect(() => {
    getRestaurantData();
    getAvailableSimplifiedMarketSegments();
  }, [filter]);

  const getRestaurantData = async () => {
    // Retrieves restaurants data
    let restaurants: Array<RestaurantDTO> = [];
    const restaurantsResponse: APIResult<Array<RestaurantDTO>> = await API.getRestaurants(filter);
    if (restaurantsResponse.type === "success") {
      restaurants = restaurantsResponse.value;
      setTotalRestaurants(restaurants.length);
    } else {
      console.error("Oops something went wrong!", restaurantsResponse.error);
    }

    const geoJSONResponse: APIResult<any> = await API.getRestaurantsGeoJSON(restaurants);
    if (geoJSONResponse.type === "success") {
      setRestaurantGeoData(geoJSONResponse.value);
    } else {
      console.error("Oops something went wrong!", geoJSONResponse.error);
    }
  };

  const getAvailableSimplifiedMarketSegments = async () => {
    // Retrieves restaurants data
    const response: APIResult<Array<string>> = await API.getAvailableSimplifiedMarketSegments();
    if (response.type === "success") {
      setAllSimplifiedMarketSegments(response.value);
    } else {
      console.error("Oops something went wrong!", response.error);
    }
  };

  return (
    <Box sx={{ minWidth: "1024px", maxWidth: "1524px", padding: "0 64px 0 64px" }}>
      <TopBar title={TopBarPageTitle} total={totalRestaurants} />
      <HorizontalListTemplate space={2}>
        <Map
          initialViewState={{
            longitude: 2.252197,
            latitude: 46.286461,
            zoom: 4,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={Constants.MAPBOX_TOKEN}>
          <Source id="my-data" type="geojson" data={restaurantGeoData}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <FilterCard
          availableSimplifiedMarketSegments={allSimplifiedMarketSegments}
          onCancelClickHandler={() => {
            setFilter(initialFilterState);
          }}
          onSubmitClickHandler={(newFilter: RestaurantFilter) => {
            setFilter(newFilter);
          }}
        />
      </HorizontalListTemplate>
    </Box>
  );
};

export const TopBar = (props: { title: string; total: number }): JSX.Element => {
  const { title, total } = props;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px 0 20px 0" }}>
      <Typography variant="h4" color="text.primary" component="div">
        {`${title} - ${total} resultat(s)`}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));
