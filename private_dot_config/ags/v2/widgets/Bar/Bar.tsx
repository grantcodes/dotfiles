import app from 'ags/gtk4/app'
import Astal from 'gi://Astal?version=4.0'

import { BarLeft } from './BarLeft'
import { BarCenter } from './BarCenter'
import { BarRight } from './BarRight'

const Bar = (monitor: any) => {
  const anchor =
    Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT

  return (
    <window
      visible
      name="Bar"
      application={app}
      class="Bar surface"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={anchor}
    >
      <centerbox $type="horizontal">
        <BarLeft />
        <BarCenter />
        <BarRight />
      </centerbox>
    </window>
  )
}

export { Bar }
