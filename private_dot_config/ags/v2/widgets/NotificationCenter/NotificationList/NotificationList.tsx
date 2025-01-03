import { bind } from "astal";
import AstalNotifd from "gi://AstalNotifd";
import { Gtk } from "astal/gtk3";
import {
  NotificationsMap,
  hasNotifications,
  notificationCount,
} from "../../Notifications";
import { NotificationListNoNotifications } from "./NotificatonListNoNotifications";

const { START } = Gtk.Align;

const notifd = AstalNotifd.get_default();

const clearAll = () => {
  const notifs = notifd.get_notifications();

  for (const n of notifs) {
    notifd.get_notification(n.id).dismiss();
  }
};

const ClearAll = () => (
  <button
    className="clear-button"
    heightRequest={20}
    widthRequest={20}
    halign={Gtk.Align.END}
    onClicked={clearAll}
    visible={bind(hasNotifications)}
  >
    <icon icon="user-trash-symbolic" css="font-size: 14px;" />
  </button>
);

const NotificationList = () => {
  const notifs = new NotificationsMap("persistent");
  // NOTE: Doesn't update as expected.
  // const notificationCount = bind(notifs).get().length;

  return (
    <box className="notification-list" vertical={true}>
      <centerbox
        className="notification-list__header"
        startWidget={
          <label
            label={bind(notificationCount).as((c) =>
              c > 0 ? `Notifications (${c})` : "Notifications",
            )}
            halign={START}
          />
        }
        endWidget={<ClearAll />}
      />

      <scrollable
        name="notification-list-scrollable"
        heightRequest={550}
        hscroll={Gtk.PolicyType.NEVER}
        vscroll={Gtk.PolicyType.AUTOMATIC}
        valign={START}
        visible={bind(hasNotifications)}
      >
        <box className="notification-list-scrollable__inner" vertical>
          {bind(notifs)}
        </box>
      </scrollable>

      <NotificationListNoNotifications />
    </box>
  );
};

export { NotificationList };
