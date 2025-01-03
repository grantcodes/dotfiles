import { Astal, type Gdk } from "astal/gtk3";
import { BarLeft } from "./BarLeft";
import { BarCenter } from "./BarCenter";
import { BarRight } from "./BarRight";

const Bar = (monitor: Gdk.Monitor) => {
  const anchor =
    Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT;

  return (
    <window
      className="Bar surface"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={anchor}
    >
      <centerbox>
        <BarLeft />
        <BarCenter />
        <BarRight />
      </centerbox>
    </window>
  );
};

export { Bar };
