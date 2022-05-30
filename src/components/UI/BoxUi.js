import React from "react";
import { Box, Paper } from "@mui/material";

const BoxUi = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 5,
          p: 4,
          minWidth: "20%",
          height: "50%",
        },
      }}
    >
      <Paper elevation={3}>{children}</Paper>
    </Box>
  );
};

export default BoxUi;
