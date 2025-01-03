import { Gtk } from "astal/gtk3";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { NotificationCount } from "./NotificationCount";

const BarCenter = () => (
  <box hexpand halign={Gtk.Align.CENTER} spacing={8}>
    <NotificationCount />
    <Clock />
    <Media />
  </box>
);

export { BarCenter };
