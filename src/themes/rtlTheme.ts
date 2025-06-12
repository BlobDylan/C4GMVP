// themes/rtlTheme.ts
import { createTheme } from "@mui/material/styles";
import { create } from "jss";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import baseTheme from "./Theme";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const rtlTheme = createTheme({
  ...baseTheme,
  direction: "rtl",
});

export default rtlTheme;
