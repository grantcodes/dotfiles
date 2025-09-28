import { createBinding, createComputed } from 'ags'
import Hyprland from 'gi://AstalHyprland'
import { truncateText } from '../../../lib/truncate-text'

const SUBSTITUTIONS = {
  icons: [
    ['transmission-gtk', 'transmission'],
    ['blueberry.py', 'bluetooth'],
    ['Caprine', 'facebook-messenger'],
    ['', 'preferences-desktop-display'],
    ['vivaldi-stable', 'web-browser'],
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
    ['thunderbird', 'Thunderbird'],
    ['org.gnome.Nautilus', 'Files'],
    ['libreoffice-writer', 'Writer'],
    ['', 'Desktop'],
    ['code-oss', 'VS Code'],
    ['code', 'VS Code'],
    ['vivaldi-stable', 'Vivaldi'],
    ['nemo', 'Files'],
  ],
}

const FocusedClient = () => {
  const hypr = Hyprland.get_default()
  const focused = createBinding(hypr, 'focusedClient')

  const label = createComputed([focused], (focused: any) => {
    if (!focused?.class) {
      return ''
    }
    const c = focused.class
    const sub = SUBSTITUTIONS.titles.find(([k]) => k === c)
    return truncateText(sub ? sub[1] : focused.title)
  })

  return (
    <box class="focused-client" visible={!!focused} widthRequest={30}>
      <label label={label} maxWidthChars={20} widthRequest={30} />
    </box>
  )
}

export { FocusedClient }
