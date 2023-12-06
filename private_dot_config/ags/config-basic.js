import App from 'resource:///com/github/Aylur/ags/app.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Workspaces from './widgets/workspaces.js'
import Battery from './widgets/battery.js'
import Tray from './widgets/tray.js'
import Clock from './widgets/clock.js'
import Sound from './widgets/sound.js'

// layout of the bar
const Left = () =>
  Widget.Box({
    children: [Workspaces()],
  })

const Center = () =>
  Widget.Box({
    children: [
      // Media(),
      // Notification(),
    ],
  })

const Right = () =>
  Widget.Box({
    hpack: 'end',
    children: [Sound(), Battery(), Clock(), Tray()],
  })

const Bar = ({ monitor } = {}) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    className: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    child: Widget.CenterBox({
      startWidget: Left(),
      centerWidget: Center(),
      endWidget: Right(),
    }),
  })

// exporting the config so ags can manage the windows
export default {
  style: App.configDir + '/style.css',
  windows: [
    Bar(),

    // you can call it, for each monitor
    // Bar({ monitor: 0 }),
    // Bar({ monitor: 1 })
  ],
}
