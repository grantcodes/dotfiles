import app from 'ags/gtk4/app'
import Gtk from 'gi://Gtk?version=4.0'
import Astal from 'gi://Astal?version=4.0'
import { NotificationList } from './NotificationList'
import { TimeAndDate } from './TimeAndDate'

const { TOP } = Astal.WindowAnchor
const { START, CENTER } = Gtk.Align

let win: Astal.Window

const NotificationCenter = (monitor: any) => (
  <window
    $={(ref) => (win = ref)}
    class="NotificationCenter"
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP}
    name="NotificationCenter"
    application={app}
  >
    {/* TODO: Add animation */}
    {/* <Gtk.Revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      revealChild={win.visible}
    > */}
    <box
      class="NotificationCenter__inner surface"
      hexpand
      valign={START}
      halign={CENTER}
      spacing={16}
    >
      {/* TODO: Fix notification list */}
      <NotificationList />
      <Gtk.Separator visible orientation={Gtk.Orientation.VERTICAL} />
      <TimeAndDate />
    </box>
    {/* </Gtk.Revealer> */}
  </window>
)

export { NotificationCenter, win as notificationCenterWindow }
