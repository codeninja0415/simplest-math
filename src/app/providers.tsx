"use client"
import { useState, useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "next-themes";
import { CssBaseline } from '@mui/material';
import { MathJaxContext } from 'better-react-mathjax';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, [])

  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
        <MathJaxContext>
          {children}
        </MathJaxContext>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
