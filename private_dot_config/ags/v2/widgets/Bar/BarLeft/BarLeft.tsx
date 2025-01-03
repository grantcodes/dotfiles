import { Gtk } from "astal/gtk3";
import { Workspaces } from "./Workspaces";
import { FocusedClient } from "./FocusedClient";

const BarLeft = () => (
  <box className="bar__left" hexpand halign={Gtk.Align.START}>
    <Workspaces />
    <FocusedClient />
  </box>
);

export { BarLeft };
