import Astal from 'gi://Astal?version=4.0'
import type Gdk from 'gi://Gdk?version=4.0'
import app from 'ags/gtk4/app'
// import { WebView } from '../util/WebView'

const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor

let win: Astal.Window

const ControlCenter = (monitor: Gdk.Monitor) => (
  <window
    $={(ref) => (win = ref)}
    cssClasses={['ControlCenter', 'surface']}
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP | RIGHT | BOTTOM}
    name="ControlCenter"
    application={app}
    keymode={Astal.Keymode.ON_DEMAND}
  >
    <box>
      {/* <WebView url="https://grantina.casa" width={400} /> */}
      <label label="home control" />
    </box>
  </window>
)

export { ControlCenter, win as controlCenterWindow }
