import { Variable, GLib } from "astal";
import { Gtk } from "astal/gtk3";
import { Calendar } from "./Calendar";

const { VERTICAL } = Gtk.Orientation;

const TimeAndDate = () => {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format("%H:%M:%S")!,
  );
  const date = Variable<string>("").poll(
    10000,
    () => GLib.DateTime.new_now_local().format("%Y-%m-%d")!,
  );

  return (
    <box orientation={VERTICAL} className="time-and-date">
      <box orientation={VERTICAL} className="time-and-date__info">
        <label className="time-and-date__date" label={date()} />
        <label className="time-and-date__time" label={time()} />
      </box>
      <Calendar widthRequest={300} heightRequest={300} />
    </box>
  );
};

export { TimeAndDate };
