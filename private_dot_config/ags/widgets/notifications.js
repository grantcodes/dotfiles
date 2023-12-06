// importing
import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js'

// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself
const Notification = () =>
  Widget.Box({
    className: 'notification',
    children: [
      Widget.Icon({
        icon: 'preferences-system-notifications-symbolic',
        connections: [
          [
            Notifications,
            (self) => (self.visible = Notifications.popups.length > 0),
          ],
        ],
      }),
      Widget.Label({
        connections: [
          [
            Notifications,
            (self) => {
              self.label = Notifications.popups[0]?.summary || ''
            },
          ],
        ],
      }),
    ],
  })

export default Notification
