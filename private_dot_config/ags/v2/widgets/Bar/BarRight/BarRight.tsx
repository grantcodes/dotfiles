import { Gtk } from "astal/gtk3";
import { Tray } from "./Tray";
import { Battery } from "./Battery";
import { Volume } from "./Volume";
import { ControlCenterButton } from "./ControlCenterButton";

const BarRight = () => (
  <box hexpand halign={Gtk.Align.END}>
    <Tray />
    <Volume />
    <Battery />
    <ControlCenterButton />
  </box>
);

export { BarRight };
