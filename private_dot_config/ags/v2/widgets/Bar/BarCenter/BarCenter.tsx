import Gtk from 'gi://Gtk?version=4.0'
import { Clock } from './Clock'
// TODO: Add Media
// import { Media } from './Media'
// TODO: Add NotificationCount
// import { NotificationCount } from './NotificationCount'

const BarCenter = () => (
  <box hexpand halign={Gtk.Align.CENTER} spacing={8} $type="center">
    {/* <NotificationCount /> */}
    <Clock />
    {/* <Media /> */}
  </box>
)

export { BarCenter }
