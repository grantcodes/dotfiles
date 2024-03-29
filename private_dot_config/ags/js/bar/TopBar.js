import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import Variable from 'resource:///com/github/Aylur/ags/variable.js'
import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js'
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js'
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js'
// import OverviewButton from './buttons/OverviewButton.js'
import Workspaces from './buttons/Workspaces.js'
import FocusedClient from './buttons/FocusedClient.js'
import MediaIndicator from './buttons/MediaIndicator.js'
import DateButton from './buttons/DateButton.js'
import NotificationIndicator from './buttons/NotificationIndicator.js'
import SysTray from './buttons/SysTray.js'
import ColorPicker from './buttons/ColorPicker.js'
import QuickSettings from './buttons/QuickSettings.js'
import ScreenRecord from './buttons/ScreenRecord.js'
import BatteryBar from './buttons/BatteryBar.js'
import SubMenu from './buttons/SubMenu.js'
import Recorder from '../services/screenrecord.js'
// import Taskbar from './buttons/Taskbar.js';

const submenuItems = Variable(1)
SystemTray.connect('changed', () => {
  submenuItems.setValue(SystemTray.items.length + 1)
})

/**
 * @template T
 * @param {T=} service
 * @param {(self: T) => boolean=} condition
 */
const SeparatorDot = (service, condition) => {
  const visibility = (self) => {
    return (self.visible = false)
  }

  const conn = service ? [[service, visibility]] : []
  return Widget.Separator({
    connections: [['draw', visibility], ...conn],
    binds: [],
    vpack: 'center',
  })
}

const Start = () =>
  Widget.Box({
    class_name: 'start',
    children: [
      // OverviewButton(),
      SeparatorDot(),
      Workspaces(),
      SeparatorDot(),
      FocusedClient(),
      Widget.Box({ hexpand: true }),
      NotificationIndicator(),
      SeparatorDot(Notifications, (n) => n.notifications.length > 0 || n.dnd),
    ],
  })

const Center = () =>
  Widget.Box({
    class_name: 'center',
    children: [DateButton()],
  })

const End = () =>
  Widget.Box({
    class_name: 'end',
    children: [
      SeparatorDot(Mpris, (m) => m.players.length > 0),
      MediaIndicator(),
      Widget.Box({ hexpand: true }),

      SeparatorDot(Battery, (b) => b.available),
      BatteryBar(),

      SubMenu({
        items: submenuItems,
        children: [SysTray(), ColorPicker()],
      }),

      SeparatorDot(),
      ScreenRecord(),
      SeparatorDot(Recorder, (r) => r.recording),
      QuickSettings(),
    ],
  })

/** @param {number} monitor */
export default (monitor) =>
  Widget.Window({
    name: `bar${monitor}`,
    class_name: 'transparent',
    exclusivity: 'exclusive',
    monitor,
    anchor: ['top', 'left', 'right'],
    child: Widget.CenterBox({
      class_name: 'panel',
      start_widget: Start(),
      center_widget: Center(),
      end_widget: End(),
    }),
  })
