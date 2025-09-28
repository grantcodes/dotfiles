import { createBinding } from 'ags'
import Wp from 'gi://AstalWp'
import { BarRevealer } from '../util/BarRevealer'

const Volume = () => {
  const wp = Wp.get_default()
  const speaker = wp.audio.defaultSpeaker

  return (
    <BarRevealer
      class="AudioSlider"
      label={<image icon_name={createBinding(speaker, 'volumeIcon')} />}
    >
      <slider
        widthRequest={140}
        // NOTE: Doesn't seem to work yet.
        onNotifyValue={({ value }: { value: number }) =>
          speaker.set_volume(value)
        }
        value={createBinding(speaker, 'volume')}
      />
    </BarRevealer>
  )
}

export { Volume }
