import Gtk from 'gi://Gtk?version=4.0'

const NotificationListNoNotifications = () => (
  <box
    class="notification-list-no-notifications"
    orientation={Gtk.Orientation.VERTICAL}
    valign={Gtk.Align.CENTER}
    halign={Gtk.Align.CENTER}
    vexpand
    hexpand
  >
    <image
      iconName="notification-disabled-symbolic"
      class="notification-list-no-notifications__icon"
    />
    <label label="You're all up to date" />
  </box>
)

export { NotificationListNoNotifications }
