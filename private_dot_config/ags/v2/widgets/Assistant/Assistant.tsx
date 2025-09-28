import { createState } from 'ags'
import app from 'ags/gtk4/app'
import Gtk from 'gi://Gtk?version=4.0'
import Astal from 'gi://Astal?version=4.0'

// import { WebView } from '../util/WebView'

const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

let win: Astal.Window

const Assistant = (monitor: any) => (
  <window
    $={(ref) => (win = ref)}
    class="Assistant surface"
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP | LEFT | BOTTOM}
    name="Assistant"
    application={app}
    keymode={Astal.Keymode.ON_DEMAND}
  >
    <box widthRequest={400}>
      <label label="This is the Assistant" />
      {/* <WebView width={400} url="https://librechat.grant.codes" /> */}
    </box>
  </window>
)

export { Assistant, win as assistantWindow }
