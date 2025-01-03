import { Gtk } from "astal/gtk3";
import type { EventBox } from "astal/gtk3/widget";
import Notifd from "gi://AstalNotifd";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationContent } from "./NotificationContent";
import { NotificationActions } from "./NotificationActions";

const urgency = (n: Notifd.Notification) => {
  const { LOW, NORMAL, CRITICAL } = Notifd.Urgency;
  // match operator when?
  switch (n.urgency) {
    case LOW:
      return "is-low";
    case CRITICAL:
      return "is-critical";
    default:
      return "is-normal";
  }
};

interface NotificationProps {
  setup(self: EventBox): void;
  onHoverLost(self: EventBox): void;
  notification: Notifd.Notification;
}

const Notification = ({
  notification: n,
  onHoverLost,
  setup,
}: NotificationProps) => (
  <eventbox
    className={`notification ${urgency(n)}`}
    setup={setup}
    onHoverLost={onHoverLost}
  >
    <box vertical className="notification__surface surface">
      <NotificationHeader notification={n} />
      <Gtk.Separator visible />
      <NotificationContent notification={n} />
      <NotificationActions notification={n} />
    </box>
  </eventbox>
);

export { Notification };
