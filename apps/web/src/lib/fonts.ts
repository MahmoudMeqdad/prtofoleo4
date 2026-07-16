import { Baloo_Bhaijaan_2, Noto_Sans_Arabic } from "next/font/google";

// The next/font variables use "-base" names so the design-system variables
// (--font-display / --font-body in globals.css) can reference them without
// a circular var() definition.
export const fontDisplay = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  variable: "--font-display-base",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontBody = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-body-base",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});
