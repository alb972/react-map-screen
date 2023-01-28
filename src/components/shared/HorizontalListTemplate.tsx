import React, { PropsWithChildren, Children, ReactChild, ReactFragment, ReactPortal } from "react";
import Grid from "@mui/material/Grid";

interface HorizontalListTemplateProps {
  space: number;
}

export const HorizontalListTemplate = (props: PropsWithChildren<HorizontalListTemplateProps>): JSX.Element => {
  const { space, children } = props;
  const childrenArray = Children.toArray(children);
  return (
    <Grid container spacing={space}>
      {childrenArray &&
        childrenArray.map((childItem: ReactChild | ReactFragment | ReactPortal, index: number) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item xs>
              {childItem}
            </Grid>
          );
        })}
    </Grid>
  );
};
