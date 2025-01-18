import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config"

const colors = {
  primary: {
    DEFAULT: "#F24055",
    50: "#fef4f5",
    100: "#fcd9dd",
    200: "#fab3bb",
    300: "#f78c99",
    400: "#f56677",
    500: "#F24055",
    600: "#c23344",
    700: "#912633",
    800: "#611a22",
    900: "#300d11",
    950: "#180608"
  },
  secondary: {
    DEFAULT: "#1e7881",
    50: "#e9f2f2",
    100: "#d2e4e6",
    200: "#a5c9cd",
    300: "#78aeb3",
    400: "#4b939a",
    500: "#1e7881",
    600: "#186067",
    700: "#12484d",
    800: "#0c3034",
    900: "#06181a",
    950: "#030c0d"
  },
  muted: {
    DEFAULT: "#979797",
    50: "#f5f5f5",
    100: "#e0e0e0",
    200: "#cbcbcb",
    300: "#b6b6b6",
    400: "#a1a1a1",
    500: "#979797",
    600: "#797979",
    700: "#5b5b5b",
    800: "#3c3c3c",
    900: "#1e1e1e",
    950: "#0f0f0f",
  },
  tertiary: {
    DEFAULT: "#28303F",
    50: "#eaeaec",
    100: "#d4d6d9",
    200: "#a9acb2",
    300: "#7e838c",
    400: "#535965",
    500: "#28303F",
    600: "#202632",
    700: "#181d26",
    800: "#101319",
    900: "#080a0d",
    950: "#040506"
  },
  neutral: {
    DEFAULT: "#EEEAEF",
    50: "#fdfdfd",
    100: "#fcfbfc",
    200: "#f8f7f9",
    300: "#f5f2f5",
    400: "#f1eef2",
    500: "#EEEAEF",
    600: "#bebbbf",
    700: "#8f8c8f",
    800: "#5f5e60",
    900: "#302f30",
    950: "#181718"
  },
  danger: {
    DEFAULT: "#ff0000",
    hover: "#e60000",
    content: "#f1fafe",
    50: "#ffe6e6",
    100: "#ffb3b3",
    200: "#ff8080",
    300: "#ff4d4d",
    400: "#ff1a1a",
    500: "#ff0000",
    600: "#cc0000",
    700: "#990000",
    800: "#660000",
    900: "#330000",
    950: "#190000",
},
  success: {
    DEFAULT: "#38cd8e",
    hover: "#32b980",
    content: "#f1fcf7",
    50: "#ebfaf4",
    100: "#c3f0dd",
    200: "#9ce6c7",
    300: "#74dcb0",
    400: "#4cd299",
    500: "#38cd8e",
    600: "#2da472",
    700: "#227b55",
    800: "#165239",
    900: "#0b291c",
    950: "#06140e",
  },
  grayRed: {
    DEFAULT: "#a68a8a", 
    50: "#f9f6f6",
    100: "#f2eaea",
    200: "#e3d4d4",
    300: "#d4bfbf",
    400: "#b89a9a",
    500: "#a68a8a",
    600: "#8f7676",
    700: "#785f5f",
    800: "#624848",
    900: "#4c3838",
    950: "#110e0e"
  },
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      ringWidth: {
        DEFAULT: "4px",
      },
      borderColor: {
        "gradient-45": "linear-gradient(45deg, #F24055, #1E7881)",
      },
      ringOffsetWidth: {
        DEFAULT: "2",
      },
      ringOffsetColor: (theme) => ({
        ...theme.colors,
        gradient: "linear-gradient(to bottom, #f24055, #1e7881)",
      }),
      colors: {
        ...colors
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.04em",
        tight: "-.01em",
        normal: "0",
        wide: ".02em",
        wider: ".04em",
        widest: ".1em",
      },
      borderRadius: {
        DEFAULT: "4px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        bg: "url('/background-image.webp')",
        "sitywatch-bg": "url('/static/images/sitywatch-bg.webp')",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    function ({ addUtilities }: PluginAPI) {
      addUtilities(
        {
          ".border-gradient-45": {
            borderImage: "linear-gradient(45deg, #F24055, #1E7881) 1",
          },
        },
        {
          // The second argument should be an options object with optional properties
          respectPrefix: true,
          respectImportant: true,
        },
      )
    },
  ],
}

export default config
