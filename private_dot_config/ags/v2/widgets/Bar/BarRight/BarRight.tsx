import Gtk from 'gi://Gtk?version=4.0'
import { Tray } from './Tray'
import { Battery } from './Battery'
import { Volume } from './Volume'
import { ControlCenterButton } from './ControlCenterButton'

const BarRight = () => (
  <box hexpand halign={Gtk.Align.END} $type="end">
    <Tray />
    <Volume />
    <Battery />
    <ControlCenterButton />
  </box>
)

export { BarRight }
