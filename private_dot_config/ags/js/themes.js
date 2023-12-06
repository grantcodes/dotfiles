/**
 * A Theme is a set of options that will be applied
 * ontop of the default values. see options.js for possible options
 */
import { Theme } from './settings/theme.js'

export default [
  Theme({
    name: 'Space',
    icon: '',
    spacing: 11,
    padding: 10,
    radii: 12,
    'theme.accent.accent': '$magenta',
    'desktop.screen_corners': false,
    'desktop.clock.enable': false,
    'bar.separators': false,
    'bar.icon': '',
    'theme.bg': 'transparentize(#171717, 0.3)',
    'theme.widget.opacity': 95,
    'bar.flat_buttons': false,
    'font.font':
      "'CaskaydiaCove Nerd Font', FontAwesome, Roboto, Helvetica, Arial, sans-serif;",
    'font.mono':
      "'CaskaydiaCove Nerd Font', FontAwesome, Roboto, Helvetica, Arial, sans-serif;",
  }),
]
