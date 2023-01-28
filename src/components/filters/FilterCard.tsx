import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { RestaurantFilter } from "src/model/RestaurantFilter";
import { RestaurantNameInput, SimplifiedMarketSegmentInput } from "./Filters";

interface FilterCardProps {
  title?: string;
  availableSimplifiedMarketSegments: Array<string>;
  onCancelClickHandler: () => void;
  onSubmitClickHandler: (newFilter: RestaurantFilter) => void;
}

export const FilterCard = (props: FilterCardProps): JSX.Element => {
  const { title = "Filters", availableSimplifiedMarketSegments, onCancelClickHandler, onSubmitClickHandler } = props;
  const classes = useStyles();

  // TODO: Manage translations with i18n
  const restauranNameFieldLabel = "Restaurant Name";
  const simplifiedMarketSegmentFieldLabel = "Simplified Market Segment";
  const cancelBtnText = "Cancel";
  const submitBtnText = "Submit";

  // Local state(s)
  const [restaurantNameSearch, setRestaurantNameSearch] = React.useState<string>("");
  const [simplifiedMarketSegmentSearch, setSimplifiedMarketSegmentSearch] = React.useState<string>("");

  const submit = React.useCallback(() => {
    onSubmitClickHandler({
      restaurantSearch: restaurantNameSearch.length > 0 ? restaurantNameSearch : null,
      simplifiedMarketSegmentSearch: simplifiedMarketSegmentSearch.length > 0 ? simplifiedMarketSegmentSearch : null,
    });
  }, [restaurantNameSearch, simplifiedMarketSegmentSearch]);

  return (
    <Card
      sx={{
        maxWidth: "600px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      }}>
      <CardContent sx={{ padding: "16px" }}>
        <Box sx={{ padding: "20px 0 20px 0" }}>
          <Typography variant="h4" color="text.primary" component="div">
            {title}
          </Typography>
        </Box>
        <RestaurantNameInput
          label={restauranNameFieldLabel}
          currentValue={restaurantNameSearch}
          onUpdateSearch={(value: string) => {
            setRestaurantNameSearch(value);
          }}
        />
        <SimplifiedMarketSegmentInput
          label={simplifiedMarketSegmentFieldLabel}
          currentValue={simplifiedMarketSegmentSearch}
          choices={availableSimplifiedMarketSegments}
          onUpdateSearch={(value: string) => {
            setSimplifiedMarketSegmentSearch(value);
          }}
        />
        <Box sx={{ display: "flex", flex: 1, alignItems: "flex-end", padding: "8px 0" }}>
          <Button
            variant="contained"
            className={classes.customCancelBtn}
            onClick={() => {
              setRestaurantNameSearch("");
              setSimplifiedMarketSegmentSearch("");
              onCancelClickHandler();
            }}>
            {cancelBtnText}
          </Button>
          <Button variant="contained" className={classes.customSubmitBtn} onClick={submit}>
            {submitBtnText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  customCancelBtn: {
    display: "flex",
    flex: 1,
    backgroundColor: "#F7E7E7",
    color: "#BD4740",
    marginRight: "12px",
    boxShadow: "none",
    fontWeight: 700,
    fontSize: "16px",
    padding: "12px",
    borderRadius: "16px",
    textTransform: "none",
  },
  customSubmitBtn: {
    display: "flex",
    flex: 1,
    backgroundColor: "#23587D",
    color: "#FFF",
    boxShadow: "none",
    fontWeight: 700,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "16px",
    textTransform: "none",
  },
}));
