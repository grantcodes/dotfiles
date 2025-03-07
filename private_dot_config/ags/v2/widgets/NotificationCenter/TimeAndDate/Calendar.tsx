import { type ConstructProps, Gtk, astalify } from "astal/gtk3";
import GObject from "gi://GObject";

class Calendar extends astalify(Gtk.Calendar) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<Calendar, Gtk.Calendar.ConstructorProps, {}>,
  ) {
    super(props as any);
  }
}

export { Calendar };
