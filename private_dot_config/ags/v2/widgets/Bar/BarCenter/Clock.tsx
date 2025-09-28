import GLib from 'gi://GLib'
import { createPoll } from 'ags/time'
import { notificationCenterWindow } from '../../NotificationCenter'

const Clock = ({ format = '%H:%M' }) => {
  const time = createPoll('', 1000, () => {
    return GLib.DateTime.new_now_local().format(format)!
  })

  return (
    <button
      class="bar-clock"
      label={time}
      onClicked={() => {
        notificationCenterWindow.visible = !notificationCenterWindow.visible
      }}
    />
  )
}

export { Clock }
