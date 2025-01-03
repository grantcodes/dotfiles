import { Variable, bind } from "astal";
import { App, Astal, type Gdk, Gtk } from "astal/gtk3";
import { NotificationList } from "./NotificationList";
import { TimeAndDate } from "./TimeAndDate";

const { TOP } = Astal.WindowAnchor;
const { START, CENTER } = Gtk.Align;

const notificationCenterVisible = Variable<boolean>(false);

const NotificationCenter = (monitor: Gdk.Monitor) => (
  <window
    className="NotificationCenter"
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP}
    visible={true}
    name="NotificationCenter"
    application={App}
  >
    <revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      revealChild={bind(notificationCenterVisible)}
    >
      <box
        className="NotificationCenter__inner surface"
        hexpand
        valign={START}
        halign={CENTER}
        spacing={16}
      >
        <NotificationList />
        <Gtk.Separator visible orientation={Gtk.Orientation.VERTICAL} />
        <TimeAndDate />
      </box>
    </revealer>
  </window>
);

export { NotificationCenter, notificationCenterVisible };
