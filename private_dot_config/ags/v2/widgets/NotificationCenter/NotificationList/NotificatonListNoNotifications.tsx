import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { hasNotifications } from "../../Notifications";

const NotificationListNoNotifications = () => (
  <box
    className="notification-list-no-notifications"
    vertical
    valign={Gtk.Align.CENTER}
    halign={Gtk.Align.CENTER}
    vexpand
    hexpand
    visible={bind(hasNotifications).as((n) => !n)}
  >
    <icon
      icon="notification-disabled-symbolic"
      className="notification-list-no-notifications__icon"
    />
    <label label="You're all up to date" />
  </box>
);

export { NotificationListNoNotifications };
