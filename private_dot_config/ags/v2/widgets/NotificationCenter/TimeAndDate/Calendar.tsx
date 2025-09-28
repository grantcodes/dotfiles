// import { type ConstructProps, Gtk, astalify } from 'astal/gtk4'
// import GObject from 'gi://GObject'

// class Calendar extends astalify(Gtk.Calendar) {
//   static {
//     GObject.registerClass(this)
//   }

//   constructor(
//     props: ConstructProps<Calendar, Gtk.Calendar.ConstructorProps, {}>
//   ) {
//     super(props as any)
//   }
// }

// export { Calendar }

import { type ConstructProps } from 'ags'
import Gtk from 'gi://Gtk?version=4.0'

type CalendarProps = ConstructProps<Gtk.Calendar, Gtk.Calendar.ConstructorProps>
const Calendar = Gtk.Calendar

export { Calendar }
