import { Astal, type Gdk } from "astal/gtk3";
import { bind } from "astal";
import { NotificationsMap } from "./NotificationsMap";

const Notifications = (gdkmonitor: Gdk.Monitor) => {
  const { TOP } = Astal.WindowAnchor;
  const notifs = new NotificationsMap("popup");

  return (
    <window
      className="Notifications"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP}
      marginTop={30}
    >
      <box vertical className="Notifications__inner">
        {bind(notifs)}
      </box>
    </window>
  );
};

export { Notifications };
