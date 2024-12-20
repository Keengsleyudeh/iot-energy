// theme.js
import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819"
  }
};

// Add fonts configuration
const fonts = {
  heading: `'Comfortaa', sans-serif`,
  body: `'Nunito', sans-serif`,
};

// Extended theme with new component styles and fonts
const theme = extendTheme({
  config,
  colors,
  fonts, // Add fonts to theme
  styles: {
    global: {
      body: {
        bg: "gray.50",
        fontFamily: 'Nunito, sans-serif',
      },
    },
  },
  components: {
    Stat: {
      baseStyle: {
        container: {
          borderRadius: "xl",
          transition: "all 0.3s ease",
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'Comfortaa, sans-serif',
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontFamily: 'Comfortaa, sans-serif',
        },
      },
      Input: {
        baseStyle: {
          field: {
            fontFamily: 'Comfortaa, sans-serif',
          },
        },
      },
    },
  },
});

export default theme;