import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";

export const Home = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  // TODO: Manage translations with i18n
  const TopBarPageTitle = "Restaurants";

  return (
    <Box sx={{ minWidth: "1112px", maxWidth: "1112px", padding: "0 64px 0 64px" }}>
      <TopBar title={TopBarPageTitle} />
    </Box>
  );
};

export const TopBar = (props: { title: string }): JSX.Element => {
  const { title } = props;
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px 0 20px 0" }}>
      <Typography variant="h4" color="text.primary" component="div">
        {title}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));
