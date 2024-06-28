import React from "react";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "../Store/material";
import RoutesComponent from "../../routes/RoutesComponent";
import Header from "../Dashboard/Header";


const defaultTheme = createTheme();

const Blog = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" />
        {/* <RoutesComponent /> */}
      </Container>
    </ThemeProvider>
  );
};
export default Blog;
