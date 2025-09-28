import { createPoll } from 'ags/time'
import Gtk from 'gi://Gtk?version=4.0'
import GLib from 'gi://GLib'
import { Calendar } from './Calendar'

const { VERTICAL } = Gtk.Orientation

const TimeAndDate = () => {
  const time = createPoll('', 1000, () => {
    return GLib.DateTime.new_now_local().format('%H:%M:%S')!
  })
  const date = createPoll('', 10000, () => {
    return GLib.DateTime.new_now_local().format('%Y-%m-%d')!
  })

  return (
    <box orientation={VERTICAL} cssClasses={['time-and-date']}>
      <box orientation={VERTICAL} cssClasses={['time-and-date__info']}>
        <label cssClasses={['time-and-date__date']} label={date} />
        <label cssClasses={['time-and-date__time']} label={time} />
      </box>
      <Calendar widthRequest={300} heightRequest={300} />
    </box>
  )
}

export { TimeAndDate }
