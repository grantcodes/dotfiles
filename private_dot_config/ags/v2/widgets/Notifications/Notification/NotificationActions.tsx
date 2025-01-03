import { Gtk } from "astal/gtk3";
import type Notifd from "gi://AstalNotifd";

interface NotificationActionsProps {
  notification: Notifd.Notification;
}

const { CENTER } = Gtk.Align;

const NotificationActions = ({ notification: n }: NotificationActionsProps) => (
  <>
    {n.get_actions().length > 0 && (
      <box className="notification-actions">
        {n.get_actions().map(({ label, id }) => (
          <button
            hexpand
            onClicked={() => n.invoke(id)}
            className="notification-actions__button"
          >
            <label label={label} halign={CENTER} hexpand />
          </button>
        ))}
      </box>
    )}
  </>
);

export { NotificationActions };
