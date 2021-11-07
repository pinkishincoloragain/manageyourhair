import { createTheme } from "@material-ui/core/styles";

import Geostar from "../fonts/Geostar-Regular.ttf";

const geo = {
  fontFamily: "Geostar",
  src: `   url(${Geostar}) format('ttf')
  `,
};

const theme = createTheme({
  typography: {
    fontFamily: ["Geostar"]
  },
});

export {theme};
