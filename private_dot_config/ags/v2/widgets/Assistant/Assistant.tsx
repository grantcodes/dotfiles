import { Variable, bind } from "astal";
import { App, Astal, type Gdk } from "astal/gtk3";

const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

const assistantVisible = Variable<boolean>(false);

const Assistant = (monitor: Gdk.Monitor) => (
  <window
    className="Assistant surface"
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP | LEFT | BOTTOM}
    visible={bind(assistantVisible)}
    name="Assistant"
    application={App}
  >
    <box>
      <label label="This is the Assistant" />
    </box>
  </window>
);

export { Assistant, assistantVisible };
