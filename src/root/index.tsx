import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import MainPage from "../components/pages/Main";
import ThemeLayer from "./layers/ThemeLayer";

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <ThemeLayer>
        <MainPage />
      </ThemeLayer>
    </Suspense>
  );
}
