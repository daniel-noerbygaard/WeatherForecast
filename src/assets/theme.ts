import { createTheme } from "@mui/material";

enum Colors {
    main = "#6ec5e9",
    background = "#ffffff"

}

const theme = createTheme({
palette: {
    primary: {
        main: Colors.main,
        contrastText: Colors.background,
    },
    background: {
        paper: Colors.background,
    }
    },
components: {
    MuiSvgIcon: {
        styleOverrides: {
            root: {
                color: Colors.main
            }
        }
    }
}
})

export default theme;