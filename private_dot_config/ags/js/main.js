import Dashboard from './dashboard/Dashboard.js'
import Notifications from './notifications/Notifications.js'
import OSD from './osd/OSD.js'
// import Overview from './overview/Overview.js'
import PowerMenu from './powermenu/PowerMenu.js'
import QuickSettings from './quicksettings/QuickSettings.js'
import ScreenCorners from './screencorner/ScreenCorners.js'
import TopBar from './bar/TopBar.js'
import Verification from './powermenu/Verification.js'
import { init } from './settings/setup.js'
import { forMonitors } from './utils.js'

const windows = () => [
  forMonitors(Notifications),
  forMonitors(OSD),
  forMonitors(ScreenCorners),
  forMonitors(TopBar),
  Dashboard(),
  // Overview(),
  PowerMenu(),
  QuickSettings(),
  Verification(),
]

export default {
  onConfigParsed: init,
  windows: windows().flat(1),
  maxStreamVolume: 1.05,
  cacheNotificationActions: true,
  closeWindowDelay: {
    quicksettings: 300,
    dashboard: 300,
  },
}
