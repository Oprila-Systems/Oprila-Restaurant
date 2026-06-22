import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        status: {
          greenBg: "#E7F2E5",
          greenText: "#6D8D69",
          orangeBg: "#F9E3D7",
          orangeText: "#C17A52",
          grayBg: "#ECEAE6",
          grayText: "#6B6763",
          redBg: "#FBE7E7",
          redText: "#CC7D7D",
        },
      },
    },
  },
};

export default config;