/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

const customTheme: ThemeDefinition = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#055864',
    'primary-darken-1': '#00404c',
    'primary-lighten': '#7ec0cd',
    secondary: '#a0b9c8',
    'secondary-lighten-1': '#bbd5e4',
    'secondary-lighten-2': '#d7f1ff',
    'secondary-darken-1': '#018786',
    error: '#ef476f',
    info: '#2196f3',
    success: '#06d6a0',
    warning: '#ffd166',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
