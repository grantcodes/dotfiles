import { bind } from "astal";
// import { Gtk } from "astal/gtk3";
// import { BarRevealer } from "../util/BarRevealer";
import { hasNotifications, notificationCount } from "../../Notifications";
import { notificationCenterVisible } from "../../NotificationCenter";

const NotificationCount = () => {
  return (
    <box className="notification-count" visible={bind(hasNotifications)}>
      <button
        onClick={() =>
          notificationCenterVisible.set(!notificationCenterVisible.get())
        }
      >
        <box>
          <label
            className="notification-count__number"
            label={bind(notificationCount).as((count) => `${count}`)}
          />
          <icon
            className="notification-count__icon"
            icon="notification-inactive"
          />
        </box>
      </button>
    </box>
  );
};

export { NotificationCount };
