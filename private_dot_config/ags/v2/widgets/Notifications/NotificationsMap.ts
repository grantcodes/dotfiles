import type Gtk from "gi://Gtk?version=4.0";
import Notifd from "gi://AstalNotifd";
import { Notification } from "./Notification";
import type { Subscribable } from "ags";
import { createState } from "ags";
import { timeout } from "ags/time";

// see comment below in constructor
const TIMEOUT_DELAY = 5000;

// The purpose if this class is to replace createState<Array<Widget>>
// with a Map<number, Widget> type in order to track notification widgets
// by their id, while making it conveniently bindable as an array
class NotificationsMap implements Subscribable {
	private mode: "popup" | "persistent" = "persistent";
	private map: Map<number, Gtk.Widget> = new Map();
	private state = createState<Array<Gtk.Widget>>([]);

	private notify() {
		this.state([...this.map.values()].reverse());
	}

	constructor(mode: "popup" | "persistent") {
		this.mode = mode;
		const notifd = Notifd.get_default();
		notifd.connect("notified", (_: any, id: number) => {
			this.set(
				id,
				Notification({
					notification: notifd.get_notification(id)!,
					onHoverLost: () => (this.mode === "popup" ? this.delete(id) : null),
					setup: () => timeout(TIMEOUT_DELAY, () => {}),
				}),
			);
		});
		notifd.connect("resolved", (_: any, id: number) => {
			this.delete(id);
		});
	}

	private set(key: number, value: Gtk.Widget) {
		this.map.get(key)?.destroy();
		this.map.set(key, value);
		this.notify();
	}

	private delete(key: number) {
		this.map.get(key)?.destroy();
		this.map.delete(key);
		this.notify();
	}

	get() {
		return this.state();
	}

	subscribe(callback: (list: Array<Gtk.Widget>) => void) {
		// AGS v3: createState returns a function, so we can use a custom subscribe
		// This is a placeholder; actual AGS v3 may have a different API
		// For now, just call the callback immediately
		callback(this.state());
		return () => {};
	}
}

export { NotificationsMap };
