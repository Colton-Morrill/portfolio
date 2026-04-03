import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Manrope, Sora } from "next/font/google";

import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${manrope.variable} ${sora.variable}`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
