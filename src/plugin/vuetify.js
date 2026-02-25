import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-dark': '#F5F5F5',
          'surface-variant': '#FFFFFF',
          'on-surface-variant': '#000000',
          'on-surface': '#000000',
          'on-background': '#000000',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          background: '#121212',
          surface: '#212121',
          'surface-dark': '#1E1E1E',
          'surface-variant': '#1E1E1E',
          'on-surface-variant': '#FFFFFF',
          'on-surface': '#FFFFFF',
          'on-background': '#FFFFFF',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  defaults: {
    VCard: {
      rounded: 'xl',
      elevation: 1,
      class: ['transition-all', 'duration-200'],
      VCardText: {
        class: 'text-on-surface'
      }
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      rounded: 'lg'
    },
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: 'lg'
    },
    VList: {
      color: 'on-surface',
      rounded: 'lg'
    },
    VNavigationDrawer: {
      color: 'surface',
      rounded: 'lg'
    },
    VAppBar: {
      elevation: 1,
      rounded: 0
    },
    VTable: {
      rounded: 'lg'
    },
    VChip: {
      rounded: 'pill'
    },
    VDialog: {
      rounded: 'xl'
    },
    VOverlay: {
      rounded: 'xl'
    }
  }
})
