import { GLib } from "astal";
import { Gtk } from "astal/gtk3";
import type Notifd from "gi://AstalNotifd";

const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format)!;

interface NotificationHeaderProps {
  notification: Notifd.Notification;
}
const { START, END } = Gtk.Align;

const NotificationHeader = ({ notification: n }: NotificationHeaderProps) => {
  return (
    <box className="notification-header">
      {(n.appIcon || n.desktopEntry) && (
        <icon
          className="notification-header__app-icon"
          visible={Boolean(n.appIcon || n.desktopEntry)}
          icon={n.appIcon || n.desktopEntry}
        />
      )}
      <label
        className="notification-header__app-name"
        halign={START}
        truncate
        label={n.appName || "Unknown"}
      />
      <label
        className="notification-header__time"
        hexpand
        halign={END}
        label={time(n.time)}
      />
      <button
        className="notification-header__close"
        onClicked={() => n.dismiss()}
      >
        <icon icon="window-close-symbolic" />
      </button>
    </box>
  );
};

export { NotificationHeader };
