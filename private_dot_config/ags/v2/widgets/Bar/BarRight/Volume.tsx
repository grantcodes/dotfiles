import { bind } from "astal";
import Wp from "gi://AstalWp";
import { BarRevealer } from "../util/BarRevealer";

const Volume = () => {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;

  return (
    <BarRevealer
      className="AudioSlider"
      label={<icon icon={bind(speaker, "volumeIcon")} />}
    >
      <box css="min-width: 140px">
        <slider
          hexpand
          onDragged={({ value }) => (speaker.volume = value)}
          value={bind(speaker, "volume")}
        />
      </box>
    </BarRevealer>
  );
};

export { Volume };
