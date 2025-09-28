import { createBinding } from 'ags'
import BatteryService from 'gi://AstalBattery'
import { BarRevealer } from '../util/BarRevealer'

const Battery = () => {
  const bat = BatteryService.get_default()

  return (
    <BarRevealer
      class="Battery"
      visible={createBinding(bat, 'isPresent')}
      label={<image icon_name={createBinding(bat, 'batteryIconName')} />}
    >
      <label
        label={createBinding(bat, 'percentage').as(
          (p: number) => `${Math.floor(p * 100)} %`
        )}
      />
    </BarRevealer>
  )
}

export { Battery }
