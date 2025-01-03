import { Variable, GLib } from "astal";
import { notificationCenterVisible } from "../../NotificationCenter";

const Clock = ({ format = "%H:%M" }) => {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );

  return (
    <button
      className="bar-clock"
      onDestroy={() => time.drop()}
      label={time()}
      onClick={() =>
        notificationCenterVisible.set(!notificationCenterVisible.get())
      }
    />
  );
};

export { Clock };
