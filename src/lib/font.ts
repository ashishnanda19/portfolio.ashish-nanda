import localFont from "next/font/local";

export const neu = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMachina-Light.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/NeueMachina-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/NeueMachina-Ultrabold.otf",
      weight: "700",
    },
  ],
  variable: "--font-neu",
});
export const lombok = localFont({
  src: [
    {
      path: "../../public/fonts/Lombok Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-lombok",
});
export const cath = localFont({
  src: [
    {
      path: "../../public/fonts/CATHSGBR.ttf",
      weight: "400",
    },
  ],
  variable: "--font-cath",
});
export const jap = localFont({
  src: [
    {
      path: "../../public/fonts/Geishta.otf",
      weight: "400",
    },
  ],
  variable: "--font-jap",
});

// Instrument Serif — self-hosted (avoids build-time Google Fonts fetch)
export const instrument = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
});
