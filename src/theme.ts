import { createTheme } from "@mui/material/styles";

const theme = createTheme ({
    palette:{
        mode:"dark",
        primary:{
            main:"#7B5EA7",
            light:"#C9B8FF",
            dark:"#4a3670",
        },
        secondary:{
            main:"#C45C8A",
            light:"#F4A0C4",
        },
        background:{
            default:"#0f0a1e",
            paper:"#1a1235",
        },
    },
    typography:{
        fontFamily:"var(--font-geist-sans), system-ui, sans-serif",
    },
    shape:{
        borderRadius:16,
    }
})

export default theme;

