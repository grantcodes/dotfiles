import { Variable, bind } from "astal";
import { App, Astal, type Gdk } from "astal/gtk3";

const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;

const controlCenterVisible = Variable<boolean>(false);

const ControlCenter = (monitor: Gdk.Monitor) => {
	return (
		<window
			className="ControlCenter surface"
			gdkmonitor={monitor}
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={TOP | RIGHT | BOTTOM}
			visible={bind(controlCenterVisible)}
			name="ControlCenter"
			application={App}
		>
			<box>
				<label label="This is the ControlCenter" />
			</box>
		</window>
	);
};

export { ControlCenter, controlCenterVisible };
