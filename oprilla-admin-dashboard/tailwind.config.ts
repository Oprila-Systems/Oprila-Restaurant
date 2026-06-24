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

        card: {
          border: "#ECE8E1",
          highlight: "#B76F49",
          disabled: "#B8B2AC",
          title: "#2B2B2B",
          subtitle: "#8A8A8A",
          special: "#B56E47",
          tableBg: "#F2F0EC",
          button: "#2B2B2B",
        },
      },
    },
  },
};

export default config;