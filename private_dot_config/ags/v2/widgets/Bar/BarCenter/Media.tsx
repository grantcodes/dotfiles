import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { BarRevealer } from "../util/BarRevealer";
import { truncateText } from "../../../lib/truncate-text";

const Media = () => {
  const mpris = Mpris.get_default();

  return (
    <box className="Media">
      {bind(mpris, "players").as((ps) =>
        ps[0] ? (
          <BarRevealer
            label={<icon icon="media-playback-start" />}
            transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
          >
            <box>
              <box
                className="Cover"
                valign={Gtk.Align.CENTER}
                css={bind(ps[0], "coverArt").as(
                  (cover) => `background-image: url('${cover}');`,
                )}
              />
              <label
                widthChars={20}
                widthRequest={20}
                maxWidthChars={20}
                label={truncateText(
                  bind(ps[0], "title").as(
                    () => `${ps[0].title} - ${ps[0].artist}`,
                  ),
                )}
              />
            </box>
          </BarRevealer>
        ) : (
          ""
        ),
      )}
    </box>
  );
};

export { Media };
