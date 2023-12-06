import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js'
import PanelButton from '../PanelButton.js'
import { substitute } from '../../utils.js'

const substitutions = {
  icons: [
    ['transmission-gtk', 'transmission'],
    ['blueberry.py', 'bluetooth'],
    ['Caprine', 'facebook-messenger'],
    ['', 'preferences-desktop-display'],
  ],
  titles: [
    ['com.github.Aylur.ags', 'AGS'],
    ['transmission-gtk', 'Transmission'],
    ['com.obsproject.Studio', 'OBS'],
    ['com.usebottles.bottles', 'Bottles'],
    ['com.github.wwmm.easyeffects', 'Easy Effects'],
    ['org.gnome.TextEditor', 'Text Editor'],
    ['org.gnome.design.IconLibrary', 'Icon Library'],
    ['blueberry.py', 'Blueberry'],
    ['org.wezfurlong.wezterm', 'Wezterm'],
    ['com.raggesilver.BlackBox', 'BlackBox'],
    ['firefox', 'Firefox'],
    ['org.gnome.Nautilus', 'Files'],
    ['libreoffice-writer', 'Writer'],
    ['', 'Desktop'],
    ['code-oss', 'VS Code'],
    ['vivaldi-stable', 'Vivaldi'],
  ],
}

export const ClientLabel = () =>
  Widget.Label({
    binds: [
      [
        'label',
        Hyprland.active.client,
        'class',
        (c) => {
          const { titles } = substitutions
          return substitute(titles, c)
        },
      ],
    ],
  })

export const ClientIcon = () =>
  Widget.Icon({
    connections: [
      [
        Hyprland.active.client,
        (self) => {
          const { icons } = substitutions
          const { client } = Hyprland.active

          const classIcon = substitute(icons, client.class) + '-symbolic'
          const titleIcon = substitute(icons, client.class) + '-symbolic'

          const hasTitleIcon = Utils.lookUpIcon(titleIcon)
          const hasClassIcon = Utils.lookUpIcon(classIcon)

          if (hasClassIcon) self.icon = classIcon

          if (hasTitleIcon) self.icon = titleIcon

          self.visible = !!(hasTitleIcon || hasClassIcon)
        },
      ],
    ],
  })

export default () =>
  PanelButton({
    class_name: 'focused-client',
    content: Widget.Box({
      children: [ClientIcon(), ClientLabel()],
      binds: [['tooltip-text', Hyprland.active, 'client', (c) => c.title]],
    }),
  })
