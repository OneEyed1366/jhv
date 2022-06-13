import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import MainPage from "../components/pages/Main";
import ApolloLayer from "./layers/ApolloLayer";
import ThemeLayer from "./layers/ThemeLayer";

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <ThemeLayer>
        <ApolloLayer>
          <MainPage />
        </ApolloLayer>
      </ThemeLayer>
    </Suspense>
  );
}
