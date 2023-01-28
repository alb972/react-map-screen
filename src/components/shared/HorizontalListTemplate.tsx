import React, { PropsWithChildren, Children, ReactChild, ReactFragment, ReactPortal } from "react";
import Box from "@mui/material/Box";

interface HorizontalListTemplateProps {
  spacer: JSX.Element;
}

export const HorizontalListTemplate = (props: PropsWithChildren<HorizontalListTemplateProps>): JSX.Element => {
  const { spacer, children } = props;
  const childrenArray = Children.toArray(children);
  return (
    <Box sx={{ display: "flex" }}>
      {childrenArray &&
        childrenArray.map((childItem: ReactChild | ReactFragment | ReactPortal, index: number) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {childItem}
              {spacer}
            </React.Fragment>
          );
        })}
    </Box>
  );
};
