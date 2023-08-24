import { createTheme } from "@mui/material";
import { plPL } from "@mui/material/locale";

const DarkTheme = createTheme(
    {
        palette: {
            mode: "dark",
            // primary: { main: "#000000" },
            // secondary: { main: "#FFFFFF" },
            // background: { default: "#f5f5f5" },
        },
    },
    plPL
);

export default DarkTheme;
