import { createBinding } from 'ags'
import Gtk from 'gi://Gtk?version=4.0'
import Mpris from 'gi://AstalMpris'
import { BarRevealer } from '../util/BarRevealer'
import { truncateText } from '../../../lib/truncate-text'

const Media = () => {
  const mpris = Mpris.get_default()

  return (
    <box class="Media">
      {createBinding(mpris, 'players').as((ps: any[]) =>
        ps[0] ? (
          <BarRevealer
            label={<Gtk.Image icon_name="media-playback-start" />}
            transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
            tooltip={createBinding(ps[0], 'title').as(String)}
          >
            <box>
              <box
                class="Cover"
                valign={Gtk.Align.CENTER}
                css={createBinding(ps[0], 'coverArt').as(
                  (cover: string) => `background-image: url('${cover}');`
                )}
              />
              <label
                widthChars={20}
                widthRequest={20}
                maxWidthChars={20}
                label={truncateText(
                  createBinding(ps[0], 'title').as(
                    () => `${ps[0].title} - ${ps[0].artist}`
                  )
                )}
              />
            </box>
          </BarRevealer>
        ) : (
          ''
        )
      )}
    </box>
  )
}

export { Media }
