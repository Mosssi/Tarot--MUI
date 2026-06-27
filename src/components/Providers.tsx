'use client'

import{ ThemeProvider, CssBaseline } from "@mui/material";
import{ AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/theme"; 

export default function Provider({ children } : { children: React.ReactNode }){
    return(
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
