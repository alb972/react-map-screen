import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface FilterProps {
  label: string;
  currentValue: string;
  onUpdateSearch: (value: string) => void;
}

export const RestaurantNameInput = (props: FilterProps): JSX.Element => {
  const { label, currentValue, onUpdateSearch } = props;
  return (
    <Box sx={{ minWidth: "256px", maxWidth: "256px", padding: "8px 0" }}>
      <FormControl fullWidth>
        <Typography sx={{ marginBottom: "8px", fontWeight: 500 }} variant="body1" color="text.primary" component="div">
          {label}
        </Typography>
        <TextField
          id="input-restaurant-name"
          variant="outlined"
          value={currentValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RestaurantIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onUpdateSearch(event.target.value);
          }}
        />
      </FormControl>
    </Box>
  );
};

interface SelectProps {
  choices?: Array<string>;
}

export const SimplifiedMarketSegmentInput = (props: FilterProps & SelectProps): JSX.Element => {
  const { label, currentValue, choices, onUpdateSearch } = props;
  return (
    <Box sx={{ minWidth: "256px", maxWidth: "256px", padding: "8px 0" }}>
      <FormControl fullWidth>
        <Typography sx={{ marginBottom: "8px", fontWeight: 500 }} variant="body1" color="text.primary" component="div">
          {label}
        </Typography>
        <Select
          id="input-simplified-market-segment"
          variant="outlined"
          value={currentValue}
          label=""
          fullWidth
          onChange={(event: SelectChangeEvent) => {
            onUpdateSearch(event.target.value);
          }}>
          {choices?.map((item: string) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));
