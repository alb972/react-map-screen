import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardContent from "@mui/material/CardContent";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleReturnToHome = React.useCallback(() => {
    navigate("/");
  }, []);

  return (
    <Box sx={{ minWidth: "256px", maxWidth: "512px", padding: "64px" }}>
      <NotFoundCard goToHomeActionHandler={handleReturnToHome} />
    </Box>
  );
};

export const NotFoundCard = (props: { goToHomeActionHandler: () => void }): JSX.Element => {
  const { goToHomeActionHandler } = props;
  const classes = useStyles();

  // TODO: Manage translations with i18n
  const pageNotFoundTitleText = "Page Not found!";
  const returnBtnText = "RETURN TO HOME";

  return (
    <Card
      sx={{
        flex: 1,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        display: "flex",
        paddingTop: "16px",
      }}>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", paddingTop: 0 }}>
          <Typography sx={{ marginBottom: "16px" }} variant="body1" color="text.primary" component="div">
            {pageNotFoundTitleText}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.customLogoutBtn}
            onClick={() => {
              goToHomeActionHandler();
            }}>
            {returnBtnText}
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  customLogoutBtn: {
    borderColor: "#54AC7E",
    color: "#54AC7E",
    marginRight: "12px",
    boxShadow: "none",
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "none",
  },
}));
