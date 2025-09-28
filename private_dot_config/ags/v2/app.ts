import app from "ags/gtk4/app";
import {
	Bar,
	NotificationCenter,
	Notifications,
	ControlCenter,
	Assistant,
	// Launcher,
} from "./widgets";
import type Gtk from "gi://Gtk?version=4.0";

let bar: Gtk.Window;
// let launcher: Gtk.Window;
let notificationCenter: Gtk.Window;
let notifications: Gtk.Window;
let controlCenter: Gtk.Window;
let assistant: Gtk.Window;

app.start({
	css: "./styles/main.css",
	requestHandler(request: string, res: (response: any) => void) {
		switch (request) {
			case "reload-css": {
				res("Reloading CSS");
				app.reset_css();
				app.apply_css("./styles/main.css");
				break;
			}
			case "toggle-launcher": {
				res("Toggling Luncher");
				// launcherVisible.set(!launcherVisible.get());
				break;
			}
			default: {
				res("unknown command");
			}
		}
	},
	main() {
		const monitors = app.get_monitors();

		monitors.forEach((monitor) => {
			bar = Bar(monitor);
			// launcher = Launcher(monitor);
			notificationCenter = NotificationCenter(monitor);
			notifications = Notifications(monitor);
			controlCenter = ControlCenter(monitor);
			assistant = Assistant(monitor);
		});
	},
});
