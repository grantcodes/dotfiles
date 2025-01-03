import { bind } from "astal";
import AstalBattery from "gi://AstalBattery";
import { BarRevealer } from "../util/BarRevealer";

const Battery = () => {
  const bat = AstalBattery.get_default();

  return (
    <BarRevealer
      className="Battery"
      visible={bind(bat, "isPresent")}
      label={<icon icon={bind(bat, "batteryIconName")} />}
    >
      <label
        label={bind(bat, "percentage").as((p) => `${Math.floor(p * 100)} %`)}
      />
    </BarRevealer>
  );
};

export { Battery };
