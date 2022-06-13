import { ThemeProvider } from "@mui/material";
import { globalTheme } from "../../../styles/globalStyle";

interface IProps {
  children: any;
}

export default function ThemeLayer({ children }: IProps): JSX.Element {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}
